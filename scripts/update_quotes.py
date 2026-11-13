#!/usr/bin/env python3
"""抓取台股加權、台指期（近月）、那斯達克綜合、費城半導體指數，寫成 quotes.json。

用法：python scripts/update_quotes.py <上一版 quotes.json> <輸出路徑>

- 只使用公開的延遲資料，並刻意取「至少 20 分鐘前」的那一筆，不轉發即時行情。
- 任何來源失敗或數字不合理時保留上一版，不寫入估計值。
- 台指期取自臺灣期貨交易所行情網站（mis.taifex.com.tw）近月合約的 1 分鐘 K 棒，
  同時查日盤與夜盤，取兩者中「早於現在 20 分鐘」的最新一筆。
"""
import json
import sys
import time
import urllib.request
from datetime import datetime, timezone, timedelta

UA = {"User-Agent": "Mozilla/5.0 (compatible; haonicepaper-quotes/1.0)"}
TPE = timezone(timedelta(hours=8))
DELAY_SEC = 20 * 60
MAX_ABS_PCT = 15.0  # 單日漲跌超過 15% 視為資料異常


def get_json(url, timeout=15):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        if r.status != 200:
            raise RuntimeError(f"HTTP {r.status}")
        return json.loads(r.read(2_000_000).decode("utf-8"))


def yahoo_delayed(symbol):
    """取最後一筆「早於現在 20 分鐘」的 1 分鐘 K 棒收盤價。"""
    cutoff = time.time() - DELAY_SEC
    for host in ("query1", "query2"):
        try:
            d = get_json(f"https://{host}.finance.yahoo.com/v8/finance/chart/{symbol}?interval=1m&range=1d")
            res = d["chart"]["result"][0]
            meta = res["meta"]
            prev = float(meta.get("previousClose") or meta["chartPreviousClose"])
            ts_list = res.get("timestamp") or []
            closes = res["indicators"]["quote"][0].get("close") or []
            pick = None
            for ts, c in zip(ts_list, closes):
                if c is not None and ts <= cutoff:
                    pick = (ts, float(c))
            if pick is None:
                # 收盤後一分鐘資料可能為空：最後成交時間已早於 20 分鐘前，就用最後成交價
                rmt, rmp = meta.get("regularMarketTime"), meta.get("regularMarketPrice")
                if rmt and rmp is not None and int(rmt) <= cutoff:
                    pick = (int(rmt), float(rmp))
                else:
                    print(f"{symbol}: no bar older than {DELAY_SEC // 60} min yet (bars={len(ts_list)})", file=sys.stderr)
                    return None
            ts, price = pick
            chg = price - prev
            pct = chg / prev * 100
            if price <= 0 or abs(pct) > MAX_ABS_PCT:
                raise ValueError(f"implausible {symbol}: {price} ({pct:.2f}%)")
            when = datetime.fromtimestamp(ts, tz=timezone.utc).astimezone(TPE).isoformat()
            return round(price, 2), round(chg, 2), round(pct, 2), when
        except Exception as e:  # noqa: BLE001
            print(f"yahoo {host} {symbol} failed: {e}", file=sys.stderr)
    return None


TAIFEX_API = "https://mis.taifex.com.tw/futures/api/"
TAIFEX_HEAD = {
    **UA,
    "Content-Type": "application/json;charset=UTF-8",
    "Accept": "application/json",
    "Origin": "https://mis.taifex.com.tw",
    "Referer": "https://mis.taifex.com.tw/futures/",
}


def post_json(url, body, timeout=15):
    req = urllib.request.Request(url, data=json.dumps(body).encode("utf-8"), headers=TAIFEX_HEAD, method="POST")
    with urllib.request.urlopen(req, timeout=timeout) as r:
        if r.status != 200:
            raise RuntimeError(f"HTTP {r.status}")
        return json.loads(r.read(5_000_000).decode("utf-8"))


def fnum(v):
    try:
        x = float(str(v).replace(",", ""))
    except (TypeError, ValueError):
        return None
    return x if x > 0 else None


def taifex_ts(cdate, hhmmss, night):
    """期交所時間為台北時間；夜盤跨午夜後（00:00–05:00）日期要加一天。"""
    t = str(hhmmss).strip().replace(":", "")
    if t.isdigit() and int(t) > 10**9:  # 已是 Unix 時間（秒或毫秒）
        return int(t) / (1000 if int(t) > 10**11 else 1)
    t = t.zfill(4) + "00" if len(t) <= 4 else t.zfill(6)
    if not (len(str(cdate)) == 8 and t.isdigit() and len(t) == 6):
        return None
    dt = datetime.strptime(f"{cdate}{t}", "%Y%m%d%H%M%S").replace(tzinfo=TPE)
    if night and dt.hour < 12:
        dt += timedelta(days=1)
    return dt.timestamp()


def taifex_session(market):
    """market "0" = 日盤（合約代碼結尾 -F），"1" = 夜盤（結尾 -M）。回傳 (ts, price, ref, session) 或 None。"""
    night = market == "1"
    suffix = "-M" if night else "-F"
    d = post_json(TAIFEX_API + "getQuoteList", {
        "MarketType": market, "SymbolType": "F", "KindID": "1", "CID": "TXF",
        "ExpireMonth": "", "RowSize": "全部", "PageNo": "", "SortColumn": "", "AscDesc": "A"})
    rows = (d.get("RtData") or {}).get("QuoteList") or []
    # 清單第一筆是現貨，之後依到期月排序；第一個非價差的期貨合約就是近月
    row = next((r for r in rows if str(r.get("SymbolID", "")).startswith("TXF")
                and "/" not in str(r.get("SymbolID", "")) and str(r.get("SymbolID", "")).endswith(suffix)), None)
    if row is None:
        return None
    sym, ref, cdate = row["SymbolID"], fnum(row.get("CRefPrice")), str(row.get("CDate", ""))
    if ref is None:
        return None
    cutoff = time.time() - DELAY_SEC
    pick = None
    try:
        rt = post_json(TAIFEX_API + "getChartData1M", {"SymbolID": sym}).get("RtData") or {}
        q = rt.get("Quote") or {}
        if str(q.get("CDate", "")).isdigit() and len(str(q.get("CDate"))) == 8:
            cdate = str(q["CDate"])
        ticks = rt.get("Ticks") or rt.get("ChartData") or []
        if ticks:
            print(f"taifex {sym} CDate={cdate} ticks={len(ticks)} first={ticks[0]!r} last={ticks[-1]!r}", file=sys.stderr)
        for t in ticks:
            if isinstance(t, (list, tuple)) and len(t) >= 5:
                tm, c = t[0], t[4]
            elif isinstance(t, dict):
                tm = t.get("Time", t.get("T", t.get("time")))
                c = t.get("Close", t.get("C", t.get("close")))
            else:
                continue
            ts, c = taifex_ts(cdate, tm, night), fnum(c)
            if ts is not None and c is not None and ts <= cutoff and (pick is None or ts >= pick[0]):
                pick = (ts, c)
    except Exception as e:  # noqa: BLE001
        print(f"taifex chart {sym} failed: {e}", file=sys.stderr)
    if pick is None:
        # 沒有 K 棒時，只有在最後成交已早於 20 分鐘前（例如收盤後）才採用最後成交價
        ts, c = taifex_ts(cdate, row.get("CTime", ""), night), fnum(row.get("CLastPrice"))
        if ts is not None and c is not None and ts <= cutoff:
            pick = (ts, c)
    if pick is None:
        return None
    return pick[0], pick[1], ref, ("night" if night else "day")


def taifex_delayed():
    best = None
    for market in ("0", "1"):
        try:
            r = taifex_session(market)
        except Exception as e:  # noqa: BLE001
            print(f"taifex market {market} failed: {e}", file=sys.stderr)
            continue
        if r and (best is None or r[0] > best[0]):
            best = r
    if best is None:
        print("taifex: no quote older than 20 min", file=sys.stderr)
        return None
    ts, price, ref, session = best
    chg = price - ref
    pct = chg / ref * 100
    if abs(pct) > MAX_ABS_PCT:
        print(f"implausible TXF: {price} ({pct:.2f}%)", file=sys.stderr)
        return None
    when = datetime.fromtimestamp(ts, tz=TPE).isoformat()
    return round(price, 2), round(chg, 2), round(pct, 2), when, session


SYMBOLS = {"TAIEX": "%5ETWII", "IXIC": "%5EIXIC", "SOX": "%5ESOX"}


def main():
    prev_path, out_path = sys.argv[1], sys.argv[2]
    try:
        with open(prev_path, encoding="utf-8") as f:
            data = json.load(f)
    except Exception:  # noqa: BLE001
        data = {"items": {}}
    items = data.get("items", {})
    got_any = False
    for key, sym in SYMBOLS.items():
        r = yahoo_delayed(sym)
        if r:
            price, chg, pct, when = r
            items[key] = {"price": price, "change": chg, "pct": pct, "time": when}
            got_any = True
    r = taifex_delayed()
    if r:
        price, chg, pct, when, session = r
        items["TXF"] = {"price": price, "change": chg, "pct": pct, "time": when, "session": session}
        got_any = True
    out = {
        "updated": datetime.now(TPE).isoformat(timespec="seconds"),
        "source": "live" if got_any else data.get("source", "snapshot"),
        "delay_minutes": DELAY_SEC // 60,
        "items": items,
    }
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
    print(json.dumps(out, ensure_ascii=False))


if __name__ == "__main__":
    main()

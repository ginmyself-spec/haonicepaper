#!/usr/bin/env python3
"""抓取台股加權、那斯達克綜合、費城半導體指數，寫成 quotes.json。

用法：python scripts/update_quotes.py <上一版 quotes.json> <輸出路徑>

- 只使用公開的延遲資料，並刻意取「至少 20 分鐘前」的那一筆，不轉發即時行情。
- 任何來源失敗或數字不合理時保留上一版，不寫入估計值。
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

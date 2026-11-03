#!/usr/bin/env python3
"""檢查 data/news 內容格式與安全性。每日更新推送前必須通過。

用法：python scripts/validate_edition.py data/news
"""
import json
import os
import re
import sys
from urllib.parse import urlparse

DATE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
BAD = re.compile(r"[<>]|javascript:|data:", re.I)
errors = []


def err(msg):
    errors.append(msg)


def text(v, where):
    if not isinstance(v, dict) or not isinstance(v.get("zh"), str) or not isinstance(v.get("en"), str):
        err(f"{where}: 需要 {{zh, en}} 文字")
        return
    for k in ("zh", "en"):
        if not v[k].strip():
            err(f"{where}.{k}: 空白")
        if BAD.search(v[k]):
            err(f"{where}.{k}: 含不允許的字元或語法")


def num(v, where, allow_none=False):
    if v is None and allow_none:
        return
    if not isinstance(v, (int, float)) or isinstance(v, bool):
        err(f"{where}: 需要數字")


def sources(arr, where):
    if not isinstance(arr, list) or not arr:
        err(f"{where}: 至少一個出處")
        return
    for i, s in enumerate(arr):
        text(s.get("name"), f"{where}[{i}].name")
        u = urlparse(str(s.get("url", "")))
        if u.scheme != "https" or not u.netloc:
            err(f"{where}[{i}].url: 只允許 https 網址")


def items(arr, where, lo, hi):
    if not isinstance(arr, list) or not (lo <= len(arr) <= hi):
        err(f"{where}: 需要 {lo}–{hi} 則")
        return
    for i, it in enumerate(arr):
        text(it.get("title"), f"{where}[{i}].title")
        text(it.get("body"), f"{where}[{i}].body")
        sources(it.get("sources"), f"{where}[{i}].sources")


def edition(path):
    d = json.load(open(path, encoding="utf-8"))
    name = os.path.basename(path)
    if not DATE.match(str(d.get("date", ""))) or name != d["date"] + ".json":
        err(f"{name}: date 與檔名不符")
    text(d.get("edition"), f"{name}.edition")
    text(d.get("lead_summary"), f"{name}.lead_summary")
    items(d.get("world"), f"{name}.world", 5, 6)
    items(d.get("finance"), f"{name}.finance", 5, 5)
    m = d.get("markets", {})
    tw, us = m.get("tw", {}), m.get("us", {})
    for k in ("close", "change", "pct", "open", "high", "low", "prev"):
        num(tw.get(k), f"{name}.markets.tw.{k}")
    text(tw.get("headline"), f"{name}.markets.tw.headline")
    text(tw.get("body"), f"{name}.markets.tw.body")
    sources(tw.get("sources"), f"{name}.markets.tw.sources")
    for i, f in enumerate(tw.get("flows", [])):
        text(f.get("name"), f"{name}.markets.tw.flows[{i}].name")
        num(f.get("value"), f"{name}.markets.tw.flows[{i}].value")
    for i, r in enumerate(us.get("rows", [])):
        text(r.get("name"), f"{name}.markets.us.rows[{i}].name")
        num(r.get("close"), f"{name}.markets.us.rows[{i}].close")
        num(r.get("change"), f"{name}.markets.us.rows[{i}].change", allow_none=True)
        num(r.get("pct"), f"{name}.markets.us.rows[{i}].pct")
    text(us.get("headline"), f"{name}.markets.us.headline")
    sources(us.get("sources"), f"{name}.markets.us.sources")
    week = m.get("week", {})
    for sym in ("TAIEX", "IXIC", "SOX"):
        pts = week.get(sym, [])
        if not (2 <= len(pts) <= 6):
            err(f"{name}.markets.week.{sym}: 需要 2–6 個交易日")
        for p in pts:
            if not (isinstance(p, list) and len(p) == 2 and DATE.match(str(p[0]))):
                err(f"{name}.markets.week.{sym}: 格式應為 [日期, 收盤]")
            else:
                num(p[1], f"{name}.markets.week.{sym}.{p[0]}")


def main():
    root = sys.argv[1] if len(sys.argv) > 1 else "data/news"
    idx = json.load(open(os.path.join(root, "index.json"), encoding="utf-8"))
    days = idx.get("days", [])
    if not 1 <= len(days) <= 7:
        err("index.json: days 需要 1–7 筆")
    if not days or idx.get("latest") != days[0]["date"]:
        err("index.json: latest 必須是第一筆")
    files = {f for f in os.listdir(root) if DATE.match(f[:-5]) and f.endswith(".json")}
    listed = set()
    for d in days:
        if not DATE.match(str(d.get("date", ""))):
            err(f"index.json: 日期格式錯誤 {d.get('date')}")
            continue
        text(d.get("summary"), f"index.json.{d['date']}.summary")
        listed.add(d["date"] + ".json")
        if d["date"] + ".json" not in files:
            err(f"index.json: 缺少 {d['date']}.json")
    for f in sorted(files):
        edition(os.path.join(root, f))
    extra = files - listed
    if extra:
        err(f"超過 7 天或未列入 index 的檔案應刪除：{', '.join(sorted(extra))}")
    if errors:
        print("驗證失敗：\n- " + "\n- ".join(errors))
        sys.exit(1)
    print(f"OK：{len(files)} 期內容通過檢查")


if __name__ == "__main__":
    main()

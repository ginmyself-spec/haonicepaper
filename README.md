# 每日Hao報 · HaoNicePaper

每日國際要聞（5–6 則）、國際財經（5 則）與台美股市摘要，中英雙語，報紙版面。

## 檔案結構

```
index.html                    網站版面（含 CSP 安全設定）
app.js                        網站程式（從 data/ 讀取內容並渲染）
data/news/index.json          往期清單（最多 7 天，latest 為主頁預設日期）
data/news/YYYY-MM-DD.json     每日內容（中英雙語，每則附出處）
data/quotes.json              指數初始快照（報價更新失敗時的備援）
scripts/update_quotes.py      抓取加權、那斯達克、費半指數（延遲 20 分鐘以上）
scripts/validate_edition.py   檢查每日內容格式與安全（推送前必跑）
.github/workflows/quotes.yml  交易時段每 10 分鐘更新報價，寫到 quotes 分支
.github/workflows/validate.yml  每次更新 data/news 時自動檢查內容
```

## 部署到 GitHub Pages

1. 建立公開 repo（例如 `daily-ledger`），把本資料夾全部內容推到 `main`。
2. Settings → Pages → Source 選 **Deploy from a branch**，Branch 選 `main` / `(root)`。
3. Settings → Actions → General → Workflow permissions 選 **Read and write permissions**。
4. Actions 分頁手動執行一次 **Update index quotes**，確認 `quotes` 分支出現 `quotes.json`。
5. 網址為 `https://<帳號>.github.io/daily-ledger/`。

## 運作方式

- **盤中報價**：GitHub Actions 在台股（台北 09:00–13:59）與美股（UTC 13–21）交易時段每 10 分鐘抓一次報價，以單一 commit 強制推到 `quotes` 分支（不會觸發 Pages 重建）。網頁每分鐘從 `raw.githubusercontent.com` 讀取，數字變動時有跳動與閃色提示。GitHub 排程可能延遲數分鐘，報價本身也約有延遲。
- **每日內容**：由 Claude 排程每天早上產生 `data/news/YYYY-MM-DD.json`、更新 `index.json` 並刪除 7 天前的檔案。
- **瀏覽人次**：使用不蒜子（busuanzi）計數，只在 `*.github.io` 或 `site-domain` 設定的網域上載入。
- **語言**：預設中文，右上角 EN 切換，選擇會記在瀏覽器。
- **往期回顧**：右上角按鈕，向下捲動自動隱藏、往上捲動出現；點選後網址帶 `#d-YYYY-MM-DD` 可直接分享。

## 每日 JSON 格式

每個文字欄位都是 `{"zh": "...", "en": "..."}`，每則新聞附 `sources: [{name:{zh,en}, url}]`。
`markets.week` 存三大指數近 5 個交易日收盤（`[["YYYY-MM-DD", 收盤], ...]`），股市摘要的一週走勢圖由它繪製；盤中若有新報價，圖上會多一個「盤中」空心點。
完整範例見 `data/news/2026-11-03.json`。

## 改用自訂網域

1. 向網域註冊商購買網域（例如 `haonicepaper.com`）。
2. GitHub：帳號 Settings → Pages → **Add a domain**，依指示加一筆 TXT 記錄完成網域驗證（防止被他人冒用）。
3. repo Settings → Pages → Custom domain 填入網址並儲存（從分支發布時，GitHub 會自動在 repo 根目錄新增 `CNAME` 檔）。
4. 到註冊商的 DNS 設定：
   - 子網域（如 `news.example.com` 或 `www.example.com`）：新增 CNAME 記錄指向 `<帳號>.github.io`
   - 根網域（`example.com`）：新增 4 筆 A 記錄 `185.199.108.153`、`185.199.109.153`、`185.199.110.153`、`185.199.111.153`（IPv6 可另加 AAAA `2606:50c0:8000::153` 至 `2606:50c0:8003::153`）
   - 根網域建議同時設定 `www` 的 CNAME，GitHub 會自動做兩者間的轉址
5. DNS 生效（最長約 24 小時）後，在 Pages 設定勾選 **Enforce HTTPS**。
6. 修改 `index.html` 開頭兩個設定：`site-repo` 填 `帳號/repo名稱`，`site-domain` 填你的網域（不含 www）。否則自訂網域上的盤中報價會停在快照、瀏覽人次也不會計數。

注意：不蒜子依網域計數，換網域後瀏覽人次會從 0 重新開始。

## 費用

- repo 必須設為 **公開**：GitHub Pages 與標準 GitHub Actions 執行器在公開 repo 免費。若設為私人，報價更新每月約需 1,800 分鐘，會接近 GitHub Free 每月 2,000 分鐘的額度。
- Pages 限制：網站 1 GB、每月流量軟上限 100 GB；本站每期約 20 KB，只保留 7 天。
- 公開 repo 若 60 天沒有任何活動，排程工作流程會被自動停用；每日內容更新會推送 commit，可維持啟用。
- 每日內容由 Claude 排程產生，計入你的 Claude 方案用量，每天一次。
- 不蒜子、Google Fonts、Yahoo Finance 資料免費；自訂網域需另付註冊商年費。

## 安全設計

- 頁面以 Content-Security-Policy 限制只能載入本站、Google Fonts、不蒜子與 raw.githubusercontent.com 的資源。
- 所有內容以純文字插入，外部連結只允許 http/https，並加上 `noopener noreferrer`。
- `validate_edition.py` 拒絕含 HTML 標籤、`javascript:` 或非 https 出處的內容。
- 報價只採用延遲 20 分鐘以上的公開資料，單日漲跌超過 15% 視為異常不採用。
- 不蒜子為第三方腳本，若該服務遭入侵可能影響頁面；如需更高安全性可改用 GoatCounter。

## 贊助按鈕設定

`index.html` 開頭有兩個設定，填入 https 網址後，右上角「贊助本站」按鈕與頁尾贊助區塊就會出現；兩個都留空則完全不顯示。

```html
<meta name="sponsor-tw" content="https://p.ecpay.com.tw/你的代碼">   <!-- 國內：綠界、Portaly 等 -->
<meta name="sponsor-intl" content="https://ko-fi.com/你的帳號">      <!-- 海外：Ko-fi 等 -->
```

只填一個時，按鈕直接開啟該連結；兩個都填時，按鈕展開選單讓訪客選擇。

(function(){
"use strict";
var UI = {
  zh:{title:"每日Hao報",sponsor:"贊助本站",sponsorTitle:"支持每日Hao報",sponsorText:"本站免費閱讀、不放廣告。如果這份報紙對你有幫助，歡迎小額贊助，支持每天持續更新。",sponsorTw:"國內贊助",sponsorTwSub:"台灣付款方式",sponsorIntl:"海外贊助",sponsorIntlSub:"PayPal／國際信用卡",sponsorPending:"贊助連結尚未設定（此提示只在預覽時顯示）",subname:"HAONICEPAPER · TAIPEI",archive:"往期回顧",archiveTitle:"近 7 日報紙",taipei:"台北",newyork:"紐約",
      sections:"國際要聞 · 國際財經 · 股市摘要",taiex:"台股加權指數",ixic:"那斯達克綜合指數",sox:"費城半導體指數",
      loading:"載入今日版面…",sources:"本期資料來源",visits:"瀏覽統計",pv:"瀏覽人次",uv:"訪客人數",
      legalTitle:"免責聲明與隱私",legal:["本站內容由 AI 自動彙整公開新聞報導，每則均附原始出處。摘要為本站改寫，原文著作權屬各媒體所有。AI 整理可能有錯誤或遺漏，請以原始報導及主管機關公告為準。","本站並非證券投資顧問事業，所有內容僅供資訊參考，不構成任何投資建議，亦非買賣任何有價證券之推介。投資前請自行判斷並承擔風險。","指數報價取自公開資料（Yahoo Finance），延遲至少 20 分鐘，可能因來源異常而暫停更新或出現誤差；收盤數字以臺灣證券交易所及各交易所公告為準。一週走勢圖中的推算值已於圖下註明。","本站與所引用之媒體、交易所及資料提供者均無合作或隸屬關係；外部連結內容由各網站自行負責。","對於使用或無法使用本站資訊所生之任何直接或間接損失，本站不負賠償責任。",
 "贊助為自願性質，不提供任何對價、投資資訊或特別服務，亦非公益捐款，無法開立捐款收據。款項由第三方支付平台處理，本站不經手也不保存任何付款資料。","隱私：本站不設會員、不蒐集個人資料。瀏覽人次由第三方服務「不蒜子」統計，字型由 Google Fonts 提供，這些服務可能記錄您的 IP 位址等連線資訊。語言與指數選擇只存在您的瀏覽器中。"],
      world:"國際要聞",finance:"國際財經",markets:"股市摘要",items:"則",lead:"頭條",
      st:{live:"交易中",pre:"盤前",post:"盤後",closed:"已收盤",off:"休市"},
      cd:function(h,m){return "美股開盤倒數 "+h+" 小時 "+m+" 分";},cdLive:"美股交易中",cdDone:"美股今日已收盤",
      noteLive:"指數每 10 分鐘自動更新，網頁每分鐘讀取一次，數字變動時會閃爍提示。報價來源 Yahoo Finance，延遲至少 20 分鐘。漲紅跌綠依台灣慣例。",
      noteSnap:"目前顯示收盤快照；部署到 GitHub Pages 後會改為每 10 分鐘自動更新。漲紅跌綠依台灣慣例。",
      asOf:"報價時間",updated:"更新於",tw:"台股",us:"美股",session:"交易日",
      range:"框線為盤中高低，實體為開盤至收盤，虛線為前一日收盤。",open:"開",high:"高",low:"低",close:"收",prev:"前收",
      turnover:"成交",breadth:"漲跌家數",up:"漲",down:"跌",flat:"平",otc:"櫃買指數",flows:"三大法人買賣超",
      investor:"法人",index:"指數",closeH:"收盤",chgH:"漲跌",pctH:"幅度",calendar:"市場行事曆",
      counterOff:"統計會在 GitHub Pages 正式網址上啟用。",counterOn:"由不蒜子統計，每次開啟頁面計一次。",
      viewing:"正在瀏覽 ",past:"（往期）",latest:"最新",
      trend:"一週走勢",segTAIEX:"台股加權",segIXIC:"那斯達克",segSOX:"費城半導體",weekChg:"一週漲跌",last:"最新",dayChg:"單日",liveTag:"盤中",table:"查看數據表",dateH:"日期",chooser:"選擇指數",noTrend:"這一期沒有走勢資料。"},
  en:{title:"HaoNicePaper",sponsor:"Support us",sponsorTitle:"Support HaoNicePaper",sponsorText:"This paper is free to read and carries no ads. If it helps you, a small contribution keeps the daily editions coming.",sponsorTw:"Support from Taiwan",sponsorTwSub:"Taiwan payment methods",sponsorIntl:"Support from abroad",sponsorIntlSub:"PayPal / international cards",sponsorPending:"Sponsor links not set yet (shown in preview only)",subname:"每日Hao報 · TAIPEI",archive:"Past editions",archiveTitle:"Last 7 days",taipei:"Taipei",newyork:"New York",
      sections:"World · Business & Finance · Markets",taiex:"TAIEX",ixic:"Nasdaq Composite",sox:"PHLX Semiconductor",
      loading:"Loading today's edition…",sources:"Sources in this edition",visits:"Readership",pv:"Page views",uv:"Visitors",
      legalTitle:"Disclaimer & privacy",legal:["Content is compiled automatically by AI from published news reports, and every item links to its original source. Summaries are written by this site; copyright in the original articles belongs to their publishers. AI compilation may contain errors or omissions, so rely on the original reports and official announcements.","This site is not a licensed investment adviser. Everything here is for information only and is not investment advice or a recommendation to buy or sell any security. Make your own decisions and bear your own risk.","Index quotes come from public data (Yahoo Finance), are delayed by at least 20 minutes, and may pause or contain errors if the source fails. Official closing values are those published by the Taiwan Stock Exchange and other exchanges. Derived values in the one-week chart are noted below it.","This site is not affiliated with any of the news outlets, exchanges or data providers it cites. Linked sites are responsible for their own content.","This site accepts no liability for any direct or indirect loss arising from use of, or inability to use, its information.",
 "Contributions are voluntary and buy no goods, investment information or special service. They are not charitable donations and no donation receipt can be issued. Payments are handled by third-party payment platforms; this site never handles or stores payment details.","Privacy: there are no accounts and no personal data is collected. Page views are counted by the third-party service Busuanzi and fonts are served by Google Fonts; these services may log connection details such as your IP address. Your language and index choices are stored only in your browser."],
      world:"World",finance:"Business & Finance",markets:"Markets",items:"stories",lead:"Top story",
      st:{live:"Open",pre:"Pre-market",post:"After hours",closed:"Closed",off:"Closed"},
      cd:function(h,m){return "US open in "+h+"h "+m+"m";},cdLive:"US market open",cdDone:"US session over",
      noteLive:"Indices refresh every 10 minutes and the page checks every minute, flashing when a number changes. Quotes from Yahoo Finance, delayed at least 20 minutes. Red = up, green = down (Taiwan convention).",
      noteSnap:"Showing closing snapshots; once deployed to GitHub Pages these refresh every 10 minutes. Red = up, green = down (Taiwan convention).",
      asOf:"As of",updated:"Updated",tw:"Taiwan",us:"US",session:"Session",
      range:"Box: intraday high–low. Bar: open to close. Dashed line: previous close.",open:"O",high:"H",low:"L",close:"C",prev:"Prev",
      turnover:"Turnover",breadth:"Advancers / decliners",up:"up",down:"down",flat:"flat",otc:"TPEx (OTC) index",flows:"Institutional net buying",
      investor:"Investor",index:"Index",closeH:"Close",chgH:"Change",pctH:"%",calendar:"Market calendar",
      counterOff:"Counts go live on the GitHub Pages address.",counterOn:"Counted by Busuanzi, once per page load.",
      viewing:"Viewing ",past:" (archive)",latest:"latest",
      trend:"One-week trend",segTAIEX:"TAIEX",segIXIC:"Nasdaq",segSOX:"SOX",weekChg:"Week change",last:"Latest",dayChg:"Day",liveTag:"intraday",table:"Show data table",dateH:"Date",chooser:"Choose index",noTrend:"No trend data in this edition."}
};
var lang = "zh", day = null, index = null, quotes = null, currentDate = null;
try { var saved = localStorage.getItem("ledger-lang"); if (saved === "en" || saved === "zh") lang = saved; } catch(e) {}

function t(k){ return UI[lang][k]; }
function L(o){ if (o == null) return ""; if (typeof o === "string") return o; return o[lang] || o.zh || ""; }
function safeUrl(u){ try { var x = new URL(String(u), location.href); return (x.protocol === "https:" || x.protocol === "http:") ? x.href : "#"; } catch(e) { return "#"; } }
var DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
function esc(s){ return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];}); }
function fmt(n,d){ if (n == null || isNaN(n)) return "—"; return Number(n).toLocaleString("en-US",{minimumFractionDigits:d==null?2:d,maximumFractionDigits:d==null?2:d}); }
function sign(n){ return n > 0 ? "+" : (n < 0 ? "−" : ""); }
function cls(n){ return n > 0 ? "up" : (n < 0 ? "down" : ""); }
function arrow(n){ return n > 0 ? "▲ " : (n < 0 ? "▼ " : ""); }

function dateLine(iso){
  var p = iso.split("-").map(Number), d = new Date(Date.UTC(p[0],p[1]-1,p[2],12));
  var wdZh = ["日","一","二","三","四","五","六"][d.getUTCDay()];
  if (lang === "zh") return "中華民國" + (p[0]-1911) + "年" + p[1] + "月" + p[2] + "日　星期" + wdZh;
  return d.toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric",timeZone:"UTC"});
}
function shortDate(iso){
  var p = iso.split("-").map(Number), d = new Date(Date.UTC(p[0],p[1]-1,p[2],12));
  if (lang === "zh") return p[1] + "/" + p[2] + "（" + ["日","一","二","三","四","五","六"][d.getUTCDay()] + "）";
  return d.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",timeZone:"UTC"});
}
function timeStr(iso){
  try {
    var d = new Date(iso);
    var s = new Intl.DateTimeFormat(lang === "zh" ? "zh-TW" : "en-US",{timeZone:"Asia/Taipei",month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:false}).format(d);
    return s + (lang === "zh" ? "（台北）" : " Taipei");
  } catch(e){ return iso; }
}
/* 標題以全形空白分段，每段整段換行，避免斷在詞中間 */
function title(o){ var s = L(o); if (lang !== "zh") return esc(s); return s.split("　").map(function(x){ return '<span class="hp">'+esc(x)+'</span>'; }).join("　"); }
function srcLinks(arr){
  return (arr||[]).map(function(s){ return '<a href="'+esc(safeUrl(s.url))+'" target="_blank" rel="noopener noreferrer">'+esc(L(s.name))+'</a>'; }).join(lang==="zh"?"、":", ");
}

/* ---------- 版面渲染 ---------- */
function renderStatic(){
  document.documentElement.lang = lang === "zh" ? "zh-Hant-TW" : "en";
  document.title = t("title");
  document.querySelectorAll("[data-i18n]").forEach(function(el){ var v = t(el.getAttribute("data-i18n")); if (typeof v === "string") el.textContent = v; });
  document.getElementById("lang-zh").setAttribute("aria-pressed", lang === "zh");
  document.getElementById("lang-en").setAttribute("aria-pressed", lang === "en");
  document.getElementById("ticker-note").textContent = (quotes && quotes.source === "live") ? t("noteLive") : t("noteSnap");
  document.getElementById("counter-note").textContent = COUNTER_ON ? t("counterOn") : t("counterOff");
  document.getElementById("legal").innerHTML = t("legal").map(function(x){ return "<li>" + esc(x) + "</li>"; }).join("");
}

function newsSection(key, items, extraCls){
  var h = '<section class="section '+extraCls+'" aria-labelledby="h-'+key+'"><div class="sec-h"><h2 id="h-'+key+'">'+t(key)+'</h2><span>'+items.length+' '+t("items")+'</span></div><div class="grid-wrap"><div class="news-grid">';
  items.forEach(function(it, i){
    var big = (key === "world" && i === 0);
    h += '<article'+(big?' class="big"':'')+'>' + (big ? '<div class="kicker">'+t("lead")+'</div>' : '') +
         '<h3>'+title(it.title)+'</h3><p>'+esc(L(it.body))+'</p><div class="src">'+srcLinks(it.sources)+'</div></article>';
  });
  return h + '</div></div></section>';
}

function rangeSVG(tw){
  var lo = Math.min(tw.low, tw.prev, tw.open), hi = Math.max(tw.high, tw.prev, tw.open);
  var step = (hi - lo) > 2500 ? 1000 : 500;
  var a = Math.floor(lo/step)*step, b = Math.ceil(hi/step)*step;
  var X = function(v){ return 20 + (v - a) / (b - a) * 320; };
  var ticks = "", n;
  for (n = a; n <= b + 1e-6; n += step){
    ticks += '<line x1="'+X(n)+'" y1="66" x2="'+X(n)+'" y2="74" stroke="var(--rule)"/><text x="'+X(n)+'" y="90" text-anchor="middle">'+fmt(n,0)+'</text>';
  }
  var up = tw.close >= tw.open, body = up ? "var(--up)" : "var(--down)";
  var x0 = Math.min(X(tw.open), X(tw.close)), w = Math.abs(X(tw.close) - X(tw.open));
  var cEnd = X(tw.close) > 260 ? "end" : "start";
  return '<svg viewBox="0 0 360 116" role="img" aria-label="'+t("open")+' '+fmt(tw.open)+' '+t("high")+' '+fmt(tw.high)+' '+t("low")+' '+fmt(tw.low)+' '+t("close")+' '+fmt(tw.close)+'">' +
    '<g font-family="Noto Sans TC, sans-serif" font-size="10" fill="var(--ink-soft)"><line x1="20" y1="70" x2="340" y2="70" stroke="var(--rule)"/>'+ticks+'</g>' +
    '<rect x="'+X(tw.low)+'" y="62" width="'+(X(tw.high)-X(tw.low))+'" height="16" fill="var(--tint)" stroke="var(--ink)"/>' +
    '<rect x="'+x0+'" y="62" width="'+Math.max(w,1.5)+'" height="16" fill="'+body+'" opacity=".85"/>' +
    '<line x1="'+X(tw.prev)+'" y1="50" x2="'+X(tw.prev)+'" y2="80" stroke="var(--ink)" stroke-width="1.5" stroke-dasharray="3 2"/>' +
    '<g font-family="Noto Sans TC, sans-serif" font-size="10.5" fill="var(--ink)">' +
      '<text x="'+X(tw.prev)+'" y="45" text-anchor="end">'+t("prev")+' '+fmt(tw.prev,0)+'</text>' +
      '<text x="'+X(tw.open)+'" y="28" text-anchor="middle">'+t("open")+' '+fmt(tw.open,0)+'</text>' +
      '<line x1="'+X(tw.open)+'" y1="32" x2="'+X(tw.open)+'" y2="62" stroke="var(--ink-soft)" stroke-width=".8"/>' +
      '<text x="'+X(tw.close)+'" y="28" text-anchor="'+cEnd+'" font-weight="600" fill="'+body+'">'+t("close")+' '+fmt(tw.close,0)+'</text>' +
      '<line x1="'+X(tw.close)+'" y1="32" x2="'+X(tw.close)+'" y2="62" stroke="'+body+'"/>' +
      '<text x="'+X(tw.low)+'" y="108" text-anchor="start" fill="var(--ink-soft)">'+t("low")+' '+fmt(tw.low,0)+'</text>' +
      '<text x="'+X(tw.high)+'" y="108" text-anchor="end" fill="var(--ink-soft)">'+t("high")+' '+fmt(tw.high,0)+'</text>' +
    '</g></svg>';
}

function marketsSection(m){
  var tw = m.tw, us = m.us;
  var h = '<section class="section markets" aria-labelledby="h-markets"><div class="sec-h"><h2 id="h-markets">'+t("markets")+'</h2><span>'+t("tw")+' '+shortDate(tw.session)+' · '+t("us")+' '+shortDate(us.session)+'</span></div>';
  if (m.week) {
    h += '<div class="trend"><div class="trend-head"><h3 id="trend-title">'+t("trend")+'</h3><span class="seg" role="group" aria-label="'+t("chooser")+'">';
    TREND_SYMS.forEach(function(x){ h += '<button type="button" data-sym="'+x[0]+'" aria-pressed="'+(x[0]===trendSym)+'">'+t("seg"+x[0])+'</button>'; });
    h += '</span></div><div class="trend-sum num" id="trend-sum"></div><div class="trend-plot" id="trend-plot" aria-describedby="trend-title"></div><div class="tip" id="trend-tip"></div>' +
         '<div class="src">'+esc(L(m.week_note))+' '+srcLinks(m.week_sources)+'</div><details><summary>'+t("table")+'</summary><div id="trend-table"></div></details></div>';
  }
  h += '<div class="grid-wrap"><div class="mkt-grid">';
  // 欄一：台股
  h += '<div><h3>'+title(tw.headline)+'</h3>' +
       '<div class="stat-row num"><span>'+t("taiex")+' <b class="'+cls(tw.change)+'">'+fmt(tw.close)+'</b></span><span class="'+cls(tw.change)+'">'+arrow(tw.change)+fmt(Math.abs(tw.change))+'　'+sign(tw.pct)+fmt(Math.abs(tw.pct))+'%</span><span>'+t("turnover")+' '+esc(L(tw.turnover))+'</span></div>' +
       '<div class="range">'+rangeSVG(tw)+'</div><div class="figcap">'+t("range")+'</div>' +
       '<p>'+esc(L(tw.body))+'</p><div class="src">'+srcLinks(tw.sources)+'</div></div>';
  // 欄二：籌碼
  h += '<div><div class="sub-h">'+t("flows")+'（'+esc(L(tw.flows_unit))+'）</div><table class="t num"><thead><tr><th>'+t("investor")+'</th><th>'+shortDate(tw.session)+'</th></tr></thead><tbody>';
  tw.flows.forEach(function(f){ h += '<tr'+(f.total?' class="total"':'')+'><td>'+esc(L(f.name))+'</td><td class="'+cls(f.value)+'">'+sign(f.value)+fmt(Math.abs(f.value))+'</td></tr>'; });
  h += '</tbody></table><p class="src" style="font-size:12.5px">'+esc(L(tw.flows_note))+'</p>';
  if (tw.otc) h += '<div class="sub-h">'+t("otc")+'</div><div class="stat-row num"><b class="'+cls(tw.otc.change)+'">'+fmt(tw.otc.close)+'</b><span class="'+cls(tw.otc.change)+'">'+arrow(tw.otc.change)+fmt(Math.abs(tw.otc.change))+'　'+sign(tw.otc.pct)+fmt(Math.abs(tw.otc.pct))+'%</span></div>';
  if (tw.breadth) h += '<div class="sub-h">'+t("breadth")+'</div><div class="stat-row num"><span class="up">'+t("up")+' <b class="up">'+fmt(tw.breadth.up,0)+'</b></span><span class="down">'+t("down")+' <b class="down">'+fmt(tw.breadth.down,0)+'</b></span><span>'+t("flat")+' <b>'+fmt(tw.breadth.flat,0)+'</b></span></div>';
  h += '</div>';
  // 欄三：美股與行事曆
  h += '<div><h3>'+title(us.headline)+'</h3><table class="t num"><thead><tr><th>'+t("index")+'</th><th>'+t("closeH")+'</th><th>'+t("chgH")+'</th><th>'+t("pctH")+'</th></tr></thead><tbody>';
  us.rows.forEach(function(r){ h += '<tr><td>'+esc(L(r.name))+'</td><td>'+fmt(r.close)+'</td><td class="'+cls(r.change)+'">'+(r.change==null?'':sign(r.change)+fmt(Math.abs(r.change)))+'</td><td class="'+cls(r.pct)+'">'+sign(r.pct)+fmt(Math.abs(r.pct))+'%</td></tr>'; });
  h += '</tbody></table><p>'+esc(L(us.body))+'</p><div class="src">'+srcLinks(us.sources)+'</div>';
  if (m.calendar && m.calendar.length){
    h += '<div class="box"><h4>'+t("calendar")+'</h4><ol class="num">';
    m.calendar.forEach(function(c){ h += '<li><span class="t">'+esc(L(c.time))+'</span>'+esc(L(c.text))+'</li>'; });
    h += '</ol><div class="src" style="margin-top:4px">'+srcLinks(m.calendar_sources)+'</div></div>';
  }
  h += '</div></div></div></section>';
  return h;
}

function renderDay(){
  if (!day) return;
  document.getElementById("dateline").textContent = dateLine(day.date);
  var isLatest = index && index.latest === day.date;
  document.getElementById("edition").textContent = L(day.edition) + (isLatest ? "" : t("past"));
  document.getElementById("updated").textContent = t("updated") + " " + timeStr(day.updated);
  document.getElementById("content").innerHTML =
    newsSection("world", day.world, "world") + newsSection("finance", day.finance, "finance") + marketsSection(day.markets);
  // 資料來源彙整（依網址去重）
  var seen = {}, list = [];
  function add(arr){ (arr||[]).forEach(function(s){ if (!seen[s.url]) { seen[s.url] = 1; list.push(s); } }); }
  day.world.forEach(function(i){ add(i.sources); }); day.finance.forEach(function(i){ add(i.sources); });
  add(day.markets.tw.sources); add(day.markets.us.sources); add(day.markets.calendar_sources); add(day.markets.week_sources);
  drawTrend();
  document.getElementById("srclist").innerHTML = list.map(function(s){ return '<li><a href="'+esc(safeUrl(s.url))+'" target="_blank" rel="noopener noreferrer">'+esc(L(s.name))+'</a></li>'; }).join("");
}

function renderArchive(){
  if (!index) return;
  var ul = document.getElementById("archive-list");
  ul.innerHTML = index.days.filter(function(d){ return DATE_RE.test(d.date); }).slice(0,7).map(function(d){
    return '<li><button type="button" data-date="'+d.date+'"'+(d.date===currentDate?' aria-current="true"':'')+'><span class="d">'+shortDate(d.date)+(d.date===index.latest?' · '+t("latest"):'')+'</span><span class="s">'+esc(L(d.summary))+'</span></button></li>';
  }).join("");
}

function renderAll(){ renderStatic(); renderSponsor(); renderDay(); renderArchive(); renderQuotes(false); tick(); }

/* ---------- 資料載入 ---------- */
function getJSON(url){ return fetch(url, {cache:"no-store"}).then(function(r){ if (!r.ok) throw new Error(r.status); return r.json(); }); }

function loadDay(date){
  if (!DATE_RE.test(date)) return Promise.reject(new Error("bad date"));
  return getJSON("data/news/" + date + ".json").then(function(d){
    day = d; currentDate = date; renderDay(); renderArchive();
    try { if (date === index.latest) { if (location.hash) history.replaceState(null, "", location.pathname + location.search); } else { location.hash = "d-" + date; } } catch(e) {}
    window.scrollTo(0, 0);
  });
}
function dateFromHash(){ var m = /^#d-(\d{4}-\d{2}-\d{2})$/.exec(location.hash || ""); return m ? m[1] : null; }

/* ---------- 跳動報價 ---------- */
var COUNTER_ON = false;
function meta(n){ var m = document.querySelector('meta[name="'+n+'"]'); return m ? (m.content || "").trim() : ""; }
var SITE_REPO = meta("site-repo"), SITE_DOMAIN = meta("site-domain").toLowerCase();
function onProdHost(){ var h = location.hostname.toLowerCase(); return /\.github\.io$/.test(h) || (SITE_DOMAIN && (h === SITE_DOMAIN || h === "www." + SITE_DOMAIN)); }
function quotesURL(){
  var host = location.hostname;
  if (SITE_REPO && onProdHost()) return "https://raw.githubusercontent.com/" + SITE_REPO + "/quotes/quotes.json?t=" + Math.floor(Date.now()/60000);
  if (/\.github\.io$/.test(host)) {
    var owner = host.split(".")[0], seg = location.pathname.split("/").filter(Boolean)[0];
    var repo = seg && !/\.html?$/.test(seg) ? seg : host;
    return "https://raw.githubusercontent.com/" + owner + "/" + repo + "/quotes/quotes.json?t=" + Math.floor(Date.now()/60000);
  }
  return null;
}
function loadQuotes(first){
  var remote = quotesURL();
  var p = remote ? getJSON(remote).catch(function(){ return getJSON("data/quotes.json"); }) : getJSON("data/quotes.json");
  return p.then(function(q){ var old = quotes; quotes = q; renderQuotes(!first, old); renderStatic(); drawTrend(); }).catch(function(){});
}
function animateNumber(el, from, to){
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || from == null || from === to) { el.textContent = fmt(to); return; }
  var t0 = performance.now(), dur = 700;
  function step(now){ var k = Math.min(1, (now - t0) / dur); k = 1 - Math.pow(1 - k, 3); el.textContent = fmt(from + (to - from) * k); if (k < 1) requestAnimationFrame(step); }
  requestAnimationFrame(step);
}
function renderQuotes(animate, old){
  if (!quotes) return;
  document.querySelectorAll(".quote").forEach(function(box){
    var sym = box.getAttribute("data-sym"), q = quotes.items[sym]; if (!q) return;
    var prev = old && old.items && old.items[sym] ? old.items[sym].price : null;
    var pv = box.querySelector('[data-f="price"]'), ch = box.querySelector('[data-f="chg"]');
    if (animate && prev != null && prev !== q.price) {
      animateNumber(pv, prev, q.price);
      pv.classList.remove("flash-up","flash-down"); void pv.offsetWidth;
      pv.classList.add(q.price > prev ? "flash-up" : "flash-down");
      setTimeout(function(){ pv.classList.remove("flash-up","flash-down"); }, 900);
    } else { pv.textContent = fmt(q.price); }
    ch.className = "q-chg num " + cls(q.change);
    ch.textContent = arrow(q.change) + fmt(Math.abs(q.change)) + "　" + sign(q.pct) + fmt(Math.abs(q.pct)) + "%";
    box.querySelector('[data-f="time"]').textContent = t("asOf") + " " + timeStr(q.time);
  });
}

/* ---------- 一週走勢圖 ---------- */
var TREND_SYMS = [["TAIEX","taiex","Asia/Taipei"],["IXIC","ixic","America/New_York"],["SOX","sox","America/New_York"]];
var trendSym = "TAIEX";
try { var ts = localStorage.getItem("ledger-trend"); if (ts && TREND_SYMS.some(function(x){ return x[0] === ts; })) trendSym = ts; } catch(e) {}
function trendSeries(sym){
  var w = day && day.markets && day.markets.week && day.markets.week[sym];
  if (!w) return [];
  var pts = w.map(function(p){ return {d:p[0], v:p[1], live:false}; });
  var q = quotes && quotes.items && quotes.items[sym];
  var viewingLatest = index && currentDate === index.latest;
  if (q && quotes.source === "live" && viewingLatest && pts.length) {
    var tz = TREND_SYMS.filter(function(x){ return x[0] === sym; })[0][2];
    var qd = new Intl.DateTimeFormat("en-CA",{timeZone:tz,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(q.time));
    var last = pts[pts.length-1];
    if (qd > last.d) { pts.push({d:qd, v:q.price, live:true}); if (pts.length > 6) pts.shift(); }
  }
  return pts;
}
function niceStep(range, n){ var raw = range / n, p = Math.pow(10, Math.floor(Math.log10(raw))), f = raw / p; return (f < 1.5 ? 1 : f < 3 ? 2 : f < 7 ? 5 : 10) * p; }
function drawTrend(){
  var host = document.getElementById("trend-plot"); if (!host) return;
  document.querySelectorAll(".seg button").forEach(function(b){ b.setAttribute("aria-pressed", b.getAttribute("data-sym") === trendSym); });
  var pts = trendSeries(trendSym), sumEl = document.getElementById("trend-sum"), tip = document.getElementById("trend-tip");
  tip.style.display = "none";
  if (pts.length < 2) { host.innerHTML = '<p class="src">'+t("noTrend")+'</p>'; sumEl.innerHTML = ""; return; }
  var first = pts[0].v, lastP = pts[pts.length-1], wc = lastP.v - first, wp = wc / first * 100;
  var name = t(TREND_SYMS.filter(function(x){ return x[0] === trendSym; })[0][1]);
  sumEl.innerHTML = '<span>'+esc(name)+' '+t("last")+' <b>'+fmt(lastP.v)+'</b>'+(lastP.live?' （'+t("liveTag")+'）':'')+'</span><span>'+t("weekChg")+' <b class="'+cls(wc)+'">'+sign(wc)+fmt(Math.abs(wc))+'</b> <span class="'+cls(wc)+'">'+sign(wp)+fmt(Math.abs(wp))+'%</span></span><span>'+shortDate(pts[0].d)+' – '+shortDate(lastP.d)+'</span>';
  var W = Math.max(300, host.clientWidth || 600), H = W < 520 ? 220 : 250;
  var narrow = W < 520, mL = narrow ? 46 : 58, mR = narrow ? 70 : 92, mT = 22, mB = 30;
  var xl = function(d){ if (!narrow) return shortDate(d); var q = d.split('-'); return Number(q[1]) + '/' + Number(q[2]); };
  var vals = pts.map(function(p){ return p.v; }), lo = Math.min.apply(null, vals), hi = Math.max.apply(null, vals);
  var pad = (hi - lo) * 0.12 || hi * 0.01, step = niceStep(hi - lo + 2*pad, 4);
  var y0 = Math.floor((lo - pad) / step) * step, y1 = Math.ceil((hi + pad) / step) * step;
  var X = function(i){ return mL + 18 + i * (W - mL - mR - 36) / (pts.length - 1); };
  var Y = function(v){ return mT + (y1 - v) / (y1 - y0) * (H - mT - mB); };
  var g = '', v;
  for (v = y0; v <= y1 + 1e-6; v += step) {
    g += '<line x1="'+mL+'" x2="'+(W - mR + 20)+'" y1="'+Y(v)+'" y2="'+Y(v)+'" stroke="var(--rule)" stroke-width="1"'+(v===y0?'':' stroke-dasharray="2 3"')+'/>' +
         '<text x="'+(mL - 6)+'" y="'+(Y(v)+4)+'" text-anchor="end" font-size="11" fill="var(--ink-soft)">'+fmt(v,0)+'</text>';
  }
  var line = '', area = '';
  pts.forEach(function(p, i){ line += (i ? 'L' : 'M') + X(i).toFixed(1) + ' ' + Y(p.v).toFixed(1); });
  area = line + 'L' + X(pts.length-1).toFixed(1) + ' ' + Y(y0) + 'L' + X(0).toFixed(1) + ' ' + Y(y0) + 'Z';
  var dots = '', labels = '';
  pts.forEach(function(p, i){
    var end = i === pts.length - 1;
    dots += '<circle cx="'+X(i)+'" cy="'+Y(p.v)+'" r="'+(end?5.5:4)+'" fill="'+(p.live?'var(--paper)':'var(--accent)')+'" stroke="'+(p.live?'var(--accent)':'var(--paper)')+'" stroke-width="2"/>';
    labels += '<text x="'+X(i)+'" y="'+(H - 8)+'" text-anchor="middle" font-size="11.5" fill="var(--ink-soft)">'+esc(xl(p.d))+(p.live?' '+t("liveTag"):'')+'</text>';
  });
  var e = pts.length - 1;
  var endLabel = '<text x="'+(X(e) + 10)+'" y="'+(Y(lastP.v) + 4)+'" font-size="13" font-weight="600" fill="var(--ink)" font-family="Source Serif 4, serif">'+fmt(lastP.v)+'</text>';
  var liveSeg = lastP.live ? '<path d="M'+X(e-1)+' '+Y(pts[e-1].v)+'L'+X(e)+' '+Y(lastP.v)+'" stroke="var(--paper)" stroke-width="2.5" stroke-dasharray="3 3" fill="none"/>' : '';
  host.innerHTML = '<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+esc(name+' '+t("trend")+' '+t("weekChg")+' '+sign(wp)+fmt(Math.abs(wp))+'%')+'" font-family="Noto Sans TC, sans-serif">' +
    '<defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--accent)" stop-opacity=".16"/><stop offset="1" stop-color="var(--accent)" stop-opacity="0"/></linearGradient></defs>' +
    g + '<path d="'+area+'" fill="url(#tg)"/><path d="'+line+'" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>' + liveSeg +
    '<line id="tx" x1="0" x2="0" y1="'+mT+'" y2="'+(H - mB)+'" stroke="var(--ink-soft)" stroke-width="1" visibility="hidden"/>' +
    dots + endLabel + labels +
    '<rect x="0" y="0" width="'+W+'" height="'+H+'" fill="transparent" id="thit"/></svg>';
  // 數據表
  var tb = '<table class="t num"><thead><tr><th>'+t("dateH")+'</th><th>'+t("closeH")+'</th><th>'+t("dayChg")+'</th></tr></thead><tbody>';
  pts.forEach(function(p, i){ var c = i ? p.v - pts[i-1].v : null; tb += '<tr><td>'+esc(shortDate(p.d))+(p.live?' '+t("liveTag"):'')+'</td><td>'+fmt(p.v)+'</td><td class="'+(c==null?'':cls(c))+'">'+(c==null?'—':sign(c)+fmt(Math.abs(c)))+'</td></tr>'; });
  document.getElementById("trend-table").innerHTML = tb + '</tbody></table>';
  // 十字線與提示
  var svg = host.querySelector("svg"), cross = svg.querySelector("#tx");
  function show(evt){
    var r = svg.getBoundingClientRect(), sx = (evt.clientX - r.left) * W / r.width, best = 0, bd = 1e9;
    pts.forEach(function(p, i){ var d = Math.abs(X(i) - sx); if (d < bd) { bd = d; best = i; } });
    var p = pts[best], c = best ? p.v - pts[best-1].v : null, cp = best ? c / pts[best-1].v * 100 : null;
    cross.setAttribute("x1", X(best)); cross.setAttribute("x2", X(best)); cross.setAttribute("visibility", "visible");
    tip.innerHTML = esc(shortDate(p.d)) + (p.live ? ' · '+t("liveTag") : '') + '<br><b>'+fmt(p.v)+'</b>' + (c==null ? '' : ' <span class="'+cls(c)+'">'+sign(c)+fmt(Math.abs(c))+'（'+sign(cp)+fmt(Math.abs(cp))+'%）</span>');
    var px = X(best) * r.width / W, py = Y(p.v) * r.height / H;
    tip.style.display = "block";
    var tw = tip.offsetWidth, hostW = host.clientWidth;
    tip.style.left = Math.min(Math.max(px, tw/2 + 4), hostW - tw/2 - 4) + "px";
    tip.style.top = (host.offsetTop + py - 12) + "px";
  }
  function hide(){ cross.setAttribute("visibility","hidden"); tip.style.display = "none"; }
  var hit = svg.querySelector("#thit");
  hit.addEventListener("pointermove", show); hit.addEventListener("pointerdown", show); hit.addEventListener("pointerleave", hide);
}
document.addEventListener("click", function(e){
  var b = e.target.closest(".seg button[data-sym]"); if (!b) return;
  trendSym = b.getAttribute("data-sym"); try { localStorage.setItem("ledger-trend", trendSym); } catch(err) {}
  drawTrend();
});
var rsz = null; window.addEventListener("resize", function(){ clearTimeout(rsz); rsz = setTimeout(drawTrend, 150); });

/* ---------- 時鐘與交易狀態 ---------- */
function parts(tz){
  var o = {};
  new Intl.DateTimeFormat("en-US",{timeZone:tz,hour12:false,weekday:"short",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date()).forEach(function(p){ o[p.type] = p.value; });
  var h = parseInt(o.hour,10) % 24, m = parseInt(o.minute,10), s = parseInt(o.second,10);
  return {wd:o.weekday, mins:h*60+m, s:s, hm:(h<10?"0":"")+h+":"+(m<10?"0":"")+m};
}
function wk(wd){ return ["Mon","Tue","Wed","Thu","Fri"].indexOf(wd) !== -1; }
function tick(){
  var tp = parts("Asia/Taipei"), ny = parts("America/New_York"), st = t("st");
  document.getElementById("clk-tpe").textContent = tp.hm;
  document.getElementById("clk-ny").textContent = ny.hm;
  var tw = (wk(tp.wd) && tp.mins >= 540 && tp.mins < 810) ? ["live", st.live] : ["", st.closed];
  var us;
  if (!wk(ny.wd)) us = ["", st.off];
  else if (ny.mins >= 570 && ny.mins < 960) us = ["live", st.live];
  else if (ny.mins >= 240 && ny.mins < 570) us = ["pre", st.pre];
  else if (ny.mins >= 960 && ny.mins < 1200) us = ["pre", st.post];
  else us = ["", st.off];
  document.querySelectorAll("[data-chip]").forEach(function(c){ var v = c.getAttribute("data-chip") === "tw" ? tw : us; c.className = "chip" + (v[0] ? " " + v[0] : ""); c.textContent = v[1]; });
  var cd = document.getElementById("countdown");
  if (wk(ny.wd) && ny.mins < 570) { var left = 570*60 - (ny.mins*60 + ny.s); var hh = Math.floor(left/3600), mm = Math.floor((left%3600)/60); cd.textContent = t("cd")(hh, (mm<10?"0":"")+mm); }
  else if (us[0] === "live") cd.textContent = t("cdLive");
  else cd.textContent = t("cdDone");
}

/* ---------- 往期按鈕：捲動時自動隱藏、點外面或閒置自動收合 ---------- */
var arc = document.getElementById("archive"), arcBtn = document.getElementById("archive-btn"), idleTimer = null, lastY = 0;
function setOpen(o){ arc.classList.toggle("open", o); arcBtn.setAttribute("aria-expanded", o); if (o) arc.classList.remove("hidden"); armIdle(); }
function armIdle(){ clearTimeout(idleTimer); if (arc.classList.contains("open")) idleTimer = setTimeout(function(){ setOpen(false); }, 6000); }
arcBtn.addEventListener("click", function(e){ e.stopPropagation(); setOpen(!arc.classList.contains("open")); });
arc.addEventListener("mousemove", armIdle);
document.addEventListener("click", function(e){ if (!arc.contains(e.target)) setOpen(false); });
document.addEventListener("keydown", function(e){ if (e.key === "Escape") setOpen(false); });
document.getElementById("archive-list").addEventListener("click", function(e){
  var b = e.target.closest("button[data-date]"); if (!b) return;
  setOpen(false); loadDay(b.getAttribute("data-date"));
});
window.addEventListener("scroll", function(){
  var y = window.scrollY || 0;
  if (!arc.classList.contains("open")) arc.classList.toggle("hidden", y > 120 && y > lastY);
  lastY = y;
}, {passive:true});

/* ---------- 語言切換 ---------- */
function setLang(l){ lang = l; try { localStorage.setItem("ledger-lang", l); } catch(e) {} renderAll(); }
document.getElementById("lang-zh").addEventListener("click", function(){ setLang("zh"); });
document.getElementById("lang-en").addEventListener("click", function(){ setLang("en"); });
window.addEventListener("hashchange", function(){ var d = dateFromHash() || (index && index.latest); if (d && d !== currentDate) loadDay(d); });

/* ---------- 瀏覽人次（只在 GitHub Pages 正式網址載入） ---------- */
if (onProdHost()) {
  COUNTER_ON = true;
  var s = document.createElement("script"); s.async = true; s.src = "https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"; document.body.appendChild(s);
}

/* ---------- 贊助按鈕 ---------- */
var SPONSORS = [["sponsor-tw","sponsorTw","sponsorTwSub"],["sponsor-intl","sponsorIntl","sponsorIntlSub"]]
  .map(function(x){ var u = meta(x[0]); return u && safeUrl(u) !== "#" && /^https:/.test(u) ? {url:safeUrl(u), k:x[1], sub:x[2]} : null; })
  .filter(Boolean);
var SPONSOR_PREVIEW = !onProdHost() && SPONSORS.length === 0;
function renderSponsor(){
  var top = document.getElementById("sponsor-top"), box = document.getElementById("sponsor-box");
  if (!SPONSORS.length && !SPONSOR_PREVIEW) { top.hidden = true; box.hidden = true; return; }
  top.hidden = false; box.hidden = false;
  var items = SPONSORS.map(function(s){ return '<a role="menuitem" href="'+esc(s.url)+'" target="_blank" rel="noopener noreferrer">'+esc(t(s.k))+'<small>'+esc(t(s.sub))+'</small></a>'; }).join("");
  document.getElementById("sponsor-menu-top").innerHTML = items || '<span>'+esc(t("sponsorPending"))+'</span>';
  document.getElementById("sponsor-links").innerHTML = SPONSORS.map(function(s){ return '<a href="'+esc(s.url)+'" target="_blank" rel="noopener noreferrer">'+esc(t(s.k))+'<small>'+esc(t(s.sub))+'</small></a>'; }).join("") || '<span class="pending">'+esc(t("sponsorPending"))+'</span>';
}
(function(){
  var wrap = document.getElementById("sponsor-top"), btn = wrap.querySelector(".sponsor-btn");
  btn.addEventListener("click", function(e){
    e.stopPropagation();
    if (SPONSORS.length === 1) { window.open(SPONSORS[0].url, "_blank", "noopener,noreferrer"); return; }
    var o = !wrap.classList.contains("open"); wrap.classList.toggle("open", o); btn.setAttribute("aria-expanded", o);
  });
  document.addEventListener("click", function(e){ if (!wrap.contains(e.target)) { wrap.classList.remove("open"); btn.setAttribute("aria-expanded", false); } });
  document.addEventListener("keydown", function(e){ if (e.key === "Escape") { wrap.classList.remove("open"); btn.setAttribute("aria-expanded", false); } });
})();

/* ---------- 啟動 ---------- */
renderStatic(); renderSponsor(); tick(); setInterval(tick, 15000);
loadQuotes(true); setInterval(function(){ loadQuotes(false); }, 60000);
getJSON("data/news/index.json").then(function(ix){
  index = ix;
  var want = dateFromHash();
  var ok = want && ix.days.some(function(d){ return d.date === want; });
  return loadDay(ok ? want : ix.latest);
}).catch(function(){
  document.getElementById("content").innerHTML = '<div class="loading">' + (lang==="zh" ? "今日版面暫時無法載入，請稍後重新整理。" : "Today's edition could not be loaded. Please refresh in a moment.") + '</div>';
});
})();

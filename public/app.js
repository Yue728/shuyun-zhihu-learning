const cachedSources = [
  { id: "visual", kind: "形象解释", tone: "blue", title: "一文搞定初中函数，破解函数天花板", excerpt: "把函数理解成输入与输出的盒子，把斜率理解成变化的节奏。", author: "男色图鉴", meta: "知乎文章 · 相关度 89", date: "2022-10-17", url: "https://zhuanlan.zhihu.com/p/574110792" },
  { id: "confusion", kind: "真实困惑", tone: "violet", title: "一次函数中 k>0 还是 k<0，我总是记混怎么办？", excerpt: "学生常把 b 的正负与图像增减方向混在一起，也会忽略 x 的增加方向。", author: "社区提问", meta: "知乎问题 · 高频困惑", date: "2024-05-20", url: "https://www.zhihu.com/question/283458943" },
  { id: "practice", kind: "教学经验", tone: "green", title: "别把“粗心”当作一个错因", excerpt: "概念边界、条件扫描和书写动作，是三种需要不同训练方式的问题。", author: "梯方教育", meta: "知乎文章 · 教学实践", date: "2026-09-08", url: "https://zhuanlan.zhihu.com/p/2079604636500103534" },
];
let sources = [...cachedSources];

const explanations = {
  visual: { title: "从图像变化看增减性", body: "当 x 从左向右增加时，k>0 表示 y 同向增加，直线向右上方延伸；k<0 表示 y 反向减少，直线向右下方延伸。", note: "先固定 x 的增加方向，再观察 y 的变化，避免靠口诀猜方向。" },
  analogy: { title: "把斜率想成走路的坡度", body: "把 x 想成向右走的每一步，把 y 想成高度。k=2 是每向右一步上升 2；k=-2 是每向右一步下降 2，所以负斜率像一段下坡路。", note: "k 表示“每走 1 个单位，y 改变多少”，正负号表示变化方向。" },
  counter: { title: "用反例拆掉错误直觉", body: "b 只决定直线与 y 轴在哪里相交。y=-2x+100 的 b 虽然很大，但 k<0，图像仍向右下降，因此不能用 b 判断增减性。", note: "改变 b，只会让直线上下平移，不会改变它上升还是下降。" },
};

const state = { view: "forge", selectedSource: "visual", sourceFilter: "all", pipeline: 2, explanationMode: "visual", confirmed: false, studentMode: "analogy", studentAnswer: "", studentResult: "", toast: "", liveQuery: "一次函数 斜率 截距 常见错误 教学", liveStatus: "idle", liveMessage: "点击同步，获取知乎当前真实内容" };
const navItems = [["forge","知识炼金台","flask"],["assets","课程资产","book"],["path","学习路径","nodes"],["diagnosis","诊断与变式","file"],["review","学情复盘","chart"]];

function icon(name, size = 18) {
  const p = {
    flask:'<path d="M9 3h6M10 3v5l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/><path d="M8 14h8"/>',
    book:'<path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22V5.5Z"/><path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22V5.5Z"/>',
    nodes:'<circle cx="5" cy="12" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="19" cy="12" r="2"/><path d="m7 11 3.5-4.5M13.5 6.5 17 11M7 13h10"/>',
    file:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/>',
    chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>', spark:'<path d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4L12 3Z"/>',
    external:'<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"/>',
    check:'<path d="m5 12 4 4L19 6"/>', arrow:'<path d="M5 12h14M14 7l5 5-5 5"/>', phone:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    link:'<path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.1-1.1"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>', rotate:'<path d="M20 7v5h-5"/><path d="M19 12a7 7 0 1 0-2 5"/>', back:'<path d="m15 18-6-6 6-6"/>'
  };
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true">${p[name] || p.spark}</svg>`;
}

function esc(value = "") { return String(value).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[c]); }
function safeUrl(value = "") { try { const url = new URL(value); return /(^|\.)zhihu\.com$/.test(url.hostname) ? url.href : "https://www.zhihu.com/"; } catch { return "https://www.zhihu.com/"; } }

function render() { document.querySelector("#app").innerHTML = state.view === "student" ? renderStudent() : renderShell(); bindEvents(); }
function pageTitle() { return ({forge:"一次函数 · 第 3 课",assets:"课程资产",path:"学习路径",diagnosis:"诊断与变式",review:"学情复盘"})[state.view] || "数蕴"; }
function renderShell() {
  return `<div class="app-shell"><aside class="sidebar"><div class="brand"><img src="./assets/shuyun-icon.svg" alt=""><div><strong>数蕴</strong><span>让好的教育认知<br>在课堂发生</span></div></div><nav>${navItems.map(([id,label,ico])=>`<button class="nav-item ${state.view===id?"active":""}" data-view="${id}">${icon(ico)}<span>${label}</span></button>`).join("")}</nav><div class="curve-mark"><svg viewBox="0 0 180 180"><path d="M0 166 C48 155 112 118 170 18"/><circle cx="170" cy="18" r="4"/></svg><p>从真实的教育问题<br>走向更好的数学课堂</p></div></aside><main class="workspace"><header class="topbar"><div><h1>${pageTitle()}</h1><p>人教版 · 八年级上册 · 第五章 · 一次函数</p></div><div class="top-actions"><button class="quiet" data-view="student">${icon("phone")}学生端体验</button><button class="primary" data-action="generate">${icon("nodes")}生成学习路径</button></div></header>${renderView()}</main>${state.toast?`<div class="toast">${icon("check")} ${state.toast}</div>`:""}</div>`;
}
function renderView() { return ({forge:renderForge,assets:renderAssets,path:renderPath,diagnosis:renderDiagnosis,review:renderReview})[state.view](); }

function renderForge() {
  const filtered = state.sourceFilter === "all" ? sources : sources.filter(s=>s.id===state.sourceFilter);
  const source = sources.find(s=>s.id===state.selectedSource);
  const exp = explanations[state.explanationMode];
  const mistakes = [["混淆 k 的正负与图像方向","把 k>0 记成图像下降，或把 k<0 记成上升。"],["忽略自变量的增加方向","没有意识到“从左向右”对应 x 的增大。"],["只看 b，不看 k","比较两条直线时，只关注截距而忽略斜率。"]];
  return `<section class="forge-grid"><section class="source-panel pane"><div class="pane-heading"><h2>知乎认知源</h2><p>来自真实教师、学生与专业答主的讨论</p></div><div class="live-search"><label for="zhihu-query">真实 API 检索</label><div><input id="zhihu-query" value="${esc(state.liveQuery)}" data-live-query maxlength="80"><button data-action="live-search" ${state.liveStatus==="loading"?"disabled":""}>${state.liveStatus==="loading"?"同步中…":"同步知乎"}</button></div><p class="live-status ${state.liveStatus}"><i></i>${esc(state.liveMessage)}</p></div><div class="filter-row">${[["all",`全部 ${sources.length}`],["visual","形象解释"],["confusion","真实困惑"],["practice","教学经验"]].map(([id,label])=>`<button class="filter ${state.sourceFilter===id?"active":""}" data-filter="${id}">${label}</button>`).join("")}</div><div class="source-list">${filtered.map(s=>`<button class="source-card ${state.selectedSource===s.id?"selected":""}" data-source="${esc(s.id)}"><span class="source-kind ${esc(s.tone)}">${esc(s.kind)}</span><strong>${esc(s.title)}</strong><p>${esc(s.excerpt)}</p><footer><span>${esc(s.meta)}</span><time>${esc(s.date)}</time></footer></button>`).join("")}</div><div class="source-trust"><b>${icon("search")}筛选原则</b><p>相关性 × 作者可信度 × 教材一致性 × 教师采纳</p></div></section>
  <section class="alchemy-panel pane"><div class="pane-heading"><h2>知识炼金</h2><p>把社区智慧转化为可落地的教学内容</p></div><div class="pipeline">${["检索","对齐教材","提炼认知","教师确认"].map((label,i)=>`<button class="pipe-step ${state.pipeline===i?"active":state.pipeline>i?"done":""}" data-pipeline="${i}"><span>${state.pipeline>i?icon("check",14):i+1}</span><b>${label}</b><small>${["找到优质观点","匹配课程标准","形成教学内容","完善并入库"][i]}</small></button>`).join("")}</div><article class="processing-source"><div><span>当前处理的来源</span><h3>${esc(source.title)}</h3><p>${esc(source.author)} · ${esc(source.meta)}</p></div><a href="${safeUrl(source.url)}" target="_blank" rel="noreferrer">${icon("external")}查看原文</a></article><article class="alignment"><div class="section-title"><h3>对齐教材</h3><span>已匹配 2 条课程标准</span></div><div class="standard-head">人教版　八年级上册　第五章 一次函数</div><div class="standard-row"><b>5.1.1</b><span>理解一次函数概念，能根据解析式画出图像。</span></div><div class="standard-row"><b>5.1.2</b><span>理解 k 和 b 对图像与性质的影响。</span></div></article><article class="editor"><div class="section-title"><h3>提炼认知 <small>可编辑</small></h3><button>${icon("spark")}AI 提炼</button></div><div class="toolbar"><b>B</b><i>I</i><u>U</u><span></span><span></span></div><textarea>在一次函数 y = kx + b 中，k 表示 x 每增加 1 时 y 的变化量。先固定从左向右观察：k > 0 时 y 增加，图像上升；k < 0 时 y 减少，图像下降。b 只决定直线与 y 轴的交点，不决定增减性。</textarea><small class="count">108 / 500</small></article></section>
  <section class="outcome-panel pane"><div class="pane-heading"><h2>可教学资产</h2><p>基于教材标准生成，可直接用于课堂</p></div><article class="asset-section explanation"><div class="section-title"><h3>三种讲法</h3><span>满足不同学生的认知需要</span></div><div class="mode-tabs">${[["visual","看图理解"],["analogy","生活比喻"],["counter","反例辨析"]].map(([id,label])=>`<button class="${state.explanationMode===id?"active":""}" data-mode="${id}">${label}</button>`).join("")}</div><div class="explanation-body"><div><h4>${exp.title}</h4><p>${exp.body}</p><aside>${exp.note}</aside></div>${functionGraph(state.explanationMode)}</div></article><article class="asset-section mistakes"><div class="section-title"><h3>真实错因</h3><span>基于社区真实问题提炼</span></div>${mistakes.map((m,i)=>`<div class="mistake-row"><b>${i+1}</b><div><strong>${m[0]}</strong><p>${m[1]}</p></div></div>`).join("")}</article><article class="asset-section diagnostics"><div class="section-title"><h3>诊断变式</h3><span>检测理解而非背诵</span></div><div class="diagnostic-row"><span>基础题</span><p>判断 y=-2x+1 与 y=3x-4 的增减性，并说明依据。</p></div><div class="diagnostic-row"><span>迁移题</span><p>某条直线经过 (0,2) 且向右下降，构造一个可能的解析式。</p></div></article><button class="confirm ${state.confirmed?"confirmed":""}" data-action="confirm">${icon("check")}<span>${state.confirmed?"已确认并加入课程资产":"我已确认以上内容，可加入课程资产"}</span><b>${state.confirmed?"已保存":"确认并保存"}</b></button></section>
  <section class="evidence-bar"><div class="evidence-title"><b>来源与证据</b><span>每一步均可追溯</span></div>${[["教材标准","人教版 · 5.1.1 / 5.1.2","book"],["知乎社区","形象解释与真实困惑","link"],["AI 提炼","基于来源生成 · 可编辑","spark"],["教师确认",state.confirmed?"已确认 · 林老师":"等待确认","check"]].map(([a,b,c],i)=>`<div class="evidence-item ${i===3&&state.confirmed?"ready":""}">${icon(c)}<div><b>${a}</b><span>${b}</span></div></div>`).join("")}</section></section>`;
}

function functionGraph(mode) { return `<svg class="function-graph" viewBox="0 0 180 130" role="img" aria-label="一次函数图像"><path class="axis" d="M20 105H165M48 118V12"/><path class="line up" d="M25 100L150 30"/><path class="line down" d="M25 27L150 103"/><text x="154" y="118">x</text><text x="37" y="16">y</text><text x="112" y="27">k &gt; 0</text><text x="112" y="100">k &lt; 0</text>${mode!=="visual"?'<circle cx="48" cy="41" r="4"/><circle cx="96" cy="70" r="4"/>':""}</svg>`; }
function renderAssets() { const rows=[["k 与增减性的三种讲法","知乎 + 教材","课堂解释 / 学生订正","教师已确认"],["截距不是距离","知乎专业答主","易错点诊断","待确认"],["一次函数生活情境库","知乎社区讨论","L3 迁移题","已对齐教材"],["本班一次函数错因画像","学生作答","学情复盘","持续更新"]]; return `<section class="page"><div class="page-intro"><h2>一门课，越教越懂这位老师</h2><p>所有认知素材都保留出处、教材对齐记录和教师确认状态。</p></div><div class="asset-table"><div class="table-head"><span>课程资产</span><span>来源</span><span>教学用途</span><span>状态</span></div>${rows.map(r=>`<button class="table-row">${r.map((v,i)=>`<span class="${i===3?"status":""}">${v}</span>`).join("")}</button>`).join("")}</div></section>`; }
function renderPath() { const steps=[["01","建立直觉","用图像和生活比喻理解 k 是变化率","8 分钟"],["02","识别边界","用反例区分 k 与 b 对图像的不同影响","6 分钟"],["03","主动诊断","先解释理由，再判断函数的增减性","4 道题"],["04","迁移验证","从真实情境建立一次函数关系","2 个情境"]]; return `<section class="page"><div class="page-intro"><h2>从“看懂”到“会迁移”</h2><p>学习路径保留必要的思考摩擦，不让 AI 替学生完成学习。</p></div><div class="learning-path">${steps.map((s,i)=>`<article><span>${s[0]}</span><div><small>${i<2?"认知输入":"主动输出"}</small><h3>${s[1]}</h3><p>${s[2]}</p></div><b>${s[3]}</b></article>`).join("")}</div><button class="primary large" data-view="student">${icon("phone")}进入学生端体验“再讲一种”</button></section>`; }
function renderDiagnosis() { return `<section class="page"><div class="page-intro"><h2>错因不同，训练就不该相同</h2><p>系统先判断认知卡点，再选择解释与变式，不把所有错误都归为“粗心”。</p></div><div class="diagnosis-board"><div class="diag-list">${[["概念表征错误",38,"回到三种讲法"],["条件扫描遗漏",26,"圈画关键词"],["符号与步骤习惯",21,"完整书写训练"],["迁移边界不清",15,"反例 + L2 变式"]].map(d=>`<div><span>${d[0]}</span><i style="--value:${d[1]}%"></i><b>${d[1]}%</b><em>${d[2]}</em></div>`).join("")}</div><aside><h3>本轮诊断建议</h3><p>班级主要问题不是计算，而是把 <i>k</i> 与 <i>b</i> 的作用混淆。建议先用反例辨析，再做两道跨表征变式。</p><button data-view="student">查看学生订正体验 ${icon("arrow")}</button></aside></div></section>`; }
function renderReview() { return `<section class="page"><div class="page-intro"><h2>用学习结果检验“哪种讲法有效”</h2><p>知乎内容是否优质，不只看点赞，还看它是否真的促进理解与迁移。</p></div><div class="review-grid"><article class="review-focus"><small>阶段结论</small><h3>“变化率”讲法对中等生最有效</h3><p>使用生活比喻后，相关学生在跨表征题中的正确率提高；“只记正负口诀”的学生仍容易在反向表述中出错。</p><button>查看证据链 ${icon("arrow")}</button></article><div class="review-metrics"><div><span>教师采纳</span><b>3 / 4</b><small>种认知素材</small></div><div><span>首次理解</span><b>+18%</b><small>诊断题表现</small></div><div><span>隔周迁移</span><b>72%</b><small>仍需继续观察</small></div><div><span>低置信结果</span><b>2</b><small>等待教师复核</small></div></div></div></section>`; }

function renderStudent() {
  const exp=explanations[state.studentMode];
  return `<main class="student-app"><header><button class="icon-button" data-view="forge">${icon("back")}</button><div class="student-brand"><img src="./assets/shuyun-icon.svg" alt=""><b>数蕴</b><span>知乎知识炼金助教</span></div><small>好问题，能让你走更远</small></header><section class="student-progress"><div><span>一次函数 · <b>2/4</b></span><em>继续加油，下一题更进一步</em></div><i><b></b></i></section><section class="student-question"><h1>为什么 <i>k &lt; 0</i> 时，图像从左到右下降？</h1></section><section class="student-response"><div><small>你的回答</small><p>因为 k &lt; 0 所以 y 变小。</p></div><aside><b>理解还不稳定</b><p>思路有方向，但不够完整。我们换一种方式再看看。</p></aside></section><section class="teach-again"><div class="student-section-title"><h2>换一种讲法</h2><p>同一个知识点，可以有不同的理解方式。</p></div><div class="student-modes">${[["visual","看图理解"],["analogy","生活比喻"],["counter","反例辨析"]].map(([id,label])=>`<button class="${state.studentMode===id?"active":""}" data-student-mode="${id}">${label}</button>`).join("")}</div><article><div><h3>${exp.title}</h3><p>${exp.body}</p><aside>${exp.note}</aside></div>${functionGraph(state.studentMode)}</article></section><section class="socratic"><h2>想一想</h2><p>如果 x 每增加 1，y 减少 2，k 应该是多少？</p><div><input value="${state.studentAnswer}" placeholder="在这里输入你的答案…" data-student-answer><button data-action="answer">我来回答</button></div>${state.studentResult?`<p class="student-result ${state.studentResult.startsWith("答对了")?"good":""}">${state.studentResult}</p>`:""}</section><button class="again" data-action="again">${icon("rotate")}再换一种讲法</button><footer>${icon("link")}解释来自知乎优质内容，经教材校验与老师确认</footer></main>`;
}

function bindEvents() {
  document.querySelectorAll("[data-view]").forEach(el=>el.addEventListener("click",()=>{state.view=el.dataset.view;state.toast="";render();}));
  document.querySelectorAll("[data-source]").forEach(el=>el.addEventListener("click",()=>{state.selectedSource=el.dataset.source;state.pipeline=2;render();}));
  document.querySelectorAll("[data-filter]").forEach(el=>el.addEventListener("click",()=>{state.sourceFilter=el.dataset.filter;if(state.sourceFilter!=="all")state.selectedSource=state.sourceFilter;render();}));
  document.querySelectorAll("[data-pipeline]").forEach(el=>el.addEventListener("click",()=>{state.pipeline=Number(el.dataset.pipeline);render();}));
  document.querySelectorAll("[data-mode]").forEach(el=>el.addEventListener("click",()=>{state.explanationMode=el.dataset.mode;render();}));
  document.querySelectorAll("[data-student-mode]").forEach(el=>el.addEventListener("click",()=>{state.studentMode=el.dataset.studentMode;render();}));
  const input=document.querySelector("[data-student-answer]"); if(input)input.addEventListener("input",e=>state.studentAnswer=e.target.value);
  const liveInput=document.querySelector("[data-live-query]"); if(liveInput){liveInput.addEventListener("input",e=>state.liveQuery=e.target.value);liveInput.addEventListener("keydown",e=>{if(e.key==="Enter")handleAction("live-search");});}
  document.querySelectorAll("[data-action]").forEach(el=>el.addEventListener("click",()=>handleAction(el.dataset.action)));
}
async function handleAction(action) {
  if(action==="confirm"){state.confirmed=true;state.toast="已保存：三种讲法、真实错因和诊断变式";render();setTimeout(()=>{state.toast="";render();},2600);}
  if(action==="generate"){state.view="path";render();}
  if(action==="again"){const m=["visual","analogy","counter"];state.studentMode=m[(m.indexOf(state.studentMode)+1)%m.length];state.studentResult="";render();}
  if(action==="answer"){const v=state.studentAnswer.trim().replace(/\s/g,"");state.studentResult=["-2","k=-2","k＝-2"].includes(v)?"答对了！k = -2，因为 y 的变化量是 -2。":"再想一步：k 表示 x 每增加 1 时，y 的变化量。";render();}
  if(action==="live-search"){
    const query=state.liveQuery.trim(); if(query.length<2){state.liveStatus="error";state.liveMessage="请输入至少 2 个字的检索主题";render();return;}
    state.liveStatus="loading";state.liveMessage="正在安全调用知乎开放平台…";render();
    try{
      const response=await fetch(`/api/zhihu/search?q=${encodeURIComponent(query)}`,{headers:{Accept:"application/json"}});
      const payload=await response.json(); if(!response.ok)throw new Error(payload.message||"知乎 API 暂时不可用");
      if(!payload.items?.length)throw new Error("没有检索到匹配内容，请换个关键词");
      sources=payload.items.map((item,index)=>({id:`live-${index}`,kind:index===0?"高相关回答":index===1?"社区观点":"教学素材",tone:["blue","violet","green"][index%3],title:item.title,excerpt:item.excerpt||"打开原文查看完整内容",author:item.author||"知乎用户",meta:`知乎${item.contentType||"内容"} · ${item.votes||0} 赞同 · 权威 ${item.authority||1}`,date:item.date||"刚刚同步",url:item.url}));
      state.selectedSource=sources[0].id;state.sourceFilter="all";state.pipeline=1;state.liveStatus="success";state.liveMessage=`已通过真实 API 同步 ${sources.length} 条 · ${new Date().toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit"})}`;render();
    }catch(error){sources=[...cachedSources];state.selectedSource="visual";state.sourceFilter="all";state.liveStatus="error";state.liveMessage=`${error.message}；已切回缓存演示数据`;render();}
  }
}
render();

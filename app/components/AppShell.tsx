"use client";

import {
  ArrowRight, BarChart3, BookOpen, Check, ChevronDown, ClipboardCheck, FileText,
  FolderOpen, GraduationCap, Home, Layers3, ListChecks, Pencil, Plus, Sparkles,
  Target,
} from "lucide-react";
import { useMemo, useState } from "react";
import { assignments, courseAssets, evidence, lessonGoals, navigation, type ViewId } from "../data";
import { MathGraph } from "./MathGraph";
import { StudentPreview } from "./StudentPreview";

const navIcons = { workspace: Home, assets: FolderOpen, goals: Target, assignments: ClipboardCheck, review: BarChart3 };
const stages = [
  ["课程建档", "上传与整理本课资源"], ["目标共创", "生成并审核教学目标"],
  ["同源变式", "基于目标生成作业"], ["学生作答", "发布作业并收集证据"],
  ["学情复盘", "分析结果与调整课程"],
];

export function AppShell() {
  const [view, setView] = useState<ViewId>("workspace");
  const [studentMode, setStudentMode] = useState(false);
  const [approved, setApproved] = useState(false);
  const [activeGoal, setActiveGoal] = useState(1);
  const [toast, setToast] = useState("");
  const stage = useMemo(() => ({ workspace: 2, assets: 1, goals: 2, assignments: 3, review: 5 }[view]), [view]);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  }
  function approveGoals() {
    setApproved(true);
    notify("教学目标已确认，已进入课程资产");
  }
  if (studentMode) return <StudentPreview onBack={() => setStudentMode(false)} />;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="/" aria-label="数蕴首页"><img src="/assets/shuyun-icon.svg" alt="" /><div><strong>数蕴</strong><span>MATHESIS</span></div></a>
        <p className="brand-promise">懂你的课，才懂怎样教</p>
        <nav aria-label="产品导航">
          {navigation.map((item) => {
            const Icon = navIcons[item.id];
            return <button key={item.id} className={view === item.id ? "active" : ""} onClick={() => setView(item.id)}><Icon size={18} /><span>{item.label}</span></button>;
          })}
        </nav>
        <div className="sidebar-curve" aria-hidden="true"><span>课程资产</span><i /><span>教学判断</span><i /><span>学习证据</span><svg viewBox="0 0 190 130"><path d="M4 118C46 111 73 86 103 72C137 56 155 24 186 8" /><circle cx="4" cy="118" r="3" /><circle cx="103" cy="72" r="3" /><circle cx="186" cy="8" r="4" /></svg></div>
        <div className="teacher-account"><span>张</span><div><b>张老师</b><small>初中数学</small></div><ChevronDown size={15} /></div>
      </aside>

      <main className="workspace">
        <header className="topbar">
          <div className="course-switcher"><BookOpen size={18} /><span>初中数学 · 八年级下册</span><ChevronDown size={15} /></div>
          <p>把隐性的教学判断，沉淀成可复用的课程资产</p>
          <div className="top-links"><a href="/about">产品介绍</a><a href="/story">品牌故事</a></div>
        </header>
        <div className="lesson-heading">
          <div><small>当前课次</small><h1>一次函数 · 第 3 课</h1><p>人教版 · 第十九章 · 一次函数的图像与性质</p></div>
          <div className="heading-actions"><button className="secondary" onClick={() => setStudentMode(true)}><GraduationCap size={17} />学生端预览</button><button className="primary" onClick={() => setView("assignments")}><Sparkles size={17} />生成同源作业</button></div>
        </div>
        <section className="stage-rail" aria-label="教学闭环进度">
          {stages.map(([title, detail], index) => <button key={title} className={index + 1 < stage ? "done" : index + 1 === stage ? "current" : ""} onClick={() => setView(navigation[Math.min(index, navigation.length - 1)].id)}><span>{index + 1 < stage ? <Check size={15} /> : index + 1}</span><div><b>{title}</b><small>{detail}</small></div></button>)}
        </section>

        {view === "workspace" && <WorkspaceView approved={approved} activeGoal={activeGoal} setActiveGoal={setActiveGoal} approveGoals={approveGoals} setView={setView} />}
        {view === "assets" && <AssetsView />}
        {view === "goals" && <GoalsView approved={approved} activeGoal={activeGoal} setActiveGoal={setActiveGoal} approveGoals={approveGoals} />}
        {view === "assignments" && <AssignmentsView notify={notify} setStudentMode={setStudentMode} />}
        {view === "review" && <ReviewView />}
      </main>
      {toast && <div className="toast"><Check size={17} />{toast}</div>}
    </div>
  );
}

function WorkspaceView({ approved, activeGoal, setActiveGoal, approveGoals, setView }: { approved: boolean; activeGoal: number; setActiveGoal: (id: number) => void; approveGoals: () => void; setView: (view: ViewId) => void }) {
  return (
    <div className="dashboard-grid">
      <section className="goal-panel panel">
        <header><div><h2>教学目标 <span>3 条</span></h2><p>AI 根据课程材料形成初稿，等待你的专业判断。</p></div><button className={approved ? "approved" : "primary"} onClick={approveGoals}>{approved && <Check size={16} />}{approved ? "已确认" : "审核教学目标"}</button></header>
        <div className="goal-list">{lessonGoals.map((goal) => <button key={goal.id} className={activeGoal === goal.id ? "selected" : ""} onClick={() => setActiveGoal(goal.id)}><span>{goal.id}</span><div><small>{goal.level}</small><p>{goal.text}</p></div><Pencil size={16} /></button>)}</div>
        <footer><span><Sparkles size={15} />依据 4 项课程资产生成</span><button onClick={() => setView("goals")}>查看目标结构 <ArrowRight size={15} /></button></footer>
      </section>
      <section className="graph-panel panel">
        <header><div><h2>课文要点与典型图像</h2><p>用于目标 2：解释 k、b 与图像变化之间的关系。</p></div><button className="icon-button" aria-label="编辑图像说明"><Pencil size={16} /></button></header>
        <MathGraph /><div className="graph-legend"><span className="blue">k &gt; 0，随 x 增大而增大</span><span className="green">k &lt; 0，随 x 增大而减小</span></div>
      </section>
      <section className="asset-strip panel"><header><h2>课程资产 <span>4 项</span></h2><button onClick={() => setView("assets")}>查看全部 <ArrowRight size={15} /></button></header>{courseAssets.map((asset, index) => { const Icon = [BookOpen, FileText, Layers3, ListChecks][index]; return <article key={asset.name}><Icon size={18} /><div><b>{asset.name}</b><small>{asset.detail}</small></div><span>{asset.status}</span></article>; })}</section>
      <section className="evidence-panel panel">
        <header><div><h2>本课学情证据</h2><p>来自上次课堂与同源作业。</p></div><span>数据一般</span></header>
        <div className="evidence-metrics">{evidence.map((item) => <article key={item.label}><small>{item.label}</small><b>{item.value}</b><span>{item.note}</span></article>)}</div>
        <div className="distribution"><span>稳定掌握</span><i><b style={{ width: "24%" }} /></i><em>10 人</em><span>基本掌握</span><i><b style={{ width: "67%" }} /></i><em>18 人</em><span>练习中</span><i><b style={{ width: "44%" }} /></i><em>9 人</em><span>待理解</span><i className="attention"><b style={{ width: "28%" }} /></i><em>5 人</em></div>
      </section>
      <section className="next-action panel"><div><Sparkles size={19} /><span><b>下一步</b><small>目标确认后，生成 7 道教练同源、教考分离的课后作业。</small></span></div><button className="primary" onClick={() => setView("assignments")}>进入作业设计 <ArrowRight size={16} /></button></section>
    </div>
  );
}

function AssetsView() {
  const assets = courseAssets.concat([{ name: "本班错因画像", detail: "来自两次作业与一次课堂小测", type: "学情", status: "持续更新" }]);
  return <section className="content-view"><header><div><small>课程记忆</small><h2>一门课，越教越懂这位老师</h2><p>教材、课堂例题、教学心得和学生反馈在这里持续沉淀。</p></div><button className="primary"><Plus size={17} />添加课程资产</button></header><div className="asset-table"><div className="table-head"><span>资产名称</span><span>类型</span><span>状态</span><span>最近更新</span></div>{assets.map((asset, index) => <article key={asset.name}><div><span className={`file-mark mark-${index}`}><FileText size={18} /></span><span><b>{asset.name}</b><small>{asset.detail}</small></span></div><span>{asset.type}</span><span className="status">{asset.status}</span><span>{index < 2 ? "今天" : `${index + 2} 天前`}</span></article>)}</div></section>;
}

function GoalsView({ approved, activeGoal, setActiveGoal, approveGoals }: { approved: boolean; activeGoal: number; setActiveGoal: (id: number) => void; approveGoals: () => void }) {
  const current = lessonGoals.find((goal) => goal.id === activeGoal) ?? lessonGoals[0];
  return <section className="content-view goal-editor"><header><div><small>目标共创</small><h2>先说清楚，这节课希望学生会什么</h2><p>AI 负责结构化，教师决定目标的边界、层级和考查方式。</p></div><button className={approved ? "approved" : "primary"} onClick={approveGoals}>{approved ? <Check size={17} /> : <Target size={17} />}{approved ? "目标已确认" : "确认本课目标"}</button></header><div className="editor-layout"><aside>{lessonGoals.map((goal) => <button key={goal.id} className={goal.id === activeGoal ? "active" : ""} onClick={() => setActiveGoal(goal.id)}><span>{goal.id}</span><div><b>目标 {goal.id}</b><small>{goal.level}</small></div><ArrowRight size={15} /></button>)}</aside><article><div className="field"><label>目标层级</label><div className="segmented"><button className={current.level === "必达" ? "active" : ""}>必达</button><button className={current.level === "巩固" ? "active" : ""}>巩固</button><button className={current.level === "迁移" ? "active" : ""}>迁移</button></div></div><div className="field"><label>学生表现描述</label><textarea value={current.text} readOnly /></div><div className="field-grid"><div className="field"><label>证据方式</label><button className="select-button">课堂解释 + 变式作答 <ChevronDown size={15} /></button></div><div className="field"><label>暂不考查</label><button className="select-button">复杂分类讨论 <ChevronDown size={15} /></button></div></div><div className="editor-note"><Sparkles size={18} /><p><b>AI 建议</b>目标描述已覆盖知识、方法与迁移三个层级。建议在作业中为目标 2 加入一道图像到表达式的跨表征题。</p></div></article></div></section>;
}

function AssignmentsView({ notify, setStudentMode }: { notify: (message: string) => void; setStudentMode: (value: boolean) => void }) {
  return <section className="content-view"><header><div><small>教练同源，教考分离</small><h2>同一方法模型，换一个问题来验证</h2><p>题目来自本课目标与母题，但改变数值、条件、问法或情境。</p></div><button className="secondary" onClick={() => setStudentMode(true)}><GraduationCap size={17} />学生端预览</button></header><div className="assignment-list">{assignments.map((item) => <article key={item.id}><span className={`assignment-number ${item.color}`}>{item.id}</span><div><small>{item.level}</small><h3>{item.title}</h3><p>{item.detail}</p></div><strong>{item.questions} 题</strong><button className="icon-button" aria-label={`编辑${item.title}`}><Pencil size={16} /></button></article>)}</div><footer className="publish-bar"><div><ClipboardCheck size={20} /><span><b>共 7 题 · 预计 18 分钟</b><small>覆盖 3 个教学目标，包含 2 道迁移题。</small></span></div><button className="primary" onClick={() => notify("作业已保存为草稿，等待教师发布")}>保存作业草稿 <ArrowRight size={16} /></button></footer></section>;
}

function ReviewView() {
  return <section className="content-view"><header><div><small>课程复盘</small><h2>先看班级，再下钻到真正的错因</h2><p>不因一个学生的异常改变课程，用群体证据支持下一次教学判断。</p></div></header><div className="review-layout"><article className="review-summary"><small>本课阶段结论</small><h3>主要问题不是计算，<br />而是没有理解变化率。</h3><p>12 道典型错题中，8 道与 k、b 的作用混淆有关。建议下一课先用图像和反例完成一次 8 分钟的概念复习，再进入实际问题建模。</p><button>查看错因证据 <ArrowRight size={16} /></button></article><div className="review-list"><h3>目标达成情况</h3>{lessonGoals.map((goal, index) => <article key={goal.id}><span>{goal.id}</span><div><b>{goal.level}目标</b><p>{goal.text}</p><i><b style={{ width: `${[86, 72, 54][index]}%` }} /></i></div><strong>{[86, 72, 54][index]}%</strong></article>)}</div></div></section>;
}

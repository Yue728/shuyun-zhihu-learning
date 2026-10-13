import type { Metadata } from "next";
import { ArrowRight, BookOpen, BrainCircuit, ChartNoAxesCombined, Check, FileStack, GraduationCap, Sparkles, Target } from "lucide-react";
import "./about.css";

export const metadata: Metadata = {
  title: "产品介绍 · 数蕴",
  description: "了解数蕴如何围绕一位教师、一门课程和一个班级，形成持续进化的课程 AI 助教。",
};

const loop = [
  ["01", "课程建档", "理解教材、讲义、课堂例题与老师的教学判断。"],
  ["02", "目标共创", "把“这节课究竟希望学生会什么”变成清晰目标。"],
  ["03", "同源变式", "保持方法模型一致，改变数值、条件、问法和表征。"],
  ["04", "错因诊断", "不把所有错误归为粗心，区分真实认知卡点。"],
  ["05", "学情复盘", "从班级证据出发，调整下一次教学而非武断决策。"],
];

export default function AboutPage() {
  return (
    <main className="about-page">
      <nav className="about-nav"><a className="about-brand" href="/"><img src="/assets/shuyun-icon.svg" alt="" /><strong>数蕴</strong></a><div><a href="/story">品牌故事</a><a className="nav-cta" href="/">进入工作台 <ArrowRight size={15} /></a></div></nav>

      <header className="about-hero">
        <div><h1>让 AI 理解一门课，<br />而不只是回答一道题。</h1><p>数蕴围绕某位老师、某个班级和某门数学课，沉淀课程材料、教学目标、教法偏好与学习证据，成为持续进化的专属课程 AI 助教。</p><a href="/">查看产品工作流 <ArrowRight size={17} /></a></div>
        <div className="hero-equation" aria-hidden="true"><span>课程资产</span><i>+</i><span>教师判断</span><i>+</i><span>学习证据</span><b>=</b><strong>课程智能</strong><svg viewBox="0 0 500 210"><path d="M4 188C81 177 126 148 192 135C268 120 324 78 375 57C420 38 453 24 496 9" /><circle cx="4" cy="188" r="5" /><circle cx="192" cy="135" r="5" /><circle cx="375" cy="57" r="5" /><circle cx="496" cy="9" r="6" /></svg></div>
      </header>

      <section className="problem-band"><div><small>真正的问题</small><h2>批改更快，<br />不等于教学更好。</h2></div><div className="problem-lines"><p>通用题库不知道老师这一课讲了什么。</p><p>生成式 AI 不知道哪些内容暂时不该考。</p><p>成绩报表告诉老师结果，却很少解释原因。</p><p>数蕴从老师自己的课程上下文开始。</p></div></section>

      <section className="product-loop"><header><small>一个持续生长的闭环</small><h2>教、练、测、评、改，<br />最终都回到课程本身。</h2></header><div className="loop-line">{loop.map(([number, title, detail]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{detail}</p></article>)}</div></section>

      <section className="principles"><header><small>产品原则</small><h2>AI 提供能力，<br />教师保留判断。</h2></header><div className="principle-list">
        <article><BookOpen /><div><h3>课程专属</h3><p>所有生成都以老师上传的教材、讲义、目标、例题和个人心得为边界。</p></div></article>
        <article><Target /><div><h3>教练同源，教考分离</h3><p>作业与课堂方法同源，但不复刻例题，用变式检验理解与迁移。</p></div></article>
        <article><GraduationCap /><div><h3>学生完成最后一步</h3><p>AI 不直接替学生做题，而是通过解释、追问、订正和复测建立理解。</p></div></article>
        <article><ChartNoAxesCombined /><div><h3>群体优先，证据下钻</h3><p>教学决策先看班级，再下钻到知识点、错因、学生群体与个体。</p></div></article>
      </div></section>

      <section className="roles-section"><div className="role teacher-role"><FileStack size={28} /><small>教师端</small><h3>把经验变成课程资产</h3><ul><li><Check />课程材料持续沉淀</li><li><Check />教学目标由教师确认</li><li><Check />生成题发布前可审核</li><li><Check />学情结论保留置信度</li></ul></div><div className="role student-role"><BrainCircuit size={28} /><small>学生端</small><h3>把一次做对变成真正掌握</h3><ul><li><Check />围绕真实错因订正</li><li><Check />用不同变式验证迁移</li><li><Check />减少复杂排名和标签</li><li><Check />掌握判断保持克制</li></ul></div></section>

      <section className="about-finale"><Sparkles size={29} /><h2>一门课，越教越懂这位老师。<br />一个班，越学越看见真实问题。</h2><p>数蕴不是自动教学系统，而是教师长期课程判断的智能协作者。</p><a href="/">进入数蕴工作台 <ArrowRight size={17} /></a></section>
    </main>
  );
}

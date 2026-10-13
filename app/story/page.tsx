import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import "./story.css";

export const metadata: Metadata = {
  title: "品牌故事 · 数蕴 MATHESIS",
  description: "数蕴相信，数学学习不是得到答案，而是从为什么走到所以。",
};

const passage = [
  ["01", "材料", "老师真正使用的教材与讲义"],
  ["02", "目标", "这一课希望学生真正会什么"],
  ["03", "方法", "课堂里被反复验证的教法"],
  ["04", "作答", "学生如何理解、犯错与订正"],
  ["05", "证据", "什么解释与训练真正有效"],
  ["06", "复盘", "把判断带回下一次教学"],
];

export default function StoryPage() {
  return (
    <main className="story-book">
      <nav className="story-nav"><a href="/" className="story-brand"><img src="/assets/shuyun-icon.svg" alt="" /><div><b>数蕴</b><small>MATHESIS</small></div></a><div><a href="/about">产品介绍</a><a className="enter-product" href="/">进入工作台 <ArrowRight size={16} /></a></div></nav>

      <section className="story-cover"><div className="cover-copy"><p>数学里，蕴含着结构、方法与美感。</p><div><h1>数蕴</h1><span>MATHESIS</span></div><h2>让每一个“为什么”，<br />抵达“所以”。</h2></div><div className="cover-logic"><strong>∵</strong><svg viewBox="0 0 440 230"><path d="M8 201C83 190 128 159 185 145C255 128 301 90 348 61C381 41 406 22 432 10" /><circle cx="8" cy="201" r="5" /><circle cx="185" cy="145" r="5" /><circle cx="348" cy="61" r="5" /><circle cx="432" cy="10" r="6" /></svg><strong>∴</strong><p>问题不是学习的缺口。<br />它是理解开始生长的地方。</p></div></section>

      <section className="story-belief"><div className="story-index"><span>01 / 我们看见</span><span>THE REAL GAP</span></div><div className="belief-layout"><div><h2>学生得到答案，<br />却未必得到理解。</h2><p>一次做对，可能来自记忆；一次做错，也未必只是粗心。真正的教学需要知道：学生在哪里停住，哪一种解释适合他，以及理解能否迁移到新的问题。</p></div><blockquote><span>“会做”</span><i>≠</i><strong>“会解释”</strong><span>“看懂”</span><i>≠</i><strong>“会迁移”</strong></blockquote></div></section>

      <section className="story-name"><div className="story-index"><span>02 / 名字从哪里来</span><span>THE NAME</span></div><div className="name-layout"><div className="name-mark"><span>数</span><i /><span>蕴</span></div><div><h2>数，是数学。<br />蕴，是其中没有被说尽的东西。</h2><p>它可能是老师多年形成的判断，是一道例题背后的方法模型，是学生反复出错时暴露出的认知边界，也是一个班级逐渐留下的学习证据。</p><p>数蕴希望把这些隐性的东西保存下来，让它们可以被理解、被复用，也被新的课堂继续修正。</p></div></div></section>

      <section className="story-symbol"><div className="story-index"><span>03 / 一个符号讲完这个故事</span><span>BECAUSE TO THEREFORE</span></div><div className="logic-stage"><div><strong>∵</strong><span>为什么</span></div><div className="logic-route"><i /><i /><i /><p>课程上下文 · 教师判断 · 学习证据</p></div><div><strong>∴</strong><span>所以</span></div></div><h2>AI 不占据推理的中心。<br />它帮助老师和学生走完中间那条路。</h2></section>

      <section className="story-passage"><div className="story-index"><span>04 / 一门课如何留下记忆</span><span>COURSE MEMORY</span></div><h2>不是每次从空白开始，<br />而是在每次教学之后更懂这门课。</h2><div className="passage-line">{passage.map(([number, title, detail]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{detail}</p></article>)}</div></section>

      <section className="story-promise"><img src="/assets/shuyun-icon.svg" alt="数蕴标志" /><h2>为教师保留判断。<br />为学生保留思考。</h2><p>懂你的课，才懂怎样教。</p><div><a href="/">进入数蕴 <ArrowRight size={17} /></a><a href="/about">阅读产品介绍</a></div><footer><span>数蕴 · MATHESIS</span><span>专属课程 AI 助教</span></footer></section>
    </main>
  );
}

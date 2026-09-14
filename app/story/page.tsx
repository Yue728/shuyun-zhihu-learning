import type { Metadata } from "next";
import Link from "next/link";
import "./story.css";

export const metadata: Metadata = {
  title: "数蕴 MATHESIS｜品牌故事",
  description: "让每一个为什么，抵达所以。了解数蕴如何把知乎社区认知转化为可审核、可教学、可验证的学习路径。",
  openGraph: {
    title: "数蕴 MATHESIS｜让每一个为什么，抵达所以",
    description: "从真实问题出发，经由多元解释、教师判断与学生验证，让理解真正发生。",
    images: [{ url: "/assets/shuyun-hackathon-cover-v4.png", width: 1260, height: 700 }],
  },
};

const passage = [
  ["01", "真实问题", "从具体的困惑开始"],
  ["02", "多元解释", "在知乎寻找不同入口"],
  ["03", "教材边界", "回到准确的知识结构"],
  ["04", "教师判断", "决定什么适合这门课"],
  ["05", "学生作答", "让理解留下证据"],
  ["06", "迁移验证", "在新问题中再次成立"],
];

export default function StoryPage() {
  return (
    <main className="story-book" id="story-top">
      <header className="story-nav">
        <Link className="story-brand" href="/" aria-label="返回数蕴知识炼金台">
          <img src="/assets/shuyun-icon.svg" alt="数蕴标志" />
          <span><b>数蕴</b><small>MATHESIS</small></span>
        </Link>
        <nav aria-label="品牌故事导航">
          <a href="#belief">为什么</a><a href="#passage">如何发生</a>
          <Link className="enter-product" href="/">进入知识炼金台 <span>→</span></Link>
        </nav>
      </header>

      <section className="story-cover">
        <div className="cover-copy">
          <div className="story-index"><span>数蕴品牌故事 · 2026</span><span>FROM BECAUSE TO THEREFORE</span></div>
          <div><h1>数蕴</h1><p className="cover-en">MATHESIS</p><p className="cover-line">让每一个“为什么”，<br />抵达“所以”。</p></div>
          <div className="cover-actions"><Link href="/">进入教师端 <span>→</span></Link><a href="#belief">读完这个故事</a></div>
        </div>
        <div className="cover-symbol" aria-label="从因为到所以">
          <span className="because">∵</span><img src="/assets/shuyun-icon.svg" alt="数蕴因果标志" /><span className="therefore">∴</span>
          <p>问题不是起点的装饰<br />而是理解发生的原因</p>
        </div>
      </section>

      <section className="story-tension" id="belief">
        <div className="section-mark"><span>01 / 一个没有抵达的答案</span><span>THE TENSION</span></div>
        <div className="tension-grid">
          <div className="question-proof"><small>一次函数 · 课堂追问</small><strong>k &lt; 0 ⇒ ?</strong><p>“因为 k &lt; 0，<br />所以 y 随 x 增大而减小。”</p><em>可是，为什么？</em></div>
          <div className="tension-statement"><h2>他答对了。<br />却不知道为什么。</h2><p>正确答案已经出现了很多次，理解却还没有发生。题目换一种表征，记住的口诀便失去了方向。</p><div className="belief-pair"><span>答案结束一道题</span><b>理解开始下一道题</b></div></div>
        </div>
      </section>

      <section className="story-mine">
        <div className="section-mark"><span>02 / 真实问题是一条认知矿脉</span><span>ZHIHU × MATHESIS</span></div>
        <div className="mine-grid">
          <div className="question-field" aria-label="来自真实学习情境的问题"><i className="question-path" aria-hidden="true" /><span>斜率到底是什么？</span><span>为什么图像会下降？</span><span>有没有生活里的类比？</span><span>这句话哪里容易误解？</span></div>
          <div><h2>真实的“不会”，<br />藏着更好的讲法。</h2><p>知乎里有学生的追问、教师的经验、专业答主的解释，也有需要辨别的噪声。价值不在内容数量，而在能否把多元认知带回教材和课堂。</p><div className="source-rule"><span>社区提供真实语境</span><span>教材提供边界</span><span>教师决定什么进入课堂</span></div></div>
        </div>
      </section>

      <section className="story-symbol">
        <div className="section-mark"><span>03 / 一个符号讲完这个故事</span><span>BECAUSE TO THEREFORE</span></div>
        <div className="logic-stage"><div><strong>∵</strong><span>真实问题</span></div><div className="logic-route" aria-label="寻找另一种讲法，经过判断，接受验证"><i /><i /><i /><p>寻找另一种讲法<br />经过判断 · 接受验证</p></div><div><strong>∴</strong><span>理解成立</span></div></div>
        <h2>数蕴不占据推理的中心。<br />它让问题与理解建立关系。</h2>
      </section>

      <section className="story-passage" id="passage">
        <div className="section-mark"><span>04 / 理解如何发生</span><span>TRACEABLE · TEACHABLE · TESTABLE</span></div>
        <h2>从一条回答，<br />到一份可以进入课堂的理解。</h2>
        <div className="passage-line">{passage.map(([number, title, detail]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{detail}</p></article>)}</div>
        <div className="human-rule"><p><span>AI</span><b>寻找与提炼</b><small>把散落认知带到眼前</small></p><p><span>师</span><b>审核与选择</b><small>决定什么适合这门课</small></p><p><span>生</span><b>回答与迁移</b><small>用表现证明理解发生</small></p></div>
      </section>

      <section className="story-finale">
        <img src="/assets/shuyun-icon.svg" alt="数蕴标志" /><h2>让每一个“为什么”，<br />抵达“所以”。</h2><p>为教师保留判断。为学生保留思考。</p>
        <div><Link href="/">进入知识炼金台 <span>→</span></Link><Link href="/?view=student">体验学生端</Link></div>
        <footer><span>数蕴 · MATHESIS</span><span>知乎知识炼金助教</span></footer>
      </section>
    </main>
  );
}

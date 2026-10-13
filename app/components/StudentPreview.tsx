"use client";

import { ArrowLeft, Check, RotateCcw } from "lucide-react";
import { useState } from "react";

export function StudentPreview({ onBack }: { onBack: () => void }) {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const correct = answer.trim().replaceAll(" ", "") === "-2";

  return (
    <main className="student-preview">
      <header className="student-header">
        <button className="icon-button" onClick={onBack} aria-label="返回教师端"><ArrowLeft size={18} /></button>
        <a className="student-brand" href="/"><img src="/assets/shuyun-icon.svg" alt="" /><strong>数蕴</strong></a>
        <span>一次函数 · 订正训练</span>
      </header>
      <section className="student-progress" aria-label="学习进度"><div><b>第 2 题，共 4 题</b><span>练习中</span></div><i><b /></i></section>
      <section className="student-question"><small>先说出你的判断依据</small><h1>如果 x 每增加 1，y 减少 2，<i>k</i> 应该是多少？</h1><p>不要只写答案。想一想：k 描述的究竟是哪两个量之间的关系？</p></section>
      <section className="student-answer">
        <label htmlFor="student-answer">你的回答</label>
        <div><input id="student-answer" value={answer} onChange={(event) => { setAnswer(event.target.value); setSubmitted(false); }} placeholder="输入 k 的值" /><button onClick={() => setSubmitted(true)} disabled={!answer.trim()}>提交回答</button></div>
        {submitted && <article className={correct ? "feedback success" : "feedback retry"}>{correct ? <Check size={20} /> : <RotateCcw size={20} />}<div><strong>{correct ? "理解正确" : "再走一步"}</strong><p>{correct ? "k = -2，因为 x 每增加 1，y 的变化量是 -2。" : "k 不是 y 最后的数值，而是 x 每变化 1 时，y 对应的变化量。"}</p></div></article>}
      </section>
      <footer>题目来自本节课教学目标与课堂母题，由老师审核后发布。</footer>
    </main>
  );
}

export type Goal = {
  id: number;
  level: "必达" | "巩固" | "迁移";
  text: string;
};

export const lessonGoals: Goal[] = [
  { id: 1, level: "必达", text: "理解一次函数的概念，能根据实际情境判断两个变量是否具有一次函数关系。" },
  { id: 2, level: "巩固", text: "会结合图像和表达式分析变量变化规律，并解释 k、b 的实际意义。" },
  { id: 3, level: "迁移", text: "能从实际问题中建立一次函数模型，并说明模型成立的条件与边界。" },
];

export const courseAssets = [
  { name: "教材内容", detail: "人教版 · 八年级下册 · 一次函数", type: "教材", status: "已关联" },
  { name: "我的课件", detail: "一次函数第 3 课_课堂课件.pptx", type: "课件", status: "已解析" },
  { name: "典型例题", detail: "3 道母题 · 5 道课堂变式", type: "例题", status: "已标注" },
  { name: "教学心得", detail: "先谈变化，再引入斜率符号", type: "心得", status: "持续更新" },
];

export const evidence = [
  { label: "参与学生", value: "42", note: "上次课堂" },
  { label: "目标达成", value: "78%", note: "必达目标" },
  { label: "典型错题", value: "12", note: "等待复盘" },
  { label: "需要关注", value: "6", note: "学生" },
];

export const assignments = [
  { id: "01", level: "基础巩固", title: "从表达式判断变化方向", detail: "同一方法模型，替换数值与截距，检查学生是否真正理解 k 的作用。", questions: 3, color: "blue" },
  { id: "02", level: "条件变式", title: "从图像反推函数关系", detail: "改变已知条件和提问顺序，避免学生依赖固定解题模板。", questions: 2, color: "green" },
  { id: "03", level: "情境迁移", title: "为真实问题建立模型", detail: "把课堂方法迁移到资费、路程与温度变化情境，并解释模型边界。", questions: 2, color: "coral" },
];

export const navigation = [
  { id: "workspace", label: "工作台" },
  { id: "assets", label: "课程资产" },
  { id: "goals", label: "教学目标" },
  { id: "assignments", label: "作业设计" },
  { id: "review", label: "学情复盘" },
] as const;

export type ViewId = (typeof navigation)[number]["id"];

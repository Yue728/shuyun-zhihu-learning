import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shuyun-zhihu-learning.cynb0728.chatgpt.site"),
  title: "数蕴 · 知乎知识炼金助教",
  description: "将知乎社区中的优质解释、真实困惑与教学经验，转化为可理解、可练习、可诊断的数学学习路径。",
  icons: {
    icon: "/assets/shuyun-icon.svg",
    shortcut: "/assets/shuyun-icon.svg",
  },
  openGraph: {
    title: "数蕴 · 知乎知识炼金助教",
    description: "将知乎社区智慧转化为可追溯、可教学、可诊断的学习路径。",
    images: [{ url: "/assets/shuyun-hackathon-cover-v4.png", width: 1260, height: 700 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

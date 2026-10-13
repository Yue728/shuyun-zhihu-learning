import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shuyun-mathesis.workers.dev"),
  title: "数蕴 · 专属课程 AI 助教",
  description: "围绕教师自己的课程材料、教学目标与班级学情，形成教、练、测、评、改的持续闭环。",
  icons: {
    icon: "/assets/shuyun-icon.svg",
    shortcut: "/assets/shuyun-icon.svg",
  },
  openGraph: {
    title: "数蕴 · 专属课程 AI 助教",
    description: "让 AI 理解一门课，而不只是回答一道题。",
    images: [{ url: "/og.png", width: 1680, height: 945, alt: "数蕴 · 懂你的课，才懂怎样教" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "数蕴 · 专属课程 AI 助教",
    description: "让 AI 理解一门课，而不只是回答一道题。",
    images: ["/og.png"],
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

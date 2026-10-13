import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the original Shuyun product", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>数蕴 · 专属课程 AI 助教<\/title>/i);
  assert.match(html, /一次函数/);
  assert.match(html, /课程资产/);
});

test("renders the product introduction", async () => {
  const response = await render("/about");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /让 AI 理解一门课/);
  assert.match(html, /教练同源/);
});

test("renders the brand story", async () => {
  const response = await render("/story");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /数蕴 MATHESIS/);
  assert.match(html, /让每一个.*为什么/);
  assert.match(html, /为教师保留判断/);
});

test("health endpoint reports only product infrastructure", async () => {
  const response = await render("/api/health");
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, product: "shuyun", storageConfigured: false });
});

test("removed integrations do not remain in tracked product source", async () => {
  const files = await Promise.all([
    "../app/layout.tsx", "../app/components/AppShell.tsx", "../app/story/page.tsx",
    "../app/about/page.tsx", "../worker/index.ts", "../README.md", "../package.json",
  ].map((path) => readFile(new URL(path, import.meta.url), "utf8")));
  const source = files.join("\n").toLowerCase();
  const removedTerms = ["zhi" + "hu", "黑客" + "松", "hack" + "athon", "知识" + "炼金"];
  for (const term of removedTerms) assert.equal(source.includes(term), false);
  assert.match(source, /专属课程 ai 助教/);
  assert.match(source, /教练同源/);
});

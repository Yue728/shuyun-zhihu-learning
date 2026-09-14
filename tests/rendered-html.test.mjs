import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Shuyun application shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>数蕴 · 知乎知识炼金助教<\/title>/i);
  assert.match(html, /id="app"/);
  assert.match(html, /id="app"/);
});

test("health endpoint does not expose secrets", async () => {
  const response = await render("/api/health");
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, zhihuConfigured: false });
});

test("ships API-aware client and social metadata", async () => {
  const [css, layout, packageJson, appJs] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/shuyun-app.js", import.meta.url), "utf8"),
  ]);
  assert.match(css, /live-search/);
  assert.match(layout, /shuyun-hackathon-cover-v4/);
  assert.match(packageJson, /shuyun-zhihu-teaching-assistant/);
  assert.match(appJs, /\/api\/zhihu\/search/);
});

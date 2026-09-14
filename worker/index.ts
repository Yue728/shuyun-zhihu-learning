/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  ZHIHU_ACCESS_SECRET?: string;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      return json({ ok: true, zhihuConfigured: Boolean(env.ZHIHU_ACCESS_SECRET) });
    }

    if (url.pathname === "/api/zhihu/search") {
      if (request.method !== "GET") return json({ message: "仅支持 GET 请求" }, 405);
      const query = (url.searchParams.get("q") ?? "").trim();
      if (query.length < 2 || query.length > 80) return json({ message: "检索主题须为 2–80 个字符" }, 400);
      if (!env.ZHIHU_ACCESS_SECRET) return json({ message: "服务端尚未配置知乎 Access Secret" }, 503);

      const upstream = new URL("https://developer.zhihu.com/api/v1/content/zhihu_search");
      upstream.searchParams.set("Query", query);
      upstream.searchParams.set("Count", "3");

      try {
        const response = await fetch(upstream, {
          headers: {
            Authorization: `Bearer ${env.ZHIHU_ACCESS_SECRET}`,
            "X-Request-Timestamp": String(Math.floor(Date.now() / 1000)),
            "Content-Type": "application/json",
          },
          signal: AbortSignal.timeout(12_000),
        });
        const payload = await response.json() as { Code?: number; Message?: string; Data?: { Items?: Array<Record<string, unknown>> } };
        if (!response.ok || payload.Code !== 0) {
          const messages: Record<number, string> = { 10001: "检索参数无效", 20001: "知乎 API 鉴权失败", 30001: "知乎 API 今日额度或频率已达上限", 90001: "知乎 API 暂时不可用" };
          return json({ message: messages[payload.Code ?? 0] ?? payload.Message ?? "知乎 API 请求失败" }, response.ok ? 502 : response.status);
        }
        const strip = (value: unknown) => String(value ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
        const items = (payload.Data?.Items ?? []).slice(0, 3).map((item) => ({
          title: strip(item.Title).slice(0, 120),
          excerpt: strip(item.ContentText).slice(0, 180),
          author: strip(item.AuthorName).slice(0, 40),
          contentType: strip(item.ContentType).slice(0, 20),
          votes: Number(item.VoteUpCount) || 0,
          authority: strip(item.AuthorityLevel) || "1",
          date: Number(item.EditTime) ? new Date(Number(item.EditTime) * 1000).toISOString().slice(0, 10) : "",
          url: safeZhihuUrl(item.Url),
        }));
        return json({ items, source: "zhihu-open-api", query }, 200, { "Cache-Control": "public, max-age=60" });
      } catch {
        return json({ message: "连接知乎 API 超时，请稍后重试" }, 504);
      }
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;

function safeZhihuUrl(value: unknown): string {
  try {
    const url = new URL(String(value ?? ""));
    return /(^|\.)zhihu\.com$/.test(url.hostname) ? url.href : "https://www.zhihu.com/";
  } catch {
    return "https://www.zhihu.com/";
  }
}

function json(payload: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return Response.json(payload, { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", ...headers } });
}

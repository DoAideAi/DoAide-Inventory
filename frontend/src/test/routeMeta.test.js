import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { ARTICLES } from "../data/blogArticles";
import { jsonLdFor, metaForPath, routes } from "../routeMeta";

const appSrc = readFileSync(resolve(process.cwd(), "src/App.jsx"), "utf-8");

describe("routeMeta", () => {
  it("has unique paths, titles and descriptions", () => {
    for (const key of ["path", "title", "description"]) {
      const values = routes.map((r) => r[key]);
      expect(new Set(values).size).toBe(values.length);
    }
  });

  it("keeps titles and descriptions snippet-sized", () => {
    for (const r of routes) {
      expect(r.title.length, r.path).toBeLessThanOrEqual(70);
      expect(r.description.length, r.path).toBeLessThanOrEqual(160);
    }
  });

  it("only lists routes the router serves without sign-in", () => {
    const publicPaths = [...appSrc.matchAll(/<Route path="(\/[^"]*)" element=\{<(?!Protected)/g)].map((m) => m[1]);
    const blogPaths = [...appSrc.matchAll(/<Route path="([a-z-]+)" element=\{<\w+Guide/g)].map((m) => `/blog/${m[1]}`);
    const served = new Set([...publicPaths, ...blogPaths]);
    for (const r of routes) expect(served.has(r.path), r.path).toBe(true);
    expect(metaForPath("/dashboard")).toBeUndefined();
    expect(metaForPath("/auth")).toBeUndefined();
  });

  it("covers every blog article with a dated BlogPosting", () => {
    for (const a of ARTICLES) {
      const ld = jsonLdFor(metaForPath(`/blog/${a.slug}`));
      expect(ld["@type"]).toBe("BlogPosting");
      expect(ld.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("prices the home page offers in INR", () => {
    const app = jsonLdFor(metaForPath("/"))["@graph"][0];
    expect(app.offers.every((o) => o.priceCurrency === "INR")).toBe(true);
  });
});

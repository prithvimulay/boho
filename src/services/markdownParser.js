import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

/**
 * Parse a markdown string with optional frontmatter into
 * { data, html } where `data` is the frontmatter object and
 * `html` is the rendered body.
 */
export async function parseMarkdown(raw) {
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);
  return { data, html: processed.toString() };
}

import { load as loadYaml } from "js-yaml";
import aboutMd from "@/content/about.md?raw";
import projectsMd from "@/content/projects.md?raw";
import contactMd from "@/content/contact.md?raw";

export interface Frontmatter {
  [key: string]: unknown;
}

export interface MarkdownDoc {
  frontmatter: Frontmatter;
  body: string;
}

/**
 * Pisahkan frontmatter YAML (--- ... ---) dari body Markdown.
 * Tanpa dependency eksternal untuk parsing; js-yaml hanya untuk YAML-nya.
 */
export function parseMarkdown(raw: string): MarkdownDoc {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { frontmatter: {}, body: raw };
  let frontmatter: Frontmatter = {};
  try {
    frontmatter = (loadYaml(match[1]) as Frontmatter) ?? {};
  } catch {
    // ponytail: frontmatter invalid diabaikan (body tetap dirender). Upgrade: log peringatan.
  }
  return { frontmatter, body: raw.slice(match[0].length) };
}

// Import statis — Vite bundel file .md langsung, tanpa fetch runtime.
const docs = {
  about: parseMarkdown(aboutMd),
  projects: parseMarkdown(projectsMd),
  contact: parseMarkdown(contactMd),
};

export function getDoc(name: keyof typeof docs): MarkdownDoc {
  return docs[name];
}

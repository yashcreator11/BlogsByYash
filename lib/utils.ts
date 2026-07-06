import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function getExcerpt(htmlContent: string, maxLength = 150): string {
  const text = stripHtml(htmlContent);
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, "") + "...";
}

export function getReadingTime(htmlContent: string): string {
  const text = stripHtml(htmlContent);
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export function getCoverImageFromContent(htmlContent: string): string | null {
  const match = htmlContent.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(htmlContent: string): Heading[] {
  const headingRegex = /<h([23])[^>]*>(.*?)<\/h\1>/gi;
  const headings: Heading[] = [];
  let match;
  while ((match = headingRegex.exec(htmlContent)) !== null) {
    const level = parseInt(match[1], 10);
    const text = stripHtml(match[2]);
    headings.push({ id: slugify(text), text, level });
  }
  return headings;
}

export function addHeadingIds(htmlContent: string): string {
  return htmlContent.replace(
    /<h([23])([^>]*)>(.*?)<\/h\1>/gi,
    (full, level, attrs, inner) => {
      const text = stripHtml(inner);
      const id = slugify(text);
      if (/id=/.test(attrs)) return full;
      return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
    }
  );
}

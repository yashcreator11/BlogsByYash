import type { BlogPost } from "@/types";
import { getExcerpt, getReadingTime, getCoverImageFromContent } from "./utils";

const API_KEY = process.env.BLOGGER_API_KEY;
const BLOG_ID = process.env.BLOGGER_BLOG_ID;
const BASE = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}`;

interface BloggerListResponse {
  items?: BlogPost[];
  nextPageToken?: string;
}

function assertConfigured() {
  if (!API_KEY || !BLOG_ID) {
    throw new Error(
      "Blogger API is not configured. Set BLOGGER_API_KEY and BLOGGER_BLOG_ID in your environment."
    );
  }
}

/**
 * Get all posts, with pagination support.
 */
export async function getAllPosts(
  maxResults = 20,
  pageToken?: string
): Promise<{ posts: BlogPost[]; nextPageToken?: string }> {
  assertConfigured();

  const params = new URLSearchParams({
    key: API_KEY as string,
    maxResults: String(maxResults),
    fetchImages: "true",
  });
  if (pageToken) params.set("pageToken", pageToken);

  const res = await fetch(`${BASE}/posts?${params.toString()}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
  }

  const data: BloggerListResponse = await res.json();
  return { posts: data.items || [], nextPageToken: data.nextPageToken };
}

/**
 * Get a single post by its Blogger post ID.
 */
export async function getPostById(postId: string): Promise<BlogPost | null> {
  assertConfigured();

  const params = new URLSearchParams({ key: API_KEY as string });
  const res = await fetch(`${BASE}/posts/${postId}?${params.toString()}`, {
    next: { revalidate: 3600 },
  });

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Failed to fetch post: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/**
 * Search posts by a free-text query.
 */
export async function searchPosts(query: string): Promise<BlogPost[]> {
  assertConfigured();

  const params = new URLSearchParams({
    key: API_KEY as string,
    q: query,
  });
  const res = await fetch(`${BASE}/posts/search?${params.toString()}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to search posts: ${res.status} ${res.statusText}`);
  }

  const data: BloggerListResponse = await res.json();
  return data.items || [];
}

/**
 * Get posts that have a specific label/category.
 */
export async function getPostsByLabel(label: string): Promise<BlogPost[]> {
  assertConfigured();

  const params = new URLSearchParams({
    key: API_KEY as string,
    labels: label,
    fetchImages: "true",
  });
  const res = await fetch(`${BASE}/posts?${params.toString()}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch posts by label: ${res.status} ${res.statusText}`
    );
  }

  const data: BloggerListResponse = await res.json();
  return data.items || [];
}

/**
 * Get the most recent post to feature on the homepage.
 */
export async function getFeaturedPost(): Promise<BlogPost | null> {
  const { posts } = await getAllPosts(1);
  return posts[0] || null;
}

/**
 * Extract a plain-text excerpt from a post's HTML content.
 */
export { getExcerpt, getReadingTime };

/**
 * Extract the first image from a post's content, or fall back to Blogger's
 * own image metadata, to use as a cover image.
 */
export function getCoverImage(post: BlogPost): string {
  if (post.images && post.images.length > 0) {
    return post.images[0].url;
  }
  const fromContent = getCoverImageFromContent(post.content);
  if (fromContent) return fromContent;
  return "/og-image.jpg";
}

/**
 * Collect all unique labels/categories across a set of posts.
 */
export function getAllLabels(posts: BlogPost[]): string[] {
  const labelSet = new Set<string>();
  posts.forEach((post) => post.labels?.forEach((label) => labelSet.add(label)));
  return Array.from(labelSet).sort();
}

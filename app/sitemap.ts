import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blogger";
import { siteConfig } from "@/config/social";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${siteConfig.url}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${siteConfig.url}/portfolio`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  let postRoutes: MetadataRoute.Sitemap = [];

  try {
    const { posts } = await getAllPosts(50);
    postRoutes = posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.id}`,
      lastModified: new Date(post.updated || post.published),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    postRoutes = [];
  }

  return [...staticRoutes, ...postRoutes];
}

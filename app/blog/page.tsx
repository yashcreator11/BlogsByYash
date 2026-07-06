import type { Metadata } from "next";
import { getAllPosts, getAllLabels } from "@/lib/blogger";
import { BlogListClient } from "@/components/blog/BlogListClient";

export const metadata: Metadata = {
  title: "Blog",
  description: "All posts — search and filter by category.",
};

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof getAllPosts>>["posts"] = [];
  let error = false;

  try {
    const result = await getAllPosts(30);
    posts = result.posts;
  } catch {
    error = true;
  }

  const categories = getAllLabels(posts);

  return (
    <div className="overflow-x-hidden">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            All posts
          </h1>
          <p className="mt-2 text-muted">Search by keyword or filter by category.</p>
        </div>

        {error ? (
          <div className="rounded-xl border border-dashed border-border bg-card p-6 text-sm text-muted">
            Posts will appear here once your Blogger API key and blog ID are set in
            your environment variables.
          </div>
        ) : (
          <BlogListClient posts={posts} categories={categories} />
        )}
      </div>
    </div>
  );
}

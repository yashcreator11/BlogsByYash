"use client";

import { useMemo, useState } from "react";
import { SearchBar } from "@/components/blog/SearchBar";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { PostGrid } from "@/components/blog/PostGrid";
import type { BlogPost } from "@/types";

interface BlogListClientProps {
  posts: BlogPost[];
  categories: string[];
}

export function BlogListClient({ posts, categories }: BlogListClientProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesQuery =
        query.trim() === "" ||
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !category || post.labels?.includes(category);
      return matchesQuery && matchesCategory;
    });
  }, [posts, query, category]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {categories.length > 0 && (
        <div className="mt-4">
          <CategoryFilter categories={categories} active={category} onChange={setCategory} />
        </div>
      )}

      <div className="mt-8">
        <PostGrid posts={filtered} />
      </div>
    </div>
  );
}

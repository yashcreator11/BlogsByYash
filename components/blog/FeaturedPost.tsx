import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogPost } from "@/types";
import { getCoverImage, getExcerpt, getReadingTime } from "@/lib/blogger";
import { formatDate } from "@/lib/utils";

export function FeaturedPost({ post }: { post: BlogPost }) {
  const cover = getCoverImage(post);
  const excerpt = getExcerpt(post.content, 180);
  const readingTime = getReadingTime(post.content);
  const category = post.labels?.[0];

  return (
    <Link
      href={`/blog/${post.id}`}
      className="group grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-card transition-shadow duration-300 hover:shadow-xl dark:hover:shadow-accent/10 lg:grid-cols-2"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-accent-soft lg:aspect-auto">
        <Image
          src={cover}
          alt={post.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-center p-6 sm:p-10">
        {category && (
          <span className="mb-3 inline-block w-fit rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
            {category}
          </span>
        )}
        <h2 className="font-display text-2xl font-bold leading-tight text-foreground sm:text-3xl">
          {post.title}
        </h2>
        <p className="mt-3 text-muted">{excerpt}</p>
        <div className="mt-5 flex items-center gap-4 text-sm text-muted">
          <span>{formatDate(post.published)}</span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {readingTime}
          </span>
        </div>
        <span className="mt-6 flex items-center gap-1 text-sm font-semibold text-accent">
          Read the post
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

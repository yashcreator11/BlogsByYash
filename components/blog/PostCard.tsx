import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import type { BlogPost } from "@/types";
import { getCoverImage, getExcerpt, getReadingTime } from "@/lib/blogger";
import { formatDateShort, toAbsoluteUrl } from "@/lib/utils";

export function PostCard({ post }: { post: BlogPost }) {
  const cover = getCoverImage(post);
  const excerpt = getExcerpt(post.content, 120);
  const readingTime = getReadingTime(post.content);
  const category = post.labels?.[0];

  return (
    <Link
      href={`/blog/${post.id}`}
      className="group block overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-accent/5"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-accent-soft">
        <Image
          src={cover}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {category && (
          <span className="absolute left-3 top-3 rounded-full bg-card/90 px-3 py-1 text-xs font-medium text-accent backdrop-blur">
            {category}
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-bold leading-snug text-foreground line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-muted line-clamp-2">{excerpt}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
          <div className="flex items-center gap-2">
            {post.author?.image?.url && (
              <Image
                src={toAbsoluteUrl(post.author.image.url)!}
                alt={post.author.displayName}
                width={20}
                height={20}
                className="rounded-full"
              />
            )}
            <span>{post.author?.displayName}</span>
          </div>
          <span>{formatDateShort(post.published)}</span>
        </div>
        <div className="mt-2 flex items-center gap-1 text-xs text-muted">
          <Clock size={12} />
          <span>{readingTime}</span>
        </div>
      </div>
    </Link>
  );
}
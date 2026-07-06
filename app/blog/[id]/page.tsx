import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Clock } from "lucide-react";
import {
  getPostById,
  getPostsByLabel,
  getCoverImage,
  getExcerpt,
  getReadingTime,
} from "@/lib/blogger";
import { extractHeadings, addHeadingIds, formatDate } from "@/lib/utils";
import { ReadingProgressBar } from "@/components/blog/ReadingProgressBar";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { AuthorBox } from "@/components/blog/AuthorBox";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { CopyCodeButtons } from "@/components/blog/CopyCodeButtons";
import { NewsletterSignup } from "@/components/common/NewsletterSignup";
import { AdBanner } from "@/components/common/AdBanner";
import { siteConfig } from "@/config/social";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const post = await getPostById(id);
    if (!post) return {};
    const excerpt = getExcerpt(post.content, 160);
    const cover = getCoverImage(post);
    return {
      title: post.title,
      description: excerpt,
      openGraph: {
        title: post.title,
        description: excerpt,
        images: [{ url: cover }],
        type: "article",
        publishedTime: post.published,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: excerpt,
        images: [cover],
      },
    };
  } catch {
    return {};
  }
}

export default async function PostPage({ params }: PageProps) {
  const { id } = await params;

  let post;
  try {
    post = await getPostById(id);
  } catch {
    notFound();
  }
  if (!post) notFound();

  const headings = extractHeadings(post.content);
  const contentWithIds = addHeadingIds(post.content);
  const readingTime = getReadingTime(post.content);
  const cover = getCoverImage(post);
  const postUrl = `${siteConfig.url}/blog/${post.id}`;
  const category = post.labels?.[0];

  let related: Awaited<ReturnType<typeof getPostsByLabel>> = [];
  if (category) {
    try {
      related = (await getPostsByLabel(category)).filter((p) => p.id !== post.id);
    } catch {
      related = [];
    }
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: [cover],
    datePublished: post.published,
    dateModified: post.updated,
    author: [{ "@type": "Person", name: post.author?.displayName }],
  };

  return (
    <div className="overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgressBar />
      <CopyCodeButtons />

      {/* Cover image */}
      <div className="relative w-full overflow-hidden bg-accent-soft" style={{ aspectRatio: "21/7" }}>
        <Image
          src={cover}
          alt={post.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Post header */}
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        {category && (
          <span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
            {category}
          </span>
        )}
        <h1 className="mt-4 font-display text-2xl font-bold leading-tight text-foreground sm:text-3xl lg:text-4xl">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted">
          <div className="flex items-center gap-2">
            {post.author?.image?.url && (
              <Image
                src={post.author.image.url}
                alt={post.author.displayName}
                width={24}
                height={24}
                className="rounded-full"
              />
            )}
            <span>{post.author?.displayName}</span>
          </div>
          <span>{formatDate(post.published)}</span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {readingTime}
          </span>
        </div>
        <div className="mt-4">
          <ShareButtons url={postUrl} title={post.title} />
        </div>
      </div>

      {/* Content + sidebar grid */}
      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
          {/* Main content — minmax(0,1fr) is critical: lets it shrink below intrinsic width */}
          <div className="min-w-0">
            {/* TOC on mobile only */}
            {headings.length > 0 && (
              <div className="mb-8 lg:hidden">
                <TableOfContents headings={headings} />
              </div>
            )}

            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: contentWithIds }}
            />

            <div className="my-10">
              <AdBanner />
            </div>

            <AuthorBox
              name={post.author?.displayName}
              avatarUrl={post.author?.image?.url}
            />

            <div className="mt-10">
              <NewsletterSignup />
            </div>

            <RelatedPosts posts={related} />
          </div>

          {/* Sidebar TOC — desktop only */}
          {headings.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents headings={headings} />
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}

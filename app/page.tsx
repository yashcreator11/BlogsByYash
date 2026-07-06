import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { PostGrid } from "@/components/blog/PostGrid";
import { NewsletterSignup } from "@/components/common/NewsletterSignup";
import { AdBanner } from "@/components/common/AdBanner";
import { getAllPosts } from "@/lib/blogger";
import type { BlogPost } from "@/types";

async function getHomeData(): Promise<{ posts: BlogPost[]; error: boolean }> {
  try {
    const { posts } = await getAllPosts(7);
    return { posts, error: false };
  } catch {
    return { posts: [], error: true };
  }
}

export default async function Home() {
  const { posts, error } = await getHomeData();
  const [featured, ...recent] = posts;

  return (
    <div className="overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-14 sm:pt-20 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Yash Khandagale
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            Software Engineer building backend systems that hold up in production.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            I&apos;m a Software Engineer who designs and ships REST APIs,
            event-driven microservices, and full-stack web applications —
            using ASP.NET Core, React/TypeScript, and Python. I care about
            clean architecture, resilient service-to-service communication,
            observability, and test coverage that actually catches bugs.
            This blog is where I document the architecture decisions,
            production failure modes, and hard-won lessons along the way.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Read the blog
              <ArrowRight size={15} />
            </Link>
            <a
              href="https://yashkhandagale.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Portfolio ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── Blogger not configured yet ───────────────── */}
      {error && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-xl border border-dashed border-border bg-card p-6 text-sm text-muted">
            Blog posts will appear here once your Blogger API key and blog ID are
            set in your environment variables.
          </div>
        </section>
      )}

      {/* ── Featured post ────────────────────────────── */}
      {featured && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6">
          <FeaturedPost post={featured} />
        </section>
      )}

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <AdBanner className="mx-auto" />
      </div>

      {/* ── Recent posts ─────────────────────────────── */}
      {recent.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">
              Recent posts
            </h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-accent hover:underline"
            >
              View all
            </Link>
          </div>
          <PostGrid posts={recent.slice(0, 6)} />
        </section>
      )}

      {/* ── About snippet ────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="rounded-xl border border-border bg-card p-6 sm:p-10">
          <h2 className="font-display text-xl font-bold text-foreground">
            What I work on
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            I build REST APIs and event-driven microservices with ASP.NET Core,
            backed by message queues like RabbitMQ for async, decoupled
            communication between services. On the frontend, I build React
            (TypeScript) applications with real-time dashboards and role-based
            access control. I focus on making systems observable and resilient —
            structured logging, distributed tracing, circuit breakers, and
            automated testing baked into the CI pipeline from day one.
          </p>
          <div className="mt-5 flex flex-wrap gap-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
            >
              More about me <ArrowRight size={14} />
            </Link>
            <a
              href="https://yashkhandagale.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-accent"
            >
              Full portfolio ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <NewsletterSignup />
      </section>
    </div>
  );
}
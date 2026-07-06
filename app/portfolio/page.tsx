import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects, allTechStacks } from "@/config/projects";
import { PortfolioListClient } from "@/components/portfolio/PortfolioListClient";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Projects by Yash Khandagale — microservices, full-stack web apps, and backend systems.",
};

export default function PortfolioPage() {
  return (
    <div className="overflow-x-hidden">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Portfolio
          </h1>
          <p className="mt-2 max-w-xl text-muted">
            Systems I&apos;ve built — from backend microservices to full-stack web apps to data-driven pipelines.
          </p>
        </div>

        <PortfolioListClient projects={projects} techStacks={allTechStacks} />

        <div className="mt-16 rounded-xl border border-border bg-card p-8 text-center sm:p-10">
          <h2 className="font-display text-xl font-bold text-foreground">
            Have a hard problem?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-muted">
            Open to full-time roles in backend engineering, distributed systems,
            or full-stack development. Remote-friendly.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Get in touch
              <ArrowRight size={15} />
            </Link>
            <a
              href="https://yashkhandagale.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Full portfolio ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
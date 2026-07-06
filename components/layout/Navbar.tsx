"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ExternalLink, Github, Menu, Search, X } from "lucide-react";
import { DarkModeToggle } from "@/components/common/DarkModeToggle";
import { socialLinks } from "@/config/social";
import { siteConfig } from "@/config/social";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 nav-glass transition-colors duration-300">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="shrink-0 font-display text-lg font-bold tracking-tight text-foreground"
        >
          {siteConfig.name}
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground",
                  isActive && "text-foreground"
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute inset-x-3 -bottom-[1px] h-0.5 rounded-full bg-accent" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/blog"
            aria-label="Search posts"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-accent-soft hover:text-accent sm:flex"
          >
            <Search size={16} />
          </Link>
          <a
            href="https://yashkhandagale.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-accent sm:flex"
          >
            <ExternalLink size={12} />
            Portfolio
          </a>
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-accent-soft hover:text-accent sm:flex"
          >
            <Github size={16} />
          </a>
          <DarkModeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-accent-soft hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://yashkhandagale.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-accent-soft hover:text-accent"
            >
              <ExternalLink size={13} />
              Portfolio ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

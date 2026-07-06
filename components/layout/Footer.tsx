import Link from "next/link";
import { SocialLinks } from "@/components/common/SocialLinks";
import { NewsletterSignup } from "@/components/common/NewsletterSignup";
import { siteConfig } from "@/config/social";
// ExternalLink used inline via text arrow ↗ — no icon import needed

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link href="/" className="font-display text-lg font-bold text-foreground">
              {siteConfig.name}
            </Link>
            <p className="mt-2 max-w-xs text-sm text-muted">
              {siteConfig.description}
            </p>
            <NewsletterSignup variant="inline" className="mt-4" />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Quick links</h4>
            <ul className="mt-3 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Find me elsewhere</h4>
            <SocialLinks className="mt-3" />
            <a
              href="https://yashkhandagale.in"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
            >
              yashkhandagale.in ↗
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-sm text-muted sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Built with Next.js &amp; ❤️</p>
        </div>
      </div>
    </footer>
  );
}

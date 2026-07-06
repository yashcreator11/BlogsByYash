import { Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react";
import { socialLinks } from "@/config/social";
import { cn } from "@/lib/utils";

const items = [
  { href: socialLinks.github, label: "GitHub", Icon: Github },
  { href: socialLinks.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: socialLinks.twitter, label: "Twitter / X", Icon: Twitter },
  { href: socialLinks.instagram, label: "Instagram", Icon: Instagram },
  { href: socialLinks.email, label: "Email", Icon: Mail },
];

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {items.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel="noopener noreferrer"
          aria-label={label}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
        >
          <Icon size={16} />
        </a>
      ))}
    </div>
  );
}

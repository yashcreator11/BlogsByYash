import Image from "next/image";
import { SocialLinks } from "@/components/common/SocialLinks";

interface AuthorBoxProps {
  name: string;
  avatarUrl?: string;
}

export function AuthorBox({ name, avatarUrl }: AuthorBoxProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:p-6">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-accent-soft">
        {avatarUrl ? (
          <Image src={avatarUrl} alt={name} fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display text-xl font-bold text-accent">
            {name?.[0] ?? "?"}
          </div>
        )}
      </div>
      <div className="flex-1">
        <p className="text-xs uppercase tracking-wide text-muted">Written by</p>
        <h3 className="font-display text-lg font-bold text-foreground">{name}</h3>
        <p className="mt-1 text-sm text-muted">
          Software Engineer building microservices, REST APIs, and full-stack
          web applications.{" "}
          <a
            href="https://yashkhandagale.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            yashkhandagale.in ↗
          </a>
        </p>
        <SocialLinks className="mt-3" />
      </div>
    </div>
  );
}
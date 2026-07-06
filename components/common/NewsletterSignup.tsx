"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsletterSignupProps {
  variant?: "inline" | "box";
  className?: string;
}

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterSignup({
  variant = "box",
  className,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setMessage("You're subscribed. Check your inbox for a welcome email.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className={cn("flex w-full max-w-sm flex-col gap-2 sm:flex-row", className)}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="w-full rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === "loading" ? <Loader2 className="mx-auto animate-spin" size={16} /> : "Subscribe"}
        </button>
      </form>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-6 sm:p-8 text-center transition-colors duration-300",
        className
      )}
    >
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
        <Mail size={20} />
      </div>
      <h3 className="font-display text-xl font-bold text-foreground">
        Get new posts in your inbox
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
        No spam, just a note whenever I publish something new. Unsubscribe anytime.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-5 flex max-w-sm flex-col gap-2 sm:flex-row"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="w-full rounded-full border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === "loading" ? (
            <Loader2 className="mx-auto animate-spin" size={16} />
          ) : (
            "Subscribe"
          )}
        </button>
      </form>
      {message && (
        <p
          className={cn(
            "mt-3 text-sm",
            status === "success" ? "text-accent" : "text-red-500"
          )}
        >
          {message}
        </p>
      )}
    </div>
  );
}

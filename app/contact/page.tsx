import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/common/ContactForm";
import { SocialLinks } from "@/components/common/SocialLinks";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Yash Khandagale.",
};

export default function ContactPage() {
  return (
    <div className="overflow-x-hidden">
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
          Get in touch
        </h1>
        <p className="mt-2 max-w-xl text-muted">
          Open to full-time roles in backend engineering, distributed systems,
          or full-stack development. Remote-friendly. Got a hard problem?
          Let&apos;s solve it together.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_280px]">
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
          <ContactForm />
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Mail size={15} />
              Email
            </div>
            <a
              href="mailto:yashkhandagale9619@gmail.com"
              className="mt-1.5 block text-sm text-accent hover:underline"
            >
              yashkhandagale9619@gmail.com
            </a>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <MapPin size={15} />
              Location
            </div>
            <p className="mt-1.5 text-sm text-muted">Mumbai, India · Remote-friendly</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-semibold text-foreground">Find me elsewhere</p>
            <SocialLinks className="mt-3" />
            <a
              href="https://yashkhandagale.in"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block text-sm font-medium text-accent hover:underline"
            >
              yashkhandagale.in ↗
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
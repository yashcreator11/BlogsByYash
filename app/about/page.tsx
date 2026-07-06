import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, ExternalLink } from "lucide-react";
import { SocialLinks } from "@/components/common/SocialLinks";

export const metadata: Metadata = {
  title: "About",
  description:
    "Yash Khandagale — Software Engineer building microservices, REST APIs, and full-stack web applications.",
};

const skills = [
  "C# / ASP.NET Core",
  "TypeScript / React",
  "Python / Django / Flask",
  "Java",
  "REST APIs",
  "Clean Architecture",
  "EF Core",
  "RabbitMQ",
  "SignalR",
  "SQL Server / MySQL",
  "MongoDB",
  "Docker",
  "GitHub Actions CI/CD",
  "OpenTelemetry",
  "xUnit / Testing",
];

const timeline = [
  {
    period: "2025 – Present",
    title: "Software Engineer",
    place: "Full-time · India",
    description:
      "Designing and shipping REST APIs and event-driven microservices with ASP.NET Core. Built a RabbitMQ pub/sub event mesh with retry and circuit-breaker patterns, secured services with JWT + RBAC, and added OpenTelemetry distributed tracing to keep p95 API latency under 50ms. Built React (TypeScript) frontends with real-time dashboards and role-based access control, and maintained 80%+ test coverage with xUnit. Integrated static analysis and code-quality gates into a GitHub Actions CI pipeline.",
  },
  {
    period: "Jun 2024 – Jul 2024",
    title: "Java Developer Intern",
    place: "Java Sparx Solution · Thane, India",
    description:
      "Built a Java desktop application with persistent storage and a JSP web portal on Apache Tomcat. Integrated email workflows; applied SOLID principles throughout.",
  },
  {
    period: "2021 – 2025",
    title: "B.E. Computer Engineering · CGPA 7.92",
    place: "Watumull Institute of Engineering & Technology, Mumbai",
    description:
      "Led a 50+ member student council, organising 10+ events with 300+ participants. Google Data Analytics Professional certification (Coursera, Dec 2024).",
  },
];

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden">
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
        <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full bg-accent-soft">
          <Image
            src="/avatar.jpg"
            alt="Yash Khandagale"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Yash Khandagale
          </h1>
          <p className="mt-1 text-muted">
            Software Engineer · Microservices &amp; Full-Stack · Mumbai, India
          </p>
          <SocialLinks className="mt-4 justify-center sm:justify-start" />
        </div>
      </div>

      <div className="mt-10 space-y-4 text-muted">
        <p>
          I design and ship systems that work in production — REST APIs,
          event-driven microservices, and full-stack web applications built
          with ASP.NET Core, React (TypeScript), and Python. I&apos;m
          comfortable owning a service end to end: architecture, async
          messaging, security, testing, and the CI/CD pipeline that ships it.
        </p>
        <p>
          This blog is where I write about the engineering decisions, failure
          modes, and lessons learned along the way — microservice patterns,
          reliable async communication, clean architecture, and building
          systems that hold up under real production load.
        </p>
        <p>
          I care about reliability, observability, and clean service boundaries.
          If you can&apos;t see it, you can&apos;t trust it; if you can&apos;t
          reason about its failure modes, you shouldn&apos;t ship it.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-xl font-bold text-foreground">Stack</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-border px-3 py-1.5 text-sm text-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-xl font-bold text-foreground">Experience</h2>
        <div className="mt-4 space-y-6 border-l border-border pl-6">
          {timeline.map((item) => (
            <div key={item.title} className="relative">
              <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
              <p className="text-xs font-medium uppercase tracking-wide text-accent">
                {item.period}
              </p>
              <h3 className="mt-1 font-display text-base font-bold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-muted">{item.place}</p>
              <p className="mt-1 text-sm text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
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
          <ExternalLink size={15} />
          Full portfolio
        </a>
        <a
          href="https://yashkhandagale.in/Yash_Khandagale_Resume_v2.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          <Download size={15} />
          Download resume
        </a>
      </div>
    </div>
    </div>
  );
}
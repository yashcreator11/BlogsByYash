import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-accent/5">
      {project.image && (
        <div className="relative aspect-video w-full overflow-hidden bg-accent-soft">
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-foreground">{project.name}</h3>
        <p className="mt-2 text-sm text-muted line-clamp-2">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
            >
              <Github size={15} />
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
            >
              <ExternalLink size={15} />
              Live demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

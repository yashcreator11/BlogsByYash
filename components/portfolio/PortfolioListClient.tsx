"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import type { Project } from "@/types";

interface PortfolioListClientProps {
  projects: Project[];
  techStacks: string[];
}

export function PortfolioListClient({ projects, techStacks }: PortfolioListClientProps) {
  const [tech, setTech] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!tech) return projects;
    return projects.filter((p) => p.techStack.includes(tech));
  }, [projects, tech]);

  return (
    <div>
      <CategoryFilter categories={techStacks} active={tech} onChange={setTech} />

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-border py-16 text-center">
          <p className="text-muted">No projects match that filter.</p>
        </div>
      )}
    </div>
  );
}

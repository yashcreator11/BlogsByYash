"use client";

import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  active: string | null;
  onChange: (category: string | null) => void;
}

export function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onChange(null)}
        className={cn(
          "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
          active === null
            ? "border-accent bg-accent text-accent-foreground"
            : "border-border text-muted hover:border-accent hover:text-accent"
        )}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
            active === category
              ? "border-accent bg-accent text-accent-foreground"
              : "border-border text-muted hover:border-accent hover:text-accent"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

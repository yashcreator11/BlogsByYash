"use client";

import { useEffect } from "react";

/**
 * Scans rendered post content for <pre><code> blocks and injects a
 * "Copy" button into each one. Runs after the HTML has been painted.
 */
export function CopyCodeButtons() {
  useEffect(() => {
    const blocks = document.querySelectorAll(".post-content pre");

    blocks.forEach((block) => {
      if (block.querySelector(".copy-code-btn")) return;

      const button = document.createElement("button");
      button.type = "button";
      button.className =
        "copy-code-btn absolute right-2 top-2 rounded-md border border-border bg-card px-2 py-1 text-xs text-muted transition-colors hover:text-accent";
      button.textContent = "Copy";

      button.addEventListener("click", async () => {
        const code = block.querySelector("code")?.textContent || block.textContent || "";
        try {
          await navigator.clipboard.writeText(code);
          button.textContent = "Copied!";
          setTimeout(() => (button.textContent = "Copy"), 1500);
        } catch {
          button.textContent = "Failed";
        }
      });

      (block as HTMLElement).style.position = "relative";
      block.appendChild(button);
    });
  }, []);

  return null;
}

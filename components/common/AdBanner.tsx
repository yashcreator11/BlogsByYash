"use client";

import { useEffect, useRef } from "react";

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdBannerProps {
  slot?: string;
  className?: string;
}

export function AdBanner({ slot, className }: AdBannerProps) {
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!ADSENSE_ID || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense script not yet loaded — safe to ignore.
    }
  }, []);

  if (!ADSENSE_ID) return null;

  return (
    <div className={className} aria-label="Advertisement">
      <ins
        ref={ref}
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

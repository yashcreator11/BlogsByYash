export function PostCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="skeleton aspect-[16/10] w-full" />
      <div className="p-5">
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="skeleton mt-3 h-4 w-full rounded" />
        <div className="skeleton mt-2 h-4 w-2/3 rounded" />
        <div className="skeleton mt-4 h-3 w-1/2 rounded" />
      </div>
    </div>
  );
}

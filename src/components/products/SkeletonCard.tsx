const SkeletonCard = () => (
  <div className="bg-card rounded-xl overflow-hidden border border-border">
    <div className="aspect-square bg-gradient-to-r from-secondary via-secondary/50 to-secondary animate-shimmer bg-[length:200%_100%]" />
    <div className="p-4 space-y-3">
      <div className="h-3 w-16 bg-secondary rounded animate-shimmer bg-[length:200%_100%]" />
      <div className="h-4 w-3/4 bg-secondary rounded animate-shimmer bg-[length:200%_100%]" />
      <div className="h-3 w-20 bg-secondary rounded animate-shimmer bg-[length:200%_100%]" />
      <div className="h-5 w-16 bg-secondary rounded animate-shimmer bg-[length:200%_100%]" />
    </div>
  </div>
);

export default SkeletonCard;

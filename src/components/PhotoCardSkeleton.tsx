export const PhotoCardSkeleton = () => {
  return (
    <div className="group relative aspect-[4/5] overflow-hidden bg-neutral-100">
      <div className="absolute inset-0 animate-pulse bg-neutral-200"></div>
    </div>
  );
};

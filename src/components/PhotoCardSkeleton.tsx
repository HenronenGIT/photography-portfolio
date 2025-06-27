export const PhotoCardSkeleton = () => {
    return (
      <div className="group relative overflow-hidden bg-neutral-100 aspect-[4/5]">
        <div className="absolute inset-0 bg-neutral-200 animate-pulse"></div>
      </div>
    );
};
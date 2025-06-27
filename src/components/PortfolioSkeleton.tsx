import { PhotoCardSkeleton } from "./PhotoCardSkeleton";

export const PortfolioSkeleton = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 bg-white shadow-md dark:bg-gray-950">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="h-8 w-48 bg-neutral-200 rounded animate-pulse"></div>
            <div className="h-8 w-32 bg-neutral-200 rounded animate-pulse"></div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <PhotoCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
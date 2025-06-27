
import { Button } from '@/components/ui/button';

interface FilterBarProps {
  categories: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterBar = ({ categories, activeFilter, onFilterChange }: FilterBarProps) => {
  return (
    <div className="flex flex-wrap gap-1 justify-center mb-16">
      {categories.map((category, index) => (
        <div key={category} className="relative">
          <button
            onClick={() => onFilterChange(category)}
            className={`px-6 py-2 text-sm font-light tracking-wide transition-all duration-300 border-none bg-transparent ${
              activeFilter === category
                ? 'text-neutral-900 font-normal'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            {category}
          </button>
          {activeFilter === category && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-px bg-neutral-900"></div>
          )}
          {index < categories.length - 1 && (
            <span className="absolute -right-0.5 top-1/2 transform -translate-y-1/2 text-neutral-300">
              /
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterBar;

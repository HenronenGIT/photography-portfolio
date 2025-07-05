import { Button } from '@/components/ui/button'

interface FilterBarProps {
  categories: string[]
  activeFilter: string
  onFilterChange: (filter: string) => void
}

const FilterBar = ({
  categories,
  activeFilter,
  onFilterChange,
}: FilterBarProps) => {
  return (
    <div className="mb-16 flex flex-wrap justify-center gap-1">
      {categories.map((category, index) => (
        <div key={category} className="relative">
          <button
            onClick={() => onFilterChange(category)}
            className={`border-none bg-transparent px-6 py-2 text-sm font-light tracking-wide transition-all duration-300 ${
              activeFilter === category
                ? 'font-normal text-neutral-900'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            {category}
          </button>
          {activeFilter === category && (
            <div className="absolute -bottom-1 left-1/2 h-px w-4 -translate-x-1/2 transform bg-neutral-900"></div>
          )}
          {index < categories.length - 1 && (
            <span className="absolute -right-0.5 top-1/2 -translate-y-1/2 transform text-neutral-300">
              /
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

export default FilterBar

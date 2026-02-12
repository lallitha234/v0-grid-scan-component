'use client';

import { cn } from '@/lib/utils';

type FilterType = 'all' | 'active' | 'completed' | 'high';

interface TaskFilterProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function TaskFilter({ activeFilter, onFilterChange }: TaskFilterProps) {
  const filters: { label: string; value: FilterType }[] = [
    { label: 'All Tasks', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
    { label: 'High Priority', value: 'high' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            'px-4 py-2 rounded-lg font-medium transition-all duration-300',
            activeFilter === filter.value
              ? 'bg-accent text-accent-foreground shadow-[0_0_15px_rgba(255,159,252,0.3)]'
              : 'border border-border text-muted-foreground hover:border-accent/50 hover:text-foreground'
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

// Union Type: Only these three strings are allowed
export type FilterType = "all" | "active" | "completed";

interface TaskFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
}

function TaskFilter({ currentFilter, onFilterChange, activeCount }: TaskFilterProps) {
  const filters: { value: FilterType; label: string }[] = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" }
  ];

  return (
    <div className="flex items-center justify-between py-1 text-sm text-ink-muted">
      <span>
        {activeCount} {activeCount === 1 ? "task" : "tasks"} remaining
      </span>

      <div className="flex gap-4">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`pb-0.5 border-b-2 transition-colors ${
              currentFilter === filter.value
                ? "text-ink border-gold font-medium"
                : "border-transparent hover:text-ink"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TaskFilter;

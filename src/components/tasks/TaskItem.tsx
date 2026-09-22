import type { Task } from "../../types/task";
import { TrashIcon } from "../icons/TrashIcon";

// Notice the { task }: { task: Task } syntax
// This tells TypeScript: "This component expects a prop called 'task' that matches our Task interface"
interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className="group flex items-center justify-between gap-3 py-3.5 border-b border-rule first:border-t">
      <label className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="peer appearance-none relative w-4.5 h-4.5 shrink-0 rounded-full border-[1.5px] border-ink-muted checked:bg-accent checked:border-accent cursor-pointer transition-colors after:content-[''] after:hidden after:absolute after:left-1.25 after:top-px after:w-1.25 after:h-2.25 after:border-2 after:border-white after:border-l-0 after:border-t-0 after:rotate-45 checked:after:block"
        />
        <span
          className={`text-base truncate ${
            task.completed ? "text-ink-muted line-through" : "text-ink"
          }`}
        >
          {task.text}
        </span>
      </label>
      <button
        onClick={() => onDelete(task.id)}
        className="text-ink-muted hover:text-danger opacity-100 md:opacity-0 md:group-hover:opacity-100 focus-visible:opacity-100 transition-opacity p-1"
        aria-label="Delete task"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </li>
  );
}

export default TaskItem;

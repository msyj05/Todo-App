import type { Task } from "../../types/task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  visibleTasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TaskList({ tasks, visibleTasks, onToggle, onDelete }: TaskListProps) {
  if (visibleTasks.length === 0) {
    return (
      <p className="text-center text-sm text-ink-muted py-8">
        {tasks.length === 0
          ? "No tasks yet. Add one above!"
          : "No tasks match this filter."}
      </p>
    );
  }

  return (
    <ul className="list-none m-0 p-0">
      {visibleTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;

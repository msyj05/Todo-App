import { useState } from "react";

interface TaskInputProps {
  onAddTask: (text: string) => void;
}

function TaskInput({ onAddTask }: TaskInputProps) {
  // TypeScript knows this is a string
  const [inputValue, setInputValue] = useState<string>("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = inputValue.trim();

    if (trimmed) {
      onAddTask(trimmed);
      setInputValue("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 mb-8">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 min-w-0 border-0 border-b border-rule bg-transparent py-2.5 px-0.5 text-base text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none transition-colors"
      />
      <button
        type="submit"
        className="border-0 bg-accent hover:bg-accent-dark text-white text-sm font-medium px-4 py-2.5 rounded whitespace-nowrap transition-colors"
      >
        + Add Task
      </button>
    </form>
  );
}

export default TaskInput;

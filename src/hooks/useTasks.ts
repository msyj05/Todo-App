import { useState, useEffect } from "react";
import { toast } from "sonner"; // <-- We added this import
import type { User } from "@supabase/supabase-js";
import type { Task } from "../types/task";
import type { FilterType } from "../components/tasks/TaskFilter";
import {
  fetchTasks,
  addTask,
  updateTaskCompleted,
  deleteTask,
  deleteTasks,
} from "../services/taskService";

export function useTasks(user: User | null) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function loadTasks() {
      setIsLoading(true);
      const { tasks: fetchedTasks, error } = await fetchTasks();

      if (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Failed to load tasks."); // <-- Added toast
      } else if (fetchedTasks) {
        setTasks(fetchedTasks);
      }
      setIsLoading(false);
    }

    loadTasks();
  }, [user]);

  async function handleAddTask(text: string) {
    if (!user) return;

    const { task, error } = await addTask(text, user.id);

    if (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task."); // <-- Added toast
    } else if (task) {
      setTasks((prev) => [task, ...prev]);
      toast.success("Task added!"); // <-- Added toast
    }
  }

  async function handleToggle(id: string) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const newStatus = !task.completed;
    const { error } = await updateTaskCompleted(id, newStatus);

    if (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task."); // <-- Added toast
    } else {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: newStatus } : t))
      );
    }
  }

  async function handleDelete(id: string) {
    const { error } = await deleteTask(id);

    if (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task."); // <-- Added toast
    } else {
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.success("Task deleted."); // <-- Added toast
    }
  }

  async function handleClearCompleted() {
    const completedIds = tasks.filter((t) => t.completed).map((t) => t.id);
    if (completedIds.length === 0) return;

    const { error } = await deleteTasks(completedIds);

    if (error) {
      console.error("Error clearing completed:", error);
      toast.error("Failed to clear tasks."); // <-- Added toast
    } else {
      setTasks((prev) => prev.filter((t) => !t.completed));
      toast.success(`Cleared ${completedIds.length} task(s).`); // <-- Added toast
    }
  }

  const visibleTasks: Task[] = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return {
    tasks,
    filter,
    setFilter,
    isLoading,
    visibleTasks,
    activeCount,
    completedCount,
    handleAddTask,
    handleToggle,
    handleDelete,
    handleClearCompleted,
  };
}
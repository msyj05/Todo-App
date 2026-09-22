import { supabase } from "../lib/supabase";
import type { Task } from "../types/task";

// Helper to map database rows to our frontend Task type
type TaskRow = {
  id: string;
  text: string;
  completed: boolean;
  created_at: string;
  user_id?: string;
};

function mapRowToTask(row: TaskRow): Task {
  return {
    id: row.id,
    text: row.text,
    completed: row.completed,
    createdAt: new Date(row.created_at),
  };
}

// 1. FETCH
export async function fetchTasks() {
  // RLS will automatically filter this to ONLY return tasks where user_id = current user
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return { tasks: null, error };
  }

  const tasks: Task[] = (data || []).map(mapRowToTask);
  return { tasks, error: null };
}

// 2. ADD
export async function addTask(text: string, userId: string) {
  const { data, error } = await supabase
    .from("tasks")
    .insert([
      { 
        text, 
        completed: false, 
        user_id: userId // <-- THIS IS THE MAGIC LINE THAT ENFORCES RLS
      }
    ])
    .select()
    .single(); // .single() ensures we get the one newly created row back

  if (error) {
    return { task: null, error };
  }

  const task: Task = mapRowToTask(data);
  return { task, error: null };
}

// 3. UPDATE (Toggle)
export async function updateTaskCompleted(id: string, completed: boolean) {
  const { error } = await supabase
    .from("tasks")
    .update({ completed })
    .eq("id", id);

  return { error };
}

// 4. DELETE (Single)
export async function deleteTask(id: string) {
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id);

  return { error };
}

// 5. DELETE (Multiple - for Clear Completed)
export async function deleteTasks(ids: string[]) {
  const { error } = await supabase
    .from("tasks")
    .delete()
    .in("id", ids);

  return { error };
}

// 1. What our React app uses
export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

// 2. What Supabase returns (snake_case, string dates)
export interface TaskRow {
  id: string;
  text: string;
  completed: boolean;
  created_at: string; 
}

// 3. A safe converter function
export function rowToTask(row: TaskRow): Task {
  return {
    id: row.id,
    text: row.text,
    completed: row.completed,
    createdAt: new Date(row.created_at)
  };
}

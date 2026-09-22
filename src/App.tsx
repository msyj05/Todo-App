import { useState } from "react";
import { toast } from "sonner";
import { AuthScreen } from "./components/auth/AuthScreen";
import { ListChecksIcon } from "./components/icons/ListChecksIcon";
import TaskInput from "./components/tasks/TaskInput";
import TaskList from "./components/tasks/TaskList";
import TaskFilter from "./components/tasks/TaskFilter";
import ConfirmModal from "./components/common/ConfirmModal";
import { useAuth } from "./hooks/useAuth";
import { useTasks } from "./hooks/useTasks";
import { supabase } from "./lib/supabase";

function App() {
  const { user, loading: authLoading } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const {
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
  } = useTasks(user);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <p className="text-ink-muted text-lg">Checking authentication...</p>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <p className="text-ink-muted text-lg">Loading your tasks...</p>
      </div>
    );
  }

  const fullName =
    typeof user.user_metadata?.full_name === "string" ? user.user_metadata.full_name : undefined;

  return (
    <div className="min-h-screen bg-paper flex justify-center">
      <div className="w-full max-w-lg px-6 py-16 pb-36">
        <header className="border-b border-rule pb-5 mb-7 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-accent">
              <ListChecksIcon className="w-10 h-10" />
            </div>
            <div>
              <h1 className="font-serif text-4xl font-semibold tracking-tight text-ink mb-1.5">
                My TS Todo App
              </h1>
              <p className="text-sm text-ink-muted">
                Welcome, {fullName || user.email || "User"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="text-sm text-ink-muted hover:text-danger transition-colors"
          >
            Log Out
          </button>
        </header>

        <TaskInput onAddTask={handleAddTask} />

        <TaskList
          tasks={tasks}
          visibleTasks={visibleTasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </div>

      {tasks.length > 0 && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg px-6 py-2 bg-paper/95 backdrop-blur-sm border-t border-rule shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <TaskFilter
            currentFilter={filter}
            onFilterChange={setFilter}
            activeCount={activeCount}
          />

          {completedCount > 0 && (
            <div className="text-right mt-2">
              <button
                onClick={handleClearCompleted}
                className="text-xs text-ink-muted hover:text-danger transition-colors"
              >
                Clear {completedCount} completed {completedCount === 1 ? "task" : "tasks"}
              </button>
            </div>
          )}
        </div>
      )}

      <ConfirmModal
        open={showLogoutConfirm}
        title="Log out?"
        message="You'll need to sign in again to see your tasks."
        confirmLabel="Log Out"
        cancelLabel="Cancel"
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={async () => {
          setShowLogoutConfirm(false);
          await supabase.auth.signOut();
          toast.success("Logged out successfully.");
        }}
      />
    </div>
  );
}

export default App;
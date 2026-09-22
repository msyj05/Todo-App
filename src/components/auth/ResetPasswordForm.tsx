import { ListChecksIcon } from "../icons/ListChecksIcon";
import PasswordInput from "./PasswordInput";

interface ResetPasswordFormProps {
  password: string;
  onPasswordChange: (value: string) => void;
  showPassword: boolean;
  onToggleShowPassword: () => void;
  error: string | null;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

function ResetPasswordForm({
  password,
  onPasswordChange,
  showPassword,
  onToggleShowPassword,
  error,
  loading,
  onSubmit,
}: ResetPasswordFormProps) {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface rounded-2xl shadow-xl p-8 border border-rule">
        <div className="flex flex-col items-center mb-8">
          <div className="text-accent mb-4">
            <ListChecksIcon className="w-12 h-12" />
          </div>
          <h2 className="font-serif text-3xl font-semibold text-ink">Reset Password</h2>
          <p className="text-sm text-ink-muted mt-2 text-center">
            Enter your new password below.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {error && <div className="bg-danger/10 text-danger text-sm p-3 rounded-lg">{error}</div>}

          <div>
            <label className="block text-sm font-medium text-ink mb-1">New Password</label>
            <PasswordInput
              value={password}
              onChange={onPasswordChange}
              showPassword={showPassword}
              onToggleShowPassword={onToggleShowPassword}
              required
              minLength={6}
            />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50">
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordForm;

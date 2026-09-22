import { ListChecksIcon } from "../icons/ListChecksIcon";
import PasswordInput from "./PasswordInput";

interface SignupFormProps {
  fullName: string;
  onFullNameChange: (value: string) => void;
  email: string;
  onEmailChange: (value: string) => void;
  password: string;
  onPasswordChange: (value: string) => void;
  showPassword: boolean;
  onToggleShowPassword: () => void;
  error: string | null;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onSwitchToLogin: () => void;
}

function SignupForm({
  fullName,
  onFullNameChange,
  email,
  onEmailChange,
  password,
  onPasswordChange,
  showPassword,
  onToggleShowPassword,
  error,
  loading,
  onSubmit,
  onSwitchToLogin,
}: SignupFormProps) {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface rounded-2xl shadow-xl p-8 border border-rule">
        <div className="flex flex-col items-center mb-8">
          <div className="text-accent mb-4">
            <ListChecksIcon className="w-12 h-12" />
          </div>
          <h2 className="font-serif text-3xl font-semibold text-ink">Create Account</h2>
          <p className="text-sm text-ink-muted mt-2">Sign up to get started</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {error && <div className="bg-danger/10 text-danger text-sm p-3 rounded-lg">{error}</div>}

          <div>
            <label className="block text-sm font-medium text-ink mb-1">Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => onFullNameChange(e.target.value.replace(/[0-9]/g, ''))}
              className="w-full px-4 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-transparent text-ink"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              className="w-full px-4 py-2 border border-rule rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-transparent text-ink"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">Password</label>
            <PasswordInput
              value={password}
              onChange={onPasswordChange}
              showPassword={showPassword}
              onToggleShowPassword={onToggleShowPassword}
              required
              minLength={6}
            />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? "Processing..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-sm text-accent hover:text-accent-dark font-medium transition-colors"
          >
            Already have an account? Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;

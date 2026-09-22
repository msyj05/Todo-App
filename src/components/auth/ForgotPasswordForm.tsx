import { ListChecksIcon } from "../icons/ListChecksIcon";

interface ForgotPasswordFormProps {
  email: string;
  onEmailChange: (value: string) => void;
  error: string | null;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

function ForgotPasswordForm({
  email,
  onEmailChange,
  error,
  loading,
  onSubmit,
  onBack,
}: ForgotPasswordFormProps) {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface rounded-2xl shadow-xl p-8 border border-rule">
        <div className="flex flex-col items-center mb-8">
          <div className="text-accent mb-4">
            <ListChecksIcon className="w-12 h-12" />
          </div>
          <h2 className="font-serif text-3xl font-semibold text-ink">Forgot Password?</h2>
          <p className="text-sm text-ink-muted mt-2 text-center">
            Enter your email and we'll send you a reset link.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {error && <div className="bg-danger/10 text-danger text-sm p-3 rounded-lg">{error}</div>}

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

          <button type="submit" disabled={loading} className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50">
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <button
            type="button"
            onClick={onBack}
            className="w-full text-sm text-ink-muted hover:text-ink transition-colors"
          >
            ← Back to Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;

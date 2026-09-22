import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";

export function AuthScreen() {
  const [isResetting, setIsResetting] = useState(() => {
    return typeof window !== "undefined" && window.location.hash.includes("type=recovery");
  });

  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showForgotLink, setShowForgotLink] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isResetting) {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;

        toast.success("Password updated! Please log in.");
        window.location.hash = "";
        setIsResetting(false);
        setPassword("");
        setIsLogin(true);
      } else if (isForgotPassword) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin,
        });
        if (error) throw error;

        toast.success("Reset link sent! Check your email.");
        setIsForgotPassword(false);
        setEmail("");
      } else if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        // Track whether this is the very first successful login for this account,
        // using a flag we set ourselves in user_metadata (Supabase doesn't expose
        // this directly — last_sign_in_at is already updated to "now" by this point).
        const isFirstLogin = !data.user?.user_metadata?.has_logged_in_before;

        if (isFirstLogin) {
          toast.success("Login successful!");
          await supabase.auth.updateUser({
            data: { has_logged_in_before: true },
          });
        } else {
          toast.success("Welcome back!");
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        });
        if (error) throw error;

        toast.success("Verification email sent! Please check your inbox to confirm your account.");
        // Email confirmation is required, so there's no session yet — send them
        // back to the login form instead of leaving the filled-out signup form up.
        setIsLogin(true);
        setFullName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      // 1. Determine the error message and if it's a standard login failure
      let errorMessage = "An unexpected error occurred.";
      let isInvalidLogin = false;

      if (err instanceof Error) {
        if (err.message.includes("Invalid login credentials")) {
          errorMessage = "Invalid email or password.";
          isInvalidLogin = true; // Flag this so we DON'T show a toast
        } else {
          errorMessage = err.message;
        }
      }

      // 2. Update React state (this shows the red box in the form)
      setError(errorMessage);
      if (isLogin) {
        setShowForgotLink(true);
      }

      // 3. ONLY show a toast if it's an UNEXPECTED error (not a simple wrong password)
      if (!isInvalidLogin) {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleSwitchMode(nextIsLogin: boolean) {
    setIsLogin(nextIsLogin);
    setError(null);
    setFullName("");
    setEmail("");
    setPassword("");
    setShowPassword(false);
    setShowForgotLink(false);
  }

  if (isResetting) {
    return (
      <ResetPasswordForm
        password={password}
        onPasswordChange={setPassword}
        showPassword={showPassword}
        onToggleShowPassword={() => setShowPassword((prev) => !prev)}
        error={error}
        loading={loading}
        onSubmit={handleSubmit}
      />
    );
  }

  if (isForgotPassword) {
    return (
      <ForgotPasswordForm
        email={email}
        onEmailChange={setEmail}
        error={error}
        loading={loading}
        onSubmit={handleSubmit}
        onBack={() => {
          setIsForgotPassword(false);
          setError(null);
          setEmail("");
        }}
      />
    );
  }

  if (isLogin) {
    return (
      <LoginForm
        email={email}
        onEmailChange={setEmail}
        password={password}
        onPasswordChange={setPassword}
        showPassword={showPassword}
        onToggleShowPassword={() => setShowPassword((prev) => !prev)}
        error={error}
        loading={loading}
        showForgotLink={showForgotLink}
        onSubmit={handleSubmit}
        onForgotPassword={() => {
          setIsForgotPassword(true);
          setError(null);
          setShowForgotLink(false);
        }}
        onSwitchToSignup={() => handleSwitchMode(false)}
      />
    );
  }

  return (
    <SignupForm
      fullName={fullName}
      onFullNameChange={setFullName}
      email={email}
      onEmailChange={setEmail}
      password={password}
      onPasswordChange={setPassword}
      showPassword={showPassword}
      onToggleShowPassword={() => setShowPassword((prev) => !prev)}
      error={error}
      loading={loading}
      onSubmit={handleSubmit}
      onSwitchToLogin={() => handleSwitchMode(true)}
    />
  );
}
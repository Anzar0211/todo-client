import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const input =
  'mt-1.5 w-full rounded-lg border border-track bg-white px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 lg:mt-2 lg:rounded-xl lg:px-4 lg:py-3.5 lg:text-base xl:py-4 xl:text-lg';
const label = 'block text-xs font-medium lg:text-sm xl:text-base';

export default function AuthForm({ mode = 'login' }) {
  const navigate = useNavigate();
  const { isAuthenticated, error, login, register, clearError } = useAuth();
  const [f, setF] = useState({ name: '', email: '', password: '' });
  const [busy, setBusy] = useState(false);
  const isRegister = mode === 'register';

  // Same component is reused across /login and /register, so reset local
  // form state and the shared auth error whenever the mode changes.
  useEffect(() => {
    setF({ name: '', email: '', password: '' });
    setBusy(false);
    clearError();
    return () => clearError();
  }, [mode, clearError]);

  if (isAuthenticated) return <Navigate to="/" replace />;

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (isRegister) {
        await register({ name: f.name, email: f.email, password: f.password }).unwrap();
      } else {
        await login({ email: f.email, password: f.password }).unwrap();
      }
      navigate('/');
    } catch {
      setBusy(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-canvas">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand/15 blur-2xl lg:h-[28rem] lg:w-[28rem] xl:h-[36rem] xl:w-[36rem]" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-blush blur-2xl lg:h-[24rem] lg:w-[24rem] xl:h-[32rem] xl:w-[32rem]" />

      <div className="shell relative flex min-h-screen flex-col justify-center py-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-16 xl:gap-24 xl:py-20 2xl:gap-32 2xl:py-24">
        <section className="mb-10 hidden lg:block">
          <h1 className="max-w-lg text-4xl font-semibold leading-tight text-ink xl:max-w-xl xl:text-5xl 2xl:max-w-2xl 2xl:text-6xl">
            Your plans, clearly in view
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-mute xl:mt-6 xl:max-w-xl xl:text-lg 2xl:text-xl 2xl:leading-relaxed">
            Track what matters today, see your week at a glance, and stay ahead of what&apos;s next.
          </p>
        </section>

        <form
          onSubmit={submit}
          className="
            mx-auto w-full max-w-md rounded-3xl border border-track bg-white p-6 shadow-sm
            sm:p-8
            lg:max-w-lg lg:p-10
            xl:max-w-xl xl:rounded-[2rem] xl:p-12
            2xl:max-w-2xl 2xl:p-14
          "
        >
          <h2 className="text-2xl font-semibold lg:text-3xl xl:text-4xl">
            {isRegister ? 'Create account' : 'Welcome back'}
          </h2>
          <p className="mt-1 text-sm text-mute lg:mt-2 lg:text-base xl:text-lg">
            {isRegister ? 'Sign up to start organizing your tasks.' : 'Sign in to continue to your tasks.'}
          </p>

          <div className="mt-6 space-y-4 lg:mt-8 lg:space-y-5 xl:mt-10 xl:space-y-6">
            {isRegister && (
              <label className={label}>
                Name
                <input className={input} value={f.name} onChange={set('name')} autoComplete="name" required />
              </label>
            )}
            <label className={label}>
              Email
              <input
                type="email"
                className={input}
                value={f.email}
                onChange={set('email')}
                autoComplete="email"
                required
              />
            </label>
            <label className={label}>
              Password
              <input
                type="password"
                className={input}
                value={f.password}
                onChange={set('password')}
                autoComplete={isRegister ? 'new-password' : 'current-password'}
                minLength={6}
                required
              />
            </label>
          </div>

          {error && <p role="alert" className="mt-4 text-sm text-danger lg:text-base">{error}</p>}

          <button
            disabled={busy}
            className="mt-6 h-12 w-full rounded-xl bg-brand font-medium text-white disabled:opacity-60 lg:mt-8 lg:h-14 lg:text-lg xl:mt-10 xl:h-16 xl:rounded-2xl xl:text-xl"
          >
            {busy ? 'Please wait…' : isRegister ? 'Create account' : 'Sign in'}
          </button>

          <p className="mt-5 text-center text-sm text-mute lg:mt-6 lg:text-base xl:text-lg">
            {isRegister ? (
              <>
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-brand">Sign in</Link>
              </>
            ) : (
              <>
                New here?{' '}
                <Link to="/register" className="font-medium text-brand">Create an account</Link>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}

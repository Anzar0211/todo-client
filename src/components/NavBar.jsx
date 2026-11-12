import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Bell, LogOut, Search, Settings, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const { user, signOut } = useAuth();
  const searching = location.pathname === '/search';
  const [query, setQuery] = useState(() => params.get('q') || '');
  const debouncedQuery = useDebouncedValue(query, 300);
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef(null);
  const menuRef = useRef(null);
  const skipDebounceSync = useRef(false);

  useEffect(() => {
    if (searching) inputRef.current?.focus();
  }, [searching]);

  useEffect(() => {
    if (!searching) return;
    if (skipDebounceSync.current) {
      skipDebounceSync.current = false;
      return;
    }
    const term = debouncedQuery.trim();
    const current = params.get('q') || '';
    if (term === current) return;
    setParams(term ? { q: term } : {}, { replace: true });
  }, [debouncedQuery, searching, params, setParams]);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (e) => {
      if (!menuRef.current?.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    return () => document.removeEventListener('pointerdown', onPointer);
  }, [menuOpen]);

  const handleSignOut = () => {
    signOut();
    navigate('/login');
  };

  const openSearch = () => {
    setMenuOpen(false);
    navigate('/search');
  };

  const closeSearch = () => {
    skipDebounceSync.current = true;
    setQuery('');
    navigate('/');
  };

  useEffect(() => {
    if (!searching) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeSearch();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [searching]);

  const clearSearch = () => {
    skipDebounceSync.current = true;
    setQuery('');
    setParams({}, { replace: true });
    inputRef.current?.focus();
  };

  return (
    <header className="sticky top-0 z-20 bg-canvas/90 backdrop-blur">
      <div className="shell py-3">
        {searching ? (
          <div className="space-y-3">
            <button
              type="button"
              aria-label="Back"
              onClick={closeSearch}
              className="-ml-2 grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-white"
            >
              <ArrowLeft size={22} />
            </button>
            <label className="flex h-12 w-full items-center gap-3 rounded-lg border border-track bg-white px-4">
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a task"
                aria-label="Search for a task"
                className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-mute"
              />
              {query ? (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={clearSearch}
                  className="shrink-0 text-mute hover:text-ink"
                >
                  <X size={18} />
                </button>
              ) : null}
              <Search size={22} className="shrink-0 text-ink" strokeWidth={1.75} />
            </label>
          </div>
        ) : (
          <div className="flex h-10 items-center justify-between">
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                aria-label="Settings"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
                className="grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-white"
              >
                <Settings size={22} />
              </button>
              {menuOpen && (
                <div className="absolute left-0 top-full z-30 mt-2 min-w-[11rem] rounded-xl border border-track bg-white p-1 shadow-lg">
                  {user?.name && (
                    <p className="truncate px-3 py-2 text-xs text-mute">{user.name}</p>
                  )}
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-ink hover:bg-tint"
                  >
                    <LogOut size={16} /> Sign out
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Search"
                onClick={openSearch}
                className="grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-white"
              >
                <Search size={22} />
              </button>
              <button
                type="button"
                aria-label="Notifications"
                className="grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-white"
              >
                <Bell size={22} />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

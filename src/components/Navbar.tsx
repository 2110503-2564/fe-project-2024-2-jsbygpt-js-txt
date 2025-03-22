'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useDarkMode } from '@/contexts/DarkModeContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'nav-link-active' : 'nav-link-inactive';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <Link href="/" className="navbar-brand">
            <span className="navbar-logo">ExclusiveCars</span>
            <span className="navbar-subtitle">Premium Rentals</span>
          </Link>

          <div className="navbar-links">
            <button
              onClick={toggleDarkMode}
              className="dark-mode-toggle"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {currentUser ? (
              <>
                <Link href="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
                  Dashboard
                </Link>
                {currentUser.isAdmin && (
                  <Link href="/admin" className={`nav-link ${isActive('/admin')}`}>
                    Admin
                  </Link>
                )}
                <button onClick={logout} className="nav-link nav-link-inactive">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className={`nav-link ${isActive('/login')}`}>
                  Login
                </Link>
                <Link href="/register" className={`nav-link ${isActive('/register')}`}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
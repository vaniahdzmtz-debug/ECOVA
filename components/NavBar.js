'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();

  const linkClass = (href) =>
    pathname === href
      ? 'text-forest font-medium'
      : 'text-ink/70 hover:text-forest transition-colors';

  return (
    <header className="sticky top-0 z-30 bg-parchment/90 backdrop-blur-sm border-b border-forest/10">
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <circle cx="13" cy="13" r="12" stroke="#1F3A2E" strokeWidth="1.5" />
            <path
              d="M13 4C13 4 8 8 8 13.5C8 17.09 10.24 20 13 20C15.76 20 18 17.09 18 13.5C18 8 13 4 13 4Z"
              fill="#1F3A2E"
            />
          </svg>
          <span className="font-display text-xl font-medium text-forest">Ecova</span>
        </Link>
        <nav className="flex items-center gap-8 text-sm">
          <Link href="/" className={linkClass('/')}>
            Home
          </Link>
          <Link href="/docs" className={linkClass('/docs')}>
            Docs
          </Link>
        </nav>
      </div>
    </header>
  );
}

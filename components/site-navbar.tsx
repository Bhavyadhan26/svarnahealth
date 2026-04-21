'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const navItems = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/about' },
  { label: 'Shop', href: '/shop' },
  { label: 'Contact', href: '/#contact' }
];

export function SiteNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (navbarRef.current && target && !navbarRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown, { passive: true });
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <header
      ref={navbarRef}
      className="sticky top-0 z-50 w-full bg-[linear-gradient(180deg,rgb(var(--color-primary)/0.96),rgb(var(--color-primary)/0.86))] backdrop-blur-xl"
    >
      <div className="flex w-full items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/#home" className="flex min-w-0 items-center gap-3 rounded-none px-0 py-1 transition" aria-label="Svarna home">
          <span className="shrink-0">
            <Image
              src="/Website_Assets/logo.jpg"
              alt="Svarna logo"
              width={88}
              height={44}
              className="h-11 w-auto"
              priority
            />
          </span>
          <span className="flex min-w-0 flex-col leading-none">
            <span className="font-display text-lg tracking-[0.1em] text-text/92 sm:text-xl">Svarna</span>
            <span className="mt-1 text-[0.62rem] uppercase tracking-[0.28em] text-text/55">Nurturing Immunity, Crafted Naturally</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium tracking-[0.16em] text-text/74 transition hover:bg-text/6 hover:text-text/94"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-text/10 bg-text/5 px-4 py-2 text-[0.7rem] uppercase tracking-[0.26em] text-text/78 transition hover:bg-text/10 lg:hidden"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
        >
          Menu
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'} absolute left-0 right-0 top-full z-50 overflow-hidden bg-[linear-gradient(180deg,rgb(var(--color-primary)/0.97),rgb(var(--color-primary)/0.9))] shadow-[0_16px_30px_rgba(0,0,0,0.22)] transition-all duration-300 lg:hidden`}
      >
        <div className="flex w-full flex-col items-center px-4 pb-4 text-center sm:px-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="py-2.5 text-center text-sm font-medium tracking-[0.14em] text-text/78 transition hover:text-text/96"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
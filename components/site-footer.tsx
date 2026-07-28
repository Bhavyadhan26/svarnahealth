'use client';

import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="w-full bg-primary text-white">
      {/* Main footer content */}
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 pt-10 pb-4 sm:px-10 lg:px-12 lg:gap-10 lg:pt-12 lg:pb-4">
        
        {/* CTA Section */}
        <div className="flex flex-col items-center text-center pb-10 sm:pb-12 border-b border-white/10">
          <h3 className="font-display text-4xl leading-tight text-white sm:text-5xl">Start Your Ritual</h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
            Join a considered wellness experience built around consistency, beauty, and functional nourishment.
          </p>
          <Link href="/shop" className="mt-8 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold tracking-wider text-primary transition hover:bg-white">
            Shop Now
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-10 lg:gap-8 pt-4">

          {/* Col 1 (30%): Logo, Bio, Socials */}
          <div className="flex flex-col items-start lg:col-span-3">
            <img 
              src="/Website_Assets/white logo.svg" 
              alt="Svarna Health Logo" 
              className="h-14 sm:h-16 w-auto object-contain"
            />
            <p className="mt-4 text-sm leading-6 text-white/70">
              Rooted in ancient Ayurvedic wisdom, Svarna Health crafts premium daily wellness rituals. We believe in the power of pure, clean ingredients to nurture immunity and bring balance to modern lives.
            </p>

            <div className="mt-6 flex gap-3">
              <a href="https://www.instagram.com/svarnahealth/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 p-2 transition hover:border-white/40 hover:bg-white/10" aria-label="Instagram">
                <svg className="h-4 w-4 text-white/90" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                </svg>
              </a>
              <a href="mailto:svarnahealth@gmail.com" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 p-2 transition hover:border-white/40 hover:bg-white/10" aria-label="Email">
                <svg className="h-4 w-4 text-white/90" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </a>
              <a href="https://facebook.com/svarnahealth" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 p-2 transition hover:border-white/40 hover:bg-white/10" aria-label="Facebook">
                <svg className="h-4 w-4 text-white/90" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2 (20%): Quick Links */}
          <div className="flex flex-col lg:col-span-2 lg:pl-8">
            <h4 className="font-display text-sm tracking-widest text-accent uppercase">Quick Links</h4>
            <ul className="mt-6 flex flex-col gap-4 text-sm text-white/70">
              <li><Link href="#home" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="#about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="#journey" className="hover:text-white transition-colors">The Journey</Link></li>
              <li><Link href="#philosophy" className="hover:text-white transition-colors">Philosophy</Link></li>
            </ul>
          </div>

          {/* Col 3 (20%): Useful Links */}
          <div className="flex flex-col lg:col-span-2">
            <h4 className="font-display text-sm tracking-widest text-accent uppercase">Useful Links</h4>
            <ul className="mt-6 flex flex-col gap-4 text-sm text-white/70">
              <li><Link href="/shop" className="hover:text-white transition-colors">Shop</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Col 4 (30%): Newsletter */}
          <div className="flex flex-col lg:col-span-3 lg:pr-4">
            <h4 className="font-display text-sm tracking-widest text-accent uppercase">Join the community</h4>
            <p className="mt-6 text-sm leading-6 text-white/70">
              Subscribe to our newsletter to receive the latest updates, exclusive offers, and wellness tips straight to your inbox.
            </p>
            <form className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row" onSubmit={(e) => e.preventDefault()} suppressHydrationWarning>
              <input
                type="email"
                placeholder="Your email address"
                required
                suppressHydrationWarning
                className="w-full rounded-full border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <button
                type="submit"
                suppressHydrationWarning
                className="whitespace-nowrap rounded-full bg-accent px-6 py-3 text-sm font-semibold tracking-wider text-primary transition hover:bg-white"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom divider and copyright */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-6 sm:flex-row">
          <p className="text-[0.65rem] uppercase tracking-widest text-white/50">
            © 2026 Svarna Health. All rights reserved.
          </p>
          <p className="text-[0.65rem] uppercase tracking-widest text-white/50">
            Designed & Developed by Bhavya Dhanuka
          </p>
        </div>
      </div>
    </footer>
  );
}

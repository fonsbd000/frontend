'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Services', href: '/services' },
  { name: 'Industries', href: '/industries' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-[#0A3D62] rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:bg-[#1E90FF] transition-colors">
            F
          </div>
          <span className={`text-2xl font-bold tracking-tight transition-colors ${
            scrolled ? 'text-[#0A3D62]' : 'text-white'
          }`}>
            FONS<span className="text-[#00C897]">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-semibold transition-colors hover:text-[#00C897] ${
                pathname === link.href 
                  ? 'text-[#00C897]' 
                  : scrolled ? 'text-[#0A3D62]' : 'text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/quote" 
            className="bg-[#00C897] hover:bg-[#00b386] text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className={`w-full h-0.5 rounded-full transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-2' : ''
            } ${scrolled || isOpen ? 'bg-[#0A3D62]' : 'bg-white'}`} />
            <span className={`w-full h-0.5 rounded-full transition-opacity duration-300 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            } ${scrolled ? 'bg-[#0A3D62]' : 'bg-white'}`} />
            <span className={`w-full h-0.5 rounded-full transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-2' : ''
            } ${scrolled || isOpen ? 'bg-[#0A3D62]' : 'bg-white'}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-[#0A3D62]/95 backdrop-blur-xl z-40 transition-transform duration-500 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full items-center justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-2xl font-bold transition-colors ${
                pathname === link.href ? 'text-[#00C897]' : 'text-white'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/quote" 
            className="mt-4 bg-[#00C897] hover:bg-[#00b386] text-white px-10 py-4 rounded-full font-bold text-xl transition-all"
            onClick={() => setIsOpen(false)}
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </nav>
  );
}

import { useState, useEffect } from 'react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Tentang Saya', href: '#about' },
  { name: 'Sertifikat', href: '#certificates' },
  { name: 'Karya', href: '#projects' },
  { name: 'Software', href: '#software-stack' },
  { name: 'Kontak', href: '#contact' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle Scroll state
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll Spy for active section
  useEffect(() => {
    const sections = document.querySelectorAll('section[id], footer[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 flex justify-center ${scrolled ? 'pt-4 sm:pt-6' : 'pt-6 sm:pt-8'}`}>
      {/* Container utama berupa Pill (Kapsul) melayang */}
      <div className={`relative flex items-center justify-between transition-all duration-500 w-[92%] sm:w-[85%] max-w-5xl px-4 sm:px-6 py-3 sm:py-3.5 rounded-full ${
        scrolled 
        ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-slate-200/50 dark:border-slate-700/50' 
        : 'bg-transparent border border-transparent'
      }`}>
        
        {/* Logo Beranimasi */}
        <a href="#home" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-extrabold text-sm sm:text-base group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-amber-500/20">A</div>
          <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent group-hover:from-amber-500 group-hover:to-orange-500 transition-all duration-300">
            Adiwijaya<span className="text-amber-500">.</span>
          </span>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeSection === link.href.substring(1)
                ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10'
                : 'text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {link.name}
              {activeSection === link.href.substring(1) && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
              )}
            </a>
          ))}
        </nav>

        {/* CTA Button Desktop */}
        <div className="hidden md:block">
          <a href="mailto:madeeadiwijaya@gmail.com" className="px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm hover:scale-105 transition-transform duration-300 shadow-xl shadow-slate-900/10 dark:shadow-white/10 flex items-center gap-2 group">
            Sapa Saya 
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        {/* Mobile Menu Hamburger Toggles */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden relative w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-amber-500/20 hover:text-amber-500 transition-colors focus:outline-none"
        >
          <div className="flex flex-col items-center justify-center gap-[4px]">
            <span className={`block w-5 h-[2px] bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`}></span>
            <span className={`block w-5 h-[2px] bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 translate-x-3' : ''}`}></span>
            <span className={`block w-5 h-[2px] bg-current transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`}></span>
          </div>
        </button>

        {/* Mobile Menu Dropdown Panel (Premium Card) - Optimized with lower blur for mobile performance */}
        <div className={`absolute top-full right-0 mt-4 w-64 bg-white/98 dark:bg-slate-900/98 backdrop-blur-lg rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl transition-all duration-300 origin-top-right md:hidden ${
          isMobileMenuOpen ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible'
        }`}>
          <div className="p-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 flex items-center gap-3 ${
                  activeSection === link.href.substring(1)
                  ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10'
                  : 'text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {activeSection === link.href.substring(1) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
                )}
                <span className={activeSection !== link.href.substring(1) ? 'ml-4' : ''}>{link.name}</span>
              </a>
            ))}
            <div className="h-px w-full bg-slate-200 dark:bg-slate-800 my-2"></div>
            <a href="mailto:madeeadiwijaya@gmail.com" className="mx-2 mb-1 px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm text-center shadow-lg shadow-amber-500/20 active:scale-95 transition-transform">
              Sapa Saya Sekarang
            </a>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;

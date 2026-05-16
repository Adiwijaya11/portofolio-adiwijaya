import { useEffect } from 'react';

/**
 * ScrollRevealProvider
 * Otomatis observasi semua elemen dengan class 'sr-hidden'
 * dan tambahkan class 'revealed' saat masuk viewport.
 * Dipasang 1x di App.tsx.
 */
const ScrollRevealProvider = () => {
  useEffect(() => {
    // Pakai requestAnimationFrame agar DOM benar-benar siap
    const raf = requestAnimationFrame(() => {
      const elements = document.querySelectorAll('.sr-hidden');

      if (elements.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target); // Hanya sekali
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -30px 0px',
        }
      );

      elements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  return null;
};

export default ScrollRevealProvider;

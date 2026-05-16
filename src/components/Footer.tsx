import { useEffect, useRef, useState } from 'react';

const Footer = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [notification, setNotification] = useState<{ show: boolean, type: 'success' | 'error', title: string, message: string }>({
    show: false, type: 'success', title: '', message: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => setNotification(prev => ({ ...prev, show: false })), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  const socials = [
    {
      name: 'TikTok', id: '@imadeadiwijaya11',
      link: 'https://www.tiktok.com/@imadeadiwijaya11',
      icon: (<svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.96-.5 3.94-1.66 5.48-1.56 2.06-4.04 3.19-6.61 2.92-2.58-.27-4.9-1.81-6.1-4.05-1.19-2.22-1.2-4.97-.04-7.2 1.05-2.02 3.01-3.48 5.23-3.96 1.4-.3 2.87-.19 4.22.3v4.18c-.83-.35-1.78-.45-2.67-.26-.85.18-1.64.67-2.14 1.36-.57.78-.76 1.83-.51 2.78.25.96.94 1.76 1.84 2.14.92.38 1.99.34 2.88-.1.9-.45 1.58-1.25 1.88-2.22.19-.62.25-1.28.25-1.92V.02h-2.65z" /></svg>),
      color: 'hover:bg-[#00f2fe] hover:border-[#00f2fe] hover:text-black',
    },
    {
      name: 'LinkedIn', id: 'I Made Adi Wijaya',
      link: 'https://www.linkedin.com/in/i-made-adi-wijaya-890658405/',
      icon: (<svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>),
      color: 'hover:bg-[#0a66c2] hover:border-[#0a66c2]',
    },
    {
      name: 'GitHub', id: 'Adiwijaya11',
      link: 'https://github.com/Adiwijaya11/Adiwijaya11',
      icon: (<svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>),
      color: 'hover:bg-white hover:text-black hover:border-white',
    },
    {
      name: 'Instagram', id: '@imadeadiwijayaa_',
      link: 'https://www.instagram.com/imadeadiwijayaa_/',
      icon: (<svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>),
      color: 'hover:bg-[#E1306C] hover:border-[#E1306C]',
    }
  ];

  return (
    <footer id="contact" ref={sectionRef} className="relative bg-slate-950 pt-16 sm:pt-24 pb-10 sm:pb-12 overflow-hidden text-slate-300">

      {/* Premium Notification Toast */}
      <div className={`fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[99999] transition-all duration-500 transform ${notification.show ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95 pointer-events-none'}`}>
        <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700 p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-2xl flex items-start gap-3 sm:gap-4 max-w-xs sm:max-w-sm">
          {notification.type === 'success' ? (
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : (
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h4 className={`text-xs sm:text-sm font-bold mb-1 ${notification.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>{notification.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{notification.message}</p>
          </div>
          <button onClick={() => setNotification(prev => ({ ...prev, show: false }))} className="text-slate-500 hover:text-white transition-colors shrink-0">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[1000px] h-[300px] sm:h-[500px] bg-gradient-to-r from-amber-500/20 via-orange-600/10 to-transparent rounded-[100%] blur-[80px] sm:blur-[120px] pointer-events-none"></div>

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>

        {/* CTA Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-20 sr-hidden sr-fade-up">
          <h2 className="text-xs sm:text-sm font-bold text-amber-500 uppercase tracking-widest mb-3 sm:mb-4">Mari Berkolaborasi</h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight">
            Punya Ide Cemerlang? <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Mari Wujudkan Bersama.</span>
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            Saya selalu terbuka untuk mendiskusikan proyek kreatif, kolaborasi tim, atau tawaran pekerjaan.
          </p>
        </div>

        {/* 2 Column Contact Layout */}
        <div className="flex flex-col lg:flex-row gap-10 sm:gap-12 lg:gap-16 mb-16 sm:mb-24">

          {/* Kiri: Info & Sosmed */}
          <div className="w-full lg:flex-1 flex flex-col justify-center">

            {/* Email Card */}
            <a href="mailto:madeeadiwijaya@gmail.com" className="group flex items-center gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-amber-500/50 transition-all duration-500 mb-6 sm:mb-8 shadow-xl">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500 transition-all duration-500 shrink-0">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-amber-500 group-hover:text-slate-900 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Email Langsung</p>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white group-hover:text-amber-400 transition-colors truncate">madeeadiwijaya@gmail.com</p>
              </div>
            </a>

            {/* Sosmed Grid */}
            <h4 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6 px-1">Jejaring Sosial Lainnya</h4>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-slate-900/40 backdrop-blur-sm border border-slate-800 transition-all duration-300 hover:-translate-y-1 text-slate-300 shadow-lg ${social.color}`}
                >
                  <div className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 shrink-0 text-slate-300 group-hover:text-inherit">
                    {social.icon}
                  </div>
                  <div className="min-w-0 text-slate-300 group-hover:text-inherit">
                    <p className="text-xs font-bold uppercase tracking-wider mb-0.5 opacity-60 group-hover:opacity-80 transition-opacity">{social.name}</p>
                    <p className="font-bold text-white group-hover:text-inherit text-xs sm:text-sm truncate transition-colors">{social.id}</p>
                  </div>
                </a>
              ))}
            </div>

          </div>

          {/* Kanan: Form */}
          <div className="w-full lg:flex-1">
            <form
              className="bg-slate-900/80 backdrop-blur-xl p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden group"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const name = (form.elements.namedItem('name') as HTMLInputElement).value;
                const email = (form.elements.namedItem('email') as HTMLInputElement).value;
                const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
                const subject = encodeURIComponent(`Pesan Portofolio dari ${name}`);
                const body = encodeURIComponent(`Halo Adi,\n\n${message}\n\nDari: ${name}\nEmail: ${email}`);
                window.location.href = `mailto:madeeadiwijaya@gmail.com?subject=${subject}&body=${body}`;
                setNotification({ show: true, type: 'success', title: 'Aplikasi Email Terbuka!', message: 'Silakan kirim pesan Anda melalui aplikasi email yang baru saja muncul.' });
                form.reset();
              }}
            >
              <div className="absolute top-0 left-0 w-full h-1 sm:h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>

              <h4 className="text-2xl sm:text-3xl font-extrabold text-white mb-6 sm:mb-8">Kirim Pesan</h4>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-slate-400 mb-1.5 sm:mb-2 uppercase tracking-widest">Nama Lengkap</label>
                  <input
                    type="text" id="name" name="name" required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                    placeholder="Masukkan nama Anda"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-slate-400 mb-1.5 sm:mb-2 uppercase tracking-widest">Alamat Email</label>
                  <input
                    type="email" id="email" name="email" required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                    placeholder="nama@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-slate-400 mb-1.5 sm:mb-2 uppercase tracking-widest">Pesan / Ide Proyek</label>
                  <textarea
                    id="message" name="message" required rows={4}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all resize-none"
                    placeholder="Ceritakan apa yang ingin Anda diskusikan..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 font-extrabold text-sm sm:text-base md:text-lg transition-all duration-300 shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-1 flex items-center justify-center gap-2 sm:gap-3"
                >
                  Kirim Pesan Sekarang
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Footer Bar */}
        <div className="pt-6 sm:pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-800 flex items-center justify-center text-amber-500 font-bold text-base sm:text-xl">A</div>
            <span className="text-white font-bold tracking-wider text-sm sm:text-base">ADI WIJAYA</span>
          </div>
          <p className="text-slate-500 font-medium text-xs sm:text-sm">&copy; {new Date().getFullYear()} Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-2 text-slate-500 text-xs sm:text-sm font-medium">
            Dibuat dengan <span className="text-red-500 animate-pulse">❤</span> menggunakan <span className="text-white">React</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

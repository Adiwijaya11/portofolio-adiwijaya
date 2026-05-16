import { useEffect, useRef, useState } from 'react';

const CountUp = ({ end, duration, startCounting }: { end: number, duration: number, startCounting: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startCounting) return;
    let startTime: number | null = null;
    const animate = (t: number) => {
      if (!startTime) startTime = t;
      const progress = Math.min((t - startTime) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, startCounting]);
  return <span>{count}</span>;
};

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('perjalanan');

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(el); }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { label: 'Proyek Selesai', value: 3, suffix: '+' },
    { label: 'Teknologi Dikuasai', value: 10, suffix: '+' },
    { label: 'Jam Ngoding', value: 1200, suffix: '+' },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-16 sm:py-24 relative bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="absolute top-0 right-0 w-64 sm:w-[500px] h-64 sm:h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 sm:w-[500px] h-64 sm:h-[500px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className={`mb-8 sm:mb-16 sr-hidden sr-fade-up ${isVisible ? 'revealed' : ''}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 sm:w-12 h-1 bg-amber-500 rounded-full"></div>
            <h2 className="text-xs sm:text-sm font-bold text-amber-500 uppercase tracking-widest">Tentang Saya</h2>
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Lebih dari sekadar <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">baris kode.</span>
          </h3>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 sm:gap-16 items-start">

          {/* Left */}
          <div className={`w-full lg:flex-1 sr-hidden sr-fade-left sr-delay-200 ${isVisible ? 'revealed' : ''}`}>
            <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-8 font-medium">
              Saya adalah seorang <strong className="text-slate-900 dark:text-white">Frontend Engineer & UI/UX Enthusiast</strong> yang bersemangat mengubah ide-ide rumit menjadi pengalaman digital yang sederhana, indah, dan fungsional.
            </p>

            {/* Tabs */}
            <div className="flex gap-4 sm:gap-6 mb-6 border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
              {['perjalanan', 'filosofi'].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`pb-3 px-1 text-base sm:text-lg font-bold transition-all duration-300 relative whitespace-nowrap ${activeTab === tab ? 'text-amber-500' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}>
                  {tab === 'perjalanan' ? 'Perjalanan' : 'Filosofi Kerja'}
                  {activeTab === tab && <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-amber-500 rounded-t-full"></div>}
                </button>
              ))}
            </div>

            <div className="relative min-h-[120px] sm:min-h-[150px]">
              <div className={`w-full transition-all duration-500 ${activeTab === 'perjalanan' ? 'opacity-100 translate-y-0 relative' : 'opacity-0 translate-y-4 pointer-events-none absolute'}`}>
                <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Berawal dari rasa penasaran melihat bagaimana aplikasi web bekerja, saya mulai mendalami dasar-dasar pemrograman antarmuka. Kini, saya mahir membangun ekosistem web modern menggunakan <strong>React, TypeScript, dan Tailwind CSS</strong>.
                </p>
              </div>
              <div className={`w-full transition-all duration-500 ${activeTab === 'filosofi' ? 'opacity-100 translate-y-0 relative' : 'opacity-0 translate-y-4 pointer-events-none absolute'}`}>
                <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Saya memegang teguh prinsip <em>"Design is how it works"</em>. Kode yang saya tulis harus rapi dan menghasilkan antarmuka yang sangat <strong>responsif, cepat, dan memanjakan mata</strong> pengguna.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="w-full lg:flex-1 grid grid-cols-2 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <div key={i}
                className={`group relative bg-white dark:bg-slate-800 p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden sr-hidden sr-zoom-up sr-delay-${[200, 300, 400][i] || 200} ${isVisible ? 'revealed' : ''}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 group-hover:from-amber-500/5 transition-colors duration-500"></div>
                <h4 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2 font-mono flex items-center relative z-10">
                  <CountUp end={stat.value} duration={2500} startCounting={isVisible} />
                  <span className="text-amber-500">{stat.suffix}</span>
                </h4>
                <p className="text-xs sm:text-sm md:text-base text-slate-500 dark:text-slate-400 font-bold relative z-10">{stat.label}</p>
                <div className="absolute -bottom-6 -right-6 w-16 sm:w-24 h-16 sm:h-24 bg-amber-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
              </div>
            ))}

            {/* CTA Banner */}
            <div
              className={`col-span-2 group bg-gradient-to-r from-amber-500 to-orange-500 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden flex flex-col sm:flex-row gap-4 items-center justify-between cursor-pointer sr-hidden sr-fade-up sr-delay-500 ${isVisible ? 'revealed' : ''}`}
              onClick={() => window.location.href = '#contact'}
            >
              <div className="absolute top-0 right-0 w-32 sm:w-48 h-32 sm:h-48 bg-white/20 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10 text-center sm:text-left">
                <h4 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-1">Mari Berkolaborasi!</h4>
                <p className="text-amber-100 font-medium text-sm sm:text-base">Jadikan ide luar biasa Anda menjadi nyata.</p>
              </div>
              <div className="relative z-10 bg-white/20 p-3 sm:p-4 rounded-full text-white group-hover:bg-white group-hover:text-amber-600 transition-all duration-500 group-hover:rotate-45">
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

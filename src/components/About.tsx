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

const TiltCard = ({ children, className, isVisible, delay }: { children: React.ReactNode, className?: string, isVisible: boolean, delay: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.innerWidth < 1024) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    const dx = x - xc;
    const dy = y - yc;
    
    setTilt({
      x: (dy / yc) * -6, // Max tilt 6deg
      y: (dx / xc) * 6
    });
    
    setShine({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setShine(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${className} relative transition-all duration-500 ease-out sr-hidden sr-zoom-up ${isVisible ? 'revealed' : ''}`}
      style={{ 
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transitionDelay: `${delay}ms`
      }}
    >
      <div 
        className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-500 rounded-[inherit]"
        style={{
          backgroundImage: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(245, 158, 11, 0.12), transparent 75%)`,
          opacity: shine.opacity
        }}
      ></div>
      {children}
    </div>
  );
};

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFocus, setActiveFocus] = useState<number>(0);
  const [activePhilosophy, setActivePhilosophy] = useState<number>(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(el); }
    }, { threshold: 0.05 });
    observer.observe(el);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const stats = [
    { 
      label: 'Proyek Selesai', 
      value: 4, 
      suffix: '+', 
      color: 'from-blue-500 to-cyan-400', 
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
        </svg>
      )
    },
    { 
      label: 'Teknologi Dikuasai', 
      value: 12, 
      suffix: '+', 
      color: 'from-amber-500 to-orange-400',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    { 
      label: 'Jam Ngoding', 
      value: 1500, 
      suffix: '+', 
      color: 'from-emerald-500 to-teal-400',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  const focusAreas = [
    { 
      title: 'Frontend Development', 
      percent: 95,
      desc: 'Membangun aplikasi web interaktif berskala besar menggunakan React, TypeScript, dan Tailwind CSS dengan standar performa optimal dan struktur kode bersih.',
      tech: 'React, TypeScript, TailwindCSS, Next.js'
    },
    { 
      title: 'UI/UX & Web Design', 
      percent: 90,
      desc: 'Merancang wireframe, maket visual, dan prototipe interaktif di Figma. Berfokus pada kemudahan akses, alur pengguna yang intuitif, serta estetika modern.',
      tech: 'Figma, Adobe XD, Responsive Layouts'
    },
    { 
      title: 'AI Integration', 
      percent: 85,
      desc: 'Mengintegrasikan API Kecerdasan Buatan (seperti OpenAI, Gemini) untuk menciptakan fitur pintar, pengenalan teks, dan otomatisasi alur kerja aplikasi.',
      tech: 'AI Prompting, LLM Integration, API'
    }
  ];

  const philosophies = [
    {
      title: 'Kecepatan & Performa',
      tag: 'FAST',
      desc: 'Situs web yang lambat adalah kegagalan. Saya memastikan setiap baris kode, ukuran aset, dan metode rendering dioptimalkan demi waktu muat yang instan.',
      icon: '⚡'
    },
    {
      title: 'Estetika Presisi',
      tag: 'BEAUTIFUL',
      desc: 'Desain adalah representasi dari kepribadian produk. Saya memperhatikan detail kecil, jarak, tipografi, dan transisi halus untuk memanjakan mata pengguna.',
      icon: '🎨'
    },
    {
      title: 'Solusi Cerdas',
      tag: 'SMART',
      desc: 'Bukan sekadar menulis baris instruksi. Saya berfokus memecahkan masalah nyata pengguna melalui logika program yang efisien dan integrasi AI yang solutif.',
      icon: '🧠'
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 sm:py-32 relative bg-white dark:bg-slate-950 overflow-hidden">
      {/* Interactive Background Elements */}
      <div 
        className="absolute top-20 right-[15%] w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none transition-transform duration-300 ease-out animate-pulse"
        style={{ transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)` }}
      ></div>
      <div 
        className="absolute bottom-20 left-[15%] w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none transition-transform duration-500 ease-out"
        style={{ transform: `translate3d(${-mousePos.x * 1.2}px, ${-mousePos.y * 1.2}px, 0)` }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 sr-hidden sr-fade-up ${isVisible ? 'revealed' : ''}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Profil Profesional</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
            Tentang Saya
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400">
            Mengenal lebih dekat visi saya, fokus keahlian, filosofi kerja, serta rangkuman statistik kontribusi yang saya berikan dalam pengembangan produk digital.
          </p>
        </div>

        {/* --- PREMIUM BENTO GRID LAYOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Bento Card 1: Main Story (Bio) - Col Span 2 */}
          <TiltCard isVisible={isVisible} delay={100} className="md:col-span-2">
            <div className="h-full bg-slate-50/70 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-amber-500/10 to-orange-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-4">Latar Belakang</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
                  Menjembatani <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Aestetika</span> Desain & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">Logika</span> Pemrograman.
                </h3>
                <p className="text-slate-650 dark:text-slate-350 text-sm sm:text-base leading-relaxed mb-6">
                  Saya adalah seorang pengembang web frontend yang antusias dan detail-oriented. Perjalanan saya dimulai dari ketertarikan mendalam bagaimana antarmuka digital dapat memengaruhi perilaku manusia. Saya fokus membangun produk yang tidak hanya berkinerja tinggi tetapi juga memiliki visual yang menawan.
                </p>
                <p className="text-slate-650 dark:text-slate-350 text-sm sm:text-base leading-relaxed">
                  Bagi saya, setiap piksel memiliki peran, dan setiap baris kode harus ditulis dengan bersih dan terstruktur untuk menghasilkan pengalaman pengguna yang mulus di berbagai perangkat.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center gap-4">
                <span className="text-xs font-bold text-slate-400">STATUS SEKARANG:</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 rounded-full text-xs font-semibold text-amber-600 dark:text-amber-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                  Eksplorasi AI & React Architecture
                </span>
              </div>
            </div>
          </TiltCard>

          {/* Bento Card 2: Interactive Focus Areas - Col Span 1 */}
          <TiltCard isVisible={isVisible} delay={200} className="md:col-span-1">
            <div className="h-full bg-slate-50/70 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-4">Fokus Kompetensi</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Di Mana Saya Bersinar</h3>
                
                {/* Accordion / Selector List */}
                <div className="space-y-3">
                  {focusAreas.map((area, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setActiveFocus(idx)}
                      className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                        activeFocus === idx 
                        ? 'bg-white dark:bg-slate-950 border-amber-500/30 shadow-md' 
                        : 'bg-transparent border-transparent hover:bg-slate-100/50 dark:hover:bg-slate-800/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-sm font-bold transition-colors ${activeFocus === idx ? 'text-amber-650 dark:text-amber-450' : 'text-slate-800 dark:text-slate-200'}`}>
                          {area.title}
                        </span>
                        <span className="text-xs font-bold text-slate-450">{area.percent}%</span>
                      </div>
                      
                      {/* Dynamic Progress Bar */}
                      <div className="h-1 w-full bg-slate-200 dark:bg-slate-850 rounded-full overflow-hidden mb-2">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-700" 
                          style={{ width: `${area.percent}%` }}
                        ></div>
                      </div>

                      {/* Expandable description */}
                      <div className={`transition-all duration-500 overflow-hidden ${activeFocus === idx ? 'max-h-36 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                        <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                          {area.desc}
                        </p>
                        <span className="text-[9px] font-bold text-slate-400 block mt-2 tracking-wide uppercase">
                          Tech: {area.tech}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Bento Card 3: Design Philosophies - Col Span 1 */}
          <TiltCard isVisible={isVisible} delay={300} className="md:col-span-1">
            <div className="h-full bg-slate-50/70 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-4">Filosofi Kerja</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Bagaimana Saya Bekerja</h3>
                
                {/* Horizontal tabs buttons for Philosophies */}
                <div className="flex gap-2 mb-6 bg-slate-200/50 dark:bg-slate-950 p-1 rounded-xl border border-slate-250 dark:border-slate-800">
                  {philosophies.map((philo, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhilosophy(idx)}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-300 ${
                        activePhilosophy === idx 
                        ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm' 
                        : 'text-slate-550 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      {philo.icon} {philo.tag}
                    </button>
                  ))}
                </div>

                {/* Tab content display with cross-fade animation */}
                <div className="relative min-h-[140px]">
                  {philosophies.map((philo, idx) => (
                    <div 
                      key={idx}
                      className={`transition-all duration-500 transform ${
                        activePhilosophy === idx 
                        ? 'opacity-100 translate-y-0 relative' 
                        : 'opacity-0 translate-y-4 absolute pointer-events-none'
                      }`}
                    >
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">{philo.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        "{philo.desc}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Bento Card 4: Stats Dashboard - Col Span 2 */}
          <TiltCard isVisible={isVisible} delay={400} className="md:col-span-2">
            <div className="h-full bg-slate-50/70 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col justify-between overflow-hidden relative group">
              {/* Stats Grid */}
              <div>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-6">Statistik Kontribusi</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 lg:gap-8">
                  {stats.map((stat, i) => (
                    <div key={i} className="relative bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-850 hover:border-amber-500/20 transition-all duration-300 flex flex-col justify-between group/stat">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-md group-hover/stat:scale-110 transition-transform duration-300`}>
                          {stat.icon}
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">METRIC</span>
                      </div>
                      
                      <div>
                        <h4 className="text-3xl sm:text-3.5xl md:text-4.5xl font-black text-slate-900 dark:text-white mb-1.5 tracking-tight flex items-baseline">
                          <CountUp end={stat.value} duration={1800} startCounting={isVisible} />
                          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${stat.color} ml-1`}>{stat.suffix}</span>
                        </h4>
                        <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Bento Card 5: Full Width CTA Connect - Col Span 3 */}
          <div 
            onClick={() => window.location.href = '#contact'}
            className={`lg:col-span-3 bg-slate-900 dark:bg-slate-900 p-8 sm:p-10 rounded-[2rem] relative overflow-hidden group cursor-pointer border border-slate-800 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-500 sr-hidden sr-fade-up sr-delay-500 ${isVisible ? 'revealed' : ''}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 group-hover:scale-150 transition-transform duration-1000"></div>
            
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <h4 className="text-2xl sm:text-3xl font-black text-white mb-2">Punya ide hebat?</h4>
                <p className="text-slate-400 group-hover:text-amber-200 font-medium transition-colors text-sm sm:text-base">Mari wujudkan solusi digital masa depan bersama.</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-slate-900 group-hover:scale-110 transition-all duration-500 shadow-xl shadow-amber-500/20">
                <svg className="w-7 h-7 group-hover:rotate-45 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
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

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
      x: (dy / yc) * -10, // Max tilt 10deg
      y: (dx / xc) * 10
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
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(245, 158, 11, 0.15), transparent 80%)`,
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
  const [activeTab, setActiveTab] = useState('perjalanan');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(el); }
    }, { threshold: 0.1 });
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
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  const tabs = [
    { id: 'perjalanan', label: 'Perjalanan', content: 'Berawal dari rasa penasaran melihat bagaimana aplikasi web bekerja, saya mulai mendalami dasar-dasar pemrograman antarmuka. Kini, saya mahir membangun ekosistem web modern menggunakan React, TypeScript, dan Tailwind CSS.' },
    { id: 'filosofi', label: 'Filosofi Kerja', content: 'Saya memegang teguh prinsip "Design is how it works". Kode yang saya tulis harus rapi dan menghasilkan antarmuka yang sangat responsif, cepat, dan memanjakan mata pengguna.' },
    { id: 'tujuan', label: 'Tujuan Masa Depan', content: 'Terus berinovasi dalam dunia frontend, mempelajari teknologi AI integrasi, dan berkontribusi dalam proyek-proyek yang memberikan dampak positif bagi banyak orang.' }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 sm:py-32 relative bg-white dark:bg-slate-950 overflow-hidden">
      {/* Interactive Background Elements */}
      <div 
        className="absolute top-20 right-[10%] w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none transition-transform duration-300 ease-out"
        style={{ transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)` }}
      ></div>
      <div 
        className="absolute bottom-20 left-[10%] w-80 h-80 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none transition-transform duration-500 ease-out"
        style={{ transform: `translate3d(${-mousePos.x * 1.5}px, ${-mousePos.y * 1.5}px, 0)` }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Content */}
          <div className={`sr-hidden sr-fade-left ${isVisible ? 'revealed' : ''}`}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Tentang Saya</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 leading-[1.1] tracking-tight">
              Kreativitas Bertemu <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Logika Presisi.</span>
            </h2>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-xl">
              Saya bukan sekadar pembuat website. Saya adalah arsitek pengalaman digital yang fokus pada <span className="text-slate-900 dark:text-white font-bold">performa, estetika, dan kemudahan pengguna.</span>
            </p>

            {/* Premium Tab System */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-1.5 rounded-2xl inline-flex mb-8 border border-slate-200 dark:border-slate-800">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 sm:px-6 py-2.5 text-sm sm:text-base font-bold transition-all duration-500 rounded-xl ${activeTab === tab.id ? 'text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                >
                  {activeTab === tab.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl shadow-lg shadow-amber-500/20 transition-all duration-500"></div>
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="relative min-h-[140px]">
              {tabs.map((tab) => (
                <div 
                  key={tab.id}
                  className={`transition-all duration-500 transform ${activeTab === tab.id ? 'opacity-100 translate-x-0 relative' : 'opacity-0 translate-x-8 absolute pointer-events-none'}`}
                >
                  <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed italic border-l-4 border-amber-500 pl-6 py-1">
                    "{tab.content}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <TiltCard 
                key={i} 
                isVisible={isVisible} 
                delay={i * 150}
                className={i === 2 ? 'sm:col-span-2' : ''}
              >
                <div className="h-full bg-slate-50 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-amber-500/30 transition-all duration-500 group overflow-hidden shadow-sm hover:shadow-2xl">
                  {/* Floating decorative elements */}
                  <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-amber-500/10 group-hover:scale-110 transition-transform duration-500`}>
                      {stat.icon}
                    </div>

                    <h4 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tight flex items-baseline">
                      <CountUp end={stat.value} duration={2000} startCounting={isVisible} />
                      <span className={`text-transparent bg-clip-text bg-gradient-to-r ${stat.color} ml-1`}>{stat.suffix}</span>
                    </h4>
                    
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.2em]">{stat.label}</p>
                  </div>

                  {/* Aesthetic progress bar */}
                  <div className="mt-8 h-1 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${stat.color} transition-all duration-1000 delay-500 ease-out`}
                      style={{ width: isVisible ? '100%' : '0%' }}
                    ></div>
                  </div>
                </div>
              </TiltCard>
            ))}

            {/* Bottom CTA Card */}
            <div 
              className={`sm:col-span-2 bg-slate-900 dark:bg-slate-900 p-8 sm:p-10 rounded-3xl relative overflow-hidden group cursor-pointer border border-slate-800 hover:border-amber-500/50 transition-all duration-500 sr-hidden sr-fade-up sr-delay-500 ${isVisible ? 'revealed' : ''}`}
              onClick={() => window.location.href = '#contact'}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 group-hover:scale-150 transition-transform duration-1000"></div>
              
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <h4 className="text-2xl sm:text-3xl font-black text-white mb-2">Punya ide hebat?</h4>
                  <p className="text-slate-400 group-hover:text-amber-200 font-medium transition-colors">Mari wujudkan solusi digital masa depan bersama.</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-slate-900 group-hover:scale-110 transition-all duration-500 shadow-xl shadow-amber-500/20">
                  <svg className="w-8 h-8 group-hover:rotate-45 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;

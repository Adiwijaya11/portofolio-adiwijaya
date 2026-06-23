import { useState, useEffect, useRef } from 'react';
import fotoSaya from '../assets/profile.jpeg';

const roles = ["Frontend Developer", "Web Designer", "Tech Enthusiast"];

const Hero = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  const techStack = [
    { name: 'HTML', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', pos: '-top-4 left-1/4', delay: '0s' },
    { name: 'CSS', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', pos: 'top-6 -right-3', delay: '0.5s' },
    { name: 'TailwindCSS', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', pos: 'top-1/3 -right-6', delay: '1s' },
    { name: 'JavaScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', pos: 'bottom-1/3 -right-4', delay: '1.5s' },
    { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', pos: 'bottom-4 right-8', delay: '2s' },
    { name: 'Bootstrap', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg', pos: '-bottom-4 left-1/2 -translate-x-1/2', delay: '2.5s' },
    { name: 'PHP', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg', pos: 'bottom-6 left-8', delay: '3s' },
    { name: 'Laravel', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg', pos: 'bottom-1/3 -left-6', delay: '3.5s' },
    { name: 'Python', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', pos: 'top-1/3 -left-5', delay: '4s' },
    { name: 'Java', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', pos: 'top-4 left-4', delay: '4.5s' },
    { name: 'Figma', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', pos: '-top-5 right-1/4', delay: '5s' },
  ];

  // Mouse Move Parallax & Coordinate tracking effect
  useEffect(() => {
    // Set initial coordinates to center of window
    setMouseCoords({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMouseCoords({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      } else {
        setMouseCoords({ x: e.clientX, y: e.clientY });
      }

      if (window.innerWidth < 1024) return;
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 45,
        y: (e.clientY / window.innerHeight - 0.5) * 45
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const ticker = setTimeout(() => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
        setTypingSpeed(50);
      } else {
        setText(fullText.substring(0, text.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && text === fullText) {
        setTypingSpeed(1500); // Tahan sebelum menghapus
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500); // Tahan sebelum mengetik teks berikutnya
      }
    }, typingSpeed);

    return () => clearTimeout(ticker);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <section id="home" ref={sectionRef} className="min-h-screen flex items-center pt-20 pb-12 overflow-hidden relative">
      {/* --- Premium Background Layers --- */}
      {/* 1. Base color ensuring dark mode consistency */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950 z-[-2] transition-colors duration-500"></div>
      
      {/* 2. Interactive Spotlight Grid Pattern with Fade out mask */}
      <div 
        className="absolute inset-0 z-[-1] pointer-events-none opacity-80 transition-opacity duration-300"
        style={{
          backgroundImage: `
            radial-gradient(circle 350px at ${mouseCoords.x}px ${mouseCoords.y}px, rgba(245, 158, 11, 0.15), transparent 80%),
            linear-gradient(to right, var(--grid-color, rgba(148, 163, 184, 0.15)) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-color, rgba(148, 163, 184, 0.15)) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 48px 48px, 48px 48px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 50%, #000 65%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 50%, #000 65%, transparent 100%)'
        }}
      ></div>

      {/* 3. Animated Glowing Orbs (Mesh Gradient Parallax Effect) */}
      <div 
        className="absolute top-0 -left-10 md:left-1/4 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bg-amber-400/15 dark:bg-amber-500/5 rounded-full blur-[40px] sm:blur-[60px] animate-blob z-[-1] pointer-events-none transition-transform duration-1000 ease-out"
        style={{ transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)` }}
      ></div>
      <div 
        className="absolute top-1/4 -right-10 md:right-1/4 w-[300px] sm:w-[550px] h-[300px] sm:h-[550px] bg-orange-400/15 dark:bg-orange-600/5 rounded-full blur-[40px] sm:blur-[60px] animate-blob animation-delay-2000 z-[-1] pointer-events-none transition-transform duration-700 ease-out"
        style={{ transform: `translate3d(${-mousePos.x * 1.3}px, ${-mousePos.y * 1.3}px, 0)` }}
      ></div>
      <div 
        className="absolute -bottom-20 left-1/3 w-[200px] sm:w-[350px] h-[200px] sm:h-[350px] bg-blue-400/15 dark:bg-blue-600/5 rounded-full blur-[40px] sm:blur-[60px] animate-blob animation-delay-4000 z-[-1] pointer-events-none transition-transform duration-1000 ease-out"
        style={{ transform: `translate3d(${mousePos.x * 0.8}px, ${-mousePos.y * 0.8}px, 0)` }}
      ></div>
      {/* ------------------------------- */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6">

          {/* Teks - Hero langsung visible, animasi dengan CSS keyframe bukan scroll */}
          <div className="flex-1 text-center md:text-left w-full animate-fadeInUp">
            
            {/* Status Pulse Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6 backdrop-blur-md cursor-pointer hover:bg-emerald-500/20 transition-all duration-300 active:scale-95">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                Tersedia untuk Pekerjaan
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tighter mb-4 sm:mb-6 text-slate-900 dark:text-white leading-[1.1]">
              Halo, Saya <br />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 dark:from-amber-400 dark:via-orange-500 dark:to-yellow-400 cursor-default transition-all duration-300 hover:brightness-110 drop-shadow-[0_2px_10px_rgba(245,158,11,0.05)]">
                Adi Wijaya.
              </span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-slate-700 dark:text-slate-300 max-w-xl mx-auto md:mx-0 mb-6 sm:mb-8 leading-relaxed">
              Saya membangun pengalaman web yang aksesibel, <span className="font-semibold text-amber-550 dark:text-amber-400">pixel-perfect</span>, dan berkinerja tinggi.
            </p>
            
            <div className="h-8 sm:h-10 mb-8 sm:mb-12 flex items-center justify-center md:justify-start gap-3">
              <div className="hidden sm:block w-10 h-[3px] bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
              <h2 className="text-base sm:text-xl font-bold text-slate-655 dark:text-slate-400">
                Spesialisasi: <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500 dark:from-amber-400 dark:to-orange-400 font-extrabold">{text}</span>
                <span className="text-amber-500 dark:text-amber-455 font-bold ml-1 animate-pulse">|</span>
              </h2>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center md:justify-start">
              <a 
                href="#projects" 
                className="group px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 shadow-xl shadow-slate-900/10 dark:shadow-white/5 hover:shadow-amber-500/20 dark:hover:shadow-amber-500/20 text-sm sm:text-base text-center flex items-center justify-center gap-2 relative overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 flex items-center gap-2">
                  Lihat Karya Saya
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
              <a 
                href="./cv.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                download="CV_Adi_Wijaya.pdf" 
                className="group px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border-2 border-slate-200 dark:border-slate-800 font-bold text-slate-700 dark:text-white hover:border-amber-500 dark:hover:border-amber-500 hover:text-amber-500 dark:hover:text-amber-400 active:scale-95 transition-all duration-300 text-sm sm:text-base text-center flex items-center justify-center gap-2"
              >
                Unduh CV
                <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>
          </div>

          {/* Foto - TETAP DAN TIDAK BERUBAH sesuai permintaan user */}
          <div className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0 relative group" style={{ animation: 'fadeInUp 0.9s 0.2s ease-out both' }}>
            <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 transition-all duration-700 group-hover:-translate-y-3">
              <div className="absolute inset-0 rounded-full bg-slate-200 dark:bg-slate-800 border-4 sm:border-6 border-white/50 dark:border-slate-800/50 shadow-xl overflow-hidden relative z-10">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent z-10 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none"></div>
                <img src={fotoSaya} alt="Adi Wijaya" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
              </div>
              {techStack.map((tech, i) => (
                <div key={i} className={`absolute ${tech.pos} z-20 animate-organic-float`} style={{ animationDelay: tech.delay }}>
                  <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-1.5 sm:p-2.5 md:p-3 rounded-full shadow-xl border border-slate-200 dark:border-white/10 hover:scale-125 transition-transform duration-300" title={tech.name}>
                    <img src={tech.url} alt={tech.name} className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 drop-shadow-md" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        #home {
          --grid-color: rgba(148, 163, 184, 0.15);
        }
        .dark #home {
          --grid-color: rgba(51, 65, 85, 0.45);
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out both;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 10s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default Hero;

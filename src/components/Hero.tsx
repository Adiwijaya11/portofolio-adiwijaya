import { useState, useEffect } from 'react';
import fotoSaya from '../assets/profile.jpeg';

const roles = ["Frontend Developer", "Web Designer", "Tech Enthusiast"];

const Hero = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

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
    <section id="home" className="min-h-screen flex items-center pt-20 pb-12 overflow-hidden relative">
      {/* --- Premium Background Layers --- */}
      {/* 1. Base color ensuring dark mode consistency */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950 z-[-2] transition-colors duration-500"></div>
      
      {/* 2. Grid Pattern with Fade out mask */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] z-[-1] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* 3. Animated Glowing Orbs (Mesh Gradient Effect) - Optimized without mix-blend-mode for better performance */}
      <div className="absolute top-0 -left-10 md:left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-amber-400/20 dark:bg-amber-500/10 rounded-full blur-[60px] sm:blur-[100px] animate-blob z-[-1] pointer-events-none"></div>
      <div className="absolute top-1/4 -right-10 md:right-1/4 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-orange-400/20 dark:bg-orange-600/10 rounded-full blur-[60px] sm:blur-[100px] animate-blob animation-delay-2000 z-[-1] pointer-events-none"></div>
      <div className="absolute -bottom-20 left-1/3 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[60px] sm:blur-[90px] animate-blob animation-delay-4000 z-[-1] pointer-events-none"></div>
      {/* ------------------------------- */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6">

          {/* Teks - Hero langsung visible, animasi dengan CSS keyframe bukan scroll */}
          <div className="flex-1 text-center md:text-left w-full" style={{ animation: 'fadeInUp 0.8s ease-out both' }}>
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tighter mb-4 sm:mb-6 text-slate-900 dark:text-white leading-[1.1]">
              Halo, Saya <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Adi Wijaya.</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-700 dark:text-slate-300 max-w-xl mx-auto md:mx-0 mb-5 sm:mb-8 leading-relaxed">
              Saya membangun pengalaman web yang aksesibel, <span className="font-semibold text-amber-500">pixel-perfect</span>, dan berkinerja tinggi.
            </p>
            <div className="h-8 sm:h-10 mb-6 sm:mb-10 flex items-center justify-center md:justify-start gap-3">
              <div className="hidden sm:block w-10 h-[3px] bg-amber-500 rounded-full"></div>
              <h2 className="text-base sm:text-xl font-bold text-slate-600 dark:text-slate-400">
                Spesialisasi: <span className="text-amber-600 dark:text-amber-400">{text}</span>
                <span className="animate-pulse">|</span>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center md:justify-start">
              <a href="#projects" className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:scale-105 transition-transform duration-300 shadow-xl text-sm sm:text-base text-center">
                Lihat Karya Saya
              </a>
              <a href={`${import.meta.env.BASE_URL}cv.pdf`} target="_blank" rel="noopener noreferrer" download="CV_Adi_Wijaya.pdf" className="px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 border-slate-200 dark:border-slate-800 font-bold text-slate-700 dark:text-white hover:border-slate-900 dark:hover:border-white transition-all duration-300 text-sm sm:text-base text-center">
                Unduh CV
              </a>
            </div>
          </div>

          {/* Foto */}
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

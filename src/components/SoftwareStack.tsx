import React, { useEffect, useRef } from 'react';

const tools = [
  { name: 'VSCode', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
  { name: 'Laragon', icon: 'https://unpkg.com/simple-icons@11.14.0/icons/laragon.svg', invertDark: true, color: '#0096D8' },
  { name: 'Antigravity', icon: "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cdefs%3E%3ClinearGradient id='ag' x1='0%25' y1='100%25' x2='0%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%233b82f6'/%3E%3Cstop offset='35%25' stop-color='%2306b6d4'/%3E%3Cstop offset='65%25' stop-color='%23eab308'/%3E%3Cstop offset='85%25' stop-color='%23f97316'/%3E%3Cstop offset='100%25' stop-color='%23ef4444'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M 3 20 C 7 18, 9 8, 10.5 5 C 11.5 3, 12.5 3, 13.5 5 C 15 8, 17 18, 21 20 C 17 19, 15 14, 13.5 11 C 12.5 9, 11.5 9, 10.5 11 C 9 14, 7 19, 3 20 Z' fill='url(%23ag)'/%3E%3C/svg%3E", invertDark: false },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
  { name: 'Android Studio', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg' },
  { name: 'Netbeans', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Apache_NetBeans_Logo.svg' },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', invertDark: true },
  { name: 'ChatGPT', icon: 'https://unpkg.com/simple-icons@11.14.0/icons/openai.svg', invertDark: true, color: '#10A37F' },
  { name: 'Claude', icon: 'https://unpkg.com/simple-icons@11.14.0/icons/anthropic.svg', invertDark: true, color: '#D97757' },
  { name: 'Gemini', icon: 'https://unpkg.com/simple-icons@11.14.0/icons/googlegemini.svg', invertDark: true, color: '#8E75B2' },
];

const SoftwareStack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const physicsRef = useRef<Array<{ x: number, y: number, vx: number, vy: number, rot: number, vRot: number, size: number }>>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current.getBoundingClientRect();
    const width = container.width;
    const height = container.height;
    
    const isMobile = window.innerWidth < 640;
    const initialBaseSize = isMobile ? 80 : 110;

    // Inisialisasi fisika
    physicsRef.current = tools.map(() => {
      const startX = Math.random() * (width - initialBaseSize);
      const startY = Math.random() * (height - initialBaseSize);
      
      return {
        x: startX,
        y: startY,
        vx: (Math.random() - 0.5) * 4, // Sedikit lebih cepat
        vy: (Math.random() - 0.5) * 4,
        rot: Math.random() * 360, // Rotasi awal
        vRot: (Math.random() - 0.5) * 2,
        size: initialBaseSize,
      };
    });

    let animationFrameId: number;

    const updatePhysics = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const currentWidth = rect.width;
      const currentHeight = rect.height;

      const items = physicsRef.current;
      const currentBaseSize = window.innerWidth < 640 ? 80 : 110;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        item.size = currentBaseSize;
        
        item.vx *= 0.995; // Gesekan lebih kecil
        item.vy *= 0.995;
        item.rot += item.vRot; // Update rotasi

        const speed = Math.sqrt(item.vx * item.vx + item.vy * item.vy);
        if (speed < 0.8) {
          item.vx += (Math.random() - 0.5) * 0.15;
          item.vy += (Math.random() - 0.5) * 0.15;
        }

        item.x += item.vx;
        item.y += item.vy;

        // Pantulan dinding
        if (item.x <= 0) {
          item.x = 0;
          item.vx *= -1;
          item.vRot = (Math.random() - 0.5) * 4; // Berubah arah rotasi saat membentur
        } else if (item.x + item.size >= currentWidth) {
          item.x = currentWidth - item.size;
          item.vx *= -1;
          item.vRot = (Math.random() - 0.5) * 4;
        }

        if (item.y <= 0) {
          item.y = 0;
          item.vy *= -1;
          item.vRot = (Math.random() - 0.5) * 4;
        } else if (item.y + item.size >= currentHeight) {
          item.y = currentHeight - item.size;
          item.vy *= -1;
          item.vRot = (Math.random() - 0.5) * 4;
        }

        // Tabrakan antar elemen
        for (let j = i + 1; j < items.length; j++) {
          const p2 = items[j];
          const dx = (item.x + item.size / 2) - (p2.x + p2.size / 2);
          const dy = (item.y + item.size / 2) - (p2.y + p2.size / 2);
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = item.size / 2 + p2.size / 2;

          if (dist < minDist) {
            const overlap = minDist - dist;
            const angle = Math.atan2(dy, dx);
            const pushX = Math.cos(angle) * overlap / 2;
            const pushY = Math.sin(angle) * overlap / 2;
            
            item.x += pushX;
            item.y += pushY;
            p2.x -= pushX;
            p2.y -= pushY;

            const tempVx = item.vx;
            const tempVy = item.vy;
            item.vx = p2.vx;
            item.vy = p2.vy;
            p2.vx = tempVx;
            p2.vy = tempVy;

            // Tambahkan putaran saat bertabrakan
            item.vRot += (Math.random() - 0.5) * 2;
            p2.vRot += (Math.random() - 0.5) * 2;
          }
        }

        const el = elementsRef.current[i];
        if (el) {
          // Terapkan translasi 3d dan rotasi untuk performa lebih mulus (GPU Accelerated)
          el.style.transform = `translate3d(${item.x}px, ${item.y}px, 0) rotate(${item.rot}deg)`;
          
          // Counter-rotate the inner content so text stays readable
          const innerEl = el.firstElementChild as HTMLElement;
          if (innerEl) {
             innerEl.style.transform = `rotate(${-item.rot}deg)`;
          }
        }
      }

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const applyForce = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;

    physicsRef.current.forEach((item) => {
      const dx = (item.x + item.size / 2) - mouseX;
      const dy = (item.y + item.size / 2) - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      const pushRadius = 150; 
      if (dist < pushRadius) {
        const force = (pushRadius - dist) / pushRadius;
        const angle = Math.atan2(dy, dx);
        item.vx += Math.cos(angle) * force * 5;
        item.vy += Math.sin(angle) * force * 5;
        item.vRot += (Math.random() - 0.5) * force * 10;
      }
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    applyForce(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    applyForce(e.touches[0].clientX, e.touches[0].clientY);
  };

  return (
    <section id="software-stack" className="py-20 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent"></div>
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 scroll-reveal">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Teknologi <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">& Perangkat Lunak</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Didukung oleh ekosistem modern dan kecerdasan buatan terdepan, saya siap membantu merealisasikan ide brilian Anda menjadi solusi digital berkualitas tinggi. 
            <br className="hidden sm:block" />
            <span className="text-sm font-medium text-amber-500 dark:text-amber-400 mt-2 inline-block">✨ (Psst, coba sentuh ikon-ikon di bawah dengan kursor Anda!)</span>
          </p>
        </div>

        {/* Wadah 0 Gravitasi dengan gaya tangki kaca futuristik */}
        <div 
          ref={containerRef} 
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full h-[550px] sm:h-[650px] border border-slate-300/50 dark:border-slate-700/50 rounded-[3rem] bg-gradient-to-b from-white/30 to-slate-100/30 dark:from-slate-800/20 dark:to-slate-900/40 backdrop-blur-xl overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] group touch-none"
        >
          {/* Grid lines background untuk efek lab/ruang */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

          {tools.map((tool, index) => (
            <div
              key={index}
              ref={(el) => { elementsRef.current[index] = el; }}
              className="absolute top-0 left-0 flex flex-col items-center justify-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/50 dark:border-white/10 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:bg-white dark:hover:bg-slate-700 transition-colors duration-300 will-change-transform cursor-pointer w-[80px] h-[80px] sm:w-[110px] sm:h-[110px]"
            >
              {/* Inner wrapper to counter-rotate so content stays upright */}
              <div className="flex flex-col items-center justify-center w-full h-full pointer-events-none transition-transform duration-75">
                <img 
                  src={tool.icon} 
                  alt={tool.name} 
                  className={`w-8 h-8 sm:w-12 sm:h-12 object-contain mb-1 sm:mb-2 drop-shadow-md pointer-events-none ${tool.invertDark ? 'dark:invert dark:opacity-90' : ''}`} 
                />
                <span className="text-[10px] sm:text-[12px] font-bold text-slate-800 dark:text-slate-200 pointer-events-none text-center leading-tight px-2 drop-shadow-sm">
                  {tool.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SoftwareStack;

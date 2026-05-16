import { useEffect, useRef, useState } from 'react';
import topupImg from '../assets/topup.png';
import resepImg from '../assets/resep.png';
import elektronikImg from '../assets/elektronik.png';
import exploreBaliImg from '../assets/exlplore-bali.png';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  color: string;
  image: string | null;
  link: string;
  github: string;
}

const projects: Project[] = [
  {
    id: 4,
    title: 'Explore Bali',
    category: 'Travel & Tourism',
    description: 'Platform eksplorasi wisata Bali yang menyajikan informasi destinasi, budaya, dan kuliner terbaik di Pulau Dewata. Didesain dengan antarmuka yang modern, responsif, dan interaktif menggunakan React.',
    tech: ['React', 'JavaScript', 'TailwindCSS', 'Framer Motion'],
    color: 'from-blue-500 to-cyan-500',
    image: exploreBaliImg,
    link: '#',
    github: 'https://github.com/Adiwijaya11/Adiwijaya11'
  },
  {
    id: 1,
    title: 'GameTopup Portal',
    category: 'E-Commerce / Payment',
    description: 'Website layanan top-up game instan dan otomatis. Mendukung berbagai macam game populer dengan sistem kalkulasi harga real-time dan desain UI/UX bergaya gaming yang gelap dan agresif.',
    tech: ['Laravel', 'JavaScript', 'PHP', 'MySQL', 'TailwindCSS'],
    color: 'from-amber-500 to-orange-600',
    image: topupImg,
    link: '#',
    github: 'https://github.com/Adiwijaya11/Adiwijaya11'
  },
  {
    id: 2,
    title: 'AI Recipe Generator',
    category: 'Artificial Intelligence',
    description: 'Aplikasi resep memasak cerdas yang menggunakan Artificial Intelligence untuk menghasilkan resep unik berdasarkan bahan-bahan sisa yang ada di kulkas pengguna. Sangat interaktif dan solutif.',
    tech: ['Laravel', 'JavaScript', 'PHP', 'MySQL', 'TailwindCSS'],
    color: 'from-emerald-400 to-teal-500',
    image: resepImg,
    link: '#',
    github: 'https://github.com/Adiwijaya11/Adiwijaya11'
  },
  {
    id: 3,
    title: 'LaptopStore Admin Panel',
    category: 'E-Commerce & Dashboard',
    description: 'Platform e-commerce penjualan laptop lengkap dengan sistem Admin Panel terintegrasi. Admin dapat mengelola stok barang, melihat grafik penjualan mingguan, dan mengatur status pengiriman.',
    tech: ['Laravel', 'JavaScript', 'PHP', 'MySQL', 'TailwindCSS'],
    color: 'from-purple-500 to-pink-600',
    image: elektronikImg,
    link: '#',
    github: 'https://github.com/Adiwijaya11/Adiwijaya11'
  }
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedProject]);

  return (
    <section id="projects" ref={sectionRef} className="py-16 sm:py-24 relative bg-white dark:bg-slate-950">
      <div className="absolute top-40 left-0 w-64 sm:w-[600px] h-64 sm:h-[600px] bg-slate-100 dark:bg-slate-900/50 rounded-full blur-3xl pointer-events-none -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-20 sr-hidden sr-fade-up ${isVisible ? 'revealed' : ''}`}>
          <h2 className="text-xs sm:text-sm font-bold text-amber-500 uppercase tracking-widest mb-3 sm:mb-4">Portofolio Kunci</h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 sm:mb-6">
            Karya yang Membanggakan
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400">
            Kumpulan proyek terbaik yang pernah saya bangun. Mulai dari platform e-commerce hingga integrasi kecerdasan buatan (AI) yang mutakhir.
          </p>
        </div>

        {/* Grid Proyek: 1 col mobile, 2 col md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group bg-slate-50 dark:bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col sr-hidden sr-zoom-up ${isVisible ? 'revealed' : ''}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-900 cursor-pointer" onClick={() => setSelectedProject(project)}>
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out opacity-90"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-80`}></div>
                )}
                <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent pointer-events-none"></div>

                <div className={`absolute top-4 left-4 px-3 py-1 bg-gradient-to-r ${project.color} shadow-lg rounded-full text-white text-[10px] sm:text-xs font-bold tracking-wider uppercase`}>
                  {project.category}
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <h4 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-amber-400 transition-colors duration-300 drop-shadow-lg">{project.title}</h4>
                </div>
              </div>

              {/* Konten */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-1 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="px-2 sm:px-3 py-1 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-amber-500 hover:text-white hover:border-amber-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 cursor-default"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Tombol */}
                <div className="flex items-center gap-3 mt-auto">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 text-center py-2.5 sm:py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:bg-amber-500 dark:hover:bg-amber-500 hover:text-white dark:hover:text-white transition-colors duration-300 text-sm sm:text-base"
                  >
                    Lihat
                  </button>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2.5 sm:p-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white hover:border-slate-900 dark:hover:border-white transition-colors duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* POPUP MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-3 sm:p-6">
          <div
            className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          ></div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-[2rem] w-full max-w-lg sm:max-w-2xl md:max-w-3xl max-h-[92vh] overflow-y-auto relative z-10 shadow-2xl shadow-black/50 animate-[fadeIn_0.2s_ease-out] mx-2 sm:mx-0">

            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 bg-white/70 dark:bg-slate-800/70 hover:bg-red-500 text-slate-900 dark:text-white hover:text-white rounded-full backdrop-blur-md transition-all duration-300 shadow-sm"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Gambar */}
            <div className="p-3 sm:p-4 md:p-6 pb-0">
              <div className="relative h-44 sm:h-60 md:h-80 w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-inner bg-slate-100 dark:bg-slate-800">
                {selectedProject.image ? (
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${selectedProject.color}`}></div>
                )}
              </div>
            </div>

            {/* Isi Detail */}
            <div className="p-4 sm:p-6 md:px-10 md:py-8">
              <div className="mb-4 sm:mb-6">
                <div className={`inline-block px-3 sm:px-4 py-1.5 mb-3 sm:mb-4 bg-gradient-to-r ${selectedProject.color} rounded-full text-white text-xs font-bold tracking-wider uppercase shadow-md`}>
                  {selectedProject.category}
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">{selectedProject.title}</h2>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 sm:mb-3">Tentang Proyek</h3>
              <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6 sm:mb-8">
                {selectedProject.description}
              </p>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 sm:mb-3">Teknologi Terkait</h3>
              <div className="flex flex-wrap gap-2 mb-6 sm:mb-10">
                {selectedProject.tech.map((t, i) => (
                  <span key={i} className="px-2.5 sm:px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold rounded-lg border border-slate-200 dark:border-slate-700">
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-4 sm:pt-6 border-t border-slate-100 dark:border-slate-800">
                <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="w-full text-center py-3 sm:py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:bg-amber-500 dark:hover:bg-amber-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:-translate-y-1 text-sm sm:text-base">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  Lihat Source Code
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default Projects;

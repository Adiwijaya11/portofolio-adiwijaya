import { useEffect, useRef, useState } from 'react';

interface Certificate {
  id: number;
  title: string;
  category: string;
  issuer: string;
  filePath: string;
  fileType: 'pdf' | 'image';
  description: string;
  tags: string[];
}

const certificates: Certificate[] = [
  // INTERNAL (AI & Coding)
  {
    id: 1,
    title: 'Event Pelatihan Maju Bareng AI',
    category: 'Artificial Intelligence',
    issuer: 'Hacktiv8',
    filePath: 'sertifikat/internal/event pelatihan maju bareng ai hacktive.pdf',
    fileType: 'pdf',
    description: 'Pelatihan akselerasi pemahaman Artificial Intelligence (AI) dasar hingga menengah untuk meningkatkan produktivitas dan kapabilitas teknologi.',
    tags: ['AI', 'Prompting', 'Hacktiv8']
  },
  {
    id: 2,
    title: 'Kelas Dasar & Penggunaan Generatif AI',
    category: 'Artificial Intelligence',
    issuer: 'AI Opportunity Fund Asia Pacific (Codepolitan)',
    filePath: 'sertifikat/internal/sertifikat-generatif-ai-codepoliton.pdf',
    fileType: 'pdf',
    description: 'Program sertifikasi penguasaan konsep dasar dan pemanfaatan praktis Generative AI dalam skenario kehidupan nyata dan pekerjaan profesional.',
    tags: ['Generative AI', 'AI Opportunity', 'Codepolitan']
  },
  {
    id: 3,
    title: 'DevOps Engineer Workshop',
    category: 'DevOps / Infrastructure',
    issuer: 'dibimbing.id',
    filePath: 'sertifikat/internal/sertifikat-devops-dibimbing.pdf',
    fileType: 'pdf',
    description: 'Workshop intensif yang membahas dasar-dasar DevOps, CI/CD pipeline, kontainerisasi, serta infrastruktur cloud modern.',
    tags: ['DevOps', 'CI/CD', 'Cloud Infrastructure']
  },
  // EXTERNAL (Non-Coding)
  {
    id: 4,
    title: 'Career Preparation Training',
    category: 'Professional Development',
    issuer: 'Pelatihan Career Preparation',
    filePath: 'sertifikat/exsternal/peserta pelatihan career preparparation.jpeg',
    fileType: 'image',
    description: 'Pelatihan kesiapan karier untuk membekali mahasiswa dengan keterampilan interpersonal, pembuatan resume profesional, dan teknik wawancara kerja.',
    tags: ['Career Ready', 'Soft Skills', 'Communication']
  },
  {
    id: 5,
    title: 'Youth Goals Singapore, Malaysia & Thailand',
    category: 'Leadership & International',
    issuer: 'Youth Goals International',
    filePath: 'sertifikat/exsternal/sertifikat-youth-goals-asean.jpeg',
    fileType: 'image',
    description: 'Program kepemimpinan pemuda tingkat internasional yang mencakup kunjungan studi, forum diskusi, dan kolaborasi lintas budaya di tiga negara ASEAN.',
    tags: ['Leadership', 'ASEAN Study', 'Global Mindset']
  },
  {
    id: 6,
    title: 'Entrepreneurship Training',
    category: 'Business & Entrepreneurship',
    issuer: 'Pelatihan Entrepreneur',
    filePath: 'sertifikat/exsternal/sertifikat pelatihan entrepreneur.jpeg',
    fileType: 'image',
    description: 'Pelatihan pemahaman dasar bisnis, penyusunan business plan, strategi pemasaran taktis, dan manajemen keuangan awal bagi wirausaha pemula.',
    tags: ['Business Plan', 'Marketing', 'Finance']
  },
  {
    id: 7,
    title: 'Public Speaking Seminar',
    category: 'Communication',
    issuer: 'Public Speaking Seminar',
    filePath: 'sertifikat/exsternal/sertifikat peserta public speaking.jpeg',
    fileType: 'image',
    description: 'Seminar interaktif mengenai teknik berbicara di depan umum, mengatasi rasa gugup, membawakan presentasi yang menarik, dan persuasi audiens.',
    tags: ['Public Speaking', 'Communication', 'Presentation']
  },
  {
    id: 8,
    title: 'Seminar Nasional Content Creator',
    category: 'Creative Media',
    issuer: 'Content Creator Seminar',
    filePath: 'sertifikat/exsternal/sertifikat sebagai peserta seminar nasional content creator.jpeg',
    fileType: 'image',
    description: 'Seminar nasional yang membahas lanskap industri kreatif digital, taktik pembuatan konten viral yang edukatif, dan monetisasi media sosial.',
    tags: ['Content Creation', 'Digital Branding', 'Creative']
  },
  {
    id: 9,
    title: 'Seminar Mahasiswa Berprestasi',
    category: 'Academic & Achievement',
    issuer: 'Mahasiswa Berprestasi Seminar',
    filePath: 'sertifikat/exsternal/sertifikat seminar mahasiswa berprestasi.jpeg',
    fileType: 'image',
    description: 'Seminar motivasi dan berbagi strategi bagi mahasiswa dalam mencapai prestasi akademis maupun non-akademis di tingkat regional dan nasional.',
    tags: ['Motivation', 'Success Mindset', 'Academic']
  }
];

const Certificates = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'internal' | 'external'>('internal');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedCert]);

  // Filter certificates based on activeTab
  const filteredCertificates = certificates.filter((cert) => {
    if (activeTab === 'internal') {
      return cert.filePath.includes('internal/');
    } else {
      return cert.filePath.includes('exsternal/');
    }
  });

  return (
    <section id="certificates" ref={sectionRef} className="py-20 sm:py-32 relative bg-slate-50 dark:bg-slate-900/30 overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-12 sm:mb-20 sr-hidden sr-fade-up ${isVisible ? 'revealed' : ''}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Sertifikasi & Penghargaan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 sm:mb-6">
            Kredensial & Pelatihan
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400">
            Berikut adalah sertifikat pelatihan, kompetensi, dan kegiatan pengembangan diri yang telah saya selesaikan untuk mendukung karir profesional saya.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className={`flex justify-center mb-12 sr-hidden sr-fade-up sr-delay-100 ${isVisible ? 'revealed' : ''}`}>
          <div className="bg-white dark:bg-slate-950 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl inline-flex border border-slate-200 dark:border-slate-800 shadow-md max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveTab('internal')}
              className={`relative px-3 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-bold transition-all duration-500 rounded-lg sm:rounded-xl flex items-center gap-1.5 sm:gap-2 ${
                activeTab === 'internal' ? 'text-white' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {activeTab === 'internal' && (
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg sm:rounded-xl shadow-lg shadow-amber-500/20 transition-all duration-500"></div>
              )}
              <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Internal (AI & Coding)
              </span>
            </button>
            <button
              onClick={() => setActiveTab('external')}
              className={`relative px-3 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base font-bold transition-all duration-500 rounded-lg sm:rounded-xl flex items-center gap-1.5 sm:gap-2 ${
                activeTab === 'external' ? 'text-white' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {activeTab === 'external' && (
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg sm:rounded-xl shadow-lg shadow-amber-500/20 transition-all duration-500"></div>
              )}
              <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Eksternal (Non-Coding)
              </span>
            </button>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCertificates.map((cert, index) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className={`group bg-white dark:bg-slate-950 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-850 hover:border-amber-500/50 shadow-sm hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-2 transition-all duration-500 flex flex-col cursor-pointer sr-hidden sr-zoom-up ${
                isVisible ? 'revealed' : ''
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Certificate Image or Mockup Header */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center border-b border-slate-200 dark:border-slate-850">
                {cert.fileType === 'image' ? (
                  <img
                    src={import.meta.env.BASE_URL + cert.filePath}
                    alt={cert.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[1s] ease-out opacity-90 group-hover:opacity-100"
                  />
                ) : (
                  // Custom gorgeous vector preview mockup for PDF Certificates
                  <div className="w-full h-full bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-slate-900/10 dark:to-slate-950/20 flex flex-col items-center justify-center relative p-6">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1.5px,transparent_1.5px)] bg-[size:16px_16px]"></div>
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center text-amber-500 mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-inner">
                      {cert.category.includes('Artificial Intelligence') ? (
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      ) : (
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider mb-1">
                      PDF Document
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 text-center line-clamp-1 max-w-[80%]">
                      {cert.issuer}
                    </span>
                  </div>
                )}
                
                {/* Floating badge for Category */}
                <div className="absolute top-3 left-3 px-2.5 py-0.5 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-extrabold rounded-full tracking-wider uppercase border border-white/10">
                  {cert.category}
                </div>

                {/* Hover Quick Action Indicator */}
                <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-4 py-2 bg-white text-slate-950 rounded-full text-xs font-extrabold shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-350">
                    <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Lihat Sertifikat
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-amber-500">{cert.issuer}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-amber-500 transition-colors duration-300">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {cert.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-4">
                  {cert.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-slate-100 dark:bg-slate-900 text-slate-650 dark:text-slate-350 text-[10px] font-bold rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DETAILED MODAL VIEWER */}
      {selectedCert && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          ></div>

          {/* Modal Container */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-4xl max-h-[94vh] overflow-hidden relative z-10 shadow-2xl flex flex-col animate-[fadeIn_0.2s_ease-out] border border-slate-200 dark:border-slate-800">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-500 tracking-wider uppercase mb-1 block">
                  {selectedCert.category}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-tight">
                  {selectedCert.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-550 dark:text-slate-350 hover:bg-red-500 hover:text-white rounded-full transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body (Responsive Scrollable Layout) */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col lg:flex-row gap-6 bg-slate-50 dark:bg-slate-950/40">
              
              {/* Document Preview (Large) */}
              <div className="flex-1 bg-slate-100 dark:bg-slate-900 rounded-2xl overflow-hidden min-h-[240px] sm:min-h-[350px] lg:min-h-[480px] border border-slate-200 dark:border-slate-800 shadow-inner flex items-center justify-center relative">
                {selectedCert.fileType === 'image' ? (
                  <img
                    src={import.meta.env.BASE_URL + selectedCert.filePath}
                    alt={selectedCert.title}
                    className="max-w-full max-h-[60vh] lg:max-h-[65vh] object-contain mx-auto"
                  />
                ) : (
                  // PDF Preview (Using native PDF rendering iframe)
                  <iframe
                    src={`${import.meta.env.BASE_URL}${selectedCert.filePath}#toolbar=0&navpanes=0`}
                    title={selectedCert.title}
                    className="w-full h-full min-h-[240px] sm:min-h-[350px] lg:min-h-[480px] border-0 bg-white"
                  />
                )}
              </div>

              {/* Document Info */}
              <div className="w-full lg:w-80 flex flex-col justify-between bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 h-fit">
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Informasi Sertifikat</h4>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <span className="text-xs text-slate-400 block">Penerbit (Issuer)</span>
                      <span className="text-sm font-semibold text-slate-850 dark:text-slate-150">{selectedCert.issuer}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block">Deskripsi Pelatihan</span>
                      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-350 mt-1">{selectedCert.description}</p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block">Kategori</span>
                      <span className="inline-block mt-1 px-2.5 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-bold rounded-full uppercase tracking-wider">
                        {selectedCert.category}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Tag Kompetensi</h4>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {selectedCert.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-150 dark:border-slate-800 flex flex-col sm:flex-row lg:flex-col gap-3">
                  <a
                    href={import.meta.env.BASE_URL + selectedCert.filePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:bg-amber-500 dark:hover:bg-amber-500 hover:text-white dark:hover:text-white transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-md"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Buka di Tab Baru
                  </a>
                  <a
                    href={import.meta.env.BASE_URL + selectedCert.filePath}
                    download={selectedCert.title}
                    className="flex-1 text-center py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Unduh File
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default Certificates;

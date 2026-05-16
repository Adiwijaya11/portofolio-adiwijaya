import { useEffect, useState, useRef } from 'react';

const sectionMessages: Record<string, string> = {
  home: '👋 Halo! Selamat datang di portofolio saya. Yuk lihat karya terbaik saya!',
  about: '💡 Di sini kamu bisa kenal lebih dekat tentang perjalanan dan skill saya!',
  projects: '🛠️ Ini karya terbaik saya! Klik "Lihat" untuk detail proyek lengkapnya.',
  'software-stack': '🪐 Wow, masuk ruang 0 Gravitasi! Coba sentuh ikon-ikon melayang ini dengan kursor Anda.',
  contact: '📬 Punya proyek atau tawaran? Isi form di bawah atau hubungi saya langsung!',
};

interface Message {
  id: number;
  from: 'bot' | 'user';
  text: string;
}

const SmartChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [bubbleText, setBubbleText] = useState('');
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageIdRef = useRef(0);
  const bubbleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect active section
  useEffect(() => {
    const sections = document.querySelectorAll('section[id], footer[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Show bubble automatically when section changes (only if chat not open)
  useEffect(() => {
    if (isOpen) return;
    const msg = sectionMessages[activeSection];
    if (!msg) return;

    // Hide old bubble first by setting it false within a short timeout to prevent cascading render error
    setTimeout(() => setBubbleVisible(false), 0);
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);

    // Small delay then show new bubble
    bubbleTimerRef.current = setTimeout(() => {
      setBubbleText(msg);
      setBubbleVisible(true);

      // Auto-hide after 6 seconds
      bubbleTimerRef.current = setTimeout(() => {
        setBubbleVisible(false);
      }, 6000);
    }, 600);

    return () => {
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    };
  }, [activeSection, isOpen]);

  // Initial messages in full chat
  useEffect(() => {
    messageIdRef.current += 1;
    setMessages([{
      id: messageIdRef.current,
      from: 'bot',
      text: 'Halo! 👋 Saya Adi. Ada yang bisa saya bantu seputar portofolio ini?'
    }]);
  }, []);

  // Auto-scroll in chat
  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    messageIdRef.current += 1;
    setMessages(prev => [...prev, { id: messageIdRef.current, from: 'user', text: trimmed }]);
    setInputValue('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const lower = trimmed.toLowerCase();
      let reply = 'Terima kasih! 😊 Untuk diskusi lebih lanjut, isi form kontak di bawah ya!';
      if (lower.includes('halo') || lower.includes('hai') || lower.includes('hello')) reply = 'Halo juga! 👋 Senang bertemu kamu!';
      else if (lower.includes('proyek') || lower.includes('project')) reply = '🛠️ Saya punya beberapa proyek unggulan. Cek bagian Karya untuk detailnya!';
      else if (lower.includes('kontak') || lower.includes('hubungi')) reply = '📬 Bisa via email, LinkedIn, TikTok, Instagram, atau GitHub. Scroll ke bagian Kontak!';
      else if (lower.includes('skill') || lower.includes('bisa')) reply = '💪 Saya menguasai Laravel, React, PHP, MySQL, JavaScript, dan TailwindCSS!';
      else if (lower.includes('alat') || lower.includes('software') || lower.includes('tool') || lower.includes('teknologi')) reply = '🚀 Saya rutin menggunakan VSCode, Laragon, Figma, Docker, Android Studio, Netbeans, GitHub, serta dibantu AI mutakhir seperti Antigravity, ChatGPT, Claude, dan Gemini!';
      else if (lower.includes('cv') || lower.includes('resume')) reply = '📄 Download CV saya di tombol "Unduh CV" di bagian atas halaman!';
      messageIdRef.current += 1;
      setMessages(prev => [...prev, { id: messageIdRef.current, from: 'bot', text: reply }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9998] flex flex-col items-end gap-3 pointer-events-none">

      {/* ===== FULL CHAT WINDOW ===== */}
      <div className={`pointer-events-auto transition-all duration-400 ease-out transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="bg-slate-900 border border-slate-700 rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/50 w-[calc(100vw-2rem)] max-w-xs sm:max-w-sm flex flex-col overflow-hidden" style={{ height: '420px' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 sm:p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-extrabold text-sm sm:text-base border-2 border-white/30">A</div>
              <div>
                <p className="text-white font-bold text-sm leading-none">Adi Wijaya</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse"></span>
                  <span className="text-amber-100 text-xs">Online sekarang</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors p-1">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-slate-950">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                {msg.from === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-xs shrink-0">A</div>
                )}
                <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs sm:text-sm leading-relaxed ${msg.from === 'bot'
                    ? 'bg-slate-800 text-slate-200 rounded-bl-none'
                    : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-br-none'
                  }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-end gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-xs shrink-0">A</div>
                <div className="bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-none flex gap-1">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 sm:p-4 bg-slate-900 border-t border-slate-800 shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
                placeholder="Ketik pesan..."
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-all"
              />
              <button onClick={handleSend} className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-2 rounded-xl hover:scale-110 transition-transform shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== AUTO BUBBLE (muncul sendiri tanpa diklik) ===== */}
      {!isOpen && (
        <div className={`pointer-events-auto flex items-end gap-2 transition-all duration-500 ${bubbleVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-95 pointer-events-none'}`}>
          {/* Bubble teks */}
          <div className="relative bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm font-medium px-4 py-3 rounded-2xl rounded-br-none shadow-xl border border-slate-200 dark:border-slate-700 max-w-[220px] sm:max-w-[260px] cursor-pointer hover:shadow-2xl transition-shadow"
            onClick={() => setIsOpen(true)}
          >
            {bubbleText}
            {/* Ekor gelembung */}
            <div className="absolute -bottom-2 right-0 w-0 h-0" style={{
              borderLeft: '10px solid transparent',
              borderTop: '10px solid',
              borderTopColor: 'rgb(30 41 59)', // slate-800
            }}></div>
          </div>

          {/* Tombol tutup bubble */}
          <button
            onClick={() => setBubbleVisible(false)}
            className="w-5 h-5 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-red-400 hover:text-white flex items-center justify-center transition-all shrink-0 mb-1"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* ===== TOMBOL CHATBOT ===== */}
      <button
        onClick={() => { setIsOpen(prev => !prev); setBubbleVisible(false); }}
        className="pointer-events-auto relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 shadow-2xl shadow-amber-500/40 flex items-center justify-center text-white hover:scale-110 transition-all duration-300 group"
        title="Chat dengan Adi"
      >
        {/* Ripple efek di belakang tombol */}
        {bubbleVisible && !isOpen && (
          <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-30"></span>
        )}

        {/* Ikon berganti saat buka/tutup */}
        <div className={`transition-all duration-300 ${isOpen ? 'rotate-0 opacity-100' : 'rotate-0 opacity-100'}`}>
          {isOpen ? (
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          ) : (
            /* Ikon chat bubble */
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </div>
      </button>

    </div>
  );
};

export default SmartChatWidget;

import { useEffect } from 'react';

const CustomCursor = () => {
  useEffect(() => {
    const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;
    document.body.style.cursor = 'none';

    let dot: HTMLDivElement | null = null;
    let frame: HTMLDivElement | null = null;
    let isCreated = false;

    const mouse = { x: 0, y: 0 };
    const cur = { x: 0, y: 0, w: 40, h: 40 };
    const target = { x: 0, y: 0, w: 40, h: 40 };
    let hoveredEl: HTMLElement | null = null;
    let rafId: number;

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    // ─── FUNGSI BUAT KURSOR (Hanya dipanggil sekali saat mouse pertama gerak) ───
    const createCursorElements = (startX: number, startY: number) => {
      if (isCreated) return;

      dot = document.createElement('div');
      frame = document.createElement('div');

      // Set posisi awal INSTAN sebelum masuk ke DOM
      cur.x = startX - 20;
      cur.y = startY - 20;
      target.x = cur.x;
      target.y = cur.y;

      const dotStyle = `
        position: fixed; top: 0; left: 0; width: 6px; height: 6px;
        background: #ef4444; border-radius: 50%; z-index: 10000;
        pointer-events: none; box-shadow: 0 0 10px 2px rgba(239,68,68,0.5);
        transform: translate3d(${startX - 3}px, ${startY - 3}px, 0) !important;
        will-change: transform; transition: background 0.3s, box-shadow 0.3s !important;
      `;

      const frameStyle = `
        position: fixed; top: 0; left: 0; width: 40px; height: 40px;
        z-index: 9999; pointer-events: none; will-change: transform, width, height;
        transform: translate3d(${cur.x}px, ${cur.y}px, 0) !important;
      `;

      dot.setAttribute('style', dotStyle);
      frame.setAttribute('style', frameStyle);
      frame.id = 'p-frame';

      frame.innerHTML = `
        <div style="position:absolute; inset:0; border-radius:2px; background:rgba(245,158,11,0); transition:background 0.3s;" class="glass"></div>
        <div style="position:absolute; top:0; left:0; width:10px; height:10px; border:2px solid #f59e0b; border-right:0; border-bottom:0; transition:border-color 0.3s;" class="br"></div>
        <div style="position:absolute; top:0; right:0; width:10px; height:10px; border:2px solid #f59e0b; border-left:0; border-bottom:0; transition:border-color 0.3s;" class="br"></div>
        <div style="position:absolute; bottom:0; left:0; width:10px; height:10px; border:2px solid #f59e0b; border-right:0; border-top:0; transition:border-color 0.3s;" class="br"></div>
        <div style="position:absolute; bottom:0; right:0; width:10px; height:10px; border:2px solid #f59e0b; border-left:0; border-top:0; transition:border-color 0.3s;" class="br"></div>
      `;

      document.body.appendChild(dot);
      document.body.appendChild(frame);
      isCreated = true;
      
      // Jalankan loop animasi setelah elemen dibuat
      requestAnimationFrame(update);
    };

    const update = () => {
      if (!isCreated || !dot || !frame) return;

      if (!hoveredEl) {
        target.w = 40;
        target.h = 40;
        target.x = mouse.x - target.w / 2;
        target.y = mouse.y - target.h / 2;
      } else {
        const rect = hoveredEl.getBoundingClientRect();
        const p = 8;
        target.w = rect.width + p * 2;
        target.h = rect.height + p * 2;
        target.x = rect.left - p;
        target.y = rect.top - p;
      }

      // Lerp posisi dan ukuran
      cur.x = lerp(cur.x, target.x, 0.18);
      cur.y = lerp(cur.y, target.y, 0.18);
      cur.w = lerp(cur.w, target.w, 0.18);
      cur.h = lerp(cur.h, target.h, 0.18);

      // Apply ke DOM dengan !important untuk cegah override CSS lain
      frame.style.setProperty('transform', `translate3d(${cur.x}px, ${cur.y}px, 0)`, 'important');
      frame.style.setProperty('width', `${cur.w}px`, 'important');
      frame.style.setProperty('height', `${cur.h}px`, 'important');
      dot.style.setProperty('transform', `translate3d(${mouse.x - 3}px, ${mouse.y - 3}px, 0)`, 'important');

      rafId = requestAnimationFrame(update);
    };

    const handleMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      if (!isCreated) {
        createCursorElements(e.clientX, e.clientY);
      }
    };

    const handleOver = (e: MouseEvent) => {
      const targetEl = e.target as HTMLElement;
      if (!targetEl || typeof targetEl.closest !== 'function') return;
      
      const interactEl = targetEl.closest('a, button, [role="button"], .cursor-focus, input, textarea, select, option') || 
                 (window.getComputedStyle(targetEl).cursor === 'pointer' ? targetEl : null);
                 
      const textEl = targetEl.closest('h1, h2, h3, h4, h5, h6, p, li, img, svg, iframe, code, pre, blockquote, label');
      
      hoveredEl = (interactEl || textEl) as HTMLElement;

      if (dot && frame) {
        const brs = frame.querySelectorAll('.br');
        const glass = frame.querySelector('.glass') as HTMLElement;

        if (interactEl) {
          // INTERAKTIF: Warna Oranye/Amber (Tombol, Link)
          dot.style.backgroundColor = '#f59e0b';
          dot.style.boxShadow = '0 0 10px 2px rgba(245,158,11,0.5)';
          glass.style.background = 'rgba(245,158,11,0.1)';
          brs.forEach(el => (el as HTMLElement).style.borderColor = '#f59e0b');
        } else if (textEl) {
          // BACA/LIHAT: Warna Cyan/Biru (Teks, Gambar, Elemen lain)
          dot.style.backgroundColor = '#06b6d4';
          dot.style.boxShadow = '0 0 10px 2px rgba(6,182,212,0.5)';
          glass.style.background = 'rgba(6,182,212,0.05)';
          brs.forEach(el => (el as HTMLElement).style.borderColor = '#06b6d4');
        } else {
          // DEFAULT: Warna Merah
          dot.style.backgroundColor = '#ef4444';
          dot.style.boxShadow = '0 0 10px 2px rgba(239,68,68,0.5)';
          glass.style.background = 'rgba(245,158,11,0)';
          brs.forEach(el => (el as HTMLElement).style.borderColor = '#f59e0b');
        }
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseover', handleOver, { passive: true });

    return () => {
      document.body.style.cursor = 'default';
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
      cancelAnimationFrame(rafId);
      if (dot) dot.remove();
      if (frame) frame.remove();
    };
  }, []);

  return null;
};

export default CustomCursor;

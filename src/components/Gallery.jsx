import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const photos = [
  { src: 'https://senaelec.fr/img/back/IMG_1105.JPG',     caption: 'Tableau électrique complet' },
  { src: 'https://senaelec.fr/img/back/depannage.jpg',    caption: 'Dépannage électrique' },
  { src: 'https://senaelec.fr/img/IMG-20191223-WA0000.JPG', caption: 'Éclairage intérieur' },
  { src: "https://senaelec.fr/img/Add/Installation_d'un_système_d'alarme.jpg", caption: "Système d'alarme sans fil" },
  { src: 'https://senaelec.fr/img/Add/Pose_de_radiateur_electrique.jpg', caption: 'Radiateur électrique' },
  { src: "https://senaelec.fr/img/Add/Pose_radiateur_et_s%C3%A8ches_serviette.jpg", caption: 'Sèche-serviette électrique' },
  { src: "https://senaelec.fr/img/Add/Projet_d'installation_electrique_pour_quatre_maison.jpg", caption: '4 maisons à Montussan' },
  { src: "https://senaelec.fr/img/Add/Projet_r%C3%A9novation_electrique.jpg", caption: 'Rénovation appartement Bordeaux' },
  { src: 'https://senaelec.fr/img/Add/Remplacement%20_et_mise.jpg', caption: 'Mise en conformité tableau' },
  { src: 'https://senaelec.fr/img/IMG-20200407-WA0014.JPG', caption: 'Éclairage sécurisé' },
  { src: 'https://senaelec.fr/img/IMG-20200203-WA0003.JPG', caption: 'Mise aux normes NF C 15-100' },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null); // index or null
  const ref = useReveal();

  const prev = () => setLightbox(i => (i - 1 + photos.length) % photos.length);
  const next = () => setLightbox(i => (i + 1) % photos.length);

  const handleKey = (e) => {
    if (e.key === 'Escape') setLightbox(null);
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  };

  return (
    <section id="services-realisations" style={{
      padding: '7rem 0',
      background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg-card-2) 50%, var(--bg) 100%)',
    }}>
      <div className="container">
        <div ref={ref} className="reveal" style={{ marginBottom: '4rem' }}>
          <div className="section-label" style={{ marginBottom: '1rem' }}>Galerie</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            letterSpacing: '0.03em',
            lineHeight: 1,
          }}>
            NOS SERVICES & <span style={{ color: 'var(--amber)' }}>RÉALISATIONS</span>
          </h2>
        </div>

        {/* Masonry grid */}
        <div className="masonry-grid">
          {photos.map((photo, i) => (
            <GalleryItem
              key={i}
              photo={photo}
              index={i}
              onClick={() => setLightbox(i)}
              delay={i * 60}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          role="dialog" aria-modal="true"
          tabIndex={-1} onKeyDown={handleKey}
          autoFocus
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <button onClick={e => { e.stopPropagation(); setLightbox(null); }}
            style={{
              position: 'absolute', top: '1.5rem', right: '1.5rem',
              background: 'rgba(255,255,255,0.1)', border: 'none',
              borderRadius: '50%', width: 44, height: 44,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'white',
            }}>
            <X size={20} />
          </button>

          <button onClick={e => { e.stopPropagation(); prev(); }}
            style={{
              position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.1)', border: 'none',
              borderRadius: '50%', width: 48, height: 48,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'white',
            }}>
            <ChevronLeft size={24} />
          </button>

          <div onClick={e => e.stopPropagation()}
            style={{ maxWidth: '90vw', maxHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <img
              src={photos[lightbox].src}
              alt={photos[lightbox].caption}
              style={{
                maxWidth: '100%', maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: 8,
                boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                animation: 'zoomIn 0.25s cubic-bezier(0.4,0,0.2,1)',
              }}
            />
            <p style={{
              color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem',
              fontFamily: 'var(--font-body)',
            }}>
              {photos[lightbox].caption} — {lightbox + 1}/{photos.length}
            </p>
          </div>

          <button onClick={e => { e.stopPropagation(); next(); }}
            style={{
              position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.1)', border: 'none',
              borderRadius: '50%', width: 48, height: 48,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'white',
            }}>
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes zoomIn { from { transform: scale(0.85); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </section>
  );
}

function GalleryItem({ photo, index, onClick, delay }) {
  const ref = useReveal(0.05);

  return (
    <div ref={ref} className="reveal" style={{
      breakInside: 'avoid',
      marginBottom: '0.75rem',
      transitionDelay: `${delay}ms`,
    }}>
      <div
        onClick={onClick}
        style={{
          position: 'relative', overflow: 'hidden',
          borderRadius: 'var(--radius)',
          cursor: 'pointer',
          border: '1px solid var(--border-dim)',
          background: 'var(--bg-card)',
        }}
        onMouseEnter={e => {
          e.currentTarget.querySelector('img').style.transform = 'scale(1.05)';
          e.currentTarget.querySelector('.overlay').style.opacity = '1';
        }}
        onMouseLeave={e => {
          e.currentTarget.querySelector('img').style.transform = 'scale(1)';
          e.currentTarget.querySelector('.overlay').style.opacity = '0';
        }}
      >
        <img
          src={photo.src}
          alt={photo.caption}
          loading="lazy"
          style={{
            width: '100%', height: 'auto',
            display: 'block',
            transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
          }}
        />
        <div className="overlay" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(9,9,11,0.85) 0%, transparent 60%)',
          display: 'flex', alignItems: 'flex-end',
          padding: '1rem',
          opacity: 0,
          transition: 'opacity 0.3s',
        }}>
          <p style={{
            color: 'var(--white)', fontSize: '0.85rem', fontWeight: 500,
            fontFamily: 'var(--font-body)',
          }}>
            {photo.caption}
          </p>
        </div>
      </div>
    </div>
  );
}

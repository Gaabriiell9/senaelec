import { ArrowDown, Phone } from 'lucide-react';

export default function Hero() {
  return (
    <section id="accueil" style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      background: 'var(--bg-top)',
    }}>
      {/* Background image with overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(https://senaelec.fr/img/fondelec.JPG)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(105deg, rgba(13,31,45,0.75) 45%, rgba(13,31,45,0.30) 100%)',
      }} />

      {/* Amber glow blob */}
      <div style={{
        position: 'absolute', top: '20%', right: '30%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '120px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '680px' }}>

          {/* Label */}
          <div className="section-label" style={{ marginBottom: '1.5rem', animationDelay: '0s' }}>
            Artisan Électricien — Bordeaux &amp; Gironde
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.5rem, 8vw, 6.5rem)',
            lineHeight: 0.95,
            letterSpacing: '0.02em',
            marginBottom: '1.5rem',
            animation: 'fadeUp 0.8s ease 0.1s both',
            color: '#ffffff',
          }}>
            VOTRE ÉLECTRICIEN<br />
            DE{' '}
            <span style={{
              color: 'var(--amber)',
              position: 'relative',
              display: 'inline-block',
            }}>
              CONFIANCE
              <svg style={{ position: 'absolute', bottom: '-4px', left: 0, width: '100%', height: '4px' }} viewBox="0 0 200 4" preserveAspectRatio="none">
                <path d="M0,2 Q50,0 100,2 Q150,4 200,2" stroke="#f59e0b" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          {/* Subheadline */}
          <p style={{
            fontSize: '1.15rem', fontWeight: 300, color: 'rgba(255,255,255,0.80)',
            maxWidth: '520px', marginBottom: '2.5rem',
            lineHeight: 1.7,
            animation: 'fadeUp 0.8s ease 0.25s both',
          }}>
            Installation, dépannage et mise aux normes, interventions rapides,
            travail soigné, résultats garantis.
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex', gap: '1rem', flexWrap: 'wrap',
            animation: 'fadeUp 0.8s ease 0.35s both',
          }}>
            <a href="#contact" onClick={e => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }} style={{
              background: 'var(--amber)', color: '#09090b',
              fontWeight: 700, fontSize: '1rem',
              letterSpacing: '0.06em', textTransform: 'uppercase',
              padding: '0.9rem 2rem', borderRadius: '8px',
              textDecoration: 'none', display: 'inline-block',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(245,158,11,0.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
              Demander un devis
            </a>
            <a href="tel:0636207452" style={{
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#ffffff',
              fontWeight: 600, fontSize: '1rem',
              padding: '0.9rem 2rem', borderRadius: '8px',
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(255,255,255,0.08)',
              transition: 'border-color 0.2s, background 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--amber)'; e.currentTarget.style.background = 'rgba(245,158,11,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}>
              <Phone size={16} /> 06 36 20 74 52
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', letterSpacing: '0.15em', zIndex: 2,
        animation: 'bounce 2s ease-in-out infinite',
      }}>
        <ArrowDown size={18} />
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </section>
  );
}

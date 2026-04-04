import { MapPin, Phone, Mail } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const stats = [
  { number: '10+',  label: 'Ans d\'expérience' },
  { number: '100+', label: 'Chantiers livrés' },
];

export default function About() {
  const ref = useReveal();
  const statsRef = useReveal(0.1);

  return (
    <section id="apropos" style={{
      padding: '7rem 0',
      background: 'var(--bg)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative line */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', width: '1px',
        height: '100%', background: 'linear-gradient(to bottom, transparent, var(--border), transparent)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '5rem',
          alignItems: 'center',
        }}>
          {/* Text */}
          <div ref={ref} className="reveal">
            <div className="section-label" style={{ marginBottom: '1.5rem' }}>À propos</div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
              letterSpacing: '0.03em',
              lineHeight: 1,
              marginBottom: '1.5rem',
            }}>
              UN ARTISAN,<br />
              UNE <span style={{ color: 'var(--amber)' }}>PROMESSE</span>
            </h2>
            <p style={{
              color: 'var(--muted)', lineHeight: 1.8, fontSize: '1rem',
              marginBottom: '1.5rem',
            }}>
              Sena Électricité est une entreprise artisanale bordelaise spécialisée dans les
              installations et dépannages électriques. Basée à Floirac, nous intervenons
              sur Bordeaux, la CUB et toute la Gironde.
            </p>
            {/* Info pills */}
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { icon: <MapPin size={14} />, text: '6 Rue Colette, 33270 Floirac' },
                { icon: <Phone size={14} />,  text: '06 36 20 74 52' },
                { icon: <Mail size={14} />,   text: 'senelec33@outlook.fr' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-dim)',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  color: 'var(--muted)',
                }}>
                  <span style={{ color: 'var(--amber)', flexShrink: 0 }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="reveal" style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '1.25rem',
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                background: i === 0 ? 'var(--amber)' : 'var(--bg-card)',
                border: `1px solid ${i === 0 ? 'transparent' : 'var(--border-dim)'}`,
                borderRadius: 'var(--radius)',
                padding: '2rem 1.5rem',
                display: 'flex', flexDirection: 'column', gap: '0.5rem',
                transitionDelay: `${i * 80}ms`,
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '3rem',
                  lineHeight: 1,
                  color: i === 0 ? '#09090b' : 'var(--amber)',
                  letterSpacing: '0.02em',
                }}>
                  {s.number}
                </span>
                <span style={{
                  fontSize: '0.85rem', fontWeight: 500,
                  color: i === 0 ? 'rgba(9,9,11,0.7)' : 'var(--muted)',
                  letterSpacing: '0.03em',
                }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

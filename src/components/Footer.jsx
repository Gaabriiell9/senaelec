import { Zap } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{
      background: '#0d1f2d',
      borderTop: '1px solid var(--border-dim)',
      padding: '2.5rem 0',
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: 28, height: 28, background: 'var(--amber)',
            borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Zap size={15} color="#09090b" strokeWidth={2.5} />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', letterSpacing: '0.05em', color: '#ffffff' }}>
            SENA<span style={{ color: 'var(--amber)' }}>ÉLEC</span>
          </span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
          © {year} Sena Électricité. Tous droits réservés.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>
          Artisan électricien — Bordeaux &amp; Gironde
        </p>
      </div>
    </footer>
  );
}

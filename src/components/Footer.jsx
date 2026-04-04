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
        <img src="/logo.png" alt="Sena Électricité" style={{ height: '52px', width: 'auto', objectFit: 'contain' }} />
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
          © {year} Sena Électricité. Tous droits réservés.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>
          Artisan électricien Bordeaux &amp;
        </p>
      </div>
    </footer>
  );
}

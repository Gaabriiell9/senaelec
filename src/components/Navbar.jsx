import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '#accueil',              label: 'Accueil' },
  { href: '#services-realisations',label: 'Services & Réalisations' },
  { href: '#apropos',              label: 'À propos' },
  { href: '#contact',              label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [active,   setActive]       = useState('#accueil');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setActive(href);
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '0 2rem',
        height: scrolled ? '72px' : '88px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(13,31,45,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(245,158,11,0.12)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
      }}>
        {/* Logo */}
        <a href="#accueil" onClick={e => handleNav(e, '#accueil')}
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src="/logo.png" alt="Sena Électricité" style={{ height: '72px', width: 'auto', objectFit: 'contain' }} />
        </a>

        {/* Desktop links */}
        <ul style={{
          display: 'flex', gap: '2.5rem', listStyle: 'none',
          '@media(max-width:768px)': { display: 'none' },
        }} className="nav-desktop">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={e => handleNav(e, l.href)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  letterSpacing: '0.05em',
                  color: active === l.href ? 'var(--amber)' : 'rgba(248,248,240,0.7)',
                  textDecoration: 'none',
                  position: 'relative',
                  paddingBottom: '4px',
                  transition: 'color 0.25s',
                }}>
                {l.label}
                <span style={{
                  position: 'absolute', bottom: 0, left: 0,
                  width: active === l.href ? '100%' : '0%',
                  height: '2px', background: 'var(--amber)',
                  transition: 'width 0.3s',
                }} />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <a href="#contact" onClick={e => handleNav(e, '#contact')}
          className="nav-cta"
          style={{
            background: 'var(--amber)', color: '#09090b',
            fontWeight: 700, fontSize: '0.85rem',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '0.6rem 1.4rem', borderRadius: '6px',
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}>
          Devis gratuit
        </a>

        {/* Burger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="burger-btn"
          aria-label="Menu"
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '8px',
            padding: '8px',
            cursor: 'pointer',
            color: 'var(--white)',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(9,9,11,0.98)', zIndex: 999,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '2.5rem',
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'auto' : 'none',
        transition: 'opacity 0.3s',
      }}>
        {links.map(l => (
          <a key={l.href} href={l.href} onClick={e => handleNav(e, l.href)}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '3rem', letterSpacing: '0.08em',
              color: active === l.href ? 'var(--amber)' : 'var(--white)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}>
            {l.label.toUpperCase()}
          </a>
        ))}
        <a href="tel:0636207452" style={{
          color: 'var(--amber)', fontWeight: 600, fontSize: '1.1rem', textDecoration: 'none',
        }}>
          06 36 20 74 52
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-cta { display: none !important; }
          .burger-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .burger-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}

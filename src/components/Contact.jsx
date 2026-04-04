import { useState } from 'react';
import { Send, Phone, Mail, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const services = [
  'Installation électrique',
  'Dépannage',
  'Mise aux normes',
  'Éclairage',
  'Alarme & sécurité',
  'Radiateurs / chauffage',
  'Autre',
];

export default function Contact() {
  const ref = useReveal();
  const [form, setForm]     = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [status, setStatus] = useState(null); // 'loading' | 'ok' | 'error'

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('ok');
        setForm({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        const data = await res.json();
        setStatus({ type: 'error', msg: data.error });
      }
    } catch {
      setStatus({ type: 'error', msg: 'Erreur réseau. Réessayez plus tard.' });
    }
  };

  const inputStyle = {
    width: '100%',
    background: 'var(--bg)',
    border: '1px solid var(--border-dim)',
    borderRadius: '8px',
    padding: '0.85rem 1rem',
    color: 'var(--white)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <section id="contact" style={{
      padding: '7rem 0',
      background: 'var(--bg-card-2)',
      borderTop: '1px solid var(--border-dim)',
    }}>
      <div className="container">
        <div ref={ref} className="reveal" style={{ marginBottom: '4rem' }}>
          <div className="section-label" style={{ marginBottom: '1rem' }}>Contact</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            letterSpacing: '0.03em',
            lineHeight: 1,
          }}>
            PARLONS DE VOTRE <span style={{ color: 'var(--amber)' }}>PROJET</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
        }}>
          {/* Form */}
          <div>
            {status === 'ok' ? (
              <div style={{
                background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
                borderRadius: 'var(--radius)', padding: '2.5rem',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: '1rem', textAlign: 'center',
              }}>
                <CheckCircle size={48} color="#10b981" />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--white)' }}>
                  MESSAGE ENVOYÉ !
                </h3>
                <p style={{ color: 'var(--muted)' }}>Nous reviendrons vers vous dans les 24h.</p>
                <button onClick={() => setStatus(null)} style={{
                  background: 'none', border: '1px solid var(--border-dim)',
                  color: 'var(--muted)', padding: '0.6rem 1.2rem',
                  borderRadius: '6px', cursor: 'pointer', fontFamily: 'var(--font-body)',
                }}>Nouveau message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '0.4rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      Nom *
                    </label>
                    <input name="name" value={form.name} onChange={handleChange} required
                      placeholder="Nom"
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'var(--amber)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border-dim)'}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '0.4rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      Téléphone
                    </label>
                    <input name="phone" value={form.phone} onChange={handleChange}
                      placeholder="Téléphone" type="tel"
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'var(--amber)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border-dim)'}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '0.4rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Email *
                  </label>
                  <input name="email" value={form.email} onChange={handleChange} required
                    type="email" placeholder="Email"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--amber)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border-dim)'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '0.4rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Service concerné
                  </label>
                  <select name="service" value={form.service} onChange={handleChange}
                    style={{ ...inputStyle, appearance: 'none' }}
                    onFocus={e => e.target.style.borderColor = 'var(--amber)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border-dim)'}
                  >
                    <option value="">Sélectionner un service</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '0.4rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Message *
                  </label>
                  <textarea name="message" value={form.message} onChange={handleChange} required
                    placeholder="Décrivez votre besoin, l'adresse du chantier, vos disponibilités..."
                    rows={5}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                    onFocus={e => e.target.style.borderColor = 'var(--amber)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border-dim)'}
                  />
                </div>

                {status?.type === 'error' && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: '8px', padding: '0.75rem 1rem',
                    color: '#f87171', fontSize: '0.9rem',
                  }}>
                    <AlertCircle size={16} /> {status.msg}
                  </div>
                )}

                <button type="submit" disabled={status === 'loading'}
                  style={{
                    background: 'var(--amber)', color: '#09090b',
                    fontWeight: 700, fontFamily: 'var(--font-body)',
                    fontSize: '1rem', letterSpacing: '0.06em', textTransform: 'uppercase',
                    padding: '1rem', borderRadius: '8px', border: 'none',
                    cursor: status === 'loading' ? 'wait' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    transition: 'opacity 0.2s, transform 0.2s',
                    opacity: status === 'loading' ? 0.7 : 1,
                  }}
                  onMouseEnter={e => { if (status !== 'loading') e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; }}
                >
                  <Send size={18} />
                  {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma demande'}
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{
              background: 'var(--bg)', border: '1px solid var(--border-dim)',
              borderRadius: 'var(--radius)', padding: '2rem',
              display: 'flex', flexDirection: 'column', gap: '1.5rem',
            }}>
              {[
                { icon: <Phone size={20} />, label: 'Téléphone', value: '06 36 20 74 52', href: 'tel:0636207452' },
                { icon: <Mail size={20} />,  label: 'Email',     value: 'senelec33@outlook.fr', href: 'mailto:senelec33@outlook.fr' },
                { icon: <MapPin size={20} />, label: 'Adresse',  value: '6 Rue Colette, 33270 Floirac', href: null },
              ].map((info, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: 44, height: 44, flexShrink: 0,
                    background: 'var(--amber-glow)', border: '1px solid var(--border)',
                    borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--amber)',
                  }}>
                    {info.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                      {info.label}
                    </div>
                    {info.href ? (
                      <a href={info.href} style={{ color: 'var(--white)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500 }}>
                        {info.value}
                      </a>
                    ) : (
                      <span style={{ color: 'var(--white)', fontSize: '0.95rem', fontWeight: 500 }}>{info.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Hours */}
            <div style={{
              background: 'var(--bg)', border: '1px solid var(--border-dim)',
              borderRadius: 'var(--radius)', padding: '2rem',
            }}>
              <h4 style={{
                fontFamily: 'var(--font-display)', fontSize: '1.2rem',
                letterSpacing: '0.05em', marginBottom: '1rem', color: 'var(--white)',
              }}>
                HORAIRES
              </h4>
              {[
                { days: 'Lundi – Vendredi', hours: '08h – 19h' },
                { days: 'Samedi',           hours: '09h – 17h' },
                { days: 'Urgences',         hours: '7j/7' },
              ].map((h, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '0.6rem 0',
                  borderBottom: i < 2 ? '1px solid var(--border-dim)' : 'none',
                  fontSize: '0.9rem',
                }}>
                  <span style={{ color: 'var(--muted)' }}>{h.days}</span>
                  <span style={{ color: i === 2 ? 'var(--amber)' : 'var(--white)', fontWeight: 500 }}>{h.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Zap, Wrench, ShieldCheck, Lightbulb, BellRing, Thermometer } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const services = [
  {
    icon: <Zap size={28} />,
    title: 'Installation électrique',
    desc: 'Tableaux électriques, circuits, prises et interrupteurs. Installation complète neuf ou rénovation.',
  },
  {
    icon: <Wrench size={28} />,
    title: 'Dépannage rapide',
    desc: 'Panne, disjoncteur, court-circuit — intervention rapide et efficace sur Bordeaux et Gironde.',
  },
  {
    icon: <ShieldCheck size={28} />,
    title: 'Mise aux normes',
    desc: 'Mise en conformité NF C 15-100, diagnostic et sécurisation de vos installations existantes.',
  },
  {
    icon: <Lightbulb size={28} />,
    title: 'Éclairage intérieur',
    desc: 'Spots encastrés, luminaires, LED, éclairages d\'ambiance — conseils et installation.',
  },
  {
    icon: <BellRing size={28} />,
    title: 'Alarme & sécurité',
    desc: 'Installation de systèmes d\'alarme sans fil, interphones et contrôle d\'accès.',
  },
  {
    icon: <Thermometer size={28} />,
    title: 'Radiateurs & chauffage',
    desc: 'Pose de radiateurs électriques, sèche-serviettes et systèmes de chauffage connectés.',
  },
];

export default function Services() {
  const ref = useReveal();

  return (
    <section id="services" style={{ padding: '7rem 0', background: 'var(--bg)' }}>
      <div className="container">
        <div ref={ref} className="reveal" style={{ marginBottom: '4rem' }}>
          <div className="section-label" style={{ marginBottom: '1rem' }}>Nos prestations</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            letterSpacing: '0.03em',
            lineHeight: 1,
            maxWidth: '500px',
          }}>
            TOUT CE QU'IL FAUT POUR VOTRE <span style={{ color: 'var(--amber)' }}>ÉLECTRICITÉ</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {services.map((s, i) => (
            <ServiceCard key={i} {...s} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ icon, title, desc, delay }) {
  const ref = useReveal(0.1);

  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-dim)',
          borderRadius: 'var(--radius)',
          padding: '2rem',
          height: '100%',
          display: 'flex', flexDirection: 'column', gap: '1rem',
          cursor: 'default',
          transition: 'border-color var(--transition), box-shadow var(--transition), transform var(--transition)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(245,158,11,0.35)';
          e.currentTarget.style.boxShadow = 'var(--shadow-amber)';
          e.currentTarget.style.transform = 'translateY(-4px)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--border-dim)';
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.transform = '';
        }}
      >
        <div style={{
          width: 52, height: 52,
          background: 'var(--amber-glow)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--amber)',
          flexShrink: 0,
        }}>
          {icon}
        </div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.4rem',
          letterSpacing: '0.04em',
          color: 'var(--white)',
        }}>
          {title.toUpperCase()}
        </h3>
        <p style={{ color: 'var(--muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>{desc}</p>
      </div>
    </div>
  );
}

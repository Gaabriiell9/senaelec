const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SENDER     = 'Sena Électricité <contact@senaelec.fr>';
// TODO: switch to senelec33@outlook.fr once tested in production
const RECIPIENT  = 'gfweb.pro@outlook.fr';
const SITE_URL   = 'https://www.senaelec.fr';
const LOGO_URL   = 'https://www.senaelec.fr/logoOfficiel.png';

// ── Rate limiting (in-memory, resets on cold start) ──────────────────────────
const rateLimitMap = new Map();
const RATE_LIMIT   = 5;
const WINDOW_MS    = 60 * 60 * 1000; // 1 h

function checkRateLimit(ip) {
  const now   = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, resetAt: now + WINDOW_MS };
  if (now > entry.resetAt) {
    entry.count   = 0;
    entry.resetAt = now + WINDOW_MS;
  }
  return entry;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function nl2br(str) {
  return escapeHtml(str).replace(/\n/g, '<br>');
}

function formatDateFR(date) {
  const days   = ['dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi'];
  const months = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} à ${hh}h${mm}`;
}

// ── Resend via native fetch ───────────────────────────────────────────────────
async function sendEmail({ to, subject, html, replyTo }) {
  const body = { from: SENDER, to: [to], subject, html };
  if (replyTo) body.reply_to = replyTo;

  const res = await fetch('https://api.resend.com/emails', {
    method:  'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type':  'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend ${res.status}: ${err}`);
  }
  return res.json();
}

// ── Email templates ───────────────────────────────────────────────────────────
function notificationHtml({ name, email, phone, subject, message, date }) {
  const replySubject = encodeURIComponent('Re: ' + (subject || 'Votre demande'));

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Nouveau message — senaelec.fr</title>
</head>
<body style="margin:0;padding:0;background:#f0f2f5;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f0f2f5;padding:32px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

      <!-- Header -->
      <tr><td style="background:#0d1f2d;border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
        <img src="${LOGO_URL}" alt="Sena Électricité" width="72" height="72"
             style="display:block;margin:0 auto 16px;border-radius:8px;">
        <h1 style="margin:0;font-size:20px;color:#f59e0b;font-weight:700;font-family:Arial,Helvetica,sans-serif;">
          Nouveau message depuis senaelec.fr
        </h1>
      </td></tr>

      <!-- Body -->
      <tr><td style="background:#ffffff;padding:40px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">

          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f0f2f5;width:130px;
                       color:#52596b;font-size:14px;font-weight:700;vertical-align:top;">Nom</td>
            <td style="padding:10px 0;border-bottom:1px solid #f0f2f5;
                       color:#1a1d23;font-size:14px;vertical-align:top;">${escapeHtml(name)}</td>
          </tr>

          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f0f2f5;
                       color:#52596b;font-size:14px;font-weight:700;vertical-align:top;">Email</td>
            <td style="padding:10px 0;border-bottom:1px solid #f0f2f5;font-size:14px;vertical-align:top;">
              <a href="mailto:${escapeHtml(email)}" style="color:#f59e0b;text-decoration:none;">${escapeHtml(email)}</a>
            </td>
          </tr>

          ${phone ? `<tr>
            <td style="padding:10px 0;border-bottom:1px solid #f0f2f5;
                       color:#52596b;font-size:14px;font-weight:700;vertical-align:top;">Téléphone</td>
            <td style="padding:10px 0;border-bottom:1px solid #f0f2f5;
                       color:#1a1d23;font-size:14px;vertical-align:top;">${escapeHtml(phone)}</td>
          </tr>` : ''}

          ${subject ? `<tr>
            <td style="padding:10px 0;border-bottom:1px solid #f0f2f5;
                       color:#52596b;font-size:14px;font-weight:700;vertical-align:top;">Sujet</td>
            <td style="padding:10px 0;border-bottom:1px solid #f0f2f5;
                       color:#1a1d23;font-size:14px;vertical-align:top;">${escapeHtml(subject)}</td>
          </tr>` : ''}

          <tr>
            <td style="padding:10px 0;color:#52596b;font-size:14px;font-weight:700;vertical-align:top;">Message</td>
            <td style="padding:10px 0;color:#1a1d23;font-size:14px;vertical-align:top;line-height:1.7;">
              ${nl2br(message)}
            </td>
          </tr>

        </table>

        <!-- Date -->
        <p style="margin:24px 0 0;padding-top:20px;border-top:1px solid #f0f2f5;
                  font-size:13px;color:#52596b;">
          Reçu le ${date}
        </p>

        <!-- CTAs -->
        <table cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;">
          <tr>
            <td style="padding-right:12px;">
              <a href="mailto:${escapeHtml(email)}?subject=${replySubject}"
                 style="display:inline-block;background:#f59e0b;color:#09090b;font-weight:700;
                        font-size:14px;text-decoration:none;padding:12px 20px;border-radius:8px;
                        font-family:Arial,Helvetica,sans-serif;">
                Répondre directement
              </a>
            </td>
            ${phone ? `<td>
              <a href="tel:${escapeHtml(phone.replace(/\s/g, ''))}"
                 style="display:inline-block;background:#0d1f2d;border:1px solid #f59e0b;
                        color:#f59e0b;font-weight:700;font-size:14px;text-decoration:none;
                        padding:12px 20px;border-radius:8px;font-family:Arial,Helvetica,sans-serif;">
                Appeler
              </a>
            </td>` : ''}
          </tr>
        </table>

      </td></tr>

      <!-- Footer -->
      <tr><td style="background:#e8ecf1;border-radius:0 0 12px 12px;padding:20px 40px;text-align:center;">
        <p style="margin:0;font-size:12px;color:#52596b;font-family:Arial,Helvetica,sans-serif;">
          Message envoyé via le formulaire de contact de
          <a href="${SITE_URL}" style="color:#52596b;">senaelec.fr</a>
        </p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function confirmationHtml({ name, email, phone, subject, message }) {
  const firstName = name.trim().split(/\s+/)[0];

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Votre message a été reçu — Sena Électricité</title>
</head>
<body style="margin:0;padding:0;background:#f0f2f5;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f0f2f5;padding:32px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

      <!-- Header -->
      <tr><td style="background:#0d1f2d;border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
        <img src="${LOGO_URL}" alt="Sena Électricité" width="72" height="72"
             style="display:block;margin:0 auto 16px;border-radius:8px;">
        <h1 style="margin:0;font-size:20px;color:#f59e0b;font-weight:700;font-family:Arial,Helvetica,sans-serif;">
          Message bien reçu !
        </h1>
      </td></tr>

      <!-- Body -->
      <tr><td style="background:#ffffff;padding:40px;">

        <p style="margin:0 0 8px;font-size:18px;font-weight:700;color:#1a1d23;
                  font-family:Arial,Helvetica,sans-serif;">
          Bonjour ${escapeHtml(firstName)},
        </p>
        <p style="margin:0 0 28px;font-size:15px;color:#52596b;line-height:1.7;
                  font-family:Arial,Helvetica,sans-serif;">
          Votre message a bien été reçu.
          <strong style="color:#1a1d23;">Sena Électricité vous répondra sous 24h en jours ouvrés.</strong>
        </p>

        <!-- Recap -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
               style="background:#f0f2f5;border-radius:8px;border-left:3px solid #f59e0b;margin-bottom:28px;">
          <tr><td style="padding:20px 24px;">
            <p style="margin:0 0 14px;font-size:11px;font-weight:700;color:#52596b;
                      text-transform:uppercase;letter-spacing:0.1em;font-family:Arial,Helvetica,sans-serif;">
              Votre demande
            </p>
            ${subject ? `<p style="margin:0 0 8px;font-size:14px;color:#1a1d23;font-family:Arial,Helvetica,sans-serif;">
              <strong>Sujet :</strong> ${escapeHtml(subject)}
            </p>` : ''}
            ${phone ? `<p style="margin:0 0 8px;font-size:14px;color:#1a1d23;font-family:Arial,Helvetica,sans-serif;">
              <strong>Téléphone :</strong> ${escapeHtml(phone)}
            </p>` : ''}
            <p style="margin:0;font-size:14px;color:#1a1d23;line-height:1.7;font-family:Arial,Helvetica,sans-serif;">
              ${nl2br(message)}
            </p>
          </td></tr>
        </table>

        <!-- Urgent -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
               style="background:#0d1f2d;border-radius:8px;">
          <tr><td style="padding:24px;">
            <p style="margin:0 0 12px;font-size:14px;font-weight:700;color:#f59e0b;
                      font-family:Arial,Helvetica,sans-serif;">
              Besoin d'une réponse urgente ?
            </p>
            <p style="margin:0 0 8px;font-size:14px;color:#ffffff;font-family:Arial,Helvetica,sans-serif;">
              <a href="tel:0636207452" style="color:#ffffff;text-decoration:none;font-weight:600;">
                06 36 20 74 52
              </a>
            </p>
            <p style="margin:0;font-size:14px;color:#ffffff;font-family:Arial,Helvetica,sans-serif;">
              <a href="mailto:contact@senaelec.fr" style="color:#f59e0b;text-decoration:none;">
                contact@senaelec.fr
              </a>
            </p>
          </td></tr>
        </table>

      </td></tr>

      <!-- Footer -->
      <tr><td style="background:#e8ecf1;border-radius:0 0 12px 12px;padding:24px 40px;text-align:center;">
        <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#1a1d23;
                  font-family:Arial,Helvetica,sans-serif;">
          Sena Électricité
        </p>
        <p style="margin:0 0 12px;font-size:12px;color:#52596b;font-family:Arial,Helvetica,sans-serif;">
          6 Rue Colette, 33270 Floirac &middot; Bordeaux Métropole
        </p>
        <p style="margin:0 0 12px;font-size:11px;color:#52596b;font-family:Arial,Helvetica,sans-serif;">
          Cet email vous est envoyé suite à votre demande de contact sur senaelec.fr
        </p>
        <a href="${SITE_URL}" style="font-size:12px;color:#f59e0b;text-decoration:none;
                                    font-family:Arial,Helvetica,sans-serif;">
          Visiter senaelec.fr &rarr;
        </a>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

// ── Handler ───────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const ip    = (req.headers['x-forwarded-for'] || '').split(',')[0].trim()
                || req.socket?.remoteAddress
                || 'unknown';
  const entry = checkRateLimit(ip);
  if (entry.count >= RATE_LIMIT) {
    return res.status(429).json({ error: 'Trop de messages envoyés. Réessayez dans 1 heure.' });
  }

  const { name, email, phone, subject, message, website } = req.body || {};

  // Honeypot — bots fill the hidden "website" field
  if (website) {
    return res.status(200).json({ message: 'Message envoyé avec succès.' });
  }

  // Validation
  const nameStr    = String(name    || '').trim();
  const emailStr   = String(email   || '').trim().toLowerCase();
  const messageStr = String(message || '').trim();
  const phoneStr   = String(phone   || '').trim();
  const subjectStr = String(subject || '').trim();

  if (nameStr.length < 2 || nameStr.length > 100) {
    return res.status(400).json({ error: 'Le nom doit contenir entre 2 et 100 caractères.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr)) {
    return res.status(400).json({ error: 'Adresse email invalide.' });
  }
  if (messageStr.length < 10 || messageStr.length > 5000) {
    return res.status(400).json({ error: 'Le message doit contenir entre 10 et 5000 caractères.' });
  }

  const data = {
    name:    nameStr,
    email:   emailStr,
    phone:   phoneStr,
    subject: subjectStr,
    message: messageStr,
    date:    formatDateFR(new Date()),
  };

  // Increment counter before sending (avoid race-condition retries)
  entry.count++;
  rateLimitMap.set(ip, entry);

  // 1) Notification interne — doit réussir
  try {
    await sendEmail({
      to:      RECIPIENT,
      subject: `Nouveau message de ${data.name}${data.subject ? ` — ${data.subject}` : ''}`,
      html:    notificationHtml(data),
      replyTo: data.email,
    });
  } catch (err) {
    console.error('[contact] notification failed:', err.message);
    return res.status(500).json({ error: "Erreur lors de l'envoi. Réessayez plus tard." });
  }

  // 2) Confirmation visiteur — échec non-bloquant
  try {
    await sendEmail({
      to:      data.email,
      subject: 'Votre message a bien été reçu — Sena Électricité',
      html:    confirmationHtml(data),
    });
  } catch (err) {
    console.error('[contact] confirmation failed (non-blocking):', err.message);
  }

  console.log(`[contact] message from ${data.email} (ip: ${ip})`);
  return res.status(200).json({ message: 'Message envoyé avec succès.' });
};

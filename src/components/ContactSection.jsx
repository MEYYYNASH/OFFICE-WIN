import { Send, Clock } from 'lucide-react';

export default function ContactSection({ settings, lang }) {
  const telegram = settings?.telegramUsername || '@ShennCelest';
  const telegramLink = settings?.telegramLink || 'https://t.me/ShennCelest';
  const hours = settings?.businessHours || '8:00 AM - 9:00 PM';

  return (
    <section id="contact-section" style={{ padding: '40px 0', backgroundColor: 'var(--bg-tertiary)' }}>
      <div className="container">
        
        {/* Section Title */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>
            {lang === 'en' ? 'Get In Touch' : 'ទាក់ទងមកយើងខ្ញុំ'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            {lang === 'en' 
              ? 'Need a custom software bundle? Want to ask questions first? Reach out instantly via our support channel.'
              : 'ត្រូវការកញ្ចប់កម្មវិធីពិសេស ឬចង់សួរព័ត៌មានបន្ថែមមែនទេ? ទាក់ទងមកយើងខ្ញុំភ្លាមៗតាមរយៈឆានែលគាំទ្រ។'
          }
          </p>
        </div>

        {/* Direct Links cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          
          {/* Telegram Channel */}
          <a 
            href={telegramLink} 
            target="_blank" 
            rel="noreferrer" 
            className="admin-card"
            style={{ display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none' }}
          >
            <div style={{
              backgroundColor: 'rgba(0, 136, 204, 0.1)',
              color: '#0088cc',
              padding: '12px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Send size={24} fill="#0088cc" />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Telegram Support</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{telegram}</p>
            </div>
          </a>

          {/* Scan Telegram QR */}
          <div 
            className="admin-card" 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '12px',
              padding: '20px',
              textAlign: 'center'
            }}
          >
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>
              {lang === 'en' ? 'Scan Telegram QR' : 'ស្កេន QR Telegram'}
            </h4>
            <div style={{
              backgroundColor: '#ffffff',
              padding: '8px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https%3A%2F%2Ft.me%2FShennCelest" 
                alt="Telegram QR Code" 
                style={{ width: '120px', height: '120px', display: 'block' }}
              />
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
              {lang === 'en' ? 'Scan to chat directly' : 'ស្កេនដើម្បីផ្ញើសារផ្ទាល់'}
            </p>
          </div>

          {/* Hours card */}
          <div className="admin-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              backgroundColor: 'var(--accent-light)',
              color: 'var(--accent-color)',
              padding: '12px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Clock size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Business Hours</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{hours}</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

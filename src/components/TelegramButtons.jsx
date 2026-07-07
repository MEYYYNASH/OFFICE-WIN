import { useState, useRef, useEffect } from 'react';
import { Send, X, Copy, QrCode, HelpCircle, Check, MessageSquare } from 'lucide-react';

export default function TelegramButtons({ settings, lang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const widgetRef = useRef(null);

  const telegramUsername = settings?.telegramUsername || '@OfficeWinSupport';
  const telegramLink = settings?.telegramLink || 'https://t.me/OfficeWinSupport';

  // Click outside to close widget
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyUsername = () => {
    navigator.clipboard.writeText(telegramUsername);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCustomMessageLink = (text) => {
    return `https://t.me/${telegramUsername.replace('@', '')}?text=${encodeURIComponent(text)}`;
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(telegramLink)}`;

  return (
    <div 
      ref={widgetRef}
      className="telegram-support-floating"
    >
      {/* Help Prompt Bubble (shows initially) */}
      {!isOpen && (
        <div 
          style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            padding: '5px 10px',
            borderRadius: '8px 8px 0 8px',
            fontSize: '0.7rem',
            fontWeight: 600,
            boxShadow: 'var(--shadow-md)',
            animation: 'bounce 3s infinite',
            pointerEvents: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          {lang === 'en' ? '⚡ Need help? Chat now!' : '⚡ ត្រូវការជំនួយ? ឆាតមកយើង!'}
        </div>
      )}

      {/* Expanded Support Menu Modal */}
      {isOpen && (
        <div 
          style={{
            backgroundColor: 'var(--glass-bg)',
            backdropFilter: 'blur(16px)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-lg)',
            width: '280px',
            padding: '20px',
            boxShadow: 'var(--glass-shadow)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HelpCircle size={16} style={{ color: 'var(--accent-color)' }} />
              {lang === 'en' ? 'Support Channels' : 'ផ្នែកសេវាកម្មគាំទ្រ'}
            </h4>
            <button 
              onClick={() => { setIsOpen(false); setShowQR(false); }}
              style={{ cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Quick Channels */}
          {!showQR ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Direct Support */}
              <a
                href={telegramLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: '#0088cc',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.85rem'
                }}
              >
                <Send size={14} fill="white" />
                {lang === 'en' ? 'Contact Support' : 'ទាក់ទងការគាំទ្រ'}
              </a>

              {/* Ask Question */}
              <a
                href={getCustomMessageLink("Hello, I have a question about remote installation support.")}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  fontWeight: 600,
                  fontSize: '0.85rem'
                }}
              >
                <MessageSquare size={14} />
                {lang === 'en' ? 'Ask a Question' : 'សួរសំណួរផ្សេងៗ'}
              </a>

              {/* Copy Username */}
              <button
                onClick={handleCopyUsername}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  fontWeight: 500
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {copied ? <Check size={14} style={{ color: 'var(--success-color)' }} /> : <Copy size={14} />}
                  <span>{copied ? (lang === 'en' ? 'Copied ID!' : 'បានចម្លង ID!') : telegramUsername}</span>
                </span>
              </button>

              {/* QR Code toggle */}
              <button
                onClick={() => setShowQR(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                <QrCode size={14} />
                {lang === 'en' ? 'Show Telegram QR' : 'បង្ហាញកូដ QR'}
              </button>
            </div>
          ) : (
            /* QR Code overlay screen */
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', textAlign: 'center' }}>
              <div style={{ padding: '8px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid var(--border-color)', width: '130px', height: '130px' }}>
                <img src={qrCodeUrl} alt="Telegram QR" style={{ width: '100%', height: '100%' }} />
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {lang === 'en' ? 'Scan to chat directly on Telegram.' : 'ស្កេនដើម្បីឆាតតាម Telegram។'}
              </p>
              <button 
                onClick={() => setShowQR(false)}
                style={{ fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: 600, cursor: 'pointer', marginTop: '4px' }}
              >
                {lang === 'en' ? '← Back' : '← ត្រឡប់ក្រោយ'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Floating Main support trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#0088cc',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0, 136, 204, 0.4)',
          cursor: 'pointer',
          border: 'none',
          transition: 'transform 0.2s ease-out'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isOpen ? <X size={24} /> : <Send size={24} fill="white" style={{ marginRight: '2px' }} />}
      </button>

      {/* CSS overrides for floating position and animations */}
      <style>{`
        .telegram-support-floating {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
          transition: bottom 0.2s ease;
        }
        @media (max-width: 768px) {
          .telegram-support-floating {
            bottom: 80px !important;
          }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}

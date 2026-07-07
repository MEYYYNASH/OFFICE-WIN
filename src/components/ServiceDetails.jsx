import { useEffect } from 'react';
import { X, Share2, Copy, Cpu, Layers, Download, Clock, ExternalLink, Heart, ShoppingCart } from 'lucide-react';

export default function ServiceDetails({
  service,
  allServices,
  onClose,
  onViewDetails,
  toggleFavorite,
  favorites,
  lang,
  settings
}) {
  // Prevent background scroll when details modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!service) return null;

  const isFav = favorites.includes(service.id);

  const getTelegramLink = () => {
    const username = settings?.telegramUsername || '@ShennCelest';
    const message = encodeURIComponent(`Hello, I would like to order: ${service.name} (${service.version})`);
    return `https://t.me/${username.replace('@', '')}?text=${message}`;
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}?service=${service.id}`;
    navigator.clipboard.writeText(link);
    alert(lang === 'en' ? 'Service link copied to clipboard!' : 'បានចម្លងតំណភ្ជាប់សេវាកម្មរួចរាល់!');
  };

  const handleShare = () => {
    const link = `${window.location.origin}?service=${service.id}`;
    if (navigator.share) {
      navigator.share({
        title: service.name,
        text: service.shortDescription,
        url: link
      }).catch(err => console.log('Share failed', err));
    } else {
      handleCopyLink();
    }
  };

  // Find related services (same category, up to 3)
  const relatedServices = allServices
    .filter(s => s.category === service.category && s.id !== service.id && !s.isHidden)
    .slice(0, 3);

  // Generate QR Code URL using free QR Code API pointing to ordering Telegram link
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(getTelegramLink())}`;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 1002,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          animation: 'fadeIn 0.3s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Tools Menu */}
        <div 
          style={{
            position: 'sticky',
            top: 0,
            backgroundColor: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-color)',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 10
          }}
        >
          <div style={{ display: 'flex', gap: '8px' }}>
            {/* Favorite toggle */}
            <button
              onClick={() => toggleFavorite(service.id)}
              style={{
                cursor: 'pointer',
                color: isFav ? 'var(--danger-color)' : 'var(--text-secondary)',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                padding: '8px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                fontWeight: 600
              }}
            >
              <Heart size={14} fill={isFav ? 'var(--danger-color)' : 'none'} />
              <span className="desktop-nav-links" style={{ display: 'none' }}>
                {isFav ? (lang === 'en' ? 'Favorited' : 'ពេញចិត្ត') : (lang === 'en' ? 'Favorite' : 'ដាក់ពេញចិត្ត')}
              </span>
            </button>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              style={{
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                padding: '8px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                fontWeight: 600
              }}
            >
              <Copy size={14} />
              <span className="desktop-nav-links" style={{ display: 'none' }}>
                {lang === 'en' ? 'Copy Link' : 'ចម្លងតំណ'}
              </span>
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              style={{
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                padding: '8px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                fontWeight: 600
              }}
            >
              <Share2 size={14} />
              <span className="desktop-nav-links" style={{ display: 'none' }}>
                {lang === 'en' ? 'Share' : 'ចែករំលែក'}
              </span>
            </button>
          </div>

          <button
            onClick={onClose}
            style={{
              cursor: 'pointer',
              color: 'var(--text-primary)',
              backgroundColor: 'var(--bg-tertiary)',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div style={{ padding: '24px' }}>
          {/* Main Hero row inside modal */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', marginBottom: '32px' }} className="modal-hero-grid">
            {/* Image display */}
            <div style={{ height: '240px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
              <img src={service.image} alt={service.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Text details */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="badge badge-available" style={{ fontSize: '0.7rem' }}>{service.category}</span>
                {service.isAvailable 
                  ? <span className="badge badge-available" style={{ fontSize: '0.7rem' }}>{lang === 'en' ? 'Active Installation' : 'ដំណើរការដំឡើង'}</span>
                  : <span className="badge badge-unavailable" style={{ fontSize: '0.7rem' }}>{lang === 'en' ? 'Unavailable' : 'មិនអាចដំឡើងបាន'}</span>
                }
              </div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '6px' }}>{service.name}</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px', fontWeight: 500 }}>
                Version: {service.version} • Last updated: {service.lastUpdated}
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-color)' }}>
                  {service.price.toLocaleString()}៛
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={14} />
                  {lang === 'en' ? `Install time: ${service.installationTime || '15 mins'}` : `ពេលតំឡើង៖ ${service.installationTime || '១៥ នាទី'}`}
                </span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <a
                  href={getTelegramLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                  style={{ flexGrow: 1, padding: '12px 20px', display: 'flex', justifyContent: 'center' }}
                >
                  <ShoppingCart size={16} />
                  {lang === 'en' ? 'Buy Now via Telegram' : 'ទិញតាមរយៈ Telegram'}
                </a>
              </div>
            </div>
          </div>

          <style>{`
            @media (min-width: 641px) {
              .modal-hero-grid {
                grid-template-columns: 320px 1fr !important;
              }
            }
          `}</style>

          {/* Description & Technical details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }} className="modal-details-grid">
            {/* Left Column: Description, Features, Requirements */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                  {lang === 'en' ? 'Description' : 'ការពិពណ៌នា'}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{service.description}</p>
              </div>

              {/* What's Included */}
              {service.whatsIncluded && service.whatsIncluded.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                    {lang === 'en' ? "What's Included" : 'អ្វីដែលទទួលបាន'}
                  </h3>
                  <ul style={{ listStylePosition: 'inside', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {service.whatsIncluded.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: 'var(--success-color)', fontWeight: 800 }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Features */}
              {service.features && service.features.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                    {lang === 'en' ? 'Key Features' : 'លក្ខណៈពិសេស'}
                  </h3>
                  <ul style={{ listStylePosition: 'inside', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {service.features.map((feature, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: 'var(--accent-color)', fontWeight: 800 }}>•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column: Requirements & Download widgets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Hardware Requirements */}
              {service.requirements && service.requirements.length > 0 && (
                <div style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Cpu size={16} />
                    {lang === 'en' ? 'System Requirements' : 'លក្ខខណ្ឌតម្រូវរបស់ប្រព័ន្ធ'}
                  </h3>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)', listStyle: 'none' }}>
                    {service.requirements.map((req, idx) => (
                      <li key={idx} style={{ display: 'flex', gap: '6px' }}>
                        <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>-</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Supported Windows & Info */}
              <div style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Layers size={16} />
                  {lang === 'en' ? 'Supported Systems' : 'ប្រព័ន្ធប្រតិបត្តិការគាំទ្រ'}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {service.supportedWindows || 'Windows 10, Windows 11'}
                </p>
              </div>

              {/* Official Download Helper Link */}
              {service.officialToolLink && (
                <a
                  href={service.officialToolLink}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    backgroundColor: 'var(--accent-light)',
                    color: 'var(--accent-color)',
                    border: '1px solid rgba(0, 102, 204, 0.2)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Download size={16} />
                    {lang === 'en' ? 'Download Official Microsoft Tool' : 'ទាញយកឧបករណ៍ផ្លូវការពី Microsoft'}
                  </span>
                  <ExternalLink size={14} />
                </a>
              )}

              {/* QR Code ordering option */}
              <div 
                style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  textAlign: 'center',
                  backgroundColor: 'var(--bg-secondary)'
                }}
              >
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                  {lang === 'en' ? 'Scan to Order on Telegram' : 'ស្កេនដើម្បីទិញតាម Telegram'}
                </h4>
                <div style={{
                  padding: '10px',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '160px',
                  height: '160px'
                }}>
                  <img src={qrCodeUrl} alt="Order QR Code" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '180px' }}>
                  {lang === 'en' ? 'Scan with your mobile camera to launch chat.' : 'ស្កេនជាមួយកាមេរ៉ាទូរស័ព្ទរបស់អ្នក ដើម្បីទំនាក់ទំនង។'}
                </p>
              </div>

            </div>
          </div>

          <style>{`
            @media (min-width: 641px) {
              .modal-details-grid {
                grid-template-columns: 1fr 280px !important;
              }
            }
          `}</style>

          {/* Related Services Row */}
          {relatedServices.length > 0 && (
            <div style={{ marginTop: '40px', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>
                {lang === 'en' ? 'Related Services' : 'សេវាកម្មពាក់ព័ន្ធ'}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {relatedServices.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onViewDetails(item)}
                    style={{
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      backgroundColor: 'var(--bg-secondary)',
                      transition: 'all 0.2s',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.borderColor = 'var(--accent-color)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                    }}
                  >
                    <div style={{ height: '110px', backgroundColor: 'var(--bg-tertiary)' }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '12px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                        {item.name}
                      </h4>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-color)' }}>{item.price.toLocaleString()}៛</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.version}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

import { Search, Zap, CheckCircle2, Users, Clock } from 'lucide-react';

export default function Hero({ settings, lang, setCurrentTab, searchInputRef }) {
  const isOnline = settings?.siteStatus === 'Online';
  const hours = settings?.businessHours || '8:00 AM - 9:00 PM';
  const visitors = settings?.visitorCount || 1248;

  const handleSearchFocus = () => {
    setCurrentTab('services');
    setTimeout(() => {
      if (searchInputRef?.current) {
        searchInputRef.current.focus();
      }
    }, 100);
  };

  return (
    <div style={{
      position: 'relative',
      padding: '60px 0 40px 0',
      background: 'linear-gradient(180deg, var(--accent-light) 0%, transparent 100%)',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        
        {/* Banner badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
          {/* Shop Status */}
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: isOnline ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            color: isOnline ? 'var(--success-color)' : 'var(--danger-color)',
            border: `1px solid ${isOnline ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            padding: '6px 12px',
            borderRadius: '999px',
            fontSize: '0.8rem',
            fontWeight: 600
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: isOnline ? 'var(--success-color)' : 'var(--danger-color)',
              display: 'inline-block',
              boxShadow: isOnline ? '0 0 8px var(--success-color)' : 'none'
            }} />
            {isOnline 
              ? (lang === 'en' ? 'Support Online Now' : 'ភ្នាក់ងារគាំទ្រកំពុងអនឡាញ')
              : (lang === 'en' ? 'Support Offline' : 'ភ្នាក់ងារគាំទ្រក្រៅបណ្តាញ')
            }
          </span>

          {/* Business Hours */}
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border-color)',
            padding: '6px 12px',
            borderRadius: '999px',
            fontSize: '0.8rem',
            fontWeight: 500
          }}>
            <Clock size={14} className="text-blue-500" />
            {lang === 'en' ? `Hours: ${hours}` : `ម៉ោងធ្វើការ៖ ${hours}`}
          </span>

          {/* Live Visitor Counter */}
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border-color)',
            padding: '6px 12px',
            borderRadius: '999px',
            fontSize: '0.8rem',
            fontWeight: 500
          }}>
            <Users size={14} />
            {lang === 'en' ? `${visitors.toLocaleString()} Views` : `អ្នកចូលទស្សនា៖ ${visitors.toLocaleString()}`}
          </span>
        </div>

        {/* Hero Headline */}
        <div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: '16px',
            lineHeight: 1.15
          }}>
            {lang === 'en' ? 'Premium Office & Windows' : 'សេវាកម្មដំឡើងកុំព្យូទ័រលំដាប់ប្រីមៀម'} <br />
            <span style={{
              background: 'linear-gradient(90deg, var(--accent-color), #00d2ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {lang === 'en' ? 'Expert Remote Setup' : 'ដំឡើងពីចម្ងាយដោយអ្នកជំនាញ'}
            </span>
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--text-secondary)',
            maxWidth: '680px',
            margin: '0 auto 32px auto',
            lineHeight: 1.6
          }}>
            {lang === 'en' 
              ? 'Get stable versions of Microsoft Office, Windows updates, Adobe tools, and vital utilities. Activated for lifetime and installed remotely by our technicians via AnyDesk within minutes.'
              : 'ទទួលបានកម្មវិធី Microsoft Office, Windows, Adobe និងកម្មវិធីជំនួយផ្សេងៗទៀតដែលមានស្ថេរភាព។ ដំឡើង និងរៀបចំជូនដោយជាងជំនាញតាមរយៈ AnyDesk ត្រឹមតែប៉ុន្មាននាទី និងធានាការប្រើប្រាស់បានមួយជីវិត។'
            }
          </p>
        </div>

        {/* CTA Buttons & Search focus hint */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
            <button 
              onClick={() => setCurrentTab('services')}
              className="btn btn-primary"
              style={{ padding: '14px 28px', fontSize: '1rem' }}
            >
              <Zap size={18} fill="white" />
              {lang === 'en' ? 'Explore Services' : 'ស្វែងរកសេវាកម្ម'}
            </button>
            
            <button 
              onClick={handleSearchFocus}
              className="btn btn-secondary"
              style={{ padding: '14px 28px', fontSize: '1rem' }}
            >
              <Search size={18} />
              {lang === 'en' ? 'Search Software' : 'ស្វែងរកកម្មវិធី'}
              <kbd style={{
                marginLeft: '8px',
                padding: '2px 6px',
                borderRadius: '4px',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)'
              }}>/</kbd>
            </button>
          </div>
        </div>

        {/* Core Value Badges */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginTop: '40px',
            padding: '24px',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          {[
            { titleEn: '100% Lifetime Guarantee', titleKh: 'ធានាពេញមួយជីវិត', descEn: 'Genuine licenses & configuration', descKh: 'ការដំឡើងតាមបទដ្ឋានបច្ចេកទេស' },
            { titleEn: 'Remote Setup Support', titleKh: 'ដំឡើងពីចម្ងាយ', descEn: 'Via AnyDesk or TeamViewer', descKh: 'លឿន រហ័ស និងសុវត្ថិភាព' },
            { titleEn: 'Pay After Installation', titleKh: 'ដំឡើងរួចចាំទូទាត់', descEn: 'No upfront payments needed', descKh: 'ការជឿទុកចិត្ត និងមានទំនុកចិត្ត' }
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={24} className="text-emerald-500" style={{ color: 'var(--success-color)' }} />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>
                {lang === 'en' ? item.titleEn : item.titleKh}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {lang === 'en' ? item.descEn : item.descKh}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

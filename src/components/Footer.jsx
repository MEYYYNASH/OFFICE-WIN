export default function Footer({ setCurrentTab, lang }) {
  const handleFooterLinkClick = (tabId) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      style={{
        borderTop: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-secondary)',
        padding: '32px 0',
        marginTop: '60px',
        textAlign: 'center',
        fontSize: '0.85rem',
        color: 'var(--text-secondary)'
      }}
      className="footer"
    >
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Footer shortcuts */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', fontWeight: 600 }}>
          <button onClick={() => handleFooterLinkClick('home')} style={{ cursor: 'pointer' }}>
            {lang === 'en' ? 'Home' : 'ទំព័រដើម'}
          </button>
          <button onClick={() => handleFooterLinkClick('services')} style={{ cursor: 'pointer' }}>
            {lang === 'en' ? 'Services' : 'សេវាកម្ម'}
          </button>
          <button onClick={() => handleFooterLinkClick('faq')} style={{ cursor: 'pointer' }}>
            {lang === 'en' ? 'FAQ' : 'សំណួរចម្លើយ'}
          </button>
          <button onClick={() => handleFooterLinkClick('contact')} style={{ cursor: 'pointer' }}>
            {lang === 'en' ? 'Contact' : 'ទំនាក់ទំនង'}
          </button>
        </div>

        {/* Footer Description */}
        <p style={{ maxWidth: '500px', margin: '0 auto', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          {lang === 'en'
            ? 'Office & Win Service Hub provides stable activated software installation tools and configuration support. All software trademarks belong to their respective owners.'
            : 'Office & Win Service Hub ផ្តល់ជូនឧបករណ៍តំឡើងកម្មវិធីដែលមានស្ថេរភាព និងសេវាកម្មគាំទ្របច្ចេកទេស។ រាល់កម្មសិទ្ធិបញ្ញាម៉ាកសញ្ញាទាំងអស់ជារបស់ម្ចាស់ដើម។'
          }
        </p>

        {/* Copyright */}
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
          &copy; {new Date().getFullYear()} Office & Win Service Hub. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

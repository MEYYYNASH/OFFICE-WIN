import { Home, Search, Heart, Mail } from 'lucide-react';

export default function MobileNavigation({ currentTab, setCurrentTab, favoritesCount, lang }) {
  const navItems = [
    { id: 'home', labelEn: 'Home', labelKh: 'ទំព័រដើម', icon: <Home size={20} /> },
    { id: 'services', labelEn: 'Services', labelKh: 'សេវាកម្ម', icon: <Search size={20} /> },
    { id: 'favorites', labelEn: 'Favorites', labelKh: 'ពេញចិត្ត', icon: <Heart size={20} />, showBadge: true },
    { id: 'contact', labelEn: 'Contact', labelKh: 'ទាក់ទង', icon: <Mail size={20} /> }
  ];

  const handleTabClick = (tabId) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '64px',
        backgroundColor: 'var(--glass-bg)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid var(--glass-border)',
        boxShadow: '0 -4px 16px rgba(0,0,0,0.05)',
        zIndex: 998,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '0 8px'
      }}
      className="mobile-bottom-nav"
    >
      {navItems.map((item) => {
        const isActive = currentTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleTabClick(item.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              color: isActive ? 'var(--accent-color)' : 'var(--text-secondary)',
              cursor: 'pointer',
              flexGrow: 1,
              height: '100%',
              position: 'relative',
              transition: 'color var(--transition-fast)'
            }}
          >
            {item.icon}
            <span style={{ fontSize: '0.65rem', fontWeight: isActive ? 700 : 500 }}>
              {lang === 'en' ? item.labelEn : item.labelKh}
            </span>

            {/* Badge for Favorites */}
            {item.showBadge && favoritesCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '6px',
                right: '25%',
                background: 'var(--danger-color)',
                color: '#ffffff',
                fontSize: '0.6rem',
                fontWeight: 700,
                borderRadius: '50%',
                width: '15px',
                height: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 4px rgba(239,68,68,0.3)'
              }}>
                {favoritesCount}
              </span>
            )}
          </button>
        );
      })}

      <style>{`
        @media (min-width: 769px) {
          .mobile-bottom-nav {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Sun, Moon, Monitor, Heart, Globe, Menu, X, Terminal } from 'lucide-react';

export default function Navbar({
  currentTab,
  setCurrentTab,
  lang,
  setLang,
  theme,
  setTheme,
  favoritesCount
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  // Scroll Progress logic
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.pageYOffset / totalScroll) * 100;
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', labelEn: 'Home', labelKh: 'ទំព័រដើម' },
    { id: 'services', labelEn: 'Services', labelKh: 'សេវាកម្ម' },
    { id: 'compare', labelEn: 'Compare Office', labelKh: 'ប្រៀបធៀប Office' },
    { id: 'faq', labelEn: 'FAQ', labelKh: 'សំណួរចម្លើយ' },
    { id: 'contact', labelEn: 'Contact', labelKh: 'ទំនាក់ទំនង' },
  ];

  const handleLinkClick = (tabId) => {
    setCurrentTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getThemeIcon = () => {
    if (theme === 'light') return <Sun size={18} className="text-amber-500" />;
    if (theme === 'dark') return <Moon size={18} className="text-blue-400" />;
    return <Monitor size={18} />;
  };

  return (
    <header className="navbar-sticky">
      {/* Scroll Progress Indicator */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
        {/* Logo */}
        <div 
          onClick={() => handleLinkClick('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 800, fontSize: '1.3rem', fontFamily: 'var(--font-heading)' }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #0066cc, #00d2ff)',
            color: 'white',
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0, 102, 204, 0.3)'
          }}>
            <Terminal size={20} strokeWidth={2.5} />
          </div>
          <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ color: 'var(--text-primary)' }}>OFFICE & WIN</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--accent-color)', letterSpacing: '0.1em' }}>SERVICE HUB</span>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'none' }} className="desktop-nav-links">
          <ul style={{ display: 'flex', listStyle: 'none', gap: '28px', fontWeight: 500 }}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleLinkClick(link.id)}
                  style={{
                    color: currentTab === link.id ? 'var(--accent-color)' : 'var(--text-secondary)',
                    fontWeight: currentTab === link.id ? 700 : 500,
                    borderBottom: currentTab === link.id ? '2px solid var(--accent-color)' : '2px solid transparent',
                    padding: '8px 2px',
                    transition: 'all var(--transition-fast)',
                    cursor: 'pointer'
                  }}
                >
                  {lang === 'en' ? link.labelEn : link.labelKh}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Settings, Language, Theme, Favorites Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Favorites Bookmark */}
          <button
            onClick={() => handleLinkClick('favorites')}
            className="tooltip-container"
            style={{
              position: 'relative',
              cursor: 'pointer',
              color: currentTab === 'favorites' ? 'var(--danger-color)' : 'var(--text-secondary)',
              padding: '6px',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-tertiary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background var(--transition-fast)'
            }}
          >
            <Heart size={18} fill={currentTab === 'favorites' ? 'var(--danger-color)' : 'none'} />
            {favoritesCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                background: 'var(--danger-color)',
                color: 'white',
                fontSize: '0.65rem',
                fontWeight: 700,
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 5px rgba(239, 68, 68, 0.4)'
              }}>
                {favoritesCount}
              </span>
            )}
            <span className="tooltip">{lang === 'en' ? 'Favorites' : 'សេវាកម្មពេញចិត្ត'}</span>
          </button>

          {/* Theme Switcher Toggle */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
              className="tooltip-container"
              style={{
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                padding: '6px',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-tertiary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {getThemeIcon()}
              <span className="tooltip">{lang === 'en' ? 'Theme' : 'រចនាបថ'}</span>
            </button>
            
            {isThemeMenuOpen && (
              <div 
                style={{
                  position: 'absolute',
                  top: '120%',
                  right: 0,
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-lg)',
                  width: '130px',
                  padding: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  zIndex: 100
                }}
              >
                {['light', 'dark', 'auto'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      setTheme(mode);
                      setIsThemeMenuOpen(false);
                    }}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.85rem',
                      fontWeight: theme === mode ? 600 : 400,
                      backgroundColor: theme === mode ? 'var(--accent-light)' : 'transparent',
                      color: theme === mode ? 'var(--accent-color)' : 'var(--text-primary)',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    {mode === 'light' && <Sun size={14} />}
                    {mode === 'dark' && <Moon size={14} />}
                    {mode === 'auto' && <Monitor size={14} />}
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'kh' : 'en')}
            className="tooltip-container"
            style={{
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              padding: '6px 10px',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-tertiary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          >
            <Globe size={16} />
            <span>{lang === 'en' ? 'KH' : 'EN'}</span>
            <span className="tooltip">{lang === 'en' ? 'Switch to Khmer' : 'ប្តូរជាភាសាអង់គ្លេស'}</span>
          </button>

          {/* Admin Panel button removed */}

          {/* Mobile Hamburguer Menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-only-btn"
            style={{
              cursor: 'pointer',
              color: 'var(--text-primary)',
              padding: '6px',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-tertiary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation overlay */}
      {isMobileMenuOpen && (
        <div 
          style={{
            position: 'absolute',
            top: '70px',
            left: 0,
            width: '100%',
            backgroundColor: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-color)',
            padding: '16px 24px 24px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            zIndex: 99,
            boxShadow: 'var(--shadow-lg)',
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleLinkClick(link.id)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    color: currentTab === link.id ? 'var(--accent-color)' : 'var(--text-primary)',
                    fontWeight: currentTab === link.id ? 700 : 500,
                    fontSize: '1.05rem',
                    padding: '8px 0',
                    cursor: 'pointer'
                  }}
                >
                  {lang === 'en' ? link.labelEn : link.labelKh}
                </button>
              </li>
            ))}
            {/* Admin Panel link removed */}
          </ul>
        </div>
      )}

      {/* Inject styling specifically for desktop and mobile visibility responsive rules */}
      <style>{`
        @media (min-width: 769px) {
          .desktop-nav-links {
            display: flex !important;
          }
          .mobile-only-btn {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .desktop-nav-links {
            display: none !important;
          }
          .mobile-only-btn {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}

import { useState, useEffect, useRef } from 'react';
import { getDB, saveDB } from './db';
import { Sparkles, TrendingUp, Cpu, Flame, ArrowUp, WifiOff, FolderHeart, Info, Calendar, ChevronRight, Heart, FolderOpen, Laptop, Palette, Settings, Zap, Shield, Globe, Film, Package } from 'lucide-react';

// Import components
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import CompareOffice from './components/CompareOffice';
import ServiceDetails from './components/ServiceDetails';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import TelegramButtons from './components/TelegramButtons';
import MobileNavigation from './components/MobileNavigation';
import Footer from './components/Footer';

function App() {
  // Global DB state
  const [db, setDb] = useState(() => getDB());

  // Navigation tab: home, services, compare, faq, contact, favorites
  const [currentTab, setCurrentTab] = useState('home');

  // Active service detail view
  const [activeService, setActiveService] = useState(null);

  // Language state: 'en' (English) or 'kh' (Khmer)
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('service_hub_lang') || 'en';
  });

  // Theme state: 'light', 'dark', 'auto'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('service_hub_theme') || 'auto';
  });

  // Favorites (list of service IDs)
  const [favorites, setFavorites] = useState(() => {
    const favs = localStorage.getItem('service_hub_favorites');
    return favs ? JSON.parse(favs) : [];
  });

  // Recently Viewed (list of service IDs, max 5)
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const rv = localStorage.getItem('service_hub_recently_viewed');
    return rv ? JSON.parse(rv) : [];
  });

  // Online / Offline Status
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Back to Top button visibility
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Search input ref to allow focusing via shortcut key '/'
  const searchInputRef = useRef(null);

  // Save changes to db
  const handleSaveDB = (newDb) => {
    setDb(newDb);
    saveDB(newDb);
  };

  // Sync Language change
  useEffect(() => {
    localStorage.setItem('service_hub_lang', lang);
  }, [lang]);

  // Sync Favorites change
  useEffect(() => {
    localStorage.setItem('service_hub_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Sync Theme updates
  useEffect(() => {
    localStorage.setItem('service_hub_theme', theme);
    
    const applyTheme = (themeName) => {
      document.documentElement.setAttribute('data-theme', themeName);
    };

    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      applyTheme(mediaQuery.matches ? 'dark' : 'light');

      const handleSystemThemeChange = (e) => {
        applyTheme(e.matches ? 'dark' : 'light');
      };
      
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    } else {
      applyTheme(theme);
    }
  }, [theme]);

  // Network offline/online listeners
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Back to Top visibility listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // URL Query Deep Linking Sync
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    // Tab deep linking
    const tabParam = params.get('tab');
    if (tabParam && ['home', 'services', 'compare', 'faq', 'contact', 'favorites'].includes(tabParam)) {
      setCurrentTab(tabParam);
    }

    // Service details deep linking
    const serviceId = params.get('service');
    if (serviceId) {
      const targetService = db.services.find(s => s.id === serviceId);
      if (targetService) {
        setActiveService(targetService);
      }
    }
  }, [db.services]);

  const toggleFavorite = (serviceId) => {
    setFavorites(prev => {
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId);
      } else {
        return [...prev, serviceId];
      }
    });
  };

  const handleViewDetails = (service) => {
    setActiveService(service);
    
    // Track Recently Viewed
    setRecentlyViewed(prev => {
      let updated = [...prev].filter(id => id !== service.id);
      updated.unshift(service.id);
      updated = updated.slice(0, 5); // Max 5 items
      localStorage.setItem('service_hub_recently_viewed', JSON.stringify(updated));
      return updated;
    });
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryIcon = (category, size = 24) => {
    // Return custom visual descriptions
    switch (category) {
      case 'Microsoft Office': return <FolderOpen size={size} />;
      case 'Windows': return <Laptop size={size} />;
      case 'Adobe': return <Palette size={size} />;
      case 'Drivers': return <Settings size={size} />;
      case 'Utilities': return <Zap size={size} />;
      case 'Antivirus': return <Shield size={size} />;
      case 'Browsers': return <Globe size={size} />;
      case 'Multimedia': return <Film size={size} />;
      default: return <Package size={size} />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Microsoft Office': return '#f25f22'; // Office Orange
      case 'Windows': return '#00a4ef'; // Windows Blue
      case 'Adobe': return '#ff0000'; // Adobe Red
      case 'Drivers': return '#7f7f7f'; // Gray
      case 'Utilities': return '#ffb900'; // Yellow
      case 'Antivirus': return '#107c41'; // Green
      case 'Browsers': return '#00b0f0'; // Sky Blue
      case 'Multimedia': return '#b4009e'; // Purple
      default: return '#5c2d91'; // Dark Purple
    }
  };

  return (
    <>
      {/* Announcement Rotating Header */}
      <AnnouncementBar banners={db.banners} />

      {/* Glassmorphic Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        favoritesCount={favorites.length}
      />

      {/* Main Page Layout Switcher */}
      <main style={{ minHeight: '70vh' }}>
        
        {/* ======================= TAB: HOME ======================= */}
        {currentTab === 'home' && (
          <div className="fade-in">
            {/* Hero marketing panel */}
            <Hero
              settings={db.settings}
              lang={lang}
              setCurrentTab={setCurrentTab}
              searchInputRef={searchInputRef}
            />

            {/* Featured Services Grid */}
            <section style={{ padding: '60px 0 30px 0' }}>
              <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
                  <div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Sparkles size={22} className="text-yellow-500" style={{ color: 'var(--warning-color)' }} />
                      {lang === 'en' ? 'Featured Setup Packages' : 'សេវាកម្មដំឡើងដែលណែនាំខ្លាំង'}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      {lang === 'en' ? 'Highly requested full software packages ready for installation.' : 'កញ្ចប់សេវាកម្មពេញនិយមដែលអតិថិជនដំឡើងច្រើនជាងគេ។'}
                    </p>
                  </div>
                  <button 
                    onClick={() => setCurrentTab('services')}
                    style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-color)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  >
                    {lang === 'en' ? 'See all' : 'មើលទាំងអស់'} <ChevronRight size={16} />
                  </button>
                </div>

                <div 
                  className="featured-packages-grid"
                >
                  {db.services.filter(s => s.isFeatured && !s.isHidden).slice(0, 6).map(service => (
                    <div 
                      key={service.id} 
                      onClick={() => handleViewDetails(service)}
                      className="admin-card"
                      style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative' }}
                    >
                      <div style={{ height: '140px', borderRadius: '8px', overflow: 'hidden' }}>
                        <img src={service.image} alt={service.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent-color)', fontWeight: 600, textTransform: 'uppercase' }}>{service.category}</span>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '4px 0 6px 0' }}>{service.name}</h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }} className="line-clamp-2">{service.shortDescription}</p>
                      </div>
                      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                        <span style={{ fontWeight: 800, color: 'var(--accent-color)', fontSize: '1.15rem' }}>
                          {typeof service.price === 'number' ? `${service.price.toLocaleString()}៛` : service.price}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{service.version}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Service Categories Directory */}
            <section style={{ padding: '30px 0' }}>
              <div className="container">
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <TrendingUp size={22} />
                  {lang === 'en' ? 'Browse Software Categories' : 'ស្វែងរកតាមប្រភេទកម្មវិធី'}
                </h2>
                
                <div 
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: '16px'
                  }}
                >
                  {db.settings.categories.map((category) => {
                    const themeColor = getCategoryColor(category);
                    return (
                      <div
                        key={category}
                        onClick={() => {
                          setCurrentTab('services');
                          // Slight delay to allow DOM render before focusing/filtering
                          setTimeout(() => {
                            const trigger = document.querySelector(`button[title="${category}"]`) || null;
                            if (trigger) trigger.click();
                          }, 50);
                        }}
                        style={{ 
                          cursor: 'pointer', 
                          textAlign: 'center', 
                          padding: '24px 16px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '12px',
                          borderRadius: '16px',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'var(--bg-secondary)',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = themeColor;
                          e.currentTarget.style.transform = 'translateY(-6px)';
                          e.currentTarget.style.boxShadow = `0 10px 20px ${themeColor}1a`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--border-color)';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <div style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '50%',
                          backgroundColor: `${themeColor}12`,
                          color: themeColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '4px',
                          border: `1px solid ${themeColor}18`
                        }}>
                          {getCategoryIcon(category, 22)}
                        </div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, lineHeight: 1.2 }}>{category}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Popular and New Sections Split */}
            <section style={{ padding: '30px 0' }}>
              <div className="container home-split-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
                
                {/* Popular Services list */}
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Flame size={18} className="text-orange-500" style={{ color: '#f59e0b' }} />
                    {lang === 'en' ? 'Most Popular Software' : 'កម្មវិធីពេញនិយមបំផុត'}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {db.services.filter(s => s.isPopular && !s.isHidden).slice(0, 10).map(service => (
                      <div 
                        key={service.id}
                        onClick={() => handleViewDetails(service)}
                        style={{ display: 'flex', gap: '14px', alignItems: 'center', cursor: 'pointer', padding: '12px 20px 12px 12px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}
                      >
                        <img src={service.image} alt={service.name} style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '8px' }} />
                        <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{service.name}</h4>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{service.category} • Version {service.version}</p>
                        </div>
                        <span style={{ fontWeight: 800, color: 'var(--accent-color)', fontSize: '1rem', marginLeft: '12px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                          {typeof service.price === 'number' ? `${service.price.toLocaleString()}៛` : service.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Latest Services list */}
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Cpu size={18} />
                    {lang === 'en' ? 'New Arrivals' : 'កម្មវិធីចូលថ្មីៗ'}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {db.services.filter(s => s.isNew && !s.isHidden).slice(0, 10).map(service => (
                      <div 
                        key={service.id}
                        onClick={() => handleViewDetails(service)}
                        style={{ display: 'flex', gap: '14px', alignItems: 'center', cursor: 'pointer', padding: '12px 20px 12px 12px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}
                      >
                        <img src={service.image} alt={service.name} style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '8px' }} />
                        <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{service.name}</h4>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{service.category} • {service.lastUpdated}</p>
                        </div>
                        <span style={{ fontWeight: 800, color: 'var(--accent-color)', fontSize: '1rem', marginLeft: '12px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                          {typeof service.price === 'number' ? `${service.price.toLocaleString()}៛` : service.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
              <style>{`
                @media (min-width: 769px) {
                  .home-split-grid {
                    grid-template-columns: 1fr 1fr !important;
                  }
                }
              `}</style>
            </section>

            {/* Recently Viewed Panel (Conditionally visible) */}
            {recentlyViewed.length > 0 && (
              <section style={{ padding: '20px 0' }}>
                <div className="container">
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FolderHeart size={16} />
                    {lang === 'en' ? 'Recently Viewed' : 'សេវាកម្មទស្សនាថ្មីៗ'}
                  </h3>
                  <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '6px' }}>
                    {recentlyViewed.map(id => {
                      const item = db.services.find(s => s.id === id);
                      if (!item) return null;
                      return (
                        <div
                          key={id}
                          onClick={() => handleViewDetails(item)}
                          style={{
                            padding: '10px 16px',
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', color: getCategoryColor(item.category) }}>
                            {getCategoryIcon(item.category, 14)}
                          </span>
                          <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{item.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}

            {/* Embed FAQ & Contact components directly on homepage */}
            <FAQSection faqs={db.faqs} lang={lang} />
            <ContactSection settings={db.settings} lang={lang} />
          </div>
        )}

        {/* ======================= TAB: SERVICES (CATALOG) ======================= */}
        {currentTab === 'services' && (
          <Catalog
            services={db.services}
            categories={db.settings.categories}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            onViewDetails={handleViewDetails}
            lang={lang}
            settings={db.settings}
            searchInputRef={searchInputRef}
          />
        )}

        {/* ======================= TAB: COMPARE ======================= */}
        {currentTab === 'compare' && (
          <CompareOffice settings={db.settings} lang={lang} />
        )}

        {/* ======================= TAB: FAQ ======================= */}
        {currentTab === 'faq' && (
          <FAQSection faqs={db.faqs} lang={lang} />
        )}

        {/* ======================= TAB: CONTACT ======================= */}
        {currentTab === 'contact' && (
          <ContactSection settings={db.settings} lang={lang} />
        )}

        {/* ======================= TAB: FAVORITES ======================= */}
        {currentTab === 'favorites' && (
          <section style={{ padding: '40px 0' }} className="fade-in">
            <div className="container">
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Heart size={24} fill="var(--danger-color)" style={{ color: 'var(--danger-color)' }} />
                {lang === 'en' ? 'My Saved Services' : 'សេវាកម្មដែលបានរក្សាទុក'}
              </h2>

              {favorites.length > 0 ? (
                <div className="services-grid">
                  {db.services.filter(s => favorites.includes(s.id)).map(service => (
                    <div 
                      key={service.id} 
                      onClick={() => handleViewDetails(service)}
                      className="admin-card"
                      style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '14px' }}
                    >
                      <div style={{ height: '140px', borderRadius: '8px', overflow: 'hidden' }}>
                        <img src={service.image} alt={service.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent-color)', fontWeight: 600 }}>{service.category}</span>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '4px 0 6px 0' }}>{service.name}</h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }} className="line-clamp-2">{service.shortDescription}</p>
                      </div>
                      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                        <span style={{ fontWeight: 800, color: 'var(--accent-color)', fontSize: '1.15rem' }}>
                          {typeof service.price === 'number' ? `${service.price.toLocaleString()}៛` : service.price}
                        </span>
                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleFavorite(service.id); }}
                          style={{ fontSize: '0.75rem', color: 'var(--danger-color)', cursor: 'pointer', fontWeight: 600 }}
                        >
                          {lang === 'en' ? 'Remove' : 'លុបចេញ'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '60px 24px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)' }}>
                  <Heart size={40} style={{ color: 'var(--text-muted)', margin: '0 auto 12px auto' }} />
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '6px' }}>{lang === 'en' ? 'No favorites saved yet' : 'មិនទាន់មានសេវាកម្មពេញចិត្តនៅឡើយ'}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
                    {lang === 'en' ? 'Browse our catalog and heart your favorite services for quick access later.' : 'ស្វែងរកសេវាកម្ម និងចុចលើរូបបេះដូង ដើម្បីរក្សាទុកកម្មវិធីដែលអ្នកពេញចិត្ត។'}
                  </p>
                  <button onClick={() => setCurrentTab('services')} className="btn btn-primary">
                    {lang === 'en' ? 'Browse Catalog' : 'ស្វែងរកសេវាកម្ម'}
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

      </main>

      {/* Footer Branding elements */}
      <Footer setCurrentTab={setCurrentTab} lang={lang} />

      {/* Floating Telegram Support Actions */}
      <TelegramButtons settings={db.settings} lang={lang} />

      {/* Mobile-Friendly Sticky Bottom Bar navigation menu */}
      <MobileNavigation
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        favoritesCount={favorites.length}
        lang={lang}
      />

      {/* Product Detail Modal */}
      {activeService && (
        <ServiceDetails
          service={activeService}
          allServices={db.services}
          onClose={() => setActiveService(null)}
          onViewDetails={handleViewDetails}
          toggleFavorite={toggleFavorite}
          favorites={favorites}
          lang={lang}
          settings={db.settings}
        />
      )}

      {/* Back to Top floating scroll trigger button */}
      {showBackToTop && (
        <button
          onClick={handleScrollToTop}
          style={{
            position: 'fixed',
            bottom: '94px',
            right: '24px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 999,
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <ArrowUp size={18} />
        </button>
      )}

      {/* Network Offline banner popup wrapper */}
      {!isOnline && (
        <div 
          style={{
            position: 'fixed',
            bottom: '76px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'var(--danger-color)',
            color: '#ffffff',
            padding: '10px 20px',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: 1000,
            fontSize: '0.85rem',
            fontWeight: 600
          }}
        >
          <WifiOff size={16} />
          <span>{lang === 'en' ? 'Offline: Running in cache fallback mode' : 'គ្មានអ៊ីនធឺណិត៖ កំពុងដំណើរការដោយប្រើប្រាស់ Cache ជំនួស'}</span>
        </div>
      )}
    </>
  );
}

export default App;

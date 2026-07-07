import { useState, useEffect, useRef } from 'react';
import { Search, Heart, ShoppingCart, Info, RefreshCw, X, Clock, HelpCircle, ChevronRight } from 'lucide-react';

export default function Catalog({
  services,
  categories,
  favorites,
  toggleFavorite,
  onViewDetails,
  lang,
  settings,
  searchInputRef
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('popular'); // popular, newest, az, price-low, price-high
  const [availableOnly, setAvailableOnly] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const suggestionsRef = useRef(null);

  // Load search history from localStorage
  useEffect(() => {
    const history = localStorage.getItem('service_hub_search_history');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  // Keyboard shortcut listener to focus search on '/'
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchInputRef]);

  // Click outside suggestions box to close it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update suggestions on search typing
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.trim().length > 1) {
      // Find matching products
      const matches = services.filter(s => 
        s.name.toLowerCase().includes(value.toLowerCase()) || 
        s.category.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Perform a full search
  const performSearch = (queryText) => {
    setSearchQuery(queryText);
    setShowSuggestions(false);
    
    // Simulate skeleton loader transition
    setLoading(true);
    setTimeout(() => setLoading(false), 400);

    if (!queryText.trim()) return;

    // Add to history
    let history = [...searchHistory];
    history = history.filter(item => item.toLowerCase() !== queryText.toLowerCase());
    history.unshift(queryText);
    history = history.slice(0, 5); // Keep last 5 entries
    
    setSearchHistory(history);
    localStorage.setItem('service_hub_search_history', JSON.stringify(history));
  };

  const handleSuggestionClick = (name) => {
    performSearch(name);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('service_hub_search_history');
  };

  const handleCopyPrice = (price, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`$${price}`);
    alert(lang === 'en' ? 'Price copied to clipboard!' : 'បានចម្លងតម្លៃទុកក្នុង clipboard!');
  };

  // Filter and Sort Services logic
  const filteredServices = services.filter((service) => {
    // 1. Hide/Show Admin Flag
    if (service.isHidden) return false;

    // 2. Search matching
    const matchSearch = searchQuery.trim() === '' || 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase());

    // 3. Category matching
    const matchCategory = selectedCategory === 'All' || service.category === selectedCategory;

    // 4. Availability matching
    const matchAvailable = !availableOnly || service.isAvailable;

    return matchSearch && matchCategory && matchAvailable;
  });

  // Sort matched services
  const sortedServices = [...filteredServices].sort((a, b) => {
    if (selectedSort === 'az') {
      return a.name.localeCompare(b.name);
    }
    if (selectedSort === 'newest') {
      return new Date(b.lastUpdated || '2026-01-01') - new Date(a.lastUpdated || '2026-01-01');
    }
    if (selectedSort === 'price-low') {
      return a.price - b.price;
    }
    if (selectedSort === 'price-high') {
      return b.price - a.price;
    }
    // popular (default)
    return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
  });

  const getTelegramLink = (serviceName) => {
    const username = settings?.telegramUsername || '@OfficeWinSupport';
    const message = encodeURIComponent(`Hello, I would like to order: ${serviceName}`);
    return `https://t.me/${username.replace('@', '')}?text=${message}`;
  };

  return (
    <section id="services-section" style={{ padding: '40px 0' }}>
      <div className="container">
        
        {/* Search and Filters Layout Wrapper */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginBottom: '32px',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          
          {/* Smart Search Bar Row */}
          <div style={{ position: 'relative' }} ref={suggestionsRef}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 16px',
              transition: 'border-color var(--transition-fast)'
            }}>
              <Search size={20} className="text-muted" style={{ marginRight: '10px', color: 'var(--text-muted)' }} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={(e) => e.key === 'Enter' && performSearch(searchQuery)}
                placeholder={lang === 'en' ? 'Search software (press "/" to focus)...' : 'ស្វែងរកកម្មវិធីកុំព្យូទ័រ...'}
                style={{
                  width: '100%',
                  fontSize: '0.95rem',
                  backgroundColor: 'transparent'
                }}
              />
              {searchQuery && (
                <button onClick={() => { setSearchQuery(''); performSearch(''); }} style={{ cursor: 'pointer' }}>
                  <X size={18} style={{ color: 'var(--text-muted)' }} />
                </button>
              )}
            </div>

            {/* Smart Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                marginTop: '6px',
                zIndex: 50,
                overflow: 'hidden'
              }}>
                {suggestions.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSuggestionClick(item.name)}
                    style={{
                      padding: '12px 16px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid var(--border-color)',
                      transition: 'background var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{item.name}</span>
                    <span className="badge badge-available" style={{ fontSize: '0.65rem' }}>{item.category}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search History Row */}
          {searchHistory.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <Clock size={12} />
              <span>{lang === 'en' ? 'Recent searches:' : 'ស្វែងរកថ្មីៗ៖'}</span>
              {searchHistory.map((historyItem, idx) => (
                <button
                  key={idx}
                  onClick={() => performSearch(historyItem)}
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    transition: 'all var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-color)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                >
                  {historyItem}
                </button>
              ))}
              <button 
                onClick={clearHistory}
                style={{ cursor: 'pointer', color: 'var(--danger-color)', fontSize: '0.75rem', marginLeft: 'auto', fontWeight: 600 }}
              >
                {lang === 'en' ? 'Clear' : 'សម្អាត'}
              </button>
            </div>
          )}

          {/* Category Filter Pills (Horizontal Scrolling wrapper) */}
          <div>
            <div style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '8px',
              scrollbarWidth: 'none', /* Firefox */
              msOverflowStyle: 'none'  /* IE 10+ */
            }} className="category-scroll-bar">
              {['All', ...categories].map((category) => (
                <button
                  key={category}
                  onClick={() => { setSelectedCategory(category); performSearch(''); }}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all var(--transition-fast)',
                    backgroundColor: selectedCategory === category ? 'var(--accent-color)' : 'var(--bg-tertiary)',
                    color: selectedCategory === category ? '#ffffff' : 'var(--text-secondary)',
                    border: `1px solid ${selectedCategory === category ? 'var(--accent-color)' : 'var(--border-color)'}`
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== category) {
                      e.currentTarget.style.borderColor = 'var(--border-hover)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== category) {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                    }
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Sorting and Availability Filters Row */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            borderTop: '1px solid var(--border-color)',
            paddingTop: '16px'
          }}>
            {/* Sorting Select */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                {lang === 'en' ? 'Sort by:' : 'តម្រៀបតាម៖'}
              </span>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: 'var(--text-primary)'
                }}
              >
                <option value="popular">{lang === 'en' ? 'Most Popular' : 'ពេញនិយមបំផុត'}</option>
                <option value="newest">{lang === 'en' ? 'Newest' : 'ថ្មីបំផុត'}</option>
                <option value="az">{lang === 'en' ? 'A–Z' : 'ក–ខ'}</option>
                <option value="price-low">{lang === 'en' ? 'Price: Low to High' : 'តម្លៃ៖ ទាបទៅខ្ពស់'}</option>
                <option value="price-high">{lang === 'en' ? 'Price: High to Low' : 'តម្លៃ៖ ខ្ពស់ទៅទាប'}</option>
              </select>
            </div>

            {/* Availability Toggle */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '4px',
                  accentColor: 'var(--accent-color)',
                  cursor: 'pointer'
                }}
              />
              <span>{lang === 'en' ? 'Show Available Only' : 'បង្ហាញតែសេវាកម្មដែលអាចដំឡើងបាន'}</span>
            </label>
          </div>
        </div>

        {/* Services Grid or Empty Results Recommended Section */}
        {loading ? (
          /* Skeleton Loader Simulation */
          <div className="services-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="admin-card" style={{ height: '380px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="skeleton" style={{ height: '180px', width: '100%', borderRadius: 'var(--radius-sm)' }} />
                <div className="skeleton" style={{ height: '24px', width: '70%' }} />
                <div className="skeleton" style={{ height: '16px', width: '90%' }} />
                <div className="skeleton" style={{ height: '16px', width: '50%' }} />
                <div className="skeleton" style={{ height: '40px', width: '100%', marginTop: 'auto' }} />
              </div>
            ))}
          </div>
        ) : sortedServices.length > 0 ? (
          <div className="services-grid fade-in">
            {sortedServices.map((service) => {
              const isFav = favorites.includes(service.id);
              return (
                <div
                  key={service.id}
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all var(--transition-fast)',
                    position: 'relative'
                  }}
                  className="product-card"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = 'var(--border-hover)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  }}
                >
                  {/* Image container & overlay buttons */}
                  <div style={{ height: '180px', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--bg-tertiary)' }}>
                    <img
                      src={service.image}
                      alt={service.name}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    
                    {/* Floating Badges */}
                    <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '6px', pointerEvents: 'none' }}>
                      {service.isNew && <span className="badge badge-new">{lang === 'en' ? 'New' : 'ថ្មី'}</span>}
                      {service.isPopular && <span className="badge badge-popular">{lang === 'en' ? 'Popular' : 'លក់ដាច់'}</span>}
                    </div>

                    {/* Favorite Heart Trigger */}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(service.id); }}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        backgroundColor: 'var(--glass-bg)',
                        border: '1px solid var(--glass-border)',
                        color: isFav ? 'var(--danger-color)' : 'var(--text-secondary)',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'transform var(--transition-fast)'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <Heart size={16} fill={isFav ? 'var(--danger-color)' : 'none'} />
                    </button>
                  </div>

                  {/* Product Details Section */}
                  <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-color)', textTransform: 'uppercase' }}>
                        {service.category}
                      </span>
                      <span className={`badge ${service.isAvailable ? 'badge-available' : 'badge-unavailable'}`} style={{ fontSize: '0.65rem' }}>
                        {service.isAvailable 
                          ? (lang === 'en' ? 'Available' : 'មានសេវាកម្ម')
                          : (lang === 'en' ? 'Unavailable' : 'ដាច់សេវាកម្ម')
                        }
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px', color: 'var(--text-primary)' }}>
                      {service.name}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px', fontWeight: 500 }}>
                      Version: {service.version}
                    </p>
                    
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '20px', flexGrow: 1 }}>
                      {service.shortDescription}
                    </p>

                    {/* Price & Copy Button */}
                    <div 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        backgroundColor: 'var(--bg-tertiary)',
                        borderRadius: 'var(--radius-sm)',
                        marginBottom: '16px'
                      }}
                    >
                      <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-color)' }}>
                        {service.price.toLocaleString()}៛
                      </span>
                      <button
                        onClick={(e) => handleCopyPrice(service.price, e)}
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: 'var(--text-secondary)',
                          cursor: 'pointer',
                          padding: '4px 8px',
                          border: '1px solid var(--border-color)',
                          borderRadius: '4px',
                          backgroundColor: 'var(--bg-secondary)',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-color)'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                      >
                        {lang === 'en' ? 'Copy Price' : 'ចម្លងតម្លៃ'}
                      </button>
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: '8px' }}>
                      <a
                        href={getTelegramLink(service.name)}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary"
                        style={{
                          fontSize: '0.85rem',
                          padding: '8px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <ShoppingCart size={14} />
                        {lang === 'en' ? 'Buy Now' : 'កម្ម៉ង់ភ្លាមៗ'}
                      </a>
                      <button
                        onClick={() => onViewDetails(service)}
                        className="btn btn-secondary"
                        style={{
                          fontSize: '0.85rem',
                          padding: '8px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <Info size={14} />
                        {lang === 'en' ? 'Details' : 'ព័ត៌មាន'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Smart recommendations on empty search state */
          <div className="fade-in" style={{
            textAlign: 'center',
            padding: '60px 24px',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <HelpCircle size={48} className="text-muted" style={{ margin: '0 auto 16px auto', color: 'var(--text-muted)' }} />
            <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
              {lang === 'en' ? 'No Results Found' : 'រកមិនឃើញសេវាកម្មនេះទេ'}
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
              {lang === 'en' 
                ? `We couldn't find anything matching "${searchQuery}". Check the spelling or browse our recommended popular options below.`
                : `យើងមិនអាចស្វែងរកអ្វីដែលត្រូវនឹង "${searchQuery}" ឡើយ។ សូមពិនិត្យអក្ខរាវិរុទ្ធឡើងវិញ ឬស្វែងរកកម្មវិធីពេញនិយមខាងក្រោម។`
              }
            </p>
            
            <button
              onClick={() => { setSearchQuery(''); performSearch(''); setSelectedCategory('All'); }}
              className="btn btn-primary"
              style={{ marginBottom: '40px' }}
            >
              <RefreshCw size={16} />
              {lang === 'en' ? 'Reset Search' : 'សម្អាតការស្វែងរក'}
            </button>

            {/* Popular recommendation list */}
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', textAlign: 'left', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                {lang === 'en' ? '💡 Highly Recommended Services' : '💡 សេវាកម្មដែលពេញនិយមណែនាំជូន'}
              </h3>
              <div className="services-grid">
                {services.filter(s => s.isPopular && !s.isHidden).slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onViewDetails(item)}
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      padding: '16px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-color)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                  >
                    <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} />
                    <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 700, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{item.name}</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.category} • {item.price.toLocaleString()}៛</p>
                    </div>
                    <ChevronRight size={16} style={{ marginLeft: 'auto', color: 'var(--text-muted)', flexShrink: 0 }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

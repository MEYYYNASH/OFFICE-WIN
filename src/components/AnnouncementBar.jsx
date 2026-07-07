import { useState, useEffect } from 'react';

export default function AnnouncementBar({ banners }) {
  const activeBanners = (banners || []).filter(b => b.isActive);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (activeBanners.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % activeBanners.length);
    }, 6000); // Rotate every 6 seconds

    return () => clearInterval(timer);
  }, [activeBanners.length]);

  if (activeBanners.length === 0) return null;

  const currentBanner = activeBanners[currentIndex];

  return (
    <div 
      className="announcement-bar" 
      style={{ 
        backgroundColor: currentBanner.color || 'var(--accent-color)',
        transition: 'background-color 0.5s ease, opacity 0.5s ease',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <div 
        key={currentBanner.id} 
        className="announcement-bar-content"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '32px',
          fontWeight: 600,
          letterSpacing: '0.03em',
          whiteSpace: 'nowrap'
        }}
      >
        <span>{currentBanner.text}</span>
        <span className="mobile-only-marquee-duplicate">{currentBanner.text}</span>
      </div>

      <style>{`
        .announcement-bar-content {
          animation: marquee-scroll 22s linear infinite;
          padding-left: 100%;
        }
        .mobile-only-marquee-duplicate {
          display: inline;
        }
        @keyframes marquee-scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
        @media (min-width: 769px) {
          .announcement-bar-content {
            animation: none !important;
            padding-left: 0 !important;
            display: flex !important;
            justify-content: center;
            width: 100%;
            transform: none !important;
          }
          .mobile-only-marquee-duplicate {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

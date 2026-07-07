import React from "react";
import ProductCard from "./ProductCard";
import { useApp } from "../contexts/AppContext";
import { SearchX, Sparkles } from "lucide-react";

export default function ProductGrid({ servicesList, onDetailsClick, isLoading, allServices }) {
  const { t } = useApp();

  if (isLoading) {
    return (
      <div 
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px",
          padding: "24px",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%"
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="glass-panel" style={{ borderRadius: "var(--radius-md)", padding: "0 0 20px", overflow: "hidden", height: "420px" }}>
            <div className="skeleton skeleton-card-img"></div>
            <div style={{ padding: "20px" }}>
              <div className="skeleton skeleton-text" style={{ width: "30%" }}></div>
              <div className="skeleton skeleton-title"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text" style={{ width: "80%" }}></div>
              <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
                <div className="skeleton" style={{ height: "36px", width: "50%", borderRadius: "8px" }}></div>
                <div className="skeleton" style={{ height: "36px", width: "50%", borderRadius: "8px" }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (servicesList.length === 0) {
    // Show premium recommendations on empty state
    const popularRecommendations = allServices.filter(s => s.isPopular && s.isAvailable).slice(0, 3);
    
    return (
      <div style={{ padding: "60px 24px", textAlign: "center", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "inline-flex", padding: "16px", borderRadius: "50%", backgroundColor: "var(--bg-tertiary)", color: "var(--text-muted)", marginBottom: "16px" }}>
          <SearchX size={48} />
        </div>
        <h2 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "10px" }}>{t("noResultsTitle")}</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px", maxWidth: "450px", margin: "0 auto 40px", lineHeight: "1.5" }}>
          {t("noResultsDesc")}
        </p>

        {popularRecommendations.length > 0 && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "24px", color: "var(--accent-color)" }}>
              <Sparkles size={18} />
              <h3 style={{ fontSize: "16px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>
                {t("recommendedForYou")}
              </h3>
            </div>
            
            <div 
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "24px",
                textAlign: "left"
              }}
            >
              {popularRecommendations.map((service) => (
                <ProductCard
                  key={service.id}
                  service={service}
                  onDetailsClick={onDetailsClick}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "24px",
        padding: "24px",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%"
      }}
    >
      {servicesList.map((service) => (
        <ProductCard
          key={service.id}
          service={service}
          onDetailsClick={onDetailsClick}
        />
      ))}
    </div>
  );
}

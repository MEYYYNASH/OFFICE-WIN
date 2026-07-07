import React, { useState } from "react";
import { useApp } from "../contexts/AppContext";
import { Heart, Copy, Check, MessageCircle, Info } from "lucide-react";

export default function ProductCard({ service, onDetailsClick }) {
  const { 
    isFavorite, 
    addFavorite, 
    removeFavorite, 
    t, 
    settings, 
    lang 
  } = useApp();

  const [copied, setCopied] = useState(false);

  const favorited = isFavorite(service.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (favorited) {
      removeFavorite(service.id);
    } else {
      addFavorite(service.id);
    }
  };

  const handleCopyPrice = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`$${service.price}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBuyClick = (e) => {
    e.stopPropagation();
    
    // Construct pre-filled message
    // "Hello, I would like to order [Service Name] ([Version]) for $[Price]."
    const baseMsg = t("buyMessage");
    const message = `${baseMsg} ${service.name} (${service.version}) - $${service.price}.`;
    
    const telegramUrl = `${settings.telegramLink}?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, "_blank");
  };

  return (
    <div 
      className="glass-card" 
      onClick={() => onDetailsClick(service)}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        position: "relative",
        cursor: "pointer"
      }}
    >
      {/* Product Image Area */}
      <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", overflow: "hidden", backgroundColor: "var(--bg-tertiary)" }}>
        <img
          src={service.image}
          alt={service.name}
          loading="lazy"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform var(--transition-normal)"
          }}
          className="product-card-img"
        />

        {/* Floating Badges */}
        <div style={{ position: "absolute", top: "10px", left: "10px", display: "flex", flexDirection: "column", gap: "6px", zIndex: 10 }}>
          {service.isNew && <span className="badge badge-new">{t("badgeNew")}</span>}
          {service.isPopular && <span className="badge badge-popular">{t("badgePopular")}</span>}
        </div>

        {/* Favorite heart button */}
        <button
          onClick={handleFavoriteClick}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "rgba(255, 255, 255, 0.25)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: favorited ? "var(--danger-color)" : "#ffffff",
            zIndex: 10
          }}
        >
          <Heart size={18} fill={favorited ? "var(--danger-color)" : "none"} style={{ stroke: favorited ? "var(--danger-color)" : "#ffffff" }} />
        </button>
      </div>

      {/* Details Area */}
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        {/* Category Badge & Availability */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--accent-color)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            {service.category}
          </span>
          <span className={`badge ${service.isAvailable ? "badge-available" : "badge-unavailable"}`} style={{ padding: "2px 6px", fontSize: "10px" }}>
            {service.isAvailable ? t("available") : t("unavailable")}
          </span>
        </div>

        {/* Product Name */}
        <h3 style={{ fontSize: "16px", fontWeight: 700, lineHeight: "1.4", marginBottom: "4px", color: "var(--text-primary)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: "44px" }}>
          {service.name}
        </h3>

        {/* Version */}
        <div style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 500, marginBottom: "12px" }}>
          v{service.version}
        </div>

        {/* Short description */}
        <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.5", marginBottom: "16px", flexGrow: 1, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {service.shortDescription}
        </p>

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: "var(--border-color)", margin: "0 0 16px" }}></div>

        {/* Price & Actions footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div>
            <div style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>Price</div>
            <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-primary)" }}>
              ${service.price}
            </div>
          </div>

          <button
            onClick={handleCopyPrice}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "12px",
              padding: "6px 10px",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-color)",
              backgroundColor: "var(--bg-tertiary)",
              fontWeight: 600
            }}
            title={t("copyPrice")}
          >
            {copied ? <Check size={14} style={{ color: "var(--success-color)" }} /> : <Copy size={14} />}
            <span>{copied ? t("priceCopied") : t("copyPrice")}</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <button
            onClick={(e) => { e.stopPropagation(); onDetailsClick(service); }}
            className="btn-secondary"
            style={{
              padding: "8px",
              fontSize: "13px",
              fontWeight: 700,
              width: "100%",
              justifyContent: "center",
              gap: "4px"
            }}
          >
            <Info size={16} />
            <span>{t("details")}</span>
          </button>

          <button
            onClick={handleBuyClick}
            className="btn-primary"
            disabled={!service.isAvailable}
            style={{
              padding: "8px",
              fontSize: "13px",
              fontWeight: 700,
              width: "100%",
              justifyContent: "center",
              gap: "4px",
              opacity: service.isAvailable ? 1 : 0.5,
              cursor: service.isAvailable ? "pointer" : "not-allowed"
            }}
          >
            <MessageCircle size={16} />
            <span>{t("buyNow")}</span>
          </button>
        </div>
      </div>
      
      <style>{`
        .glass-card:hover .product-card-img {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}

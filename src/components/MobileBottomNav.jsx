import React from "react";
import { useApp } from "../contexts/AppContext";
import { Home, Heart, Phone, ShieldAlert, Search } from "lucide-react";

export default function MobileBottomNav({ activeTab, onNavigate }) {
  const { favorites, t } = useApp();

  return (
    <div 
      className="mobile-bottom-nav glass-panel" 
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "60px",
        zIndex: 890,
        display: "none", // Managed by CSS below for responsiveness
        gridTemplateColumns: "repeat(4, 1fr)",
        alignItems: "center",
        borderTop: "1px solid var(--border-color)",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.05)"
      }}
    >
      <button 
        onClick={() => onNavigate("home")} 
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          color: activeTab === "home" ? "var(--accent-color)" : "var(--text-muted)",
          fontSize: "10px",
          fontWeight: 600
        }}
      >
        <Home size={20} />
        <span>{t("home")}</span>
      </button>

      <button 
        onClick={() => {
          onNavigate("home");
          setTimeout(() => {
            document.querySelector(".category-tabs")?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }} 
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          color: "var(--text-muted)",
          fontSize: "10px",
          fontWeight: 600
        }}
      >
        <Search size={20} />
        <span>Search</span>
      </button>

      <button 
        onClick={() => onNavigate("favorites")} 
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          color: activeTab === "favorites" ? "var(--danger-color)" : "var(--text-muted)",
          fontSize: "10px",
          fontWeight: 600,
          position: "relative"
        }}
      >
        <Heart size={20} fill={activeTab === "favorites" ? "var(--danger-color)" : "none"} />
        <span>{t("favorites")}</span>
        {favorites.length > 0 && (
          <span style={{
            position: "absolute",
            top: "-4px",
            right: "24px",
            backgroundColor: "var(--danger-color)",
            color: "#ffffff",
            fontSize: "8px",
            fontWeight: 700,
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            {favorites.length}
          </span>
        )}
      </button>

      <button 
        onClick={() => {
          onNavigate("home");
          setTimeout(() => {
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }} 
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          color: "var(--text-muted)",
          fontSize: "10px",
          fontWeight: 600
        }}
      >
        <Phone size={20} />
        <span>{t("contact")}</span>
      </button>

      <style>{`
        @media (max-width: 900px) {
          .mobile-bottom-nav {
            display: grid !important;
          }
          body {
            padding-bottom: 60px !important; /* Avoid content overlap with bottom nav */
          }
        }
      `}</style>
    </div>
  );
}

import React, { useState } from "react";
import { useApp } from "../contexts/AppContext";
import { MessageCircle, X, Send, Copy, Check, QrCode, ArrowUp } from "lucide-react";

export default function FloatingTelegram() {
  const { t, settings } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll height to show/hide "Back to Top" button
  React.useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const handleCopyUsername = () => {
    navigator.clipboard.writeText(settings.telegramUsername);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAskQuestion = () => {
    const message = t("supportMessage");
    const telegramUrl = `${settings.telegramLink}?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, "_blank");
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(settings.telegramLink)}`;

  return (
    <div style={{
      position: "fixed",
      bottom: "80px",
      right: "24px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      zIndex: 850
    }}>
      
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={handleScrollToTop}
          style={{
            backgroundColor: "var(--bg-secondary)",
            color: "var(--text-primary)",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            boxShadow: "var(--shadow-md)",
            border: "1px solid var(--border-color)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}
          title="Back to Top"
        >
          <ArrowUp size={22} />
        </button>
      )}

      {/* Floating Panel (Open state) */}
      {isOpen && (
        <div className="glass-panel" style={{
          position: "absolute",
          bottom: "65px",
          right: 0,
          width: "280px",
          padding: "20px",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border-color)",
          boxShadow: "var(--shadow-lg)",
          display: "flex",
          flexDirection: "column",
          gap: "14px"
        }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--success-color)" }}></div>
              <span style={{ fontSize: "14px", fontWeight: 700 }}>Telegram Support</span>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ color: "var(--text-muted)" }}>
              <X size={16} />
            </button>
          </div>

          <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: "1.5" }}>
            Need help installing or have questions about version compatibility? Contact us.
          </p>

          {/* Actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <a 
              href={settings.telegramLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary" 
              style={{ width: "100%", justifyContent: "center", padding: "8px 12px", fontSize: "13px" }}
            >
              <Send size={14} />
              <span>Contact Support</span>
            </a>

            <button 
              onClick={handleAskQuestion}
              className="btn-secondary" 
              style={{ width: "100%", justifyContent: "center", padding: "8px 12px", fontSize: "13px" }}
            >
              <span>Ask a Question</span>
            </button>

            <button 
              onClick={handleCopyUsername}
              className="btn-secondary" 
              style={{ width: "100%", justifyContent: "center", padding: "8px 12px", fontSize: "13px", gap: "6px" }}
            >
              {copied ? <Check size={14} style={{ color: "var(--success-color)" }} /> : <Copy size={14} />}
              <span>{copied ? "Copied!" : settings.telegramUsername}</span>
            </button>
          </div>

          {/* QR Code */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", borderTop: "1px solid var(--border-color)", paddingTop: "12px" }}>
            <img src={qrCodeUrl} alt="Support QR Code" style={{ width: "100px", height: "100px", background: "white", padding: "2px" }} />
            <span style={{ fontSize: "9px", color: "var(--text-muted)", marginTop: "4px" }}>Scan to open Telegram</span>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: "var(--accent-color)",
          color: "#ffffff",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          boxShadow: "0 4px 15px var(--accent-glow)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer"
        }}
        title="Contact on Telegram"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
      </button>

    </div>
  );
}

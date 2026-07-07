import React, { useState, useEffect } from "react";
import { useApp } from "../contexts/AppContext";
import { X, MessageCircle, Copy, Check, Printer, Share2, Clock, ShieldCheck, RefreshCw, Layers, Award } from "lucide-react";
import VersionComparison from "./VersionComparison";

export default function ProductDetailsModal({ service, onClose, allServices, onServiceSelect }) {
  const { t, settings, addRecentlyViewed } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  useEffect(() => {
    if (service) {
      addRecentlyViewed(service.id);
    }
  }, [service]);

  if (!service) return null;

  const shareUrl = `${window.location.origin}${window.location.pathname}?service=${service.id}`;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBuyClick = () => {
    const baseMsg = t("buyMessage");
    const message = `${baseMsg} ${service.name} (${service.version}) - $${service.price}.`;
    const telegramUrl = `${settings.telegramLink}?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, "_blank");
  };

  const handleShareSystem = () => {
    if (navigator.share) {
      navigator.share({
        title: service.name,
        text: service.shortDescription,
        url: shareUrl
      }).catch(err => console.log(err));
    } else {
      handleCopyLink();
    }
  };

  // Find related services in same category (excluding current)
  const relatedServices = allServices
    .filter((s) => s.category === service.category && s.id !== service.id && s.isAvailable)
    .slice(0, 3);

  // Generate QR Code URL using QRServer API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(shareUrl)}`;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      backdropFilter: "blur(8px)",
      zIndex: 999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }} onClick={onClose}>
      
      <div 
        className="glass-panel" 
        style={{
          width: "100%",
          maxWidth: "900px",
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: "var(--radius-lg)",
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-color)",
          display: "flex",
          flexDirection: "column",
          position: "relative"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image Cover */}
        <div style={{ position: "relative", width: "100%", height: "250px", backgroundColor: "var(--bg-tertiary)" }}>
          <img
            src={service.image}
            alt={service.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(to top, rgba(11, 11, 15, 0.9) 0%, transparent 80%)"
          }}></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "#ffffff",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.2)"
            }}
          >
            <X size={20} />
          </button>

          {/* Overlay Title */}
          <div style={{ position: "absolute", bottom: "20px", left: "24px", right: "24px", color: "#ffffff" }}>
            <span style={{
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              backgroundColor: "var(--accent-color)",
              padding: "4px 8px",
              borderRadius: "4px",
              letterSpacing: "1px"
            }}>
              {service.category}
            </span>
            <h2 style={{ fontSize: "28px", fontWeight: 800, marginTop: "10px", textShadow: "0 2px 4px rgba(0,0,0,0.3)", fontFamily: "var(--font-title)" }}>
              {service.name}
            </h2>
            <div style={{ display: "flex", gap: "16px", fontSize: "13px", marginTop: "6px", opacity: 0.9 }}>
              <span>Version: <strong>{service.version}</strong></span>
              <span>Updated: <strong>{service.lastUpdated}</strong></span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: "24px" }}>
          
          {/* Service Quick Highlights */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
            marginBottom: "24px"
          }}>
            <div style={{ padding: "12px", background: "var(--bg-primary)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", gap: "10px" }}>
              <Clock size={20} style={{ color: "var(--accent-color)" }} />
              <div>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block", textTransform: "uppercase" }}>{t("installationTime")}</span>
                <span style={{ fontSize: "14px", fontWeight: 700 }}>{service.installationTime}</span>
              </div>
            </div>

            <div style={{ padding: "12px", background: "var(--bg-primary)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", gap: "10px" }}>
              <Layers size={20} style={{ color: "var(--accent-color)" }} />
              <div>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block", textTransform: "uppercase" }}>{t("supportedWindows")}</span>
                <span style={{ fontSize: "14px", fontWeight: 700 }}>{service.supportedWindows}</span>
              </div>
            </div>

            <div style={{ padding: "12px", background: "var(--bg-primary)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", gap: "10px" }}>
              <Award size={20} style={{ color: "var(--success-color)" }} />
              <div>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block", textTransform: "uppercase" }}>Price</span>
                <span style={{ fontSize: "16px", fontWeight: 800, color: "var(--accent-color)" }}>${service.price}</span>
              </div>
            </div>
          </div>

          {/* Core Info Split layout */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }} className="modal-split">
            {/* Left side */}
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "10px" }}>Description</h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "20px" }}>
                {service.description}
              </p>

              {/* Key Features */}
              <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "10px" }}>{t("features")}</h3>
              <ul style={{ paddingLeft: "20px", marginBottom: "20px", fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                {service.features?.map((feat, idx) => (
                  <li key={idx} style={{ marginBottom: "6px" }}>{feat}</li>
                ))}
              </ul>

              {/* Requirements */}
              <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "10px" }}>{t("requirements")}</h3>
              <ul style={{ paddingLeft: "20px", marginBottom: "20px", fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                {service.requirements?.map((req, idx) => (
                  <li key={idx} style={{ marginBottom: "6px" }}>{req}</li>
                ))}
              </ul>
            </div>

            {/* Right side: Action list & What's included */}
            <div>
              {/* Actions box */}
              <div className="glass-panel" style={{ padding: "16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", marginBottom: "20px" }}>
                <button
                  onClick={handleBuyClick}
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center", marginBottom: "12px", padding: "12px" }}
                >
                  <MessageCircle size={18} />
                  <span>{t("buyNow")}</span>
                </button>

                <div style={{ display: "flex", gap: "8px", flexDirection: "column" }}>
                  <button onClick={handleShareSystem} className="btn-secondary" style={{ width: "100%", justifyContent: "center", fontSize: "13px" }}>
                    <Share2 size={16} />
                    <span>{t("shareService")}</span>
                  </button>

                  <button onClick={handleCopyLink} className="btn-secondary" style={{ width: "100%", justifyContent: "center", fontSize: "13px" }}>
                    {copiedLink ? <Check size={16} style={{ color: "var(--success-color)" }} /> : <Copy size={16} />}
                    <span>{copiedLink ? t("linkCopied") : t("copyLink")}</span>
                  </button>

                  <button onClick={handlePrint} className="btn-secondary" style={{ width: "100%", justifyContent: "center", fontSize: "13px" }}>
                    <Printer size={16} />
                    <span>{t("printService")}</span>
                  </button>

                  <button 
                    onClick={() => setQrOpen(!qrOpen)} 
                    className="btn-secondary" 
                    style={{ width: "100%", justifyContent: "center", fontSize: "13px", color: qrOpen ? "var(--accent-color)" : "inherit" }}
                  >
                    <span>{t("qrCodeLabel")}</span>
                  </button>
                </div>

                {/* QR Code Display */}
                {qrOpen && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "16px", padding: "12px", border: "1px dashed var(--border-color)", borderRadius: "var(--radius-sm)" }}>
                    <img src={qrCodeUrl} alt="Service QR Code" style={{ width: "120px", height: "120px", background: "white", padding: "4px" }} />
                    <span style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "6px", textAlign: "center" }}>Scan QR to share details</span>
                  </div>
                )}
              </div>

              {/* What's included */}
              <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "8px" }}>{t("whatsIncluded")}</h3>
              <div style={{ background: "var(--bg-primary)", padding: "16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
                {service.whatsIncluded?.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "8px", fontSize: "13px" }}>
                    <ShieldCheck size={14} style={{ color: "var(--success-color)", marginTop: "2px", flexShrink: 0 }} />
                    <span style={{ color: "var(--text-secondary)" }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Official Tools Downloader (where applicable) */}
              {service.officialToolLink && (
                <div style={{ marginTop: "20px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "8px" }}>{t("officialTools")}</h3>
                  <a 
                    href={service.officialToolLink}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ width: "100%", justifyContent: "center", fontSize: "13px", borderColor: "var(--accent-color)", color: "var(--accent-color)" }}
                  >
                    <RefreshCw size={14} />
                    <span>{t("downloadOfficialTools")}</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Nested Version Comparison (Contextual if Microsoft Office) */}
          {service.category === "Microsoft Office" && (
            <div style={{ borderTop: "1px solid var(--border-color)", marginTop: "32px", paddingTop: "24px" }}>
              <VersionComparison />
            </div>
          )}

          {/* Related Services */}
          {relatedServices.length > 0 && (
            <div style={{ borderTop: "1px solid var(--border-color)", marginTop: "32px", paddingTop: "24px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "16px" }}>{t("relatedServices")}</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                {relatedServices.map((rel) => (
                  <div 
                    key={rel.id} 
                    onClick={() => onServiceSelect(rel)}
                    className="glass-card"
                    style={{ padding: "12px", display: "flex", gap: "12px", alignItems: "center", cursor: "pointer" }}
                  >
                    <img src={rel.image} alt={rel.name} style={{ width: "50px", height: "50px", borderRadius: "8px", objectFit: "cover" }} />
                    <div style={{ minWidth: 0 }}>
                      <h4 style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {rel.name}
                      </h4>
                      <span style={{ fontSize: "11px", color: "var(--accent-color)", fontWeight: 700 }}>${rel.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
      
      <style>{`
        @media (max-width: 768px) {
          .modal-split {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}

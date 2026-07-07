import React from "react";
import { useApp } from "../contexts/AppContext";
import { Check, X, ShieldAlert } from "lucide-react";

export default function VersionComparison() {
  const { t, settings } = useApp();
  const comparison = settings.officeComparison;

  if (!comparison) return null;

  return (
    <div style={{ padding: "40px 24px 60px", maxWidth: "1000px", margin: "0 auto", width: "100%" }}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h2 style={{ fontFamily: "var(--font-title)", fontSize: "28px", fontWeight: 800, marginBottom: "8px" }}>
          {t("compareTitle")}
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "15px" }}>
          {t("compareSubtitle")}
        </p>
      </div>

      <div style={{ overflowX: "auto", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
          fontSize: "14px",
          background: "var(--bg-secondary)"
        }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border-color)", background: "var(--bg-tertiary)" }}>
              <th style={{ padding: "16px 20px", fontWeight: 700, minWidth: "150px" }}>{t("featureCol")}</th>
              {comparison.versions.map((version) => (
                <th key={version} style={{ padding: "16px 20px", fontWeight: 700, textAlign: "center" }}>
                  {version}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.features.map((feature, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid var(--border-color)", transition: "background-color var(--transition-fast)" }} className="table-row-hover">
                <td style={{ padding: "14px 20px", fontWeight: 600 }}>{feature.name}</td>
                {feature.values.map((val, valIdx) => {
                  const isYes = val === "Yes" || val.includes("Yes") || val === "Advanced";
                  const isNo = val === "No" || val === "Ended";
                  
                  return (
                    <td 
                      key={valIdx} 
                      style={{ 
                        padding: "14px 20px", 
                        textAlign: "center", 
                        color: isYes ? "var(--success-color)" : isNo ? "var(--danger-color)" : "inherit",
                        fontWeight: isYes || isNo ? 600 : 500
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                        {val === "Yes" && <Check size={16} />}
                        {val === "No" && <X size={16} />}
                        <span>{val}</span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <style>{`
        .table-row-hover:hover {
          background-color: var(--bg-tertiary);
        }
      `}</style>
    </div>
  );
}

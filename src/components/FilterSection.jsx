import React, { useState } from "react";
import { useApp } from "../contexts/AppContext";
import { Search, X, SlidersHorizontal, ArrowUpDown, History } from "lucide-react";

export default function FilterSection({
  selectedCategory,
  onCategoryChange,
  sortOption,
  onSortChange,
  showAvailableOnly,
  onAvailableToggle,
  searchQuery,
  onSearchChange,
  suggestions,
  onSuggestionClick
}) {
  const { settings, t, searchHistory, clearSearchHistory } = useApp();
  const [showFilters, setShowFilters] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const categories = ["All", ...settings.categories];

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      setShowHistory(false);
    }
  };

  return (
    <div style={{ padding: "0 24px", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
      {/* Category Tabs Scroll List */}
      <div className="category-tabs" style={{ marginBottom: "20px" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`category-tab ${selectedCategory === cat ? "active" : ""}`}
          >
            {cat === "All" ? t("all") : cat}
          </button>
        ))}
      </div>

      {/* Filter Toolbar (Mobile friendly) */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        flexWrap: "wrap",
        background: "var(--bg-secondary)",
        padding: "16px 20px",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--border-color)",
        marginBottom: "24px"
      }}>
        {/* Mobile Filters Toggle & Quick Info */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary" 
            style={{ padding: "8px 14px", fontSize: "14px", display: "flex", alignItems: "center", gap: "6px" }}
          >
            <SlidersHorizontal size={16} />
            <span>{t("filterTitle")}</span>
          </button>
          
          <span style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: 500 }}>
            {t("sortBy")}: {t(sortOption)}
          </span>
        </div>

        {/* Suggestion & History overlay helper */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {/* Quick Available switch */}
          <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", cursor: "pointer", fontWeight: 600 }}>
            <input
              type="checkbox"
              checked={showAvailableOnly}
              onChange={onAvailableToggle}
              style={{
                width: "16px",
                height: "16px",
                accentColor: "var(--accent-color)"
              }}
            />
            <span>{t("availableOnly")}</span>
          </label>
        </div>
      </div>

      {/* Expanded filters options (Collapsible drawer) */}
      {showFilters && (
        <div className="glass-panel" style={{
          padding: "20px",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--border-color)",
          marginBottom: "24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px"
        }}>
          {/* Sort selection */}
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "var(--text-muted)", marginBottom: "8px", textTransform: "uppercase" }}>
              {t("sortBy")}
            </label>
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-color)",
                background: "var(--bg-primary)",
                outline: "none",
                fontSize: "14px",
                fontWeight: 600
              }}
            >
              <option value="newest">{t("newest")}</option>
              <option value="popular">{t("popular")}</option>
              <option value="az">{t("az")}</option>
              <option value="za">{t("za")}</option>
              <option value="priceLowHigh">{t("priceLowHigh")}</option>
              <option value="priceHighLow">{t("priceHighLow")}</option>
            </select>
          </div>

          {/* Search history helper inside Filter Panel */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>
                {t("searchHistory")}
              </span>
              {searchHistory.length > 0 && (
                <button onClick={clearSearchHistory} style={{ fontSize: "11px", color: "var(--danger-color)", fontWeight: 700 }}>
                  {t("clearHistory")}
                </button>
              )}
            </div>
            
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", maxHeight: "80px", overflowY: "auto" }}>
              {searchHistory.length === 0 ? (
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{t("noHistory")}</span>
              ) : (
                searchHistory.map((query, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSuggestionClick(query)}
                    style={{
                      padding: "4px 8px",
                      borderRadius: "4px",
                      background: "var(--bg-tertiary)",
                      fontSize: "12px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontWeight: 500
                    }}
                  >
                    <History size={10} />
                    <span>{query}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Autocomplete suggestions popup overlay */}
      {suggestions.length > 0 && searchQuery && (
        <div className="glass-panel" style={{
          position: "absolute",
          left: "24px",
          right: "24px",
          marginTop: "-16px",
          zIndex: 100,
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--border-color)",
          boxShadow: "var(--shadow-lg)",
          maxHeight: "220px",
          overflowY: "auto",
          maxWidth: "500px"
        }}>
          <div style={{ padding: "8px 12px", borderBottom: "1px solid var(--border-color)", fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>
            {t("suggestions")}
          </div>
          {suggestions.map((item) => (
            <button
              key={item.id}
              onClick={() => onSuggestionClick(item.name)}
              style={{
                width: "100%",
                padding: "10px 16px",
                textAlign: "left",
                fontSize: "14px",
                borderBottom: "1px solid var(--border-color)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <span style={{ fontWeight: 600 }}>{item.name}</span>
              <span style={{ fontSize: "12px", color: "var(--accent-color)", fontWeight: 700 }}>{item.category}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

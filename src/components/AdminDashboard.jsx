import React, { useState } from "react";
import { useApp } from "../contexts/AppContext";
import { LogIn, Plus, Edit, Trash2, Save, LogOut, Check, X, ShieldAlert, Monitor, MessageSquare, Megaphone, Settings } from "lucide-react";

export default function AdminDashboard() {
  const {
    services, addService, updateService, deleteService,
    faqs, addFaq, updateFaq, deleteFaq,
    banners, addBanner, updateBanner, deleteBanner,
    settings, updateSettings,
    isAdminLoggedIn, loginAdmin, logoutAdmin,
    t, resetDB
  } = useApp();

  // Authentication States
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Tab State
  const [activeTab, setActiveTab] = useState("services"); // services | faqs | banners | settings

  // Form States for CRUD
  const [serviceForm, setServiceForm] = useState(null); // null when not editing/creating
  const [faqForm, setFaqForm] = useState(null);
  const [bannerForm, setBannerForm] = useState(null);

  // Search & Filter in Admin
  const [adminSearch, setAdminSearch] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const success = loginAdmin(password);
    if (success) {
      setErrorMsg("");
      setPassword("");
    } else {
      setErrorMsg(t("wrongPassword"));
    }
  };

  // Image File Uploader to Base64 DataURL
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setServiceForm({ ...serviceForm, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveService = (e) => {
    e.preventDefault();
    if (!serviceForm.name || !serviceForm.category) return;

    // Convert comma-separated or newline-separated fields back into arrays
    const formatted = {
      ...serviceForm,
      price: parseFloat(serviceForm.price) || 0,
      features: typeof serviceForm.features === "string" 
        ? serviceForm.features.split("\n").filter(x => x.trim()) 
        : serviceForm.features,
      requirements: typeof serviceForm.requirements === "string" 
        ? serviceForm.requirements.split("\n").filter(x => x.trim()) 
        : serviceForm.requirements,
      whatsIncluded: typeof serviceForm.whatsIncluded === "string" 
        ? serviceForm.whatsIncluded.split("\n").filter(x => x.trim()) 
        : serviceForm.whatsIncluded,
      lastUpdated: new Date().toISOString().split("T")[0]
    };

    if (serviceForm.id) {
      updateService(formatted);
    } else {
      addService(formatted);
    }
    setServiceForm(null);
  };

  const handleSaveFaq = (e) => {
    e.preventDefault();
    if (!faqForm.question || !faqForm.answer) return;

    if (faqForm.id) {
      updateFaq(faqForm);
    } else {
      addFaq(faqForm);
    }
    setFaqForm(null);
  };

  const handleSaveBanner = (e) => {
    e.preventDefault();
    if (!bannerForm.text) return;

    if (bannerForm.id) {
      updateBanner(bannerForm);
    } else {
      addBanner(bannerForm);
    }
    setBannerForm(null);
  };

  // Login Form Screen
  if (!isAdminLoggedIn) {
    return (
      <div style={{
        maxWidth: "400px",
        margin: "100px auto",
        padding: "32px",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-color)"
      }} className="glass-panel">
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <LogIn size={40} style={{ color: "var(--accent-color)", marginBottom: "12px" }} />
          <h2 style={{ fontFamily: "var(--font-title)", fontWeight: 800 }}>{t("adminLogin")}</h2>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px" }}>
              {t("password")} (Default: admin123)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-color)",
                background: "var(--bg-primary)",
                outline: "none"
              }}
              required
            />
          </div>

          {errorMsg && (
            <div style={{ fontSize: "13px", color: "var(--danger-color)", fontWeight: 600 }}>
              {errorMsg}
            </div>
          )}

          <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
            <span>{t("loginBtn")}</span>
          </button>
        </form>
      </div>
    );
  }

  // Filter products by search query
  const filteredServices = services.filter(s => 
    s.name.toLowerCase().includes(adminSearch.toLowerCase()) || 
    s.category.toLowerCase().includes(adminSearch.toLowerCase())
  );

  return (
    <div style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
      
      {/* Top dashboard summary and logout */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-title)", fontSize: "32px", fontWeight: 800 }}>
            {t("adminDashboard")}
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>Manage your products, announcements, FAQs, and contact settings.</p>
        </div>
        
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={resetDB} className="btn-secondary" style={{ color: "var(--danger-color)", borderColor: "var(--danger-color)" }}>
            Reset DB to Defaults
          </button>
          
          <button onClick={logoutAdmin} className="btn-secondary">
            <LogOut size={16} />
            <span>{t("logout")}</span>
          </button>
        </div>
      </div>

      {/* Grid widgets dashboard */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
        marginBottom: "32px"
      }}>
        <div className="glass-panel" style={{ padding: "20px", borderRadius: "var(--radius-md)" }}>
          <span style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>{t("totalServices")}</span>
          <h3 style={{ fontSize: "28px", fontWeight: 800, color: "var(--accent-color)" }}>{services.length}</h3>
        </div>

        <div className="glass-panel" style={{ padding: "20px", borderRadius: "var(--radius-md)" }}>
          <span style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>{t("totalCategories")}</span>
          <h3 style={{ fontSize: "28px", fontWeight: 800 }}>{settings.categories.length}</h3>
        </div>

        <div className="glass-panel" style={{ padding: "20px", borderRadius: "var(--radius-md)" }}>
          <span style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>{t("visitorCount")}</span>
          <h3 style={{ fontSize: "28px", fontWeight: 800 }}>{settings.visitorCount}</h3>
        </div>

        <div className="glass-panel" style={{ padding: "20px", borderRadius: "var(--radius-md)" }}>
          <span style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>{t("siteStatusLabel")}</span>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "4px" }}>
            <span style={{ fontSize: "16px", fontWeight: 700 }}>{settings.siteStatus}</span>
            <button
              onClick={() => updateSettings({ siteStatus: settings.siteStatus === "Online" ? "Offline" : "Online" })}
              style={{
                fontSize: "11px",
                padding: "4px 8px",
                borderRadius: "4px",
                backgroundColor: settings.siteStatus === "Online" ? "var(--success-color)" : "var(--danger-color)",
                color: "white",
                fontWeight: 700
              }}
            >
              Toggle
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Switch Panel */}
      <div style={{
        display: "flex",
        gap: "10px",
        borderBottom: "1px solid var(--border-color)",
        marginBottom: "24px",
        overflowX: "auto",
        scrollbarWidth: "none"
      }}>
        {[
          { id: "services", label: t("services"), icon: <Monitor size={16} /> },
          { id: "faqs", label: t("faqManager"), icon: <MessageSquare size={16} /> },
          { id: "banners", label: t("bannerManager"), icon: <Megaphone size={16} /> },
          { id: "settings", label: t("settingsManager"), icon: <Settings size={16} /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setServiceForm(null); setFaqForm(null); setBannerForm(null); }}
            style={{
              padding: "12px 18px",
              fontWeight: 600,
              fontSize: "15px",
              borderBottom: activeTab === tab.id ? "3px solid var(--accent-color)" : "3px solid transparent",
              color: activeTab === tab.id ? "var(--accent-color)" : "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              whiteSpace: "nowrap"
            }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: Services CRUD Dashboard */}
      {activeTab === "services" && !serviceForm && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
            <input
              type="text"
              placeholder="Search products..."
              value={adminSearch}
              onChange={(e) => setAdminSearch(e.target.value)}
              style={{
                padding: "8px 16px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-color)",
                background: "var(--bg-secondary)",
                outline: "none",
                width: "300px"
              }}
            />
            <button
              onClick={() => setServiceForm({
                name: "", category: settings.categories[0], version: "",
                shortDescription: "", description: "", price: 0, image: "",
                isAvailable: true, isNew: true, isPopular: false, isFeatured: false,
                requirements: "", features: "", installationTime: "15 mins",
                supportedWindows: "Windows 10, Windows 11", whatsIncluded: ""
              })}
              className="btn-primary"
            >
              <Plus size={16} />
              <span>{t("addService")}</span>
            </button>
          </div>

          <div style={{ overflowX: "auto", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "var(--bg-secondary)", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "var(--bg-tertiary)", borderBottom: "1px solid var(--border-color)", textAlign: "left" }}>
                  <th style={{ padding: "12px 16px" }}>Image</th>
                  <th style={{ padding: "12px 16px" }}>Product Name</th>
                  <th style={{ padding: "12px 16px" }}>Category</th>
                  <th style={{ padding: "12px 16px" }}>Price</th>
                  <th style={{ padding: "12px 16px" }}>Status</th>
                  <th style={{ padding: "12px 16px", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((s) => (
                  <tr key={s.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "12px 16px" }}>
                      <img src={s.image} alt={s.name} style={{ width: "40px", height: "40px", borderRadius: "4px", objectFit: "cover" }} />
                    </td>
                    <td style={{ padding: "12px 16px", fontWeight: 600 }}>{s.name}</td>
                    <td style={{ padding: "12px 16px" }}>{s.category}</td>
                    <td style={{ padding: "12px 16px", fontWeight: 700 }}>${s.price}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span className={`badge ${s.isAvailable ? "badge-available" : "badge-unavailable"}`}>
                        {s.isAvailable ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "8px" }}>
                        <button
                          onClick={() => setServiceForm({
                            ...s,
                            features: s.features?.join("\n") || "",
                            requirements: s.requirements?.join("\n") || "",
                            whatsIncluded: s.whatsIncluded?.join("\n") || ""
                          })}
                          style={{ color: "var(--accent-color)" }}
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => { if (window.confirm(t("deleteConfirm"))) deleteService(s.id); }}
                          style={{ color: "var(--danger-color)" }}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Service Form Screen */}
      {activeTab === "services" && serviceForm && (
        <form onSubmit={handleSaveService} className="glass-panel" style={{ padding: "24px", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)" }}>
          <h3 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "20px" }}>
            {serviceForm.id ? t("editService") : t("addService")}
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="admin-form-split">
            {/* Left Col */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>{t("fieldName")} *</label>
                <input type="text" value={serviceForm.name} onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)" }} required />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>{t("fieldCategory")} *</label>
                <select value={serviceForm.category} onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)" }} required>
                  {settings.categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>{t("fieldVersion")}</label>
                  <input type="text" value={serviceForm.version} onChange={(e) => setServiceForm({ ...serviceForm, version: e.target.value })} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>{t("fieldPrice")} ($) *</label>
                  <input type="number" step="0.01" value={serviceForm.price} onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)" }} required />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>Image Uploader (Local File Upload)</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ width: "100%", marginBottom: "10px", padding: "4px", borderRadius: "8px", border: "1px solid var(--border-color)" }} />
                <span style={{ fontSize: "12px", color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>Or provide an Image URL instead:</span>
                <input type="text" value={serviceForm.image} onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)" }} placeholder="https://..." />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>{t("fieldShortDesc")}</label>
                <input type="text" value={serviceForm.shortDescription} onChange={(e) => setServiceForm({ ...serviceForm, shortDescription: e.target.value })} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)" }} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>{t("fieldLongDesc")}</label>
                <textarea rows="3" value={serviceForm.description} onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", resize: "none" }} />
              </div>
            </div>

            {/* Right Col */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>{t("fieldInstallTime")}</label>
                  <input type="text" value={serviceForm.installationTime} onChange={(e) => setServiceForm({ ...serviceForm, installationTime: e.target.value })} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>{t("fieldSupportedOS")}</label>
                  <input type="text" value={serviceForm.supportedWindows} onChange={(e) => setServiceForm({ ...serviceForm, supportedWindows: e.target.value })} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)" }} />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>{t("fieldFeatures")} ({t("fieldFeatures")})</label>
                <textarea rows="3" value={serviceForm.features} onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })} placeholder="Feature item 1&#10;Feature item 2" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", fontFamily: "monospace" }} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>{t("fieldRequirements")} ({t("fieldFeatures")})</label>
                <textarea rows="3" value={serviceForm.requirements} onChange={(e) => setServiceForm({ ...serviceForm, requirements: e.target.value })} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", fontFamily: "monospace" }} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>{t("fieldWhatsIncluded")} ({t("fieldFeatures")})</label>
                <textarea rows="2" value={serviceForm.whatsIncluded} onChange={(e) => setServiceForm({ ...serviceForm, whatsIncluded: e.target.value })} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", fontFamily: "monospace" }} />
              </div>

              {/* Toggles */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "10px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 600 }}>
                  <input type="checkbox" checked={serviceForm.isNew} onChange={(e) => setServiceForm({ ...serviceForm, isNew: e.target.checked })} />
                  <span>{t("fieldNew")}</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 600 }}>
                  <input type="checkbox" checked={serviceForm.isPopular} onChange={(e) => setServiceForm({ ...serviceForm, isPopular: e.target.checked })} />
                  <span>{t("fieldPopular")}</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 600 }}>
                  <input type="checkbox" checked={serviceForm.isFeatured} onChange={(e) => setServiceForm({ ...serviceForm, isFeatured: e.target.checked })} />
                  <span>{t("fieldFeatured")}</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 600 }}>
                  <input type="checkbox" checked={serviceForm.isAvailable} onChange={(e) => setServiceForm({ ...serviceForm, isAvailable: e.target.checked })} />
                  <span>{t("fieldAvailable")}</span>
                </label>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "24px" }}>
            <button type="button" onClick={() => setServiceForm(null)} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Save size={16} />
              <span>{t("saveChanges")}</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: FAQs Manager */}
      {activeTab === "faqs" && (
        <div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
            <button
              onClick={() => setFaqForm({ question: "", questionKh: "", answer: "", answerKh: "" })}
              className="btn-primary"
            >
              <Plus size={16} />
              <span>{t("addFaq")}</span>
            </button>
          </div>

          {faqForm && (
            <form onSubmit={handleSaveFaq} className="glass-panel" style={{ padding: "20px", borderRadius: "var(--radius-md)", marginBottom: "24px" }}>
              <h4 style={{ fontWeight: 700, marginBottom: "16px" }}>{faqForm.id ? t("editFaq") : t("addFaq")}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 700, display: "block", marginBottom: "4px" }}>Question (English) *</label>
                  <input type="text" value={faqForm.question} onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid var(--border-color)", background: "var(--bg-primary)" }} required />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 700, display: "block", marginBottom: "4px" }}>Question (Khmer)</label>
                  <input type="text" value={faqForm.questionKh} onChange={(e) => setFaqForm({ ...faqForm, questionKh: e.target.value })} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid var(--border-color)", background: "var(--bg-primary)" }} />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 700, display: "block", marginBottom: "4px" }}>Answer (English) *</label>
                  <textarea rows="3" value={faqForm.answer} onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid var(--border-color)", background: "var(--bg-primary)" }} required />
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 700, display: "block", marginBottom: "4px" }}>Answer (Khmer)</label>
                  <textarea rows="3" value={faqForm.answerKh} onChange={(e) => setFaqForm({ ...faqForm, answerKh: e.target.value })} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid var(--border-color)", background: "var(--bg-primary)" }} />
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "16px" }}>
                <button type="button" onClick={() => setFaqForm(null)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Save</button>
              </div>
            </form>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {faqs.map(f => (
              <div key={f.id} className="glass-panel" style={{ padding: "16px", borderRadius: "var(--radius-md)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: "15px" }}>{f.question}</h4>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>{f.answer}</p>
                  {f.questionKh && (
                    <div style={{ borderTop: "1px dashed var(--border-color)", marginTop: "8px", paddingTop: "8px" }}>
                      <h5 style={{ fontWeight: 600, fontSize: "13px", color: "var(--accent-color)" }}>{f.questionKh}</h5>
                      <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{f.answerKh}</p>
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => setFaqForm(f)} style={{ color: "var(--accent-color)" }}><Edit size={16} /></button>
                  <button onClick={() => { if (window.confirm("Delete FAQ?")) deleteFaq(f.id); }} style={{ color: "var(--danger-color)" }}><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Banner Manager */}
      {activeTab === "banners" && (
        <div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
            <button
              onClick={() => setBannerForm({ text: "", isActive: true, color: "#006ec1" })}
              className="btn-primary"
            >
              <Plus size={16} />
              <span>{t("addBanner")}</span>
            </button>
          </div>

          {bannerForm && (
            <form onSubmit={handleSaveBanner} className="glass-panel" style={{ padding: "20px", borderRadius: "var(--radius-md)", marginBottom: "24px" }}>
              <h4 style={{ fontWeight: 700, marginBottom: "16px" }}>{bannerForm.id ? t("editBanner") : t("addBanner")}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 700, display: "block", marginBottom: "4px" }}>Banner Text *</label>
                  <input type="text" value={bannerForm.text} onChange={(e) => setBannerForm({ ...bannerForm, text: e.target.value })} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid var(--border-color)", background: "var(--bg-primary)" }} required />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 700, display: "block", marginBottom: "4px" }}>Background Color</label>
                    <input type="color" value={bannerForm.color} onChange={(e) => setBannerForm({ ...bannerForm, color: e.target.value })} style={{ width: "100%", height: "40px", padding: "2px", borderRadius: "6px", border: "1px solid var(--border-color)", background: "var(--bg-primary)", cursor: "pointer" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 700, display: "block", marginBottom: "12px" }}>Active State</label>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 600 }}>
                      <input type="checkbox" checked={bannerForm.isActive} onChange={(e) => setBannerForm({ ...bannerForm, isActive: e.target.checked })} />
                      <span>Display Announcement</span>
                    </label>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "16px" }}>
                <button type="button" onClick={() => setBannerForm(null)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Save</button>
              </div>
            </form>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {banners.map(b => (
              <div key={b.id} className="glass-panel" style={{ padding: "16px", borderRadius: "var(--radius-md)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "4px", backgroundColor: b.color, border: "1px solid var(--border-color)" }}></div>
                  <div>
                    <span style={{ fontWeight: 600 }}>{b.text}</span>
                    <span className={`badge ${b.isActive ? "badge-available" : "badge-unavailable"}`} style={{ marginLeft: "12px", padding: "1px 6px", fontSize: "9px" }}>
                      {b.isActive ? "Active" : "Disabled"}
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => setBannerForm(b)} style={{ color: "var(--accent-color)" }}><Edit size={16} /></button>
                  <button onClick={() => { if (window.confirm("Delete banner?")) deleteBanner(b.id); }} style={{ color: "var(--danger-color)" }}><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Contact and Settings Manager */}
      {activeTab === "settings" && (
        <form 
          onSubmit={(e) => { e.preventDefault(); alert("Settings Saved!"); }} 
          className="glass-panel" 
          style={{ padding: "24px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <h4 style={{ fontWeight: 700, fontSize: "16px", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px" }}>
            Website & Contacts Configuration
          </h4>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="admin-form-split">
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>Telegram Username Handle</label>
              <input type="text" value={settings.telegramUsername} onChange={(e) => updateSettings({ telegramUsername: e.target.value })} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)" }} />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>Telegram Chat URL</label>
              <input type="text" value={settings.telegramLink} onChange={(e) => updateSettings({ telegramLink: e.target.value })} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)" }} />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>Support Phone Number</label>
              <input type="text" value={settings.supportPhone} onChange={(e) => updateSettings({ supportPhone: e.target.value })} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)" }} />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>Support Email Address</label>
              <input type="email" value={settings.supportEmail} onChange={(e) => updateSettings({ supportEmail: e.target.value })} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)" }} />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>Business / Operating Hours</label>
              <input type="text" value={settings.businessHours} onChange={(e) => updateSettings({ businessHours: e.target.value })} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)" }} />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, marginBottom: "6px" }}>Facebook Link URL</label>
              <input type="text" value={settings.facebookLink} onChange={(e) => updateSettings({ facebookLink: e.target.value })} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "var(--bg-primary)" }} />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <span style={{ fontSize: "12px", color: "var(--success-color)", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}>
              <Check size={14} /> Changes save automatically to localStorage!
            </span>
          </div>
        </form>
      )}

      {/* Form CSS support */}
      <style>{`
        @media (max-width: 768px) {
          .admin-form-split {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

import React, { createContext, useContext, useState, useEffect } from "react";
import { getDB, saveDB, resetDB } from "../db";
import { translations } from "./i18n";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // DB States
  const [db, setDbState] = useState(() => getDB());
  
  // UX States
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem("service_hub_theme") || "auto";
  });
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("service_hub_lang") || "en";
  });
  
  // User Personalization States
  const [favorites, setFavorites] = useState(() => {
    try {
      const favs = localStorage.getItem("service_hub_favorites");
      return favs ? JSON.parse(favs) : [];
    } catch {
      return [];
    }
  });
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      const rec = localStorage.getItem("service_hub_recently_viewed");
      return rec ? JSON.parse(rec) : [];
    } catch {
      return [];
    }
  });
  const [searchHistory, setSearchHistory] = useState(() => {
    try {
      const hist = localStorage.getItem("service_hub_search_history");
      return hist ? JSON.parse(hist) : [];
    } catch {
      return [];
    }
  });

  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem("service_hub_admin_auth") === "true";
  });

  // Keep localStorage in sync for DB state
  const setDB = (updater) => {
    setDbState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveDB(next);
      return next;
    });
  };

  // Sync personalizations to localstorage
  useEffect(() => {
    localStorage.setItem("service_hub_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("service_hub_recently_viewed", JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem("service_hub_search_history", JSON.stringify(searchHistory));
  }, [searchHistory]);

  // Theme effect (Dark/Light/Auto)
  useEffect(() => {
    localStorage.setItem("service_hub_theme", theme);
    const applyTheme = () => {
      const root = document.documentElement;
      let isDark = false;
      
      if (theme === "dark") {
        isDark = true;
      } else if (theme === "light") {
        isDark = false;
      } else {
        // Auto
        isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
      
      if (isDark) {
        root.classList.add("dark");
        root.classList.remove("light");
      } else {
        root.classList.add("light");
        root.classList.remove("dark");
      }
    };

    applyTheme();

    if (theme === "auto") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme();
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, [theme]);

  // Translation Helper
  const t = (key) => {
    return translations[lang]?.[key] || translations["en"]?.[key] || key;
  };

  const toggleLang = (targetLang) => {
    const nextLang = targetLang || (lang === "en" ? "kh" : "en");
    setLang(nextLang);
    localStorage.setItem("service_hub_lang", nextLang);
  };

  const toggleTheme = (targetTheme) => {
    setThemeState(targetTheme);
  };

  // Favorites Actions
  const addFavorite = (id) => {
    if (!favorites.includes(id)) {
      setFavorites((prev) => [...prev, id]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((item) => item !== id));
  };

  const isFavorite = (id) => favorites.includes(id);

  // Recently Viewed Actions
  const addRecentlyViewed = (id) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item !== id);
      return [id, ...filtered].slice(0, 5); // keep last 5
    });
  };

  // Search History Actions
  const addSearchHistory = (query) => {
    if (!query || !query.trim()) return;
    setSearchHistory((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== query.toLowerCase());
      return [query.trim(), ...filtered].slice(0, 8); // keep last 8
    });
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  // Admin Auth Actions
  const loginAdmin = (password) => {
    if (password === "admin123") {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem("service_hub_admin_auth", "true");
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem("service_hub_admin_auth");
  };

  // CRUD Actions for Services
  const addService = (service) => {
    setDB((prev) => ({
      ...prev,
      services: [...prev.services, { ...service, id: `service-${Date.now()}` }]
    }));
  };

  const updateService = (updatedService) => {
    setDB((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === updatedService.id ? updatedService : s))
    }));
  };

  const deleteService = (id) => {
    setDB((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id)
    }));
    removeFavorite(id);
    setRecentlyViewed((prev) => prev.filter((item) => item !== id));
  };

  // CRUD Actions for FAQs
  const addFaq = (faq) => {
    setDB((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { ...faq, id: `faq-${Date.now()}` }]
    }));
  };

  const updateFaq = (updatedFaq) => {
    setDB((prev) => ({
      ...prev,
      faqs: prev.faqs.map((f) => (f.id === updatedFaq.id ? updatedFaq : f))
    }));
  };

  const deleteFaq = (id) => {
    setDB((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((f) => f.id !== id)
    }));
  };

  // CRUD Actions for Banners
  const addBanner = (banner) => {
    setDB((prev) => ({
      ...prev,
      banners: [...prev.banners, { ...banner, id: `banner-${Date.now()}` }]
    }));
  };

  const updateBanner = (updatedBanner) => {
    setDB((prev) => ({
      ...prev,
      banners: prev.banners.map((b) => (b.id === updatedBanner.id ? updatedBanner : b))
    }));
  };

  const deleteBanner = (id) => {
    setDB((prev) => ({
      ...prev,
      banners: prev.banners.filter((b) => b.id !== id)
    }));
  };

  // Update Settings
  const updateSettings = (updatedSettings) => {
    setDB((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...updatedSettings }
    }));
  };

  // Reset to default settings
  const handleResetDB = () => {
    const cleanDB = resetDB();
    setDbState(cleanDB);
  };

  return (
    <AppContext.Provider
      value={{
        services: db.services,
        faqs: db.faqs,
        banners: db.banners,
        settings: db.settings,
        theme,
        lang,
        favorites,
        recentlyViewed,
        searchHistory,
        isAdminLoggedIn,
        t,
        toggleTheme,
        toggleLang,
        addFavorite,
        removeFavorite,
        isFavorite,
        addRecentlyViewed,
        addSearchHistory,
        clearSearchHistory,
        loginAdmin,
        logoutAdmin,
        addService,
        updateService,
        deleteService,
        addFaq,
        updateFaq,
        deleteFaq,
        addBanner,
        updateBanner,
        deleteBanner,
        updateSettings,
        resetDB: handleResetDB
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

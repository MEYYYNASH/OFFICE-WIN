// Initial seed data for the Premium Microsoft Office & Windows Service website

// Resolve public asset paths correctly for any deployment base (local or GitHub Pages)
const BASE = import.meta.env.BASE_URL;

const DEFAULT_SERVICES = [
  {
    id: "ms-office-2024",
    name: "Office 2024 Pro",
    category: "Microsoft Office",
    version: "2024 v2408",
    shortDescription: "Pre-activated crack edition of Office 2024. Includes Word, Excel, PowerPoint, Outlook, and Publisher.",
    description: "Get the complete, cracked version of Microsoft Office 2024 Professional Plus. Lifetime activation with no subscription fees. Clean and stable release. Includes full support for remote setup.",
    price: 2500,
    image: `${BASE}microsoft-office.jpg`,
    isAvailable: true,
    isNew: true,
    isPopular: true,
    isFeatured: true,
    requirements: [
      "Operating System: Windows 10 or Windows 11",
      "Processor: 1.6 GHz or faster, 2-core",
      "Memory: 4 GB RAM",
      "Disk Space: 4 GB available hard disk space"
    ],
    features: [
      "Word, Excel, PowerPoint, Outlook, Access, Publisher",
      "Pre-activated with lifetime crack",
      "Enhanced ink and slide transition in PowerPoint",
      "One-time installation, no expiration"
    ],
    installationTime: "2-4 mins",
    supportedWindows: "Windows 10, Windows 11",
    whatsIncluded: [
      "Pre-activated Office 2024 Setup Tool",
      "Lifetime crack license",
      "Step-by-step Video Guide",
      "Free Remote Installation Support (AnyDesk)"
    ],
    lastUpdated: "2026-07-07"
  },
  {
    id: "ms-office-2021",
    name: "Office 2021 Pro",
    category: "Microsoft Office",
    version: "2021 LTSC",
    shortDescription: "Stable, pre-activated cracked Microsoft Office suite for lifetime use.",
    description: "Microsoft Office 2021 Professional Plus cracked edition provides classic Office apps for families and businesses. Installed on your PC with permanent activation.",
    price: 2500,
    image: `${BASE}microsoft-office.jpg`,
    isAvailable: true,
    isNew: false,
    isPopular: true,
    isFeatured: true,
    requirements: [
      "Operating System: Windows 10 or Windows 11",
      "Processor: 1.6 GHz, 2-core processor",
      "Memory: 4 GB RAM",
      "Disk Space: 4 GB available disk space"
    ],
    features: [
      "Classic versions of Word, Excel, PowerPoint, Outlook, Publisher, Access",
      "No subscription required - lifetime crack",
      "Seamless integration with Windows"
    ],
    installationTime: "2-4 mins",
    supportedWindows: "Windows 10, Windows 11",
    whatsIncluded: [
      "Pre-activated cracked installer link",
      "Lifetime license activation",
      "Detailed Installation Manual",
      "Remote Desktop Support"
    ],
    lastUpdated: "2026-07-07"
  },
  {
    id: "windows-11-pro",
    name: "Windows 11 Pro",
    category: "Windows",
    version: "24H2 Pro",
    shortDescription: "Permanent activation for Windows 11 Pro using digital license tools.",
    description: "Activate your Windows 11 Pro system permanently. We bypass Microsoft account blocks and apply a lifetime digital crack activation so your system gets all future updates.",
    price: 2500,
    image: `${BASE}windows-license.jpg`,
    isAvailable: true,
    isNew: true,
    isPopular: true,
    isFeatured: true,
    requirements: [
      "Processor: 1 GHz or faster compatible 64-bit processor",
      "Memory: 4 GB RAM minimum",
      "TPM: TPM version 2.0 (can bypass during install)"
    ],
    features: [
      "Digital license crack activation linked to hardware",
      "BitLocker Device Encryption enabled",
      "Remote Desktop connection hosting support",
      "Full updates supported from Microsoft servers"
    ],
    installationTime: "2-4 mins",
    supportedWindows: "Compatible hardware PCs",
    whatsIncluded: [
      "Windows 11 Pro Activation Tool",
      "Rufus/Media Creation Tool bypass setup",
      "Remote installation or upgrade assistance",
      "Lifetime guarantee for updates"
    ],
    lastUpdated: "2026-07-07"
  },
  {
    id: "adobe-creative-cloud-2024",
    name: "Adobe CC Suite",
    category: "Adobe",
    version: "2024 Pre-Activated",
    shortDescription: "Complete cracked collection of Adobe 2024 creative apps including Photoshop & Illustrator.",
    description: "Unlock all Adobe CC programs. No monthly subscriptions, offline activated with lifetime crack. Includes Photoshop, Premiere Pro, Illustrator, After Effects, and Acrobat Pro.",
    price: 2500,
    image: `${BASE}adobe.jpg`,
    isAvailable: true,
    isNew: true,
    isPopular: true,
    isFeatured: true,
    requirements: [
      "Operating System: Windows 10 (64-bit) v22H2 or Windows 11",
      "Processor: Intel Multi-Core or AMD Ryzen with 64-bit support",
      "Memory: 16 GB RAM recommended",
      "Disk Space: 30 GB available SSD space"
    ],
    features: [
      "Includes Photoshop, Premiere Pro, Illustrator, After Effects, Acrobat Pro, Audition",
      "Pre-activated cracked offline installers",
      "No subscription, no account blocks",
      "Lifetime offline activation"
    ],
    installationTime: "2-4 mins",
    supportedWindows: "Windows 10, Windows 11 (64-bit only)",
    whatsIncluded: [
      "Complete Suite Download Links (Google Drive)",
      "Pre-activated Offline Installers",
      "Remote Desktop installation support"
    ],
    lastUpdated: "2026-07-07"
  },
  {
    id: "adobe-xd",
    name: "Adobe XD",
    category: "Adobe",
    version: "v57.1.12",
    shortDescription: "Standalone pre-activated crack version of Adobe XD UI/UX design tool.",
    description: "Adobe XD is the fast & powerful UI/UX design, prototyping, and wireframing tool for websites and mobile apps. Lifetime cracked, runs fully offline without subscription accounts.",
    price: 2500,
    image: `${BASE}adobe.jpg`,
    isAvailable: true,
    isNew: true,
    isPopular: false,
    isFeatured: false,
    requirements: [
      "Operating System: Windows 10 (64-bit) or Windows 11",
      "Memory: 4 GB RAM minimum",
      "Display: 1280 x 800 screen resolution"
    ],
    features: [
      "UI/UX Design, prototyping, and wireframing",
      "Lifetime crack pre-applied",
      "Offline compatibility - no creative cloud account needed"
    ],
    installationTime: "2-4 mins",
    supportedWindows: "Windows 10, Windows 11",
    whatsIncluded: [
      "Adobe XD cracked standalone setup",
      "Detailed setup walkthrough instructions",
      "Remote configuration support"
    ],
    lastUpdated: "2026-07-07"
  },
  {
    id: "adobe-photoshop",
    name: "Photoshop 2024",
    category: "Adobe",
    version: "v25.9",
    shortDescription: "Standalone pre-activated crack version of Adobe Photoshop 2024 photo editor.",
    description: "The world's best imaging and graphic design software. Fully cracked with offline capabilities. Create and enhance your photographs, website designs, and 3D artwork.",
    price: 2500,
    image: `${BASE}adobe.jpg`,
    isAvailable: true,
    isNew: false,
    isPopular: true,
    isFeatured: false,
    requirements: [
      "Operating System: Windows 10 or Windows 11",
      "Memory: 8 GB RAM minimum",
      "Graphics: NVIDIA GeForce GTX 1050 or equivalent"
    ],
    features: [
      "Lifetime crack pre-installed",
      "Advanced photo manipulation and layer editing tools",
      "Offline activation bypass"
    ],
    installationTime: "2-4 mins",
    supportedWindows: "Windows 10, Windows 11",
    whatsIncluded: [
      "Photoshop 2024 cracked offline installer",
      "Remote help support via AnyDesk"
    ],
    lastUpdated: "2026-07-07"
  },
  {
    id: "adobe-illustrator",
    name: "Illustrator 2024",
    category: "Adobe",
    version: "v28.5",
    shortDescription: "Standalone pre-activated crack version of Adobe Illustrator vector design tool.",
    description: "The industry-standard vector graphics software lets you create logos, icons, drawings, typography, and illustrations for print, web, interactive, and mobile.",
    price: 2500,
    image: `${BASE}adobe.jpg`,
    isAvailable: true,
    isNew: false,
    isPopular: true,
    isFeatured: false,
    requirements: [
      "Operating System: Windows 10 or Windows 11",
      "Memory: 8 GB RAM minimum",
      "Disk: SSD storage recommended"
    ],
    features: [
      "Vector graphics design, logo creations",
      "Permanent cracked status pre-applied",
      "Full set of typography and pathing tools"
    ],
    installationTime: "2-4 mins",
    supportedWindows: "Windows 10, Windows 11",
    whatsIncluded: [
      "Illustrator 2024 cracked offline installer",
      "Remote support help"
    ],
    lastUpdated: "2026-07-07"
  },
  {
    id: "adobe-premiere-pro",
    name: "Premiere Pro 2024",
    category: "Adobe",
    version: "v24.4",
    shortDescription: "Standalone pre-activated crack version of Adobe Premiere Pro video editor.",
    description: "Professional video editing software. Edit footage in any format, from 8K to virtual reality. Fully cracked lifetime activation for offline projects.",
    price: 2500,
    image: `${BASE}adobe.jpg`,
    isAvailable: true,
    isNew: false,
    isPopular: true,
    isFeatured: false,
    requirements: [
      "Operating System: Windows 10 (64-bit) or Windows 11",
      "Memory: 16 GB RAM minimum",
      "Graphics: 4 GB VRAM GPU minimum"
    ],
    features: [
      "Cracked offline activation",
      "Professional timeline video and audio editing",
      "Hardware accelerated video rendering"
    ],
    installationTime: "2-4 mins",
    supportedWindows: "Windows 10, Windows 11",
    whatsIncluded: [
      "Premiere Pro 2024 cracked standalone installer",
      "Remote video rendering optimization assist"
    ],
    lastUpdated: "2026-07-07"
  },
  {
    id: "malwarebytes-premium",
    name: "Malwarebytes Premium Security",
    category: "Antivirus",
    version: "v4.6.10",
    shortDescription: "Advanced real-time antivirus, anti-malware, and ransomware protection for Windows.",
    description: "Keep your system clean and secure. Malwarebytes Premium detects and removes malware in real time, block malicious websites, and safeguards your system from zero-day threats and ransomware.",
    price: 2500,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop",
    isAvailable: true,
    isNew: false,
    isPopular: false,
    isFeatured: false,
    isHidden: true,
    requirements: [
      "Operating System: Windows 7, 8, 8.1, 10, 11",
      "Processor: 800 MHz or faster",
      "Memory: 2 GB RAM",
      "Disk Space: 250 MB available space"
    ],
    features: [
      "Real-time protection against malware, spyware, and viruses",
      "Ransomware protection and exploit shield",
      "Web protection against phishing and fraud sites",
      "Lightweight resource usage - runs smoothly in background"
    ],
    installationTime: "2-4 mins",
    supportedWindows: "Windows 7, 8, 10, 11",
    whatsIncluded: [
      "Malwarebytes Premium Installer",
      "Genuine License Key (1 Year / Lifetime Choice)",
      "Quick remote configuration support"
    ],
    lastUpdated: "2026-02-15"
  },
  {
    id: "idm-downloader",
    name: "Internet Download Manager (IDM)",
    category: "Utilities",
    version: "v6.42 Build 18",
    shortDescription: "World's fastest download accelerator tool with full browser extension integration.",
    description: "Accelerate your downloads by up to 5 times. IDM integrates into Google Chrome, Edge, and Firefox to capture links and download video/audio files directly. Lifetime activated version.",
    price: 2500,
    image: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=600&auto=format&fit=crop",
    isAvailable: true,
    isNew: false,
    isPopular: true,
    isFeatured: false,
    isHidden: true,
    requirements: [
      "Operating System: Windows XP, 7, 8, 10, 11",
      "Memory: 512 MB RAM",
      "Disk Space: 50 MB available space",
      "Browsers: Chrome, Edge, Firefox, Opera, etc."
    ],
    features: [
      "Speeds up downloads with smart segmenting technology",
      "Resumes broken or interrupted downloads",
      "One-click browser extension grabber for video/audio",
      "Pre-activated lifetime retail edition"
    ],
    installationTime: "2-4 mins",
    supportedWindows: "Windows 7, 8, 10, 11",
    whatsIncluded: [
      "Official IDM Installer with lifetime registration patch",
      "Browser extension installation guide",
      "Remote configuration support"
    ],
    lastUpdated: "2026-06-25",
    officialToolLink: "https://www.internetdownloadmanager.com/download.html"
  }
];

const DEFAULT_FAQS = [
  {
    id: "faq-1",
    question: "How long does remote installation take?",
    questionKh: "តើការតំឡើងពីចម្ងាយ (Remote) ប្រើពេលប៉ុន្មាន?",
    answer: "It typically takes 15 to 30 minutes depending on your internet connection speed. We connect securely via AnyDesk or TeamViewer to install and configure everything.",
    answerKh: "ជាទូទៅប្រើពេលពី ១៥ ទៅ ៣០ នាទី អាស្រ័យលើល្បឿនអ៊ីនធឺណិតរបស់អ្នក។ យើងភ្ជាប់ដោយសុវត្ថិភាពតាមរយៈ AnyDesk ឬ TeamViewer ដើម្បីតំឡើង និងរៀបចំជូន។"
  },
  {
    id: "faq-2",
    question: "Is remote support secure?",
    questionKh: "តើការគាំទ្រពីចម្ងាយមានសុវត្ថិភាពដែរឬទេ?",
    answer: "Yes, fully secure. You can monitor the entire installation process on your screen. You can terminate the session at any time simply by closing the AnyDesk app.",
    answerKh: "បាទ មានសុវត្ថិភាព ១០០%។ អ្នកអាចមើលឃើញរាល់សកម្មភាពតំឡើងនៅលើអេក្រង់កុំព្យូទ័ររបស់អ្នក ហើយអាចបិទការភ្ជាប់បានគ្រប់ពេលដោយគ្រាន់តែបិទកម្មវិធី AnyDesk។"
  },
  {
    id: "faq-3",
    question: "What is your payment policy?",
    questionKh: "តើគោលការណ៍ទូទាត់ប្រាក់របស់អ្នកយ៉ាងដូចម្តេច?",
    answer: "We do not have an automated checkout or payment gateway on our site. All payments are done after successful installation or via direct chat/agreement on Telegram.",
    answerKh: "យើងមិនមានប្រព័ន្ធទូទាត់ប្រាក់ស្វ័យប្រវត្តិលើគេហទំព័រនេះទេ។ រាល់ការទូទាត់ប្រាក់គឺធ្វើឡើងបន្ទាប់ពីតំឡើងបានជោគជ័យ ឬតាមរយៈការជជែកផ្ទាល់លើ Telegram។"
  },
  {
    id: "faq-4",
    question: "What if the software gets deactivated later?",
    questionKh: "ចុះបើកម្មវិធីលែងដើរ ឬបាត់បង់ការ Activate នៅពេលក្រោយ?",
    answer: "We offer a lifetime warranty for our standard installations. If your software gets deactivated, contact us via Telegram, and we will reactivate it for you free of charge.",
    answerKh: "យើងផ្តល់ជូនការធានាលើការតំឡើង។ ប្រសិនបើកម្មវិធីលែងដើរ ឬបាត់បង់ការ Activate សូមទាក់ទងមកយើងខ្ញុំតាម Telegram យើងខ្ញុំនឹងតំឡើងជូនឡើងវិញដោយមិនគិតថ្លៃ។"
  }
];

const DEFAULT_BANNERS = [
  { id: "b1", text: "🚀 Microsoft Office 2024 Professional Plus Crack Edition Available!", isActive: true, color: "#0066cc" },
  { id: "b2", text: "💻 Fully supporting Windows 11 24H2 and 25H2 upgrades", isActive: true, color: "#107c41" },
  { id: "b3", text: "⚡ Fast remote installation service via AnyDesk/TeamViewer (8:00 AM - 9:00 PM)", isActive: true, color: "#d83b01" }
];

const DEFAULT_SETTINGS = {
  telegramUsername: "@ShennCelest",
  telegramLink: "https://t.me/ShennCelest",
  supportPhone: "+855 12 345 678",
  supportEmail: "support@officewin.com",
  businessHours: "8:00 AM - 9:00 PM",
  facebookLink: "https://facebook.com/officewinsupport",
  siteStatus: "Online", // Online / Offline
  visitorCount: 45,
  categories: [
    "Microsoft Office",
    "Windows",
    "Adobe",
    "Drivers",
    "Utilities",
    "Antivirus",
    "Browsers",
    "Multimedia",
    "Other Software"
  ],
  officeComparison: {
    versions: ["Office 2019", "Office 2021", "Office 2024", "Microsoft 365"],
    features: [
      { name: "Licensing Model", values: ["Lifetime Crack", "Lifetime Crack", "Lifetime Crack", "Subscription (Annual/Monthly)"] },
      { name: "Cloud Storage (OneDrive)", values: ["No", "No", "No", "Yes (1 TB per User)"] },
      { name: "Co-authoring (Real-time)", values: ["Basic", "Yes", "Advanced", "Advanced"] },
      { name: "Copilot AI Integration", values: ["No", "No", "Yes (Paid add-on)", "Yes (Subscription)"] },
      { name: "Outlook New Design", values: ["No", "Basic", "Yes", "Yes"] },
      { name: "Excel Advanced Data Types", values: ["No", "Yes", "Yes", "Yes"] },
      { name: "Support Period", values: ["Ended", "Ends 2026", "Active Support", "Ongoing Updates"] }
    ]
  }
};

// LocalStorage helpers
export const getDB = () => {
  const services = localStorage.getItem("service_hub_services");
  const faqs = localStorage.getItem("service_hub_faqs");
  const banners = localStorage.getItem("service_hub_banners");
  const settings = localStorage.getItem("service_hub_settings");
  const visitors = localStorage.getItem("service_hub_visitors");

  // Visitor counter session tick
  let currentVisitors = visitors ? parseInt(visitors, 10) : DEFAULT_SETTINGS.visitorCount;
  
  // If visitor count is from the old seed range (e.g. 1000+), reset it to 45
  if (currentVisitors > 1000) {
    currentVisitors = 45;
    localStorage.setItem("service_hub_visitors", "45");
  }

  if (!sessionStorage.getItem("service_hub_visitor_ticked")) {
    currentVisitors += 1;
    localStorage.setItem("service_hub_visitors", currentVisitors.toString());
    sessionStorage.setItem("service_hub_visitor_ticked", "true");
  }

  let parsedSettings = settings ? JSON.parse(settings) : { ...DEFAULT_SETTINGS, visitorCount: currentVisitors };
  if (parsedSettings.telegramUsername === "@OfficeWinSupport") {
    parsedSettings.telegramUsername = "@ShennCelest";
    parsedSettings.telegramLink = "https://t.me/ShennCelest";
    localStorage.setItem("service_hub_settings", JSON.stringify(parsedSettings));
  }

  let parsedServices = services ? JSON.parse(services) : DEFAULT_SERVICES;
  let servicesUpdated = false;
  
  // Clean / Sync database structure to load new Adobe XD and crack items instantly
  if (!parsedServices.some(s => s.id === "adobe-xd")) {
    parsedServices = DEFAULT_SERVICES;
    servicesUpdated = true;
  }

  parsedServices = parsedServices.map(s => {
    // 1. Hide Malwarebytes and IDM
    if ((s.id === "idm-downloader" || s.id === "malwarebytes-premium") && !s.isHidden) {
      servicesUpdated = true;
      s.isHidden = true;
    }
    // 2. Update Office images to correct BASE_URL path
    if ((s.id === "ms-office-2024" || s.id === "ms-office-2021") && !s.image.includes("microsoft-office.jpg")) {
      servicesUpdated = true;
      s.image = `${BASE}microsoft-office.jpg`;
    }
    if ((s.id === "ms-office-2024" || s.id === "ms-office-2021") && s.image === "/microsoft-office.jpg") {
      servicesUpdated = true;
      s.image = `${BASE}microsoft-office.jpg`;
    }
    // 3. Update Adobe images to correct BASE_URL path
    if (s.category === "Adobe" && (s.image !== `${BASE}adobe.jpg`)) {
      servicesUpdated = true;
      s.image = `${BASE}adobe.jpg`;
    }
    // 4. Update Windows images to correct BASE_URL path
    if (s.category === "Windows" && (s.image !== `${BASE}windows-license.jpg`)) {
      servicesUpdated = true;
      s.image = `${BASE}windows-license.jpg`;
    }
    // 5. Sync installationTime to "2-4 mins" for all services
    if (s.installationTime !== "2-4 mins") {
      servicesUpdated = true;
      s.installationTime = "2-4 mins";
    }
    // 6. Sync names with DEFAULT_SERVICES to shorten them
    const defaultItem = DEFAULT_SERVICES.find(def => def.id === s.id);
    if (defaultItem && s.name !== defaultItem.name) {
      servicesUpdated = true;
      s.name = defaultItem.name;
    }
    return s;
  });
  if (servicesUpdated) {
    localStorage.setItem("service_hub_services", JSON.stringify(parsedServices));
  }

  return {
    services: parsedServices,
    faqs: faqs ? JSON.parse(faqs) : DEFAULT_FAQS,
    banners: banners ? JSON.parse(banners) : DEFAULT_BANNERS,
    settings: parsedSettings
  };
};

export const saveDB = (data) => {
  if (data.services) localStorage.setItem("service_hub_services", JSON.stringify(data.services));
  if (data.faqs) localStorage.setItem("service_hub_faqs", JSON.stringify(data.faqs));
  if (data.banners) localStorage.setItem("service_hub_banners", JSON.stringify(data.banners));
  if (data.settings) {
    localStorage.setItem("service_hub_settings", JSON.stringify(data.settings));
    localStorage.setItem("service_hub_visitors", data.settings.visitorCount.toString());
  }
};

export const resetDB = () => {
  localStorage.removeItem("service_hub_services");
  localStorage.removeItem("service_hub_faqs");
  localStorage.removeItem("service_hub_banners");
  localStorage.removeItem("service_hub_settings");
  localStorage.removeItem("service_hub_visitors");
  return getDB();
};

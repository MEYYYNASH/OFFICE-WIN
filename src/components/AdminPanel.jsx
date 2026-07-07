import { useState } from 'react';
import { Plus, Edit2, Trash2, Check, EyeOff, Eye, Settings, HelpCircle, Megaphone, FileText, BarChart2 } from 'lucide-react';

export default function AdminPanel({ db, onSaveDB, lang }) {
  const [activeAdminTab, setActiveAdminTab] = useState('services'); // services, banners, faq, settings

  // Form states
  const [editingService, setEditingService] = useState(null);
  const [editingFAQ, setEditingFAQ] = useState(null);
  const [editingBanner, setEditingBanner] = useState(null);

  // Form inputs for Service
  const [serviceForm, setServiceForm] = useState({
    name: '', category: 'Microsoft Office', version: '', shortDescription: '', description: '',
    price: 0, image: '', isAvailable: true, isNew: false, isPopular: false, isFeatured: false,
    requirements: '', features: '', installationTime: '', supportedWindows: '', whatsIncluded: '',
    officialToolLink: ''
  });

  // Form inputs for FAQ
  const [faqForm, setFaqForm] = useState({
    question: '', questionKh: '', answer: '', answerKh: ''
  });

  // Form inputs for Banner
  const [bannerForm, setBannerForm] = useState({
    text: '', isActive: true, color: '#0066cc'
  });

  // Site settings inputs
  const [settingsForm, setSettingsForm] = useState({ ...db.settings });

  // No login required - Admin gate removed

  // SERVICE ACTIONS
  const resetServiceForm = () => {
    setEditingService(null);
    setServiceForm({
      name: '', category: 'Microsoft Office', version: '', shortDescription: '', description: '',
      price: 0, image: '', isAvailable: true, isNew: false, isPopular: false, isFeatured: false,
      requirements: '', features: '', installationTime: '', supportedWindows: '', whatsIncluded: '',
      officialToolLink: ''
    });
  };

  const startEditService = (service) => {
    setEditingService(service.id);
    setServiceForm({
      ...service,
      requirements: (service.requirements || []).join('\n'),
      features: (service.features || []).join('\n'),
      whatsIncluded: (service.whatsIncluded || []).join('\n')
    });
    window.scrollTo({ top: document.getElementById('service-editor-anchor')?.offsetTop - 80, behavior: 'smooth' });
  };

  const handleSaveService = (e) => {
    e.preventDefault();
    
    // Process input arrays
    const cleanRequirements = serviceForm.requirements.split('\n').filter(l => l.trim() !== '');
    const cleanFeatures = serviceForm.features.split('\n').filter(l => l.trim() !== '');
    const cleanWhatsIncluded = serviceForm.whatsIncluded.split('\n').filter(l => l.trim() !== '');

    let updatedServices = [...db.services];
    const newServiceObj = {
      ...serviceForm,
      price: parseFloat(serviceForm.price) || 0,
      requirements: cleanRequirements,
      features: cleanFeatures,
      whatsIncluded: cleanWhatsIncluded,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    if (editingService) {
      // Edit
      updatedServices = updatedServices.map(s => s.id === editingService ? { ...newServiceObj, id: editingService } : s);
    } else {
      // Add
      const newId = serviceForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      // Ensure unique ID
      const finalId = db.services.some(s => s.id === newId) ? `${newId}-${Date.now().toString().slice(-4)}` : newId;
      updatedServices.push({ ...newServiceObj, id: finalId });
    }

    onSaveDB({ ...db, services: updatedServices });
    resetServiceForm();
    alert('Service saved successfully!');
  };

  const handleDeleteService = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      const updatedServices = db.services.filter(s => s.id !== id);
      onSaveDB({ ...db, services: updatedServices });
    }
  };

  const toggleHideService = (id, currentHiddenState) => {
    const updatedServices = db.services.map(s => s.id === id ? { ...s, isHidden: !currentHiddenState } : s);
    onSaveDB({ ...db, services: updatedServices });
  };

  // BANNER ACTIONS
  const handleSaveBanner = (e) => {
    e.preventDefault();
    let updatedBanners = [...db.banners];
    
    if (editingBanner) {
      updatedBanners = updatedBanners.map(b => b.id === editingBanner ? { ...bannerForm, id: editingBanner } : b);
    } else {
      updatedBanners.push({ ...bannerForm, id: `b-${Date.now()}` });
    }

    onSaveDB({ ...db, banners: updatedBanners });
    setEditingBanner(null);
    setBannerForm({ text: '', isActive: true, color: '#0066cc' });
    alert('Announcement saved!');
  };

  const startEditBanner = (banner) => {
    setEditingBanner(banner.id);
    setBannerForm({ text: banner.text, isActive: banner.isActive, color: banner.color || '#0066cc' });
  };

  const handleDeleteBanner = (id) => {
    if (window.confirm('Delete this announcement?')) {
      const updatedBanners = db.banners.filter(b => b.id !== id);
      onSaveDB({ ...db, banners: updatedBanners });
    }
  };

  // FAQ ACTIONS
  const handleSaveFAQ = (e) => {
    e.preventDefault();
    let updatedFAQs = [...db.faqs];

    if (editingFAQ) {
      updatedFAQs = updatedFAQs.map(f => f.id === editingFAQ ? { ...faqForm, id: editingFAQ } : f);
    } else {
      updatedFAQs.push({ ...faqForm, id: `faq-${Date.now()}` });
    }

    onSaveDB({ ...db, faqs: updatedFAQs });
    setEditingFAQ(null);
    setFaqForm({ question: '', questionKh: '', answer: '', answerKh: '' });
    alert('FAQ saved!');
  };

  const startEditFAQ = (faq) => {
    setEditingFAQ(faq.id);
    setFaqForm({
      question: faq.question,
      questionKh: faq.questionKh || '',
      answer: faq.answer,
      answerKh: faq.answerKh || ''
    });
  };

  const handleDeleteFAQ = (id) => {
    if (window.confirm('Delete this FAQ?')) {
      const updatedFAQs = db.faqs.filter(f => f.id !== id);
      onSaveDB({ ...db, faqs: updatedFAQs });
    }
  };

  // SITE SETTINGS ACTIONS
  const handleSaveSettings = (e) => {
    e.preventDefault();
    onSaveDB({ ...db, settings: settingsForm });
    alert('Website configurations updated!');
  };

  const handleCategoryAdd = () => {
    const newCat = window.prompt('Enter new category name:');
    if (newCat && newCat.trim()) {
      if (settingsForm.categories.includes(newCat.trim())) {
        alert('Category already exists!');
        return;
      }
      setSettingsForm({
        ...settingsForm,
        categories: [...settingsForm.categories, newCat.trim()]
      });
    }
  };

  const handleCategoryDelete = (catToDelete) => {
    if (window.confirm(`Delete category "${catToDelete}"? Services under this category will remain, but you should re-assign them.`)) {
      setSettingsForm({
        ...settingsForm,
        categories: settingsForm.categories.filter(c => c !== catToDelete)
      });
    }
  };

  // Admin gate removed - instantly authenticated

  // authenticated admin panel data
  const totalServices = db.services.length;
  const hiddenServices = db.services.filter(s => s.isHidden).length;
  const activeBannersCount = db.banners.filter(b => b.isActive).length;
  const totalFAQsCount = db.faqs.length;

  return (
    <section style={{ padding: '40px 0' }} className="fade-in">
      <div className="container">
        
        {/* Admin Header Panel */}
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px 32px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '32px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={28} className="text-emerald-500" style={{ color: 'var(--success-color)' }} />
              Management Center
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Manage website items, service offerings, banners, FAQ guides, and settings.
            </p>
          </div>
          {/* No Log Out button - Gate removed */}
        </div>

        {/* Dashboard Quick Stats */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '20px',
            marginBottom: '32px'
          }}
        >
          {[
            { label: 'Total Services', value: totalServices, icon: <FileText size={20} /> },
            { label: 'Hidden Services', value: hiddenServices, icon: <EyeOff size={20} /> },
            { label: 'Banners Active', value: activeBannersCount, icon: <Megaphone size={20} /> },
            { label: 'FAQs Count', value: totalFAQsCount, icon: <HelpCircle size={20} /> },
            { label: 'Total Views', value: db.settings.visitorCount, icon: <BarChart2 size={20} /> }
          ].map((stat, idx) => (
            <div key={idx} className="admin-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>{stat.label}</span>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '4px' }}>{stat.value}</h3>
              </div>
              <div style={{ color: 'var(--accent-color)' }}>{stat.icon}</div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs for Configuration areas */}
        <div 
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-color)',
            gap: '4px',
            marginBottom: '32px',
            overflowX: 'auto'
          }}
        >
          {[
            { id: 'services', label: 'Services Manager', icon: <FileText size={16} /> },
            { id: 'banners', label: 'Announcements Manager', icon: <Megaphone size={16} /> },
            { id: 'faq', label: 'FAQ Guides', icon: <HelpCircle size={16} /> },
            { id: 'settings', label: 'Website Settings', icon: <Settings size={16} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveAdminTab(tab.id);
                resetServiceForm();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                borderBottom: activeAdminTab === tab.id ? '3px solid var(--accent-color)' : '3px solid transparent',
                color: activeAdminTab === tab.id ? 'var(--accent-color)' : 'var(--text-secondary)',
                backgroundColor: activeAdminTab === tab.id ? 'var(--bg-secondary)' : 'transparent',
                borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* ======================= TAB: SERVICES ======================= */}
        {activeAdminTab === 'services' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }} className="admin-split-grid">
            
            {/* Left: Editor Form */}
            <div className="admin-card" id="service-editor-anchor">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Plus size={18} />
                {editingService ? 'Edit Software Service' : 'Add New Software Service'}
              </h3>
              
              <form onSubmit={handleSaveService} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-grid">
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Service Name *</label>
                    <input
                      type="text" required value={serviceForm.name}
                      onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                      placeholder="Microsoft Office 2024"
                      style={{ width: '100%', padding: '8px 12px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Category *</label>
                    <select
                      value={serviceForm.category}
                      onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-primary)' }}
                    >
                      {db.settings.categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-grid">
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Version Info *</label>
                    <input
                      type="text" required value={serviceForm.version}
                      onChange={(e) => setServiceForm({ ...serviceForm, version: e.target.value })}
                      placeholder="e.g. 2024 Pro v2408"
                      style={{ width: '100%', padding: '8px 12px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Price ($) *</label>
                    <input
                      type="number" required value={serviceForm.price}
                      onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                      placeholder="25"
                      style={{ width: '100%', padding: '8px 12px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Image URL *</label>
                  <input
                    type="text" required value={serviceForm.image}
                    onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    style={{ width: '100%', padding: '8px 12px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Short Description *</label>
                  <input
                    type="text" required value={serviceForm.shortDescription}
                    onChange={(e) => setServiceForm({ ...serviceForm, shortDescription: e.target.value })}
                    placeholder="Brief description displayed on product cards."
                    style={{ width: '100%', padding: '8px 12px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Detailed Description</label>
                  <textarea
                    rows="3" value={serviceForm.description}
                    onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                    placeholder="Long paragraphs detailing features and specifications."
                    style={{ width: '100%', padding: '8px 12px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px', resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-grid">
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Installation Time</label>
                    <input
                      type="text" value={serviceForm.installationTime}
                      onChange={(e) => setServiceForm({ ...serviceForm, installationTime: e.target.value })}
                      placeholder="e.g. 15 - 20 mins"
                      style={{ width: '100%', padding: '8px 12px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Supported Windows</label>
                    <input
                      type="text" value={serviceForm.supportedWindows}
                      onChange={(e) => setServiceForm({ ...serviceForm, supportedWindows: e.target.value })}
                      placeholder="e.g. Windows 10, Windows 11"
                      style={{ width: '100%', padding: '8px 12px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Official Microsoft Tool Link</label>
                  <input
                    type="text" value={serviceForm.officialToolLink}
                    onChange={(e) => setServiceForm({ ...serviceForm, officialToolLink: e.target.value })}
                    placeholder="https://www.microsoft.com/en-us/software-download/..."
                    style={{ width: '100%', padding: '8px 12px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }} className="form-grid-three">
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Features (one per line)</label>
                    <textarea rows="3" value={serviceForm.features} onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })} placeholder="Feature details..." style={{ width: '100%', padding: '8px 12px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Requirements (one per line)</label>
                    <textarea rows="3" value={serviceForm.requirements} onChange={(e) => setServiceForm({ ...serviceForm, requirements: e.target.value })} placeholder="Memory: 4GB RAM..." style={{ width: '100%', padding: '8px 12px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>What's Included (one per line)</label>
                    <textarea rows="3" value={serviceForm.whatsIncluded} onChange={(e) => setServiceForm({ ...serviceForm, whatsIncluded: e.target.value })} placeholder="Lifetime license..." style={{ width: '100%', padding: '8px 12px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
                  </div>
                </div>

                {/* Switch Badges toggles */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>
                    <input type="checkbox" checked={serviceForm.isAvailable} onChange={(e) => setServiceForm({ ...serviceForm, isAvailable: e.target.checked })} />
                    Available / Installable
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>
                    <input type="checkbox" checked={serviceForm.isNew} onChange={(e) => setServiceForm({ ...serviceForm, isNew: e.target.checked })} />
                    Show "New" Badge
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>
                    <input type="checkbox" checked={serviceForm.isPopular} onChange={(e) => setServiceForm({ ...serviceForm, isPopular: e.target.checked })} />
                    Show "Popular" Badge
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>
                    <input type="checkbox" checked={serviceForm.isFeatured} onChange={(e) => setServiceForm({ ...serviceForm, isFeatured: e.target.checked })} />
                    Feature on Homepage
                  </label>
                </div>

                {/* Form Buttons */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                  <button type="submit" className="btn btn-primary" style={{ flexGrow: 1 }}>
                    <Check size={16} />
                    {editingService ? 'Update Service' : 'Create Service'}
                  </button>
                  <button type="button" onClick={resetServiceForm} className="btn btn-secondary">
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            {/* Right: Service List Table */}
            <div className="admin-card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Active Services Directory</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                      <th style={{ padding: '12px' }}>Software</th>
                      <th style={{ padding: '12px' }}>Category</th>
                      <th style={{ padding: '12px' }}>Price</th>
                      <th style={{ padding: '12px' }}>Status</th>
                      <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {db.services.map((item) => (
                      <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)', opacity: item.isHidden ? 0.5 : 1 }}>
                        <td style={{ padding: '12px', fontWeight: 600 }}>{item.name}</td>
                        <td style={{ padding: '12px' }}>{item.category}</td>
                        <td style={{ padding: '12px', fontWeight: 700 }}>${item.price}</td>
                        <td style={{ padding: '12px' }}>
                          <span className={`badge ${item.isAvailable ? 'badge-available' : 'badge-unavailable'}`} style={{ fontSize: '0.6rem' }}>
                            {item.isAvailable ? 'Available' : 'Unavailable'}
                          </span>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                            {/* Toggle Hidden */}
                            <button
                              onClick={() => toggleHideService(item.id, item.isHidden)}
                              style={{ padding: '4px', cursor: 'pointer', color: 'var(--text-secondary)' }}
                              title={item.isHidden ? 'Unhide' : 'Hide from users'}
                            >
                              {item.isHidden ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                            {/* Edit */}
                            <button
                              onClick={() => startEditService(item)}
                              style={{ padding: '4px', cursor: 'pointer', color: 'var(--accent-color)' }}
                              title="Edit"
                            >
                              <Edit2 size={16} />
                            </button>
                            {/* Delete */}
                            <button
                              onClick={() => handleDeleteService(item.id)}
                              style={{ padding: '4px', cursor: 'pointer', color: 'var(--danger-color)' }}
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

          </div>
        )}

        {/* ======================= TAB: ANNOUNCEMENTS ======================= */}
        {activeAdminTab === 'banners' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }} className="admin-split-grid">
            {/* Editor form */}
            <div className="admin-card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>
                {editingBanner ? 'Edit Announcement' : 'Add Announcement'}
              </h3>
              <form onSubmit={handleSaveBanner} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Banner Announcement Text</label>
                  <input
                    type="text" required value={bannerForm.text}
                    onChange={(e) => setBannerForm({ ...bannerForm, text: e.target.value })}
                    placeholder="e.g. Remote support active today! Office 2024 is ready."
                    style={{ width: '100%', padding: '10px 14px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Background Color</label>
                    <input
                      type="color" value={bannerForm.color}
                      onChange={(e) => setBannerForm({ ...bannerForm, color: e.target.value })}
                      style={{ width: '100%', height: '40px', padding: '2px', cursor: 'pointer', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                    />
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem', marginTop: '20px' }}>
                      <input 
                        type="checkbox" checked={bannerForm.isActive} 
                        onChange={(e) => setBannerForm({ ...bannerForm, isActive: e.target.checked })} 
                      />
                      Active (Display in Rotation)
                    </label>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                  <button type="submit" className="btn btn-primary" style={{ flexGrow: 1 }}>Save Banner</button>
                  {editingBanner && (
                    <button type="button" onClick={() => { setEditingBanner(null); setBannerForm({ text: '', isActive: true, color: '#0066cc' }); }} className="btn btn-secondary">Cancel</button>
                  )}
                </div>
              </form>
            </div>

            {/* List */}
            <div className="admin-card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Scrolling Banners List</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {db.banners.map((b) => (
                  <div 
                    key={b.id} 
                    style={{ 
                      padding: '16px', 
                      backgroundColor: 'var(--bg-tertiary)', 
                      border: '1px solid var(--border-color)', 
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ width: '16px', height: '16px', borderRadius: '4px', backgroundColor: b.color || 'var(--accent-color)', display: 'inline-block' }} />
                      <span style={{ fontWeight: 600, fontSize: '0.9rem', opacity: b.isActive ? 1 : 0.5 }}>{b.text}</span>
                      {!b.isActive && <span className="badge badge-unavailable" style={{ fontSize: '0.6rem' }}>Inactive</span>}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => startEditBanner(b)} style={{ cursor: 'pointer', color: 'var(--accent-color)' }}><Edit2 size={16} /></button>
                      <button onClick={() => handleDeleteBanner(b.id)} style={{ cursor: 'pointer', color: 'var(--danger-color)' }}><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB: FAQ ======================= */}
        {activeAdminTab === 'faq' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }} className="admin-split-grid">
            {/* Editor form */}
            <div className="admin-card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>
                {editingFAQ ? 'Edit FAQ Item' : 'Add FAQ Item'}
              </h3>
              <form onSubmit={handleSaveFAQ} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Question (English) *</label>
                  <input
                    type="text" required value={faqForm.question}
                    onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                    placeholder="How long does remote setup take?"
                    style={{ width: '100%', padding: '10px 14px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Question (Khmer)</label>
                  <input
                    type="text" value={faqForm.questionKh}
                    onChange={(e) => setFaqForm({ ...faqForm, questionKh: e.target.value })}
                    placeholder="តើការតំឡើងពីចម្ងាយប្រើពេលប៉ុន្មាន?"
                    style={{ width: '100%', padding: '10px 14px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Answer (English) *</label>
                  <textarea
                    rows="3" required value={faqForm.answer}
                    onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                    placeholder="It takes 15-30 minutes..."
                    style={{ width: '100%', padding: '10px 14px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Answer (Khmer)</label>
                  <textarea
                    rows="3" value={faqForm.answerKh}
                    onChange={(e) => setFaqForm({ ...faqForm, answerKh: e.target.value })}
                    placeholder="វាជាទូទៅប្រើពេលពី ១៥ ទៅ ៣០ នាទី..."
                    style={{ width: '100%', padding: '10px 14px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="submit" className="btn btn-primary" style={{ flexGrow: 1 }}>Save FAQ</button>
                  {editingFAQ && (
                    <button type="button" onClick={() => { setEditingFAQ(null); setFaqForm({ question: '', questionKh: '', answer: '', answerKh: '' }); }} className="btn btn-secondary">Cancel</button>
                  )}
                </div>
              </form>
            </div>

            {/* List */}
            <div className="admin-card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Active FAQs Directory</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {db.faqs.map((faq) => (
                  <div 
                    key={faq.id} 
                    style={{ 
                      padding: '16px', 
                      backgroundColor: 'var(--bg-tertiary)', 
                      border: '1px solid var(--border-color)', 
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Q: {faq.question}</h4>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => startEditFAQ(faq)} style={{ cursor: 'pointer', color: 'var(--accent-color)' }}><Edit2 size={16} /></button>
                        <button onClick={() => handleDeleteFAQ(faq.id)} style={{ cursor: 'pointer', color: 'var(--danger-color)' }}><Trash2 size={16} /></button>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>A: {faq.answer}</p>
                    {faq.questionKh && (
                      <div style={{ marginTop: '8px', borderTop: '1px dashed var(--border-color)', paddingTop: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <p>Q (Khmer): {faq.questionKh}</p>
                        <p>A (Khmer): {faq.answerKh}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB: SETTINGS ======================= */}
        {activeAdminTab === 'settings' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }} className="admin-split-grid">
            
            {/* General Site settings */}
            <div className="admin-card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Contact & Service Configurations</h3>
              <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-grid">
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Telegram Username</label>
                    <input
                      type="text" required value={settingsForm.telegramUsername}
                      onChange={(e) => setSettingsForm({ ...settingsForm, telegramUsername: e.target.value })}
                      placeholder="@OfficeWinSupport"
                      style={{ width: '100%', padding: '10px 14px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Telegram Chat link</label>
                    <input
                      type="text" required value={settingsForm.telegramLink}
                      onChange={(e) => setSettingsForm({ ...settingsForm, telegramLink: e.target.value })}
                      placeholder="https://t.me/OfficeWinSupport"
                      style={{ width: '100%', padding: '10px 14px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-grid">
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Facebook Link</label>
                    <input
                      type="text" required value={settingsForm.facebookLink}
                      onChange={(e) => setSettingsForm({ ...settingsForm, facebookLink: e.target.value })}
                      placeholder="https://facebook.com/..."
                      style={{ width: '100%', padding: '10px 14px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Support Phone</label>
                    <input
                      type="text" required value={settingsForm.supportPhone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, supportPhone: e.target.value })}
                      placeholder="+855 12 345 678"
                      style={{ width: '100%', padding: '10px 14px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-grid">
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Support Email</label>
                    <input
                      type="email" required value={settingsForm.supportEmail}
                      onChange={(e) => setSettingsForm({ ...settingsForm, supportEmail: e.target.value })}
                      placeholder="support@officewin.com"
                      style={{ width: '100%', padding: '10px 14px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Business Hours</label>
                    <input
                      type="text" required value={settingsForm.businessHours}
                      onChange={(e) => setSettingsForm({ ...settingsForm, businessHours: e.target.value })}
                      placeholder="8:00 AM - 9:00 PM"
                      style={{ width: '100%', padding: '10px 14px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-grid">
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Live Support Status</label>
                    <select
                      value={settingsForm.siteStatus}
                      onChange={(e) => setSettingsForm({ ...settingsForm, siteStatus: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-primary)' }}
                    >
                      <option value="Online">Online / Open</option>
                      <option value="Offline">Offline / Closed</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Visitor Counter (Reset/Edit)</label>
                    <input
                      type="number" required value={settingsForm.visitorCount}
                      onChange={(e) => setSettingsForm({ ...settingsForm, visitorCount: parseInt(e.target.value, 10) || 0 })}
                      style={{ width: '100%', padding: '10px 14px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>Update Site Config</button>
              </form>
            </div>

            {/* Categories manager */}
            <div className="admin-card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Categories Directory</span>
                <button onClick={handleCategoryAdd} className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>
                  <Plus size={14} /> Add Category
                </button>
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {settingsForm.categories.map((cat) => (
                  <div 
                    key={cat} 
                    style={{ 
                      padding: '12px 16px', 
                      backgroundColor: 'var(--bg-tertiary)', 
                      border: '1px solid var(--border-color)', 
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>{cat}</span>
                    <button 
                      onClick={() => handleCategoryDelete(cat)} 
                      style={{ cursor: 'pointer', color: 'var(--danger-color)' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
      
      {/* Responsive layout styles specifically for forms */}
      <style>{`
        @media (min-width: 1025px) {
          .admin-split-grid {
            grid-template-columns: 1.1fr 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .form-grid {
            grid-template-columns: 1fr !important;
          }
          .form-grid-three {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

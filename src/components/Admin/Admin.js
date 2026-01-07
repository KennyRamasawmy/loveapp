import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../hooks/useAppData';
import { Card, Button } from '../UI';
import AdminMeta from './AdminMeta';
import AdminGallery from './AdminGallery';
import AdminQuotes from './AdminQuotes';
import AdminCalendar from './AdminCalendar';
import AdminTimeline from './AdminTimeline';
import AdminSettings from './AdminSettings';
import AdminCategories from './AdminCategories';
import './Admin.css';

const Admin = () => {
  const { isAdmin } = useAuth();
  const { data, loading, saveData } = useAppData();
  const [activeTab, setActiveTab] = useState('meta');
  const [localData, setLocalData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (data) {
      // Ensure calendarCategories exists
      const dataWithCategories = {
        ...data,
        calendarCategories: data.calendarCategories || [
          { id: "anniversary", name: "Anniversary", emoji: "🎉" },
          { id: "memory", name: "Memory", emoji: "💭" },
          { id: "surprise", name: "Surprise", emoji: "🎁" },
          { id: "date", name: "Date Night", emoji: "🌹" }
        ]
      };
      setLocalData(JSON.parse(JSON.stringify(dataWithCategories)));
    }
    setTimeout(() => setVisible(true), 100);
  }, [data]);

  if (!isAdmin) {
    return (
      <div className="admin-denied">
        <span className="denied-icon">🔒</span>
        <h2>Access Denied</h2>
        <p>You don't have permission to access this page.</p>
      </div>
    );
  }

  if (loading || !localData) {
    return (
      <div className="admin-loading">
        <span className="loading-heart">⚙️</span>
        <p>Loading admin panel...</p>
      </div>
    );
  }

  const updateLocalData = (section, newValue) => {
    setLocalData(prev => ({
      ...prev,
      [section]: newValue
    }));
    setSaveStatus(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus(null);

    const success = await saveData(localData);

    if (success) {
      setSaveStatus('success');
    } else {
      setSaveStatus('error');
    }

    setSaving(false);
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const tabs = [
    { id: 'meta', label: 'Info', icon: '💕' },
    { id: 'gallery', label: 'Gallery', icon: '📷' },
    { id: 'quotes', label: 'Quotes', icon: '💌' },
    { id: 'categories', label: 'Categories', icon: '🏷️' },
    { id: 'calendar', label: 'Calendar', icon: '📅' },
    { id: 'timeline', label: 'Timeline', icon: '💫' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'meta':
        return <AdminMeta data={localData.meta} onChange={(v) => updateLocalData('meta', v)} />;
      case 'gallery':
        return <AdminGallery data={localData.gallery} onChange={(v) => updateLocalData('gallery', v)} />;
      case 'quotes':
        return <AdminQuotes data={localData.dailyQuotes} onChange={(v) => updateLocalData('dailyQuotes', v)} />;
      case 'categories':
        return <AdminCategories data={localData.calendarCategories} onChange={(v) => updateLocalData('calendarCategories', v)} />;
      case 'calendar':
        return (
          <AdminCalendar 
            data={localData.calendarNotes} 
            categories={localData.calendarCategories}
            onChange={(v) => updateLocalData('calendarNotes', v)} 
          />
        );
      case 'timeline':
        return <AdminTimeline data={localData.timeline} onChange={(v) => updateLocalData('timeline', v)} />;
      case 'settings':
        return <AdminSettings data={localData.settings} onChange={(v) => updateLocalData('settings', v)} />;
      default:
        return null;
    }
  };

  return (
    <div className="admin">
      <header className={`admin-header ${visible ? 'visible' : ''}`}>
        <span className="header-icon">⚙️</span>
        <h1 className="header-title">Admin Panel</h1>
        <p className="header-subtitle">Manage your love app content</p>
      </header>

      <div className={`admin-container ${visible ? 'visible' : ''}`}>
        <Card className="admin-tabs-card">
          <div className="admin-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card className="admin-content-card">
          {renderTabContent()}
        </Card>

        <div className="admin-actions">
          <div className="save-status">
            {saveStatus === 'success' && (
              <span className="status-success">✓ Saved successfully!</span>
            )}
            {saveStatus === 'error' && (
              <span className="status-error">✗ Error saving. Try again.</span>
            )}
          </div>
          <Button onClick={handleSave} disabled={saving} size="lg">
            {saving ? 'Saving...' : 'Save All Changes 💾'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
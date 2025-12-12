import { useState } from 'react';

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="page">
      <h2>Settings</h2>
      <p>Another page that could be code-split.</p>

      <div className="card">
        <h3>Preferences</h3>

        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={() => toggleSetting('notifications')}
            />
            Enable Notifications
          </label>
        </div>

        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={() => toggleSetting('darkMode')}
            />
            Dark Mode
          </label>
        </div>

        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={settings.autoSave}
              onChange={() => toggleSetting('autoSave')}
            />
            Auto-save
          </label>
        </div>
      </div>

      <div className="info">
        <p>💡 <strong>Tip:</strong> Settings page is rarely visited - perfect for lazy loading!</p>
      </div>
    </div>
  );
}


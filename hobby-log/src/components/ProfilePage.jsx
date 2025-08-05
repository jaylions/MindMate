import React, { useState } from 'react';
import '../styles/ProfilePage.css';

// Reusable Components
const SectionCard = ({ title, children }) => (
  <div className="glass-card">
    <h2 className="section-title">{title}</h2>
    {children}
  </div>
);

const InfoField = ({ label, value, onEdit, isEditing, onSave, onCancel, onChange }) => (
  <div className="info-field">
    <label>{label}</label>
    <div className="field-container">
      {isEditing ? (
        <div className="edit-container">
          <input 
            id={`edit-${label.toLowerCase().replace(/\s+/g, '-')}`}
            name={`edit-${label.toLowerCase().replace(/\s+/g, '-')}`}
            type="text" 
            value={value} 
            onChange={onChange} 
            className="edit-input"
            aria-label={`Edit ${label}`}
          />
          <button className="save-btn" onClick={onSave}>✓</button>
          <button className="cancel-btn" onClick={onCancel}>✕</button>
        </div>
      ) : (
        <div className="field-display">
          <span className="field-value">{value}</span>
          {onEdit && <button className="edit-btn" onClick={onEdit}>✏️</button>}
        </div>
      )}
    </div>
  </div>
);

const PreferenceItem = ({ label, description, children }) => (
  <div className="preference-item">
    <div className="preference-info">
      <div className="preference-label">{label}</div>
      <div className="preference-desc">{description}</div>
    </div>
    {children}
  </div>
);

// Main Sections
const ProfileHeader = ({ nickname, openImageModal, avatarImage }) => (
  <div className="profile-header-card">
    <div className="avatar-container">
      <div 
        className="avatar large" 
        style={avatarImage ? { backgroundImage: `url(${avatarImage})` } : {}}
      >
        {!avatarImage && (nickname?.[0]?.toUpperCase() || 'A')}
      </div>
      <button className="change-photo-btn" onClick={openImageModal}>📷</button>
    </div>
    <h1 className="profile-name">{nickname}</h1>
    <p className="profile-email">user@example.com</p>
  </div>
);

const PersonalInfoSection = ({ userSettings, setUserSettings }) => {
  const [editingField, setEditingField] = useState(null);
  const [editingValue, setEditingValue] = useState('');

  const handleEdit = (field, value) => {
    setEditingField(field);
    setEditingValue(value);
  };

  const handleSave = (field) => {
    setUserSettings({ ...userSettings, [field]: editingValue });
    setEditingField(null);
  };

  return (
    <SectionCard title="Personal Information">
      <div className="info-fields">
        <InfoField 
          label="Display Name" 
          value={editingField === 'nickname' ? editingValue : userSettings.nickname}
          isEditing={editingField === 'nickname'}
          onChange={(e) => setEditingValue(e.target.value)}
          onEdit={() => handleEdit('nickname', userSettings.nickname)}
          onSave={() => handleSave('nickname')}
          onCancel={() => setEditingField(null)}
        />
        <InfoField 
          label="Email" 
          value={editingField === 'email' ? editingValue : userSettings.email}
          isEditing={editingField === 'email'}
          onChange={(e) => setEditingValue(e.target.value)}
          onEdit={() => handleEdit('email', userSettings.email)}
          onSave={() => handleSave('email')}
          onCancel={() => setEditingField(null)}
        />
        <InfoField label="Member Since" value="March 2024" />
      </div>
    </SectionCard>
  );
};

const PreferencesSection = ({ userSettings, setUserSettings }) => (
  <SectionCard title="App Preferences">
    <div className="preference-items">
      <PreferenceItem label="Push Notifications" description="Receive updates about your pet and activities">
        <label className="toggle-switch" htmlFor="notifications-toggle">
          <input 
            id="notifications-toggle"
            name="notifications"
            type="checkbox" 
            checked={userSettings.notifications}
            onChange={(e) => setUserSettings({...userSettings, notifications: e.target.checked})}
            aria-label="Push Notifications"
          />
          <span className="slider"></span>
        </label>
      </PreferenceItem>
      <PreferenceItem label="Privacy Level" description="Who can see your profile and activities">
        <select 
          id="privacy-select"
          name="privacy"
          className="preference-select"
          value={userSettings.privacy}
          onChange={(e) => setUserSettings({...userSettings, privacy: e.target.value})}
          aria-label="Privacy Level"
        >
          <option value="public">Public</option>
          <option value="friends">Friends Only</option>
          <option value="private">Private</option>
        </select>
      </PreferenceItem>
      <PreferenceItem label="Theme" description="Choose your preferred app theme">
        <select 
          id="theme-select"
          name="theme"
          className="preference-select"
          value={userSettings.theme}
          onChange={(e) => setUserSettings({...userSettings, theme: e.target.value})}
          aria-label="Theme"
        >
          <option value="auto">Auto</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </PreferenceItem>
    </div>
  </SectionCard>
);

const StatsSection = () => (
  <SectionCard title="Account Statistics">
    <div className="stats-grid">
      <div className="stat-item">
        <div className="stat-number">47</div>
        <div className="stat-label">Days Active</div>
      </div>
      <div className="stat-item">
        <div className="stat-number">23</div>
        <div className="stat-label">Pet Adventures</div>
      </div>
      <div className="stat-item">
        <div className="stat-number">156</div>
        <div className="stat-label">Times Played</div>
      </div>
      <div className="stat-item">
        <div className="stat-number">Level 8</div>
        <div className="stat-label">Pet Bond</div>
      </div>
    </div>
  </SectionCard>
);

const SDTSection = ({ sdtResults }) => {
  const [sdtExpanded, setSdtExpanded] = useState(false);

  const getSDTInfo = () => {
    const sdtTypes = {
      'autonomy': { title: 'Autonomy-Focused', description: 'You value independence and self-direction.', characteristics: ['🎯 Self-directed', '🔓 Freedom-seeking', '💡 Initiative-taking'] },
      'competence': { title: 'Competence-Focused', description: 'You are driven by mastery and skill development.', characteristics: ['🏆 Achievement-oriented', '📈 Growth-minded', '💪 Challenge-seeking'] },
      'relatedness': { title: 'Relatedness-Focused', description: 'You value connection and meaningful relationships.', characteristics: ['🤝 Connection-focused', '❤️ Empathetic', '👥 Collaborative'] }
    };
    return sdtTypes[sdtResults?.primaryType] || sdtTypes['autonomy'];
  };

  const sdtInfo = getSDTInfo();

  return (
    <div className={`glass-card sdt-section ${sdtExpanded ? 'expanded' : ''}`}>
      <div className="sdt-header" onClick={() => setSdtExpanded(!sdtExpanded)}>
        <h2 className="section-title">Your Personality Type</h2>
        <div className="expand-icon">{sdtExpanded ? '▲' : '▼'}</div>
      </div>
      <div className="sdt-content">
        <div className="sdt-type-title">{sdtInfo.title}</div>
        <div className="sdt-description">{sdtInfo.description}</div>
        <div className="sdt-characteristics">
          {sdtInfo.characteristics.map((char, index) => (
            <div key={index} className="characteristic-item">{char}</div>
          ))}
        </div>
        <button className="action-btn secondary">Retake Test</button>
      </div>
    </div>
  );
};

const AccountActionsSection = () => (
  <SectionCard title="Account Actions">
    <div className="action-buttons">
      <button className="action-btn primary">Export Data</button>
      <button className="action-btn secondary">Reset Progress</button>
      <button className="action-btn danger">Delete Account</button>
    </div>
  </SectionCard>
);

const ImageUploadModal = ({ show, onClose, onFileSelect, onConfirm, previewImage, setPreviewImage }) => {
  if (!show) return null;

  return (
    <div className="modal" onClick={(e) => e.target.className === 'modal' && onClose()}>
      <div className="modal-content">
        <h3 className="modal-title">Upload Profile Image</h3>
        <div className="upload-options">
          <button className="upload-btn" onClick={() => document.getElementById('fileInput').click()}>📁 From Gallery</button>
          <button className="upload-btn" onClick={() => document.getElementById('cameraInput').click()}>📷 Use Camera</button>
        </div>
        {previewImage && (
          <div className="preview-container">
            <img className="preview-image" src={previewImage} alt="Preview" />
            <div>
              <button className="action-btn primary" onClick={onConfirm}>✅ Apply</button>
              <button className="action-btn secondary" onClick={() => setPreviewImage(null)}>❌ Cancel</button>
            </div>
          </div>
        )}
        <button className="close-btn" onClick={onClose}>Close</button>
        <input type="file" id="fileInput" name="fileInput" className="hidden-input" accept="image/*" onChange={onFileSelect} aria-label="Upload image from file" />
        <input type="file" id="cameraInput" name="cameraInput" className="hidden-input" accept="image/*" capture="environment" onChange={onFileSelect} aria-label="Take photo with camera" />
      </div>
    </div>
  );
};

const BottomNav = ({ MapsToMain, MapsToMap, MapsToCommunity, MapsToShop }) => (
  <nav className="bottom-nav">
    <div className="nav-items">
      <div className="nav-item" onClick={MapsToMain}><div className="nav-icon">🏠</div><div className="nav-label">Home</div></div>
      <div className="nav-item" onClick={MapsToMap}><div className="nav-icon">🗺️</div><div className="nav-label">Map</div></div>
      <div className="nav-item" onClick={MapsToCommunity}><div className="nav-icon">👥</div><div className="nav-label">Community</div></div>
      <div className="nav-item" onClick={MapsToShop}><div className="nav-icon">🛍️</div><div className="nav-label">Shop</div></div>
      <div className="nav-item active"><div className="nav-icon">👤</div><div className="nav-label">Profile</div></div>
    </div>
  </nav>
);

function ProfilePage({ userData, MapsToMain, MapsToMap, MapsToCommunity, MapsToShop }) {
  const [showImageModal, setShowImageModal] = useState(false);
  const [avatarImage, setAvatarImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [userSettings, setUserSettings] = useState({
    nickname: userData?.userInfo?.nickname || 'Explorer',
    email: 'user@example.com',
    notifications: true,
    privacy: 'friends',
    theme: 'auto'
  });

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const confirmImage = () => {
    if (previewImage) {
      setAvatarImage(previewImage);
      setShowImageModal(false);
      setPreviewImage(null);
    }
  };

  return (
    <div className="profile-page">
      <div className="container">
        <ProfileHeader 
          nickname={userSettings.nickname} 
          openImageModal={() => setShowImageModal(true)} 
          avatarImage={avatarImage} 
        />
        <PersonalInfoSection userSettings={userSettings} setUserSettings={setUserSettings} />
        <PreferencesSection userSettings={userSettings} setUserSettings={setUserSettings} />
        <StatsSection />
        <SDTSection sdtResults={userData?.sdtResults} />
        <AccountActionsSection />
      </div>

      <ImageUploadModal 
        show={showImageModal}
        onClose={() => setShowImageModal(false)}
        onFileSelect={handleFileSelect}
        onConfirm={confirmImage}
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
      />

      <BottomNav 
        MapsToMain={MapsToMain}
        MapsToMap={MapsToMap}
        MapsToCommunity={MapsToCommunity}
        MapsToShop={MapsToShop}
      />
    </div>
  );
}

export default ProfilePage;

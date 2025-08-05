import React, { useState } from 'react'
import '../styles/ProfilePage.css'

function ProfilePage({ userData, MapsToMain, MapsToChallenges, MapsToMap, MapsToCommunity, MapsToShop }) {
  const [sdtExpanded, setSdtExpanded] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [avatarImage, setAvatarImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [editingField, setEditingField] = useState(null)
  const [editingValue, setEditingValue] = useState('')
  const [userSettings, setUserSettings] = useState({
    nickname: userData?.userInfo?.nickname || 'Explorer',
    email: 'user@example.com',
    notifications: true,
    privacy: 'friends',
    theme: 'auto'
  })

  const toggleSDTInfo = () => {
    setSdtExpanded(!sdtExpanded)
  }

  const openImageModal = () => {
    setShowImageModal(true)
  }

  const closeImageModal = () => {
    setShowImageModal(false)
    setPreviewImage(null)
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const confirmImage = () => {
    if (previewImage) {
      setAvatarImage(previewImage)
      closeImageModal()
    }
  }

  const getSDTInfo = () => {
    const sdtTypes = {
      'autonomy': {
        title: 'Autonomy-Focused',
        description: 'You value independence, self-direction, and making your own choices. You thrive when you have control over your decisions and environment.',
        characteristics: ['🎯 Self-directed', '🔓 Freedom-seeking', '💡 Initiative-taking', '🌟 Goal-oriented']
      },
      'competence': {
        title: 'Competence-Focused',
        description: 'You are driven by mastery, skill development, and achieving excellence. You enjoy challenges that help you grow and improve.',
        characteristics: ['🏆 Achievement-oriented', '📈 Growth-minded', '🎯 Skill-focused', '💪 Challenge-seeking']
      },
      'relatedness': {
        title: 'Relatedness-Focused',
        description: 'You value connection, belonging, and meaningful relationships. You thrive in collaborative and supportive environments.',
        characteristics: ['🤝 Connection-focused', '❤️ Empathetic', '👥 Collaborative', '🌍 Community-minded']
      }
    }
    
    return sdtTypes[userData?.sdtResults?.primaryType] || sdtTypes['autonomy']
  }

  const sdtInfo = getSDTInfo()

  return (
    <div className="profile-page">
      <div className="container">
        {/* Profile Header */}
        <div className="profile-header">
          <h1 className="page-title">Profile Settings</h1>
          <p className="page-subtitle">Manage your personal information</p>
        </div>

        {/* Profile Picture Section */}
        <div className="glass-card profile-picture-section">
          <div className="section-title">Profile Picture</div>
          <div className="avatar-container">
            <div 
              className="avatar large" 
              style={avatarImage ? {
                backgroundImage: `url(${avatarImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              } : {}}
            >
              {!avatarImage && (userData?.userInfo?.nickname?.[0]?.toUpperCase() || 'A')}
            </div>
            <button className="change-photo-btn" onClick={openImageModal}>
              📷 Change Photo
            </button>
          </div>
        </div>

        {/* Personal Information */}
        <div className="glass-card personal-info-section">
          <div className="section-title">Personal Information</div>
          <div className="info-fields">
            <div className="info-field">
              <label>Display Name</label>
              <div className="field-container">
                {editingField === 'nickname' ? (
                  <div className="edit-container">
                    <input 
                      type="text" 
                      value={editingValue} 
                      onChange={(e) => setEditingValue(e.target.value)}
                      className="edit-input"
                    />
                    <button 
                      className="save-btn" 
                      onClick={() => {
                        setUserSettings({...userSettings, nickname: editingValue})
                        setEditingField(null)
                      }}
                    >✓</button>
                    <button 
                      className="cancel-btn" 
                      onClick={() => setEditingField(null)}
                    >✕</button>
                  </div>
                ) : (
                  <div className="field-display">
                    <span className="field-value">{userSettings.nickname}</span>
                    <button 
                      className="edit-btn" 
                      onClick={() => {
                        setEditingField('nickname')
                        setEditingValue(userSettings.nickname)
                      }}
                    >✏️</button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="info-field">
              <label>Email</label>
              <div className="field-container">
                {editingField === 'email' ? (
                  <div className="edit-container">
                    <input 
                      type="email" 
                      value={editingValue} 
                      onChange={(e) => setEditingValue(e.target.value)}
                      className="edit-input"
                    />
                    <button 
                      className="save-btn" 
                      onClick={() => {
                        setUserSettings({...userSettings, email: editingValue})
                        setEditingField(null)
                      }}
                    >✓</button>
                    <button 
                      className="cancel-btn" 
                      onClick={() => setEditingField(null)}
                    >✕</button>
                  </div>
                ) : (
                  <div className="field-display">
                    <span className="field-value">{userSettings.email}</span>
                    <button 
                      className="edit-btn" 
                      onClick={() => {
                        setEditingField('email')
                        setEditingValue(userSettings.email)
                      }}
                    >✏️</button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="info-field">
              <label>Member Since</label>
              <div className="field-container">
                <span className="field-value readonly">March 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* App Preferences */}
        <div className="glass-card preferences-section">
          <div className="section-title">App Preferences</div>
          <div className="preference-items">
            <div className="preference-item">
              <div className="preference-info">
                <div className="preference-label">Push Notifications</div>
                <div className="preference-desc">Receive updates about your pet and activities</div>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={userSettings.notifications}
                  onChange={(e) => setUserSettings({...userSettings, notifications: e.target.checked})}
                />
                <span className="slider"></span>
              </label>
            </div>
            
            <div className="preference-item">
              <div className="preference-info">
                <div className="preference-label">Privacy Level</div>
                <div className="preference-desc">Who can see your profile and activities</div>
              </div>
              <select 
                className="preference-select"
                value={userSettings.privacy}
                onChange={(e) => setUserSettings({...userSettings, privacy: e.target.value})}
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            </div>
            
            <div className="preference-item">
              <div className="preference-info">
                <div className="preference-label">Theme</div>
                <div className="preference-desc">Choose your preferred app theme</div>
              </div>
              <select 
                className="preference-select"
                value={userSettings.theme}
                onChange={(e) => setUserSettings({...userSettings, theme: e.target.value})}
              >
                <option value="auto">Auto</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
        </div>

        {/* Account Statistics */}
        <div className="glass-card stats-section">
          <div className="section-title">Account Statistics</div>
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
        </div>

        {/* SDT Personality Type */}
        <div className={`glass-card sdt-section ${sdtExpanded ? 'expanded' : ''}`}>
          <div className="sdt-header" onClick={toggleSDTInfo}>
            <div className="section-title">Your Personality Type</div>
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
            <button className="retake-test-btn">Retake Personality Test</button>
          </div>
        </div>

        {/* Account Actions */}
        <div className="glass-card actions-section">
          <div className="section-title">Account Actions</div>
          <div className="action-buttons">
            <button className="action-btn primary">Export Data</button>
            <button className="action-btn secondary">Reset Progress</button>
            <button className="action-btn danger">Delete Account</button>
          </div>
        </div>
      </div>

      {/* Image Upload Modal */}
      {showImageModal && (
        <div className="modal" onClick={(e) => e.target.className === 'modal' && closeImageModal()}>
          <div className="modal-content">
            <div className="modal-title">프로필 이미지 등록</div>
            <div className="upload-options">
              <button className="upload-btn" onClick={() => document.getElementById('fileInput').click()}>
                📁 갤러리에서 선택
              </button>
              <button className="upload-btn" onClick={() => document.getElementById('cameraInput').click()}>
                📷 카메라로 촬영
              </button>
            </div>
            {previewImage && (
              <div className="preview-container">
                <img className="preview-image" src={previewImage} alt="Preview" />
                <div>
                  <button className="upload-btn" onClick={confirmImage} style={{marginRight: '8px'}}>✅ 적용</button>
                  <button className="close-btn" onClick={() => setPreviewImage(null)}>❌ 취소</button>
                </div>
              </div>
            )}
            <button className="close-btn" onClick={closeImageModal}>닫기</button>
            
            <input 
              type="file" 
              id="fileInput" 
              className="hidden-input" 
              accept="image/*" 
              onChange={handleFileSelect}
            />
            <input 
              type="file" 
              id="cameraInput" 
              className="hidden-input" 
              accept="image/*" 
              capture="environment" 
              onChange={handleFileSelect}
            />
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="nav-items">
          <div className="nav-item" onClick={MapsToMain}>
            <div className="nav-icon">🏠</div>
            <div className="nav-label">Home</div>
          </div>
          <div className="nav-item" onClick={MapsToMap}>
            <div className="nav-icon">🗺️</div>
            <div className="nav-label">Map</div>
          </div>
          <div className="nav-item" onClick={MapsToCommunity}>
            <div className="nav-icon">👥</div>
            <div className="nav-label">Community</div>
          </div>
          <div className="nav-item" onClick={MapsToShop}>
            <div className="nav-icon">🛍️</div>
            <div className="nav-label">Shop</div>
          </div>
          <div className="nav-item active">
            <div className="nav-icon">👤</div>
            <div className="nav-label">Profile</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
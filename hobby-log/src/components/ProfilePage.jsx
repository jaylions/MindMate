import React, { useState } from 'react'
import '../styles/ProfilePage.css'

function ProfilePage({ userData, MapsToMain, MapsToChallenges, MapsToMap, MapsToCommunity, MapsToShop }) {
  const [activeTab, setActiveTab] = useState('profile')
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

  const renderContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <>
            {/* Profile Information Section - Combined */}
            <div className="glass-card profile-info-section">
              <div className="section-title">Profile Information</div>
              
              {/* Avatar and Basic Info */}
              <div className="profile-header-info">
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
                    📷
                  </button>
                </div>
                
                <div className="profile-details">
                  <div className="profile-name-section">
                    {editingField === 'nickname' ? (
                      <div className="edit-container inline">
                        <input 
                          type="text" 
                          value={editingValue} 
                          onChange={(e) => setEditingValue(e.target.value)}
                          className="edit-input name-input"
                          placeholder="Enter your name"
                        />
                        <button 
                          className="save-btn small" 
                          onClick={() => {
                            setUserSettings({...userSettings, nickname: editingValue})
                            setEditingField(null)
                          }}
                        >✓</button>
                        <button 
                          className="cancel-btn small" 
                          onClick={() => setEditingField(null)}
                        >✕</button>
                      </div>
                    ) : (
                      <div className="name-display">
                        <h2 className="profile-name">{userSettings.nickname}</h2>
                        <button 
                          className="edit-btn inline" 
                          onClick={() => {
                            setEditingField('nickname')
                            setEditingValue(userSettings.nickname)
                          }}
                        >✏️</button>
                      </div>
                    )}
                  </div>
                  
                  <div className="profile-meta">
                    <p className="profile-email">
                      {editingField === 'email' ? (
                        <div className="edit-container inline">
                          <input 
                            type="email" 
                            value={editingValue} 
                            onChange={(e) => setEditingValue(e.target.value)}
                            className="edit-input email-input"
                            placeholder="Enter your email"
                          />
                          <button 
                            className="save-btn small" 
                            onClick={() => {
                              setUserSettings({...userSettings, email: editingValue})
                              setEditingField(null)
                            }}
                          >✓</button>
                          <button 
                            className="cancel-btn small" 
                            onClick={() => setEditingField(null)}
                          >✕</button>
                        </div>
                      ) : (
                        <div className="email-display">
                          <span>{userSettings.email}</span>
                          <button 
                            className="edit-btn inline small" 
                            onClick={() => {
                              setEditingField('email')
                              setEditingValue(userSettings.email)
                            }}
                          >✏️</button>
                        </div>
                      )}
                    </p>
                    <p className="member-since">Member since March 2024</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mood & Health Overview */}
            <div className="glass-card mood-health-section">
              <div className="section-header">
                <div className="section-icon">💝</div>
                <div className="section-title">Mood & Health</div>
              </div>
              
              <div className="mood-graph-container">
                <div className="mood-graph">
                  {[3.2, 4.1, 2.8, 3.9, 4.5, 3.7, 4.2].map((mood, index) => (
                    <div key={index} className="mood-bar-container">
                      <div 
                        className={`mood-bar ${mood < 3.5 ? 'low' : 'good'}`}
                        style={{ height: `${(mood / 5) * 100}%` }}
                      />
                      <span className="day-label">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="sdt-scores">
                <div className="sdt-score">
                  <div className="score-value">78%</div>
                  <div className="score-label">Autonomy</div>
                </div>
                <div className="sdt-score">
                  <div className="score-value">85%</div>
                  <div className="score-label">Competence</div>
                </div>
                <div className="sdt-score">
                  <div className="score-value">72%</div>
                  <div className="score-label">Relatedness</div>
                </div>
              </div>
            </div>

            {/* Why We Recommended */}
            <div className="glass-card recommendation-section">
              <div className="section-header">
                <div className="section-icon">🧠</div>
                <div className="section-title">Why We Recommended</div>
              </div>
              <div className="recommendation-content">
                <p className="recommendation-text">
                  Based on your last 7 days of mood logs showing stress peaks on Wednesday, 
                  we suggested outdoor activities. Your high satisfaction with Tennis (4.5/5) 
                  and "social" tags align with weekend group activities.
                </p>
                <div className="recommendation-tags">
                  <span className="tag">🎾 Tennis Lover</span>
                  <span className="tag">🌟 Social Activities</span>
                  <span className="tag">🏃‍♂️ Outdoor Enthusiast</span>
                </div>
              </div>
            </div>

            {/* SDT Personality Type */}
            <div className="glass-card sdt-section">
              <div className="section-header">
                <div className="section-icon">🧭</div>
                <div className="section-title">Your Personality Profile</div>
              </div>
              
              <div className="sdt-overview">
                <div className="primary-type">
                  <div className="type-badge">
                    <span className="type-icon">
                      {userData?.sdtResults?.primaryType === 'autonomy' ? '🎯' : 
                       userData?.sdtResults?.primaryType === 'competence' ? '🏆' : '🤝'}
                    </span>
                    <span className="type-name">{sdtInfo.title}</span>
                  </div>
                  <p className="type-description">{sdtInfo.description}</p>
                </div>
                
                <div className="sdt-detailed-scores">
                  <div className="score-item autonomy">
                    <div className="score-header">
                      <span className="score-icon">🎯</span>
                      <span className="score-name">Autonomy</span>
                    </div>
                    <div className="score-bar-container">
                      <div className="score-bar">
                        <div className="score-fill autonomy-fill" style={{ width: '78%' }}></div>
                      </div>
                      <span className="score-percentage">78%</span>
                    </div>
                    <p className="score-desc">Independence & self-direction</p>
                  </div>
                  
                  <div className="score-item competence">
                    <div className="score-header">
                      <span className="score-icon">🏆</span>
                      <span className="score-name">Competence</span>
                    </div>
                    <div className="score-bar-container">
                      <div className="score-bar">
                        <div className="score-fill competence-fill" style={{ width: '85%' }}></div>
                      </div>
                      <span className="score-percentage">85%</span>
                    </div>
                    <p className="score-desc">Mastery & skill development</p>
                  </div>
                  
                  <div className="score-item relatedness">
                    <div className="score-header">
                      <span className="score-icon">🤝</span>
                      <span className="score-name">Relatedness</span>
                    </div>
                    <div className="score-bar-container">
                      <div className="score-bar">
                        <div className="score-fill relatedness-fill" style={{ width: '72%' }}></div>
                      </div>
                      <span className="score-percentage">72%</span>
                    </div>
                    <p className="score-desc">Connection & belonging</p>
                  </div>
                </div>
                
                <div className="personality-insights">
                  <h4 className="insights-title">Your Key Traits</h4>
                  <div className="traits-grid">
                    {sdtInfo.characteristics.map((char, index) => (
                      <div key={index} className="trait-item">{char}</div>
                    ))}
                  </div>
                </div>
                
                <button className="retake-test-btn">
                  <span className="btn-icon">🔄</span>
                  Retake Personality Test
                </button>
              </div>
            </div>
          </>
        );

      case 'settings':
        return (
          <>
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

            {/* Data & Privacy */}
            <div className="glass-card data-privacy-section">
              <div className="section-title">Data & Privacy</div>
              <div className="preference-items">
                <div className="preference-item">
                  <div className="preference-info">
                    <div className="preference-label">Location Data</div>
                    <div className="preference-desc">Allow app to access your location for map features</div>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                
                <div className="preference-item">
                  <div className="preference-info">
                    <div className="preference-label">Analytics</div>
                    <div className="preference-desc">Help improve the app by sharing usage data</div>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </>
        );

      case 'stats':
        return (
          <>
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

            {/* Activity Graph */}
            <div className="glass-card activity-section">
              <div className="section-title">Weekly Activity</div>
              <div className="activity-graph">
                <div className="graph-bars">
                  {[
                    { sports: 30, creative: 20, wellness: 15 },     // Monday
                    { sports: 25, creative: 35, wellness: 20 },     // Tuesday
                    { sports: 15, creative: 10, wellness: 20 },     // Wednesday
                    { sports: 40, creative: 25, wellness: 25 },     // Thursday
                    { sports: 35, creative: 20, wellness: 20 },     // Friday
                    { sports: 20, creative: 15, wellness: 25 },     // Saturday
                    { sports: 45, creative: 20, wellness: 20 }      // Sunday
                  ].map((activities, index) => {
                    const total = activities.sports + activities.creative + activities.wellness;
                    return (
                      <div key={index} className="bar-container">
                        <div className="stacked-bar" style={{ height: `${Math.min(total, 100)}%` }}>
                          <div 
                            className="bar-segment sports"
                            style={{ height: `${(activities.sports / total) * 100}%` }}
                            title={`Sports: ${activities.sports}%`}
                          />
                          <div 
                            className="bar-segment creative"
                            style={{ height: `${(activities.creative / total) * 100}%` }}
                            title={`Creative: ${activities.creative}%`}
                          />
                          <div 
                            className="bar-segment wellness"
                            style={{ height: `${(activities.wellness / total) * 100}%` }}
                            title={`Wellness: ${activities.wellness}%`}
                          />
                        </div>
                        <span className="day-label">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Activity Legend */}
              <div className="activity-legend">
                <div className="legend-item">
                  <div className="legend-color sports"></div>
                  <span className="legend-label">Sports</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color creative"></div>
                  <span className="legend-label">Creative</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color wellness"></div>
                  <span className="legend-label">Wellness</span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="glass-card achievements-section">
              <div className="section-title">Recent Achievements</div>
              <div className="achievement-list">
                <div className="achievement-item">
                  <div className="achievement-icon">🏆</div>
                  <div className="achievement-info">
                    <div className="achievement-name">First Week Complete</div>
                    <div className="achievement-desc">Completed your first week of activities</div>
                  </div>
                </div>
                <div className="achievement-item">
                  <div className="achievement-icon">🎯</div>
                  <div className="achievement-info">
                    <div className="achievement-name">Goal Setter</div>
                    <div className="achievement-desc">Set your first personal goal</div>
                  </div>
                </div>  
                <div className="achievement-item">
                  <div className="achievement-icon">🤝</div>
                  <div className="achievement-info">
                    <div className="achievement-name">Social Butterfly</div>
                    <div className="achievement-desc">Connected with 5 friends</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case 'account':
        return (
          <>
            {/* Account Actions */}
            <div className="glass-card actions-section">
              <div className="section-title">Account Actions</div>
              <div className="action-buttons">
                <button className="action-btn primary">Export Data</button>
                <button className="action-btn secondary">Reset Progress</button>
                <button className="action-btn danger">Delete Account</button>
              </div>
            </div>

            {/* Support & Help */}
            <div className="glass-card support-section">
              <div className="section-title">Support & Help</div>
              <div className="support-items">
                <div className="support-item">
                  <div className="support-icon">❓</div>
                  <div className="support-info">
                    <div className="support-label">Help Center</div>
                    <div className="support-desc">Find answers to common questions</div>
                  </div>
                  <div className="chevron">→</div>
                </div>
                <div className="support-item">
                  <div className="support-icon">💬</div>
                  <div className="support-info">
                    <div className="support-label">Contact Support</div>
                    <div className="support-desc">Get help from our team</div>
                  </div>
                  <div className="chevron">→</div>
                </div>
                <div className="support-item">
                  <div className="support-icon">⭐</div>
                  <div className="support-info">
                    <div className="support-label">Rate App</div>
                    <div className="support-desc">Share your feedback with us</div>
                  </div>
                  <div className="chevron">→</div>
                </div>
              </div>
            </div>

            {/* App Info */}
            <div className="glass-card app-info-section">
              <div className="section-title">App Information</div>
              <div className="info-items">
                <div className="info-row">
                  <span className="info-label">Version</span>
                  <span className="info-value">1.0.0</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Build</span>
                  <span className="info-value">2024.03.15</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Terms of Service</span>
                  <span className="info-link">View →</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Privacy Policy</span>
                  <span className="info-link">View →</span>
                </div>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  }

  return (
    <div className="profile-page">
      <div className="container">
        {/* Profile Header */}
        <div className="profile-header">
          <h1 className="page-title">Profile Settings</h1>
          <p className="page-subtitle">Manage your personal information</p>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <div className="tab-container">
            {[
              { id: 'profile', icon: '👤', label: 'Profile' },
              { id: 'settings', icon: '⚙️', label: 'Settings' },
              { id: 'stats', icon: '📊', label: 'Stats' },
              { id: 'account', icon: '🔧', label: 'Account' }
            ].map(({ id, icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`tab-button ${activeTab === id ? 'active' : ''}`}
              >
                <span className="tab-icon">{icon}</span>
                <span className="tab-label">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="tab-content">
          {renderContent()}
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

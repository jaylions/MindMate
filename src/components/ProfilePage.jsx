import React, { useState } from 'react'

function ProfilePage({ userData, MapsToMain, MapsToChallenges, MapsToMap, MapsToCommunity, MapsToShop }) {
  const [sdtExpanded, setSdtExpanded] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [avatarImage, setAvatarImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)

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
        {/* Profile Section */}
        <div className="glass-card profile-section">
          <div className="avatar-container">
            <div 
              className="avatar" 
              style={avatarImage ? {
                backgroundImage: `url(${avatarImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              } : {}}
            >
              {!avatarImage && (userData?.userInfo?.nickname?.[0]?.toUpperCase() || 'A')}
            </div>
            <div className="avatar-edit-btn" onClick={openImageModal}>📷</div>
          </div>
          <div className="profile-name">{userData?.userInfo?.nickname || 'Mind Mate Explorer'}</div>
          <div className="join-date">Member since March 2024</div>
        </div>

        {/* SDT Type Information */}
        <div className={`sdt-info-card ${sdtExpanded ? 'expanded' : ''}`} onClick={toggleSDTInfo}>
          <div className="sdt-header">
            <div className="sdt-type-title">{sdtInfo.title}</div>
            <div className="expand-icon">{sdtExpanded ? '▲' : '▼'}</div>
          </div>
          <div className="sdt-content">
            <div className="sdt-description">{sdtInfo.description}</div>
            <div className="sdt-characteristics">
              {sdtInfo.characteristics.map((char, index) => (
                <div key={index} className="characteristic-item">{char}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Core Stats */}
        <div className="glass-card">
          <div className="section-title">My Progress</div>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">47</div>
              <div className="stat-label">Days Active</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">156</div>
              <div className="stat-label">Places Visited</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">8</div>
              <div className="stat-label">Challenges Done</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1,247</div>
              <div className="stat-label">Points Earned</div>
            </div>
          </div>
        </div>

        {/* Current Mood */}
        <div className="glass-card">
          <div className="section-title">Current Mood</div>
          <div className="mood-display">
            <span className="mood-emoji">😊</span>
            <div className="mood-label">Feeling Good</div>
            <div className="mood-time">Updated 2 hours ago</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card">
          <div className="section-title">Recent Activity</div>
          <div className="activity-item">
            <div className="activity-icon">🎯</div>
            <div className="activity-content">
              <div className="activity-title">Completed daily challenge</div>
              <div className="activity-time">3 hours ago</div>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">🗺️</div>
            <div className="activity-content">
              <div className="activity-title">Visited new hobby place</div>
              <div className="activity-time">5 hours ago</div>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">🏆</div>
            <div className="activity-content">
              <div className="activity-title">Earned new badge</div>
              <div className="activity-time">1 day ago</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card">
          <div className="section-title">Quick Actions</div>
          <div className="quick-actions">
            <button className="action-btn" onClick={MapsToMap}>Explore Places</button>
            <button className="action-btn secondary" onClick={MapsToChallenges}>View Challenges</button>
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
            <div className="nav-icon">🚀</div>
            <div className="nav-label">Explorer</div>
          </div>
          <div className="nav-item" onClick={MapsToChallenges}>
            <div className="nav-icon">🎯</div>
            <div className="nav-label">Challenges</div>
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
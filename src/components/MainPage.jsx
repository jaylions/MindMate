import React, { useState } from 'react'

function MainPage({ MapsToMap, MapsToCommunity, MapsToShop, MapsToChallenges }) {
  const [showGoalSettings, setShowGoalSettings] = useState(false)
  const [goalFrequency, setGoalFrequency] = useState(3)
  const [goalPeriod, setGoalPeriod] = useState('days')
  const [completedToday, setCompletedToday] = useState(false)

  const handleGoalToggle = () => {
    setCompletedToday(!completedToday)
  }

  const getGoalText = () => {
    const periodText = goalPeriod === 'days' ? 'days' : goalPeriod === 'weeks' ? 'weeks' : 'months'
    return `${goalFrequency} ${periodText}`
  }

  return (
    <div className="main-page">
      {/* 상단 바 */}
      <div className="top-bar">
        <div className="hamburger-menu">☰</div>
        <div className="achievements">
          <div className="trophy">🏆 692</div>
          <div className="star">⭐ 19:147</div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="main-content">
        {/* 캐릭터 섹션 */}
        <div className="character-section">
          <div className="character">
            <div className="character-avatar">🐰</div>
            <div className="character-heart">❤️</div>
          </div>
          <div className="progress-info">
            <div className="progress-circle">
              <span className="progress-number">100</span>
            </div>
            <div className="learning-info">
              <h2 className="learning-title">Hobby Explorer</h2>
              <div className="daily-goal">
                Daily Goal: {getGoalText()}
                <span className="dropdown" onClick={() => setShowGoalSettings(!showGoalSettings)}>▼</span>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Goal 설정 */}
        {showGoalSettings && (
          <div className="goal-settings">
            <h3>Customize Your Goal</h3>
            <div className="goal-inputs">
              <div className="goal-input-group">
                <label>Visit every:</label>
                <input 
                  type="number" 
                  value={goalFrequency} 
                  onChange={(e) => setGoalFrequency(parseInt(e.target.value) || 1)}
                  min="1"
                  max="30"
                />
              </div>
              <div className="goal-input-group">
                <label>Period:</label>
                <select 
                  value={goalPeriod} 
                  onChange={(e) => setGoalPeriod(e.target.value)}
                >
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>
            <button className="save-goal-btn" onClick={() => setShowGoalSettings(false)}>
              Save Goal
            </button>
          </div>
        )}

        {/* Today's Goal */}
        <div className="todays-goal">
          <div className="goal-header">
            <h3>Today's Goal</h3>
            <span className="goal-status">1/1</span>
          </div>
          <div className="goal-item" onClick={handleGoalToggle}>
            <div className={`goal-checkbox ${completedToday ? 'completed' : ''}`}>
              {completedToday && <span>✓</span>}
            </div>
            <span className="goal-text">Visit a hobby place</span>
            <button className="show-btn">Show</button>
          </div>
        </div>

        {/* 추가 학습 버튼 */}
        <button className="explore-button" onClick={MapsToMap}>
          <span className="button-icon">🗺️</span>
          Explore Nearby Hobby Places
        </button>

        {/* 학습 정보 섹션 */}
        <div className="learning-stats">
          <h3 className="section-title">Exploration Stats</h3>
          <div className="stats-content">
            <div className="stats-chart">
              <div className="chart-bars">
                <div className="bar" style={{height: '60%'}}></div>
                <div className="bar" style={{height: '80%'}}></div>
                <div className="bar" style={{height: '40%'}}></div>
                <div className="bar" style={{height: '90%'}}></div>
                <div className="bar" style={{height: '70%'}}></div>
              </div>
            </div>
            <div className="stats-percentage">
              <span className="percentage">83%</span>
            </div>
          </div>
          <div className="stats-details">
            <div className="stat-item">• New Places Discovered: 12</div>
            <div className="stat-item">• Places Visited: 8</div>
            <div className="stat-item">• Total Exploration Time: 2h 30m</div>
          </div>
        </div>

        {/* 취미 레벨 섹션 */}
        <div className="hobby-level">
          <h3 className="section-title">My Hobby Level</h3>
          <div className="level-content">
            <button className="level-check-button">Check Now</button>
            <div className="level-date">2024-01-15</div>
            <div className="level-ranking">Top 5.71%</div>
          </div>
        </div>

        {/* 출석 체크 섹션 */}
        <div className="attendance-check">
          <h3 className="section-title">Attendance Check</h3>
          <div className="attendance-stars">
            <span className="star filled">⭐</span>
            <span className="star filled">⭐</span>
            <span className="star filled">⭐</span>
            <span className="star">⭐</span>
            <span className="star">⭐</span>
          </div>
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <div className="bottom-nav">
        <div className="nav-item" onClick={MapsToChallenges}>
          <div className="nav-icon">🎯</div>
          <span className="nav-label">Challenges</span>
        </div>
        <div className="nav-item" onClick={MapsToCommunity}>
          <div className="nav-icon">👥</div>
          <span className="nav-label">Community</span>
        </div>
        <div className="nav-item active">
          <div className="nav-icon">🚀</div>
          <span className="nav-label">Explorer</span>
        </div>
        <div className="nav-item" onClick={MapsToShop}>
          <div className="nav-icon">🛍️</div>
          <span className="nav-label">Shop</span>
        </div>
      </div>
    </div>
  )
}

export default MainPage 
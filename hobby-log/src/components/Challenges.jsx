import React, { useState } from 'react'
import LiquidBar from './LiquidBar'

function Challenges({ MapsToMain }) {
  const [selectedCategory, setSelectedCategory] = useState('active')

  // 도전과제 데이터
  const challenges = [
    {
      id: 1,
      title: "Tennis Master",
      description: "Visit Golden Gate Tennis Courts 20 times",
      progress: 15,
      total: 20,
      reward: "🏆 Tennis Master Badge",
      category: "master",
      status: "active",
      icon: "🎾",
      color: "#4CAF50"
    },
    {
      id: 2,
      title: "Climbing Expert",
      description: "Complete 50 climbing sessions",
      progress: 32,
      total: 50,
      reward: "🧗‍♀️ Climbing Expert Badge",
      category: "master",
      status: "active",
      icon: "🧗‍♀️",
      color: "#FF5722"
    },
    {
      id: 3,
      title: "Coffee Connoisseur",
      description: "Try 10 different coffee shops",
      progress: 7,
      total: 10,
      reward: "☕ Coffee Connoisseur Badge",
      category: "explorer",
      status: "active",
      icon: "☕",
      color: "#795548"
    },
    {
      id: 4,
      title: "Yoga Enthusiast",
      description: "Attend 30 yoga classes",
      progress: 18,
      total: 30,
      reward: "🧘‍♀️ Yoga Enthusiast Badge",
      category: "master",
      status: "active",
      icon: "🧘‍♀️",
      color: "#9C27B0"
    },
    {
      id: 5,
      title: "Art Explorer",
      description: "Visit 5 different art galleries",
      progress: 3,
      total: 5,
      reward: "🎨 Art Explorer Badge",
      category: "explorer",
      status: "active",
      icon: "🎨",
      color: "#E91E63"
    },
    {
      id: 6,
      title: "Hobby Explorer Level 5",
      description: "Reach level 5 in hobby exploration",
      progress: 4,
      total: 5,
      reward: "⭐ Level 5 Explorer",
      category: "level",
      status: "active",
      icon: "⭐",
      color: "#FFD700"
    },
    {
      id: 7,
      title: "Weekend Warrior",
      description: "Visit hobby places 4 weekends in a row",
      progress: 2,
      total: 4,
      reward: "🏃‍♀️ Weekend Warrior Badge",
      category: "streak",
      status: "active",
      icon: "🏃‍♀️",
      color: "#2196F3"
    },
    {
      id: 8,
      title: "Early Bird",
      description: "Visit 5 places before 9 AM",
      progress: 3,
      total: 5,
      reward: "🌅 Early Bird Badge",
      category: "special",
      status: "active",
      icon: "🌅",
      color: "#FF9800"
    }
  ]

  const completedChallenges = [
    {
      id: 9,
      title: "First Steps",
      description: "Visit your first hobby place",
      reward: "👣 First Steps Badge",
      category: "beginner",
      status: "completed",
      icon: "👣",
      color: "#A8E6CF",
      completedDate: "2024-01-10"
    },
    {
      id: 10,
      title: "Social Butterfly",
      description: "Visit 3 places with friends",
      reward: "🦋 Social Butterfly Badge",
      category: "social",
      status: "completed",
      icon: "🦋",
      color: "#FFB6C1",
      completedDate: "2024-01-12"
    }
  ]

  const getProgressPercentage = (progress, total) => {
    return Math.min((progress / total) * 100, 100)
  }

  const getCategoryColor = (category) => {
    switch(category) {
      case 'master': return '#4CAF50'
      case 'explorer': return '#2196F3'
      case 'level': return '#FFD700'
      case 'streak': return '#FF9800'
      case 'special': return '#9C27B0'
      case 'beginner': return '#A8E6CF'
      case 'social': return '#FFB6C1'
      default: return '#8B7EC8'
    }
  }

  const filteredChallenges = selectedCategory === 'active' 
    ? challenges 
    : selectedCategory === 'completed' 
    ? completedChallenges 
    : challenges.filter(c => c.category === selectedCategory)

  return (
    <div className="challenges-page">
      {/* 상단 바 */}
      <div className="top-bar">
        <button className="back-button" onClick={MapsToMain}>
          ← Back
        </button>
        <h2>Challenges</h2>
        <div className="stats-display">
          <span className="stats-icon">🏆</span>
          <span className="stats-text">12/25</span>
        </div>
      </div>

      <div className="challenges-content">
        {/* Challenge Progress Overview */}
        <div className="challenge-progress-overview">
          <div className="overview-grid">
            <div className="overview-item">
              <LiquidBar 
                value={12} 
                maxValue={25} 
                color="#4CAF50" 
                height={60} 
                label="Total Challenges"
                animated={true}
              />
            </div>
            <div className="overview-item">
              <LiquidBar 
                value={8} 
                maxValue={12} 
                color="#66BB6A" 
                height={60} 
                label="Active Challenges"
                animated={true}
              />
            </div>
          </div>
          <div className="single-overview">
            <LiquidBar 
              value={48} 
              maxValue={100} 
              color="#81C784" 
              height={50} 
              label="Overall Challenge Completion"
              animated={true}
            />
          </div>
        </div>

        {/* 카테고리 탭 */}
        <div className="challenges-tabs">
          <button 
            className={`tab-btn ${selectedCategory === 'active' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('active')}
          >
            Active
          </button>
          <button 
            className={`tab-btn ${selectedCategory === 'completed' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('completed')}
          >
            Completed
          </button>
          <button 
            className={`tab-btn ${selectedCategory === 'master' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('master')}
          >
            Master
          </button>
          <button 
            className={`tab-btn ${selectedCategory === 'explorer' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('explorer')}
          >
            Explorer
          </button>
        </div>

        {/* 진행률 요약 */}
        <div className="progress-summary">
          <div className="summary-item">
            <div className="summary-icon">🎯</div>
            <div className="summary-info">
              <div className="summary-number">8</div>
              <div className="summary-label">Active</div>
            </div>
          </div>
          <div className="summary-item">
            <div className="summary-icon">✅</div>
            <div className="summary-info">
              <div className="summary-number">2</div>
              <div className="summary-label">Completed</div>
            </div>
          </div>
          <div className="summary-item">
            <div className="summary-icon">🏆</div>
            <div className="summary-info">
              <div className="summary-number">12</div>
              <div className="summary-label">Total</div>
            </div>
          </div>
        </div>

        {/* 도전과제 목록 */}
        <div className="challenges-list">
          {filteredChallenges.map((challenge) => (
            <div key={challenge.id} className={`challenge-item ${challenge.status}`}>
              <div className="challenge-header">
                <div className="challenge-icon" style={{backgroundColor: challenge.color}}>
                  {challenge.icon}
                </div>
                <div className="challenge-info">
                  <h3 className="challenge-title">{challenge.title}</h3>
                  <p className="challenge-description">{challenge.description}</p>
                  {challenge.status === 'active' && (
                    <div className="challenge-progress">
                      <LiquidBar 
                        value={challenge.progress} 
                        maxValue={challenge.total} 
                        color={challenge.color} 
                        height={30} 
                        label={`${challenge.progress}/${challenge.total}`}
                        animated={false}
                      />
                    </div>
                  )}
                </div>
                <div className="challenge-status">
                  {challenge.status === 'completed' ? (
                    <div className="completed-badge">✅</div>
                  ) : (
                    <div className="reward-preview">{challenge.reward}</div>
                  )}
                </div>
              </div>
              
              {challenge.status === 'completed' && (
                <div className="completion-info">
                  <span className="completion-date">Completed: {challenge.completedDate}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 특별 도전과제 */}
        <div className="special-challenges">
          <h3>Special Challenges</h3>
          <div className="special-grid">
            <div className="special-item">
              <div className="special-icon">🌟</div>
              <div className="special-title">Perfect Week</div>
              <div className="special-desc">Visit a place every day for 7 days</div>
            </div>
            <div className="special-item">
              <div className="special-icon">🌍</div>
              <div className="special-title">World Traveler</div>
              <div className="special-desc">Visit places in 5 different neighborhoods</div>
            </div>
            <div className="special-item">
              <div className="special-icon">📸</div>
              <div className="special-title">Photo Journalist</div>
              <div className="special-desc">Take photos at 10 different places</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Challenges 
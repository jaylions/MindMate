import React, { useState } from 'react'

function Community({ MapsToMain }) {
  const [selectedActivity, setSelectedActivity] = useState('all')
  const [chartType, setChartType] = useState('line')
  const [selectedPlace, setSelectedPlace] = useState('all')

  // 샘플 데이터
  const frequentPlaces = [
    { name: "Golden Gate Tennis Courts", visits: 15, type: "tennis", color: "#4CAF50" },
    { name: "Touchstone Climbing Gym", visits: 12, type: "climbing", color: "#FF5722" },
    { name: "Blue Bottle Coffee", visits: 8, type: "coffee", color: "#795548" },
    { name: "Yoga Tree Studio", visits: 6, type: "yoga", color: "#9C27B0" },
    { name: "SFMOMA", visits: 4, type: "art", color: "#E91E63" }
  ]

  const moodData = {
    all: [
      { day: "Mon", mood: "good", place: "Tennis Courts" },
      { day: "Tue", mood: "meh", place: "Climbing Gym" },
      { day: "Wed", mood: "good", place: "Coffee Shop" },
      { day: "Thu", mood: "excellent", place: "Yoga Studio" },
      { day: "Fri", mood: "good", place: "Art Museum" },
      { day: "Sat", mood: "meh", place: "Tennis Courts" },
      { day: "Sun", mood: "excellent", place: "Climbing Gym" }
    ],
    "Golden Gate Tennis Courts": [
      { day: "Mon", mood: "good", time: "2h 30m" },
      { day: "Wed", mood: "excellent", time: "3h 15m" },
      { day: "Sat", mood: "meh", time: "1h 45m" }
    ],
    "Touchstone Climbing Gym": [
      { day: "Tue", mood: "meh", time: "2h 0m" },
      { day: "Thu", mood: "good", time: "2h 45m" },
      { day: "Sun", mood: "excellent", time: "3h 30m" }
    ],
    "Blue Bottle Coffee": [
      { day: "Wed", mood: "good", time: "1h 15m" },
      { day: "Fri", mood: "excellent", time: "2h 0m" }
    ],
    "Yoga Tree Studio": [
      { day: "Thu", mood: "excellent", time: "1h 30m" }
    ],
    "SFMOMA": [
      { day: "Fri", mood: "good", time: "2h 45m" }
    ]
  }

  const getMoodColor = (mood) => {
    switch(mood) {
      case 'excellent': return '#FF6B9D'
      case 'good': return '#4ECDC4'
      case 'meh': return '#FFE66D'
      case 'bad': return '#FF6B6B'
      default: return '#95A5A6'
    }
  }

  const getMoodEmoji = (mood) => {
    switch(mood) {
      case 'excellent': return '😍'
      case 'good': return '😊'
      case 'meh': return '😐'
      case 'bad': return '😞'
      default: return '😐'
    }
  }

  const currentMoodData = moodData[selectedPlace] || moodData.all

  const getPlaceStats = (placeName) => {
    if (placeName === 'all') {
      return {
        totalVisits: frequentPlaces.reduce((sum, place) => sum + place.visits, 0),
        averageMood: 'good',
        totalTime: '15h 30m',
        favoriteDay: 'Thursday'
      }
    }
    
    const place = frequentPlaces.find(p => p.name === placeName)
    if (!place) return null

    const placeMoodData = moodData[placeName] || []
    const totalTime = placeMoodData.reduce((sum, data) => {
      const timeStr = data.time || '0h 0m'
      const hours = parseInt(timeStr.split('h')[0])
      const minutes = parseInt(timeStr.split('h')[1]?.split('m')[0] || 0)
      return sum + hours * 60 + minutes
    }, 0)

    return {
      totalVisits: place.visits,
      averageMood: placeMoodData.length > 0 ? placeMoodData[0].mood : 'good',
      totalTime: `${Math.floor(totalTime / 60)}h ${totalTime % 60}m`,
      favoriteDay: placeMoodData.length > 0 ? placeMoodData[0].day : 'N/A'
    }
  }

  const currentStats = getPlaceStats(selectedPlace)

  return (
    <div className="community-page">
      {/* 상단 바 */}
      <div className="top-bar">
        <button className="back-button" onClick={MapsToMain}>
          ← Back
        </button>
        <h2>Community</h2>
        <div className="search-icon">🔍</div>
      </div>

      <div className="community-content">
        {/* Days in a Row */}
        <div className="streak-section">
          <h3>Days in a Row</h3>
          <div className="streak-info">
            <div className="streak-number">5</div>
            <div className="streak-details">
              <div className="streak-checkboxes">
                <span className="checkbox checked">Mon</span>
                <span className="checkbox checked">Tue</span>
                <span className="checkbox checked">Wed</span>
                <span className="checkbox checked">Thu</span>
                <span className="checkbox checked">Fri</span>
                <span className="checkbox">Sat</span>
                <span className="checkbox">Sun</span>
              </div>
              <div className="longest-chain">Longest Chain: 7</div>
            </div>
          </div>
        </div>

        {/* 장소 선택 */}
        <div className="place-selector">
          <h3>My Favorite Places</h3>
          <div className="place-buttons">
            <button 
              className={`place-btn ${selectedPlace === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedPlace('all')}
            >
              <span className="place-btn-icon">🏠</span>
              <span className="place-btn-text">All Places</span>
            </button>
            {frequentPlaces.map((place) => (
              <button 
                key={place.name}
                className={`place-btn ${selectedPlace === place.name ? 'active' : ''}`}
                onClick={() => setSelectedPlace(place.name)}
                style={{borderColor: place.color}}
              >
                <span className="place-btn-icon">{place.type === 'tennis' ? '🎾' : 
                                                 place.type === 'climbing' ? '🧗‍♀️' :
                                                 place.type === 'coffee' ? '☕' :
                                                 place.type === 'yoga' ? '🧘‍♀️' : '🎨'}</span>
                <span className="place-btn-text">{place.name.split(' ').slice(-2).join(' ')}</span>
                <span className="place-btn-count">{place.visits}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 선택된 장소 통계 */}
        {currentStats && (
          <div className="place-stats">
            <h3>{selectedPlace === 'all' ? 'Overall Stats' : `${selectedPlace} Stats`}</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-number">{currentStats.totalVisits}</div>
                <div className="stat-label">Total Visits</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">😊</div>
                <div className="stat-number">{getMoodEmoji(currentStats.averageMood)}</div>
                <div className="stat-label">Avg Mood</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⏰</div>
                <div className="stat-number">{currentStats.totalTime}</div>
                <div className="stat-label">Total Time</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📅</div>
                <div className="stat-number">{currentStats.favoriteDay}</div>
                <div className="stat-label">Favorite Day</div>
              </div>
            </div>
          </div>
        )}

        {/* Mood Chart */}
        <div className="mood-chart-section">
          <div className="chart-header">
            <h3>Mood Chart</h3>
            <div className="chart-actions">
              <span className="magnify-icon">🔍</span>
              <span className="share-icon">📤</span>
            </div>
          </div>
          <p className="chart-subtitle">Tap on the chart to see more.</p>
          
          <div className="mood-chart">
            <div className="mood-legend">
              <div className="mood-item">
                <span className="mood-dot" style={{backgroundColor: '#FF6B9D'}}></span>
                <span>Excellent</span>
              </div>
              <div className="mood-item">
                <span className="mood-dot" style={{backgroundColor: '#4ECDC4'}}></span>
                <span>Good</span>
              </div>
              <div className="mood-item">
                <span className="mood-dot" style={{backgroundColor: '#FFE66D'}}></span>
                <span>Meh</span>
              </div>
              <div className="mood-item">
                <span className="mood-dot" style={{backgroundColor: '#FF6B6B'}}></span>
                <span>Bad</span>
              </div>
            </div>
            
            <div className="chart-container">
              <div className="chart-line">
                {currentMoodData.map((data, index) => (
                  <div key={index} className="chart-point" style={{backgroundColor: getMoodColor(data.mood)}}>
                    <div className="point-tooltip">
                      <div>{data.day}</div>
                      <div>{getMoodEmoji(data.mood)} {data.place || data.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="chart-controls">
            <div className="chart-type-buttons">
              <button 
                className={`chart-btn ${chartType === 'line' ? 'active' : ''}`}
                onClick={() => setChartType('line')}
              >
                📈
              </button>
              <button 
                className={`chart-btn ${chartType === 'bar' ? 'active' : ''}`}
                onClick={() => setChartType('bar')}
              >
                📊
              </button>
            </div>
            <select 
              className="activity-select"
              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value)}
            >
              <option value="all">All Activities</option>
              <option value="tennis">Tennis</option>
              <option value="climbing">Climbing</option>
              <option value="coffee">Coffee</option>
              <option value="yoga">Yoga</option>
              <option value="art">Art</option>
            </select>
          </div>
        </div>

        {/* Most Visited Places */}
        <div className="frequent-places">
          <h3>Most Visited Places</h3>
          <div className="places-list">
            {frequentPlaces.map((place, index) => (
              <div key={place.name} className="place-item">
                <div className="place-rank">#{index + 1}</div>
                <div className="place-info">
                  <div className="place-name">{place.name}</div>
                  <div className="place-visits">{place.visits} visits</div>
                </div>
                <div className="place-type" style={{backgroundColor: place.color}}>
                  {place.type}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Ranking */}
        <div className="community-ranking">
          <h3>Community Ranking</h3>
          <div className="ranking-list">
            <div className="ranking-item top">
              <div className="rank">🥇</div>
              <div className="user-info">
                <div className="username">Sarah K.</div>
                <div className="user-stats">23 places visited</div>
              </div>
              <div className="user-score">98.5</div>
            </div>
            <div className="ranking-item">
              <div className="rank">🥈</div>
              <div className="user-info">
                <div className="username">Mike R.</div>
                <div className="user-stats">19 places visited</div>
              </div>
              <div className="user-score">94.2</div>
            </div>
            <div className="ranking-item">
              <div className="rank">🥉</div>
              <div className="user-info">
                <div className="username">You</div>
                <div className="user-stats">15 places visited</div>
              </div>
              <div className="user-score">89.7</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Community 
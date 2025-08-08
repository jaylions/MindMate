import React, { useState, useEffect } from 'react'
import LiquidBar from './LiquidBar'
import '../styles/HomePage.css'
import OpenAI from 'openai'

function MainPage({ MapsToMap, MapsToCommunity, MapsToShop, MapsToChallenges, MapsToProfile, userData }) {
  const [showGoalSettings, setShowGoalSettings] = useState(false)
  const [goalFrequency, setGoalFrequency] = useState(3)
  const [goalPeriod, setGoalPeriod] = useState('days')
  const [completedToday, setCompletedToday] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedCategory, setSelectedCategory] = useState('active')
  const [chatMessages, setChatMessages] = useState([])
  const [currentMessage, setCurrentMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  const getFormattedDate = () => {
    return currentTime.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleGoalToggle = () => {
    setCompletedToday(!completedToday)
  }

  const getGoalText = () => {
    const periodText = goalPeriod === 'days' ? 'days' : goalPeriod === 'weeks' ? 'weeks' : 'months'
    return `${goalFrequency} ${periodText}`
  }

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return

    const userMessage = currentMessage.trim()
    setCurrentMessage('')
    setIsLoading(true)

    const newMessages = [...chatMessages, { role: 'user', content: userMessage }]
    setChatMessages(newMessages)

    try {
      const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
      })

      const completion = await openai.chat.completions.create({
        messages: [
          { role: 'system', content: `You are a friendly pet companion who helps users track their daily activities and hobbies. The user has a pet named ${userData?.selectedPet?.name || 'your pet'} (${userData?.selectedPet?.emoji || '🐰'}). Be encouraging and supportive about their activities. Keep responses concise and friendly, and try to ask them what they like and what thay enjoy as a mental helper` },
          ...newMessages
        ],
        model: 'gpt-3.5-turbo',
        max_tokens: 150
      })

      const assistantMessage = completion.choices[0].message.content
      setChatMessages([...newMessages, { role: 'assistant', content: assistantMessage }])
    } catch (error) {
      console.error('OpenAI API Error:', error)
      setChatMessages([...newMessages, { role: 'assistant', content: 'Sorry, I\'m having trouble connecting right now. Please try again later!' }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="main-page">
      {/* Header Section */}
      <div className="header">
        <h1 className="greeting">Your Pet Companion</h1>
        <p className="date">{getFormattedDate()}</p>
      </div>

      {/* Pet Character Section */}
      <div className="glass-card pet-section">
        <div className="pet-container">
          <div className="pet-speech-bubble">
            {chatMessages.length === 0 ? (
              <h3 className="chat-box-title">What did you do?</h3>
            ) : (
              <div className="pet-response">
                {isLoading ? (
                  <div className="loading-message">
                    {userData?.selectedPet?.emoji || '🐰'} is thinking...
                  </div>
                ) : (
                  <div className="pet-message">
                    {chatMessages[chatMessages.length - 1]?.role === 'assistant' 
                      ? chatMessages[chatMessages.length - 1]?.content 
                      : "Tell me about your day!"
                    }
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="pet-avatar">
            <div className="pet-character" style={{
              backgroundImage: userData?.selectedPet?.image ? `url(${userData.selectedPet.image})` : 'none'
            }}>
              {!userData?.selectedPet?.image && (userData?.selectedPet?.emoji || '🐰')}
            </div>
          </div>
          <div className="pet-info">
            <h3>{userData?.selectedPet?.name || 'Your Pet'}</h3>
            <p className="pet-status">Ready for new adventures!</p>
          </div>
        </div>
        <div className="experience-bar">
          <div className="exp-label">Experience Progress</div>
          <div className="exp-bar-container">
            <div className="exp-bar-fill" style={{width: '65%'}}></div>
          </div>
        </div>
      </div>

      {/* Chat Box Section */}
      <div className="glass-card chat-box-section">
        <div className="chat-box-header">
          <h3>Chat with {userData?.selectedPet?.name || 'Your Pet'}</h3>
        </div>
        
        {chatMessages.filter(msg => msg.role === 'user').length > 0 && (
          <div className="chat-history">
            <h4>Recent messages:</h4>
            <div className="user-messages">
              {chatMessages.filter(msg => msg.role === 'user').slice(-2).map((message, index) => (
                <div key={index} className="user-message-history">
                  <span className="user-icon">💬</span>
                  {message.content}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="chat-box-input">
          <label htmlFor="daily-input" className="sr-only">Tell me about your day</label>
          <input 
            id="daily-input"
            name="daily-input"
            type="text" 
            placeholder="Tell me about your day..." 
            aria-label="Tell me about your day"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <button 
            type="button" 
            onClick={handleSendMessage}
            disabled={isLoading || !currentMessage.trim()}
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </div>
      </div>


      {/* Challenge Progress Overview */}
      <div className="glass-card challenge-progress-overview">
        <h3 className="section-title" style={{margin: '0 0 16px 0'}}>Your Challenges</h3>
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

      {/* Active Challenges */}
      <h2 className="section-title">Active Challenges</h2>
      <div className="challenges-list">
        <div className="glass-card challenge-item active">
          <div className="challenge-header">
            <div className="challenge-icon" style={{backgroundColor: '#4CAF50', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'white', flexShrink: 0, boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'}}>
              🎾
            </div>
            <div className="challenge-info" style={{flex: 1, marginLeft: '1rem'}}>
              <h3 className="challenge-title" style={{color: '#2E7D32', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.3rem'}}>Tennis Master</h3>
              <p className="challenge-description" style={{color: '#4CAF50', fontSize: '0.9rem', marginBottom: '0.8rem', lineHeight: 1.4}}>Visit Golden Gate Tennis Courts 20 times</p>
              <div className="challenge-progress">
                <LiquidBar 
                  value={15} 
                  maxValue={20} 
                  color="#4CAF50" 
                  height={30} 
                  label="15/20"
                  animated={false}
                />
              </div>
            </div>
            <div className="challenge-status" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem'}}>
            </div>
          </div>
        </div>
        
        <div className="glass-card challenge-item active">
          <div className="challenge-header">
            <div className="challenge-icon" style={{backgroundColor: '#795548', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'white', flexShrink: 0, boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'}}>
              ☕
            </div>
            <div className="challenge-info" style={{flex: 1, marginLeft: '1rem'}}>
              <h3 className="challenge-title" style={{color: '#2E7D32', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.3rem'}}>Coffee Connoisseur</h3>
              <p className="challenge-description" style={{color: '#4CAF50', fontSize: '0.9rem', marginBottom: '0.8rem', lineHeight: 1.4}}>Try 10 different coffee shops</p>
              <div className="challenge-progress">
                <LiquidBar 
                  value={7} 
                  maxValue={10} 
                  color="#795548" 
                  height={30} 
                  label="7/10"
                  animated={false}
                />
              </div>
            </div>
            <div className="challenge-status" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem'}}>
            </div>
          </div>
        </div>
      </div>

      


      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="nav-items">
          <div className="nav-item active">
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
          <div className="nav-item" onClick={MapsToProfile}>
            <div className="nav-icon">👤</div>
            <div className="nav-label">Profile</div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default MainPage

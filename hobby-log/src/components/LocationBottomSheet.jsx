import React, { useState, useEffect } from 'react';
import '../styles/LocationBottomSheet.css';

const LocationBottomSheet = ({ isOpen, location, onClose }) => {
  const [activeTab, setActiveTab] = useState('info');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const mockGameData = {
    checkIns: Math.floor(Math.random() * 50) + 10,
    level: Math.floor(Math.random() * 5) + 1,
    rewards: ['🎯', '⭐', '🏆'],
    activities: ['Tennis Practice', 'Coffee Meetup', 'Climbing Session']
  };

  const getLocationReviews = () => {
    const reviewsData = {
      "Golden Gate Tennis Courts": [
        {
          id: 1,
          author: 'Tennis Mike',
          rating: 5,
          comment: 'Great courts in a beautiful park setting! Well maintained and usually not too crowded.',
          date: '3 days ago',
          avatar: '🎾'
        },
        {
          id: 2,
          author: 'Sarah K.',
          rating: 4,
          comment: 'Nice location but can get windy. Good for practice sessions.',
          date: '1 week ago',
          avatar: '👩‍🦰'
        }
      ],
      "Touchstone Climbing Gym": [
        {
          id: 1,
          author: 'ClimbingBeast',
          rating: 5,
          comment: 'Excellent bouldering walls and great community. Staff is super helpful!',
          date: '2 days ago',
          avatar: '🧗'
        },
        {
          id: 2,
          author: 'Alex Chen',
          rating: 4,
          comment: 'Good variety of routes. Gets busy in evenings but worth the wait.',
          date: '5 days ago',
          avatar: '👨‍💻'
        }
      ],
      "Blue Bottle Coffee": [
        {
          id: 1,
          author: 'Coffee Lover',
          rating: 5,
          comment: 'Best single origin coffee in the city! The baristas really know their craft.',
          date: '1 day ago',
          avatar: '☕'
        },
        {
          id: 2,
          author: 'Emma W.',
          rating: 4,
          comment: 'Great atmosphere for working. WiFi is fast and the pastries are delicious.',
          date: '4 days ago',
          avatar: '👩‍💼'
        }
      ]
    };
    
    return reviewsData[location?.name] || [
      {
        id: 1,
        author: 'Anonymous',
        rating: 4,
        comment: 'No reviews available yet. Be the first to review!',
        date: 'N/A',
        avatar: '👤'
      }
    ];
  };

  const handleCheckIn = () => {
    console.log('Check-in functionality would be implemented here');
    alert('🎉 Checked in successfully! You earned 10 XP!');
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const getLocationSpecificInfo = () => {
    const locationInfo = {
      "Golden Gate Tennis Courts": {
        address: "Golden Gate Park, San Francisco, CA 94117",
        hours: "Daily: 6:00 AM - 8:00 PM",
        contact: "(415) 831-2700",
        price: "$ - Courts available for public use",
        website: "https://sfrecpark.org"
      },
      "Touchstone Climbing Gym": {
        address: "2356 Mission St, San Francisco, CA 94110",
        hours: "Mon-Fri: 6:00 AM - 11:00 PM\nSat-Sun: 8:00 AM - 10:00 PM",
        contact: "(415) 550-7625",
        price: "$$ - Day passes and memberships available",
        website: "https://touchstoneclimbing.com"
      },
      "Blue Bottle Coffee": {
        address: "66 Mint St, San Francisco, CA 94103",
        hours: "Mon-Fri: 6:30 AM - 7:00 PM\nSat-Sun: 7:00 AM - 7:00 PM",
        contact: "(510) 653-3394",
        price: "$$ - Premium coffee and pastries",
        website: "https://bluebottlecoffee.com"
      }
    };
    
    return locationInfo[location?.name] || {
      address: "Address not available",
      hours: "Hours not available", 
      contact: "Contact not available",
      price: "Price not available",
      website: "#"
    };
  };

  const renderTabContent = () => {
    const locationInfo = getLocationSpecificInfo();
    
    switch (activeTab) {
      case 'info':
        return (
          <div className="tab-content">
            <div className="info-section">
              <div className="info-item">
                <span className="info-label">📍 Address</span>
                <p className="info-text">{locationInfo.address}</p>
              </div>
              <div className="info-item">
                <span className="info-label">🕒 Hours</span>
                <p className="info-text" style={{ whiteSpace: 'pre-line' }}>{locationInfo.hours}</p>
              </div>
              <div className="info-item">
                <span className="info-label">📞 Contact</span>
                <p className="info-text">{locationInfo.contact}</p>
              </div>
              <div className="info-item">
                <span className="info-label">💰 Price Range</span>
                <p className="info-text">{locationInfo.price}</p>
              </div>
              <div className="info-item">
                <span className="info-label">🌐 Website</span>
                <p className="info-text">
                  <a href={locationInfo.website} className="info-link" target="_blank" rel="noopener noreferrer">
                    Visit Website
                  </a>
                </p>
              </div>
            </div>
          </div>
        );
      
      case 'reviews':
        const locationReviews = getLocationReviews();
        const averageRating = locationReviews.reduce((sum, review) => sum + review.rating, 0) / locationReviews.length;
        
        return (
          <div className="tab-content">
            <div className="reviews-header">
              <div className="rating-summary">
                <div className="rating-score">{averageRating.toFixed(1)}</div>
                <div className="rating-details">
                  <div className="stars">{renderStars(Math.round(averageRating))}</div>
                  <div className="review-count">Based on {locationReviews.length} reviews</div>
                </div>
              </div>
            </div>
            <div className="reviews-list">
              {locationReviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <span className="reviewer-avatar">{review.avatar}</span>
                      <span className="reviewer-name">{review.author}</span>
                    </div>
                    <div className="review-meta">
                      <div className="review-rating">{renderStars(review.rating)}</div>
                      <div className="review-date">{review.date}</div>
                    </div>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
            <button className="add-review-btn">
              ✍️ Write a Review
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      <div 
        className={`bottom-sheet-overlay ${isOpen ? 'visible' : ''}`}
        onClick={onClose}
      />
      <div className={`bottom-sheet ${isOpen ? 'open' : ''}`}>
        <div className="bottom-sheet-handle" />
        
        {/* Header Section */}
        <div className="bottom-sheet-header">
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
          <div className="location-header">
            <div className="location-icon">
              {location?.icon || '📍'}
            </div>
            <div className="location-info">
              <h2 className="location-name">{location?.name || 'Unknown Location'}</h2>
              <p className="location-category">{location?.description || 'No description available'}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons Bar */}
        <div className="action-buttons">
          <button className="action-btn primary" onClick={handleCheckIn}>
            <span className="btn-icon">📍</span>
            <span className="btn-text">Check In</span>
          </button>
          <button className="action-btn">
            <span className="btn-icon">💬</span>
            <span className="btn-text">Chat</span>
          </button>
          <button className="action-btn">
            <span className="btn-icon">📸</span>
            <span className="btn-text">Photo</span>
          </button>
          <button className="action-btn">
            <span className="btn-icon">❤️</span>
            <span className="btn-text">Save</span>
          </button>
        </div>

        {/* Game/App-Specific Information */}
        <div className="game-info-section">
          <div className="game-stats">
            <div className="stat-item">
              <div className="stat-value">{mockGameData.checkIns}</div>
              <div className="stat-label">Check-ins</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">Level {mockGameData.level}</div>
              <div className="stat-label">Your Level</div>
            </div>
            <div className="stat-item">
              <div className="stat-rewards">
                {mockGameData.rewards.map((reward, index) => (
                  <span key={index} className="reward-icon">{reward}</span>
                ))}
              </div>
              <div className="stat-label">Rewards</div>
            </div>
          </div>
          <div className="activities-preview">
            <div className="activities-header">🎯 Recent Activities</div>
            <div className="activities-list">
              {mockGameData.activities.slice(0, 2).map((activity, index) => (
                <div key={index} className="activity-item">
                  <span className="activity-dot">•</span>
                  {activity}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabbed Interface */}
        <div className="tabs-section">
          <div className="tabs-header">
            <button 
              className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
              onClick={() => setActiveTab('info')}
            >
              ℹ️ Info
            </button>
            <button 
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              ⭐ Reviews
            </button>
          </div>
          <div className="tabs-content">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationBottomSheet;
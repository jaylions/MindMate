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
      ],
      "The Book Club Café": [
        {
          id: 1,
          author: 'BookWorm Jane',
          rating: 5,
          comment: 'Perfect combination of great coffee and intellectual conversations. Love the Wednesday book discussions!',
          date: '2 days ago',
          avatar: '📚'
        },
        {
          id: 2,
          author: 'Literary Lou',
          rating: 4,
          comment: 'Cozy atmosphere and good book selection. Sometimes gets crowded during book club nights.',
          date: '1 week ago',
          avatar: '👓'
        }
      ],
      "Mission Rock Music Studio": [
        {
          id: 1,
          author: 'RockStar Jake',
          rating: 5,
          comment: 'Amazing sound quality and top-notch equipment. Our band recorded our first album here!',
          date: '3 days ago',
          avatar: '🎸'
        },
        {
          id: 2,
          author: 'Indie Annie',
          rating: 4,
          comment: 'Great studio but can be pricey. Worth it for the professional setup though.',
          date: '1 week ago',
          avatar: '🎤'
        }
      ],
      "GameOn Arcade": [
        {
          id: 1,
          author: 'RetroGamer',
          rating: 5,
          comment: 'Nostalgic heaven! They have all the classic games plus modern ones. Tournament nights are epic!',
          date: '1 day ago',
          avatar: '🎮'
        },
        {
          id: 2,
          author: 'Pac-Man Pro',
          rating: 4,
          comment: 'Great selection of games but can get noisy on weekends. Perfect for date nights though!',
          date: '4 days ago',
          avatar: '👾'
        }
      ],
      "Castro Climbing Co.": [
        {
          id: 1,
          author: 'ClimbHigh Sarah',
          rating: 5,
          comment: 'Personal training here is incredible! My technique improved so much in just a month.',
          date: '2 days ago',
          avatar: '🧗‍♀️'
        },
        {
          id: 2,
          author: 'Boulder Brad',
          rating: 4,
          comment: 'Boutique feel with great instructors. A bit expensive but quality is top-tier.',
          date: '6 days ago',
          avatar: '🏔️'
        }
      ],
      "Maker Workshop SF": [
        {
          id: 1,
          author: 'Crafty Kate',
          rating: 5,
          comment: 'Love the variety of workshops! Made my first pottery bowl and learned woodworking basics.',
          date: '3 days ago',
          avatar: '🔨'
        },
        {
          id: 2,
          author: 'DIY Dave',
          rating: 4,
          comment: 'Great tools and helpful staff. Wish they had more weekend slots available.',
          date: '1 week ago',
          avatar: '🛠️'
        }
      ],
      "Tennis Club Marina": [
        {
          id: 1,
          author: 'Pro Tennis Pat',
          rating: 5,
          comment: 'Premium facilities with amazing bay views! The coaching staff is world-class.',
          date: '2 days ago',
          avatar: '🎾'
        },
        {
          id: 2,
          author: 'Marina Mike',
          rating: 4,
          comment: 'Beautiful location and well-maintained courts. Membership fees are steep but worth it.',
          date: '5 days ago',
          avatar: '🏆'
        }
      ],
      "Sunset Book Exchange": [
        {
          id: 1,
          author: 'Page Turner',
          rating: 5,
          comment: 'Hidden gem! Great selection of used books and the author readings are always fantastic.',
          date: '1 day ago',
          avatar: '📖'
        },
        {
          id: 2,
          author: 'Novel Nancy',
          rating: 4,
          comment: 'Cozy independent bookstore with friendly staff. Could use more contemporary fiction.',
          date: '3 days ago',
          avatar: '📚'
        }
      ],
      "Jazz Corner SF": [
        {
          id: 1,
          author: 'Jazz Enthusiast',
          rating: 5,
          comment: 'Intimate venue with incredible acoustics. Every performance feels like a private concert!',
          date: '2 days ago',
          avatar: '🎷'
        },
        {
          id: 2,
          author: 'Smooth Sally',
          rating: 4,
          comment: 'Great atmosphere and talented musicians. Drinks are a bit pricey but the music is priceless.',
          date: '1 week ago',
          avatar: '🎺'
        }
      ],
      "VR Gaming Lounge": [
        {
          id: 1,
          author: 'VR Victor',
          rating: 5,
          comment: 'Mind-blowing VR experiences! The latest games and equipment make it feel like the future.',
          date: '1 day ago',
          avatar: '🥽'
        },
        {
          id: 2,
          author: 'Digital Dan',
          rating: 4,
          comment: 'Amazing technology but sometimes has long wait times. Book ahead on weekends!',
          date: '4 days ago',
          avatar: '🤖'
        }
      ],
      "Art & Craft Collective": [
        {
          id: 1,
          author: 'Creative Claire',
          rating: 5,
          comment: 'Such a welcoming community space! The painting classes are inspiring and fun.',
          date: '3 days ago',
          avatar: '🎨'
        },
        {
          id: 2,
          author: 'Artsy Amy',
          rating: 4,
          comment: 'Great variety of art classes. The ceramic studio could use more kiln space though.',
          date: '6 days ago',
          avatar: '🖌️'
        }
      ],
      "Rock Climbing Outdoors": [
        {
          id: 1,
          author: 'Mountain Max',
          rating: 5,
          comment: 'Professional guides and incredible outdoor climbing spots! Safety is their top priority.',
          date: '2 days ago',
          avatar: '⛰️'
        },
        {
          id: 2,
          author: 'Adventure Anna',
          rating: 4,
          comment: 'Great outdoor experience but weather dependent. Equipment quality is excellent.',
          date: '1 week ago',
          avatar: '🏔️'
        }
      ],
      "Indie Music Venue": [
        {
          id: 1,
          author: 'Indie Ian',
          rating: 5,
          comment: 'Best place to discover new bands! Intimate setting makes every show special.',
          date: '1 day ago',
          avatar: '🎤'
        },
        {
          id: 2,
          author: 'Music Maven',
          rating: 4,
          comment: 'Great sound system and diverse lineup. Can get pretty crowded for popular acts.',
          date: '5 days ago',
          avatar: '🎸'
        }
      ],
      "Board Game Café": [
        {
          id: 1,
          author: 'Strategy Steve',
          rating: 5,
          comment: 'Amazing game selection! Staff knows every game and gives great recommendations.',
          date: '2 days ago',
          avatar: '🎯'
        },
        {
          id: 2,
          author: 'Game Night Gina',
          rating: 4,
          comment: 'Perfect for groups and dates. Food is decent but games are the real star here.',
          date: '4 days ago',
          avatar: '🎲'
        }
      ],
      "Knitting Circle Studio": [
        {
          id: 1,
          author: 'Yarn Enthusiast',
          rating: 5,
          comment: 'Wonderful community of knitters! Learned so many new techniques and made great friends.',
          date: '3 days ago',
          avatar: '🧶'
        },
        {
          id: 2,
          author: 'Stitch Sam',
          rating: 4,
          comment: 'High-quality yarn and patient instructors. Classes fill up quickly so book early.',
          date: '1 week ago',
          avatar: '🪡'
        }
      ],
      "Electronic Music Lab": [
        {
          id: 1,
          author: 'Beat Maker Ben',
          rating: 5,
          comment: 'State-of-the-art equipment and knowledgeable instructors. Perfect for learning production!',
          date: '1 day ago',
          avatar: '🎧'
        },
        {
          id: 2,
          author: 'DJ Donna',
          rating: 4,
          comment: 'Great studio setup but could use more variety in software options. Still highly recommend!',
          date: '3 days ago',
          avatar: '🎛️'
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
      },
      "The Book Club Café": {
        address: "1834 Divisadero St, San Francisco, CA 94115",
        hours: "Mon-Sun: 7:00 AM - 9:00 PM\nBook Club: Wednesdays 7:00 PM",
        contact: "(415) 567-8910",
        price: "$$ - Coffee, books, and club membership",
        website: "https://bookclubcafe.com"
      },
      "Mission Rock Music Studio": {
        address: "817 Terry A Francois Blvd, San Francisco, CA 94158",
        hours: "Daily: 10:00 AM - 12:00 AM",
        contact: "(415) 555-ROCK",
        price: "$$$ - Hourly studio rental and lessons",
        website: "https://missionrockstudio.com"
      },
      "GameOn Arcade": {
        address: "2435 Fillmore St, San Francisco, CA 94115",
        hours: "Mon-Thu: 4:00 PM - 11:00 PM\nFri-Sun: 12:00 PM - 1:00 AM",
        contact: "(415) 555-GAME",
        price: "$$ - Pay per game or unlimited day pass",
        website: "https://gameonarcade.com"
      },
      "Castro Climbing Co.": {
        address: "2301 Market St, San Francisco, CA 94114",
        hours: "Mon-Fri: 6:00 AM - 10:00 PM\nSat-Sun: 8:00 AM - 9:00 PM",
        contact: "(415) 555-CLIMB",
        price: "$$$ - Premium climbing with personal training",
        website: "https://castroclimbing.com"
      },
      "Maker Workshop SF": {
        address: "1234 Valencia St, San Francisco, CA 94110",
        hours: "Tue-Sun: 10:00 AM - 8:00 PM\nClosed Mondays",
        contact: "(415) 555-MAKE",
        price: "$$ - Workshop fees and material costs",
        website: "https://makerworkshopsf.com"
      },
      "Tennis Club Marina": {
        address: "645 Marina Blvd, San Francisco, CA 94123",
        hours: "Daily: 6:00 AM - 10:00 PM",
        contact: "(415) 555-TENNIS",
        price: "$$$ - Premium membership and coaching",
        website: "https://tennisclubmarina.com"
      },
      "Sunset Book Exchange": {
        address: "1234 Noriega St, San Francisco, CA 94122",
        hours: "Mon-Sat: 10:00 AM - 8:00 PM\nSun: 11:00 AM - 6:00 PM",
        contact: "(415) 555-BOOKS",
        price: "$ - Used books and author events",
        website: "https://sunsetbooks.com"
      },
      "Jazz Corner SF": {
        address: "1601 Fillmore St, San Francisco, CA 94115",
        hours: "Wed-Sun: 7:00 PM - 2:00 AM\nClosed Mon-Tue",
        contact: "(415) 555-JAZZ",
        price: "$$$ - Cover charge and drink minimum",
        website: "https://jazzcornersf.com"
      },
      "VR Gaming Lounge": {
        address: "789 Howard St, San Francisco, CA 94103",
        hours: "Daily: 11:00 AM - 11:00 PM",
        contact: "(415) 555-VR",
        price: "$$ - Hourly VR station rental",
        website: "https://vrgamingsf.com"
      },
      "Art & Craft Collective": {
        address: "555 20th St, San Francisco, CA 94107",
        hours: "Mon-Fri: 12:00 PM - 9:00 PM\nSat-Sun: 10:00 AM - 7:00 PM",
        contact: "(415) 555-ART",
        price: "$$ - Class fees and material costs",
        website: "https://artcraftcollective.com"
      },
      "Rock Climbing Outdoors": {
        address: "900 North Point St, San Francisco, CA 94109",
        hours: "Daily: 7:00 AM - 7:00 PM\nWeather dependent",
        contact: "(415) 555-ROCK",
        price: "$$$ - Guided tours and equipment rental",
        website: "https://rockclimbingoutdoors.com"
      },
      "Indie Music Venue": {
        address: "456 Valencia St, San Francisco, CA 94103",
        hours: "Thu-Sat: 8:00 PM - 2:00 AM\nSun: 7:00 PM - 12:00 AM",
        contact: "(415) 555-INDIE",
        price: "$$ - Cover charge varies by show",
        website: "https://indiemusicvenue.com"
      },
      "Board Game Café": {
        address: "321 Irving St, San Francisco, CA 94122",
        hours: "Daily: 11:00 AM - 11:00 PM",
        contact: "(415) 555-BOARD",
        price: "$$ - Table fee plus food and drinks",
        website: "https://boardgamecafe.com"
      },
      "Knitting Circle Studio": {
        address: "789 Castro St, San Francisco, CA 94114",
        hours: "Mon-Fri: 10:00 AM - 7:00 PM\nSat-Sun: 9:00 AM - 6:00 PM",
        contact: "(415) 555-KNIT",
        price: "$$ - Classes and yarn purchases",
        website: "https://knittingcircle.com"
      },
      "Electronic Music Lab": {
        address: "1010 Folsom St, San Francisco, CA 94103",
        hours: "Tue-Sat: 2:00 PM - 11:00 PM\nSun-Mon: 3:00 PM - 9:00 PM",
        contact: "(415) 555-BEATS",
        price: "$$$ - Studio time and equipment rental",
        website: "https://electronicmusiclab.com"
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
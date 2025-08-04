import React, { useState } from 'react'

function Shop({ MapsToMain }) {
  const [selectedCategory, setSelectedCategory] = useState('premium')

  const premiumFeatures = [
    {
      id: 1,
      name: "Premium Plan",
      price: "$4.99/month",
      originalPrice: "$9.99",
      discount: "50% OFF",
      features: [
        "No Ads",
        "Unlimited Reminders",
        "Advanced Analytics",
        "Custom Goals",
        "Priority Support"
      ],
      popular: true
    },
    {
      id: 2,
      name: "Annual Plan",
      price: "$39.99/year",
      originalPrice: "$119.88",
      discount: "67% OFF",
      features: [
        "All Premium Features",
        "2 Months Free",
        "Early Access to Features",
        "Exclusive Content"
      ],
      popular: false
    }
  ]

  const shopItems = [
    {
      id: 1,
      name: "Explorer Badge",
      price: "100 coins",
      description: "Show off your exploration skills",
      icon: "🏆",
      category: "badges"
    },
    {
      id: 2,
      name: "Custom Map Theme",
      price: "50 coins",
      description: "Personalize your map appearance",
      icon: "🗺️",
      category: "themes"
    },
    {
      id: 3,
      name: "Extra Reminders",
      price: "25 coins",
      description: "Set more daily reminders",
      icon: "⏰",
      category: "features"
    }
  ]

  return (
    <div className="shop-page">
      {/* 상단 바 */}
      <div className="top-bar">
        <button className="back-button" onClick={MapsToMain}>
          ← Back
        </button>
        <h2>Shop</h2>
        <div className="coins-display">
          <span className="coin-icon">🪙</span>
          <span className="coins-amount">1,250</span>
        </div>
      </div>

      <div className="shop-content">
        {/* 카테고리 탭 */}
        <div className="shop-tabs">
          <button 
            className={`tab-btn ${selectedCategory === 'premium' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('premium')}
          >
            Premium
          </button>
          <button 
            className={`tab-btn ${selectedCategory === 'items' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('items')}
          >
            Shop Items
          </button>
        </div>

        {/* Premium Plans */}
        {selectedCategory === 'premium' && (
          <div className="premium-section">
            <div className="premium-header">
              <h3>Upgrade to Premium</h3>
              <p>Unlock all features and remove ads</p>
            </div>

            <div className="premium-plans">
              {premiumFeatures.map((plan) => (
                <div key={plan.id} className={`premium-plan ${plan.popular ? 'popular' : ''}`}>
                  {plan.popular && <div className="popular-badge">MOST POPULAR</div>}
                  <div className="plan-header">
                    <h4>{plan.name}</h4>
                    <div className="plan-pricing">
                      <span className="current-price">{plan.price}</span>
                      <span className="original-price">{plan.originalPrice}</span>
                      <span className="discount-badge">{plan.discount}</span>
                    </div>
                  </div>
                  <ul className="plan-features">
                    {plan.features.map((feature, index) => (
                      <li key={index}>✓ {feature}</li>
                    ))}
                  </ul>
                  <button className="subscribe-btn">
                    Subscribe Now
                  </button>
                </div>
              ))}
            </div>

            <div className="premium-benefits">
              <h4>Premium Benefits</h4>
              <div className="benefits-grid">
                <div className="benefit-item">
                  <div className="benefit-icon">🚫</div>
                  <div className="benefit-text">No Ads</div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">📊</div>
                  <div className="benefit-text">Advanced Stats</div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🎯</div>
                  <div className="benefit-text">Custom Goals</div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🔔</div>
                  <div className="benefit-text">Unlimited Reminders</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Shop Items */}
        {selectedCategory === 'items' && (
          <div className="items-section">
            <div className="items-header">
              <h3>Shop Items</h3>
              <p>Use your coins to unlock special items</p>
            </div>

            <div className="items-grid">
              {shopItems.map((item) => (
                <div key={item.id} className="shop-item">
                  <div className="item-icon">{item.icon}</div>
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <div className="item-price">{item.price}</div>
                  </div>
                  <button className="buy-btn">
                    Buy
                  </button>
                </div>
              ))}
            </div>

            <div className="earn-coins">
              <h4>Earn More Coins</h4>
              <div className="coin-tasks">
                <div className="task-item">
                  <span className="task-icon">🎯</span>
                  <span className="task-text">Complete daily goal</span>
                  <span className="task-reward">+10 coins</span>
                </div>
                <div className="task-item">
                  <span className="task-icon">🏆</span>
                  <span className="task-text">Visit 5 new places</span>
                  <span className="task-reward">+50 coins</span>
                </div>
                <div className="task-item">
                  <span className="task-icon">📅</span>
                  <span className="task-text">7-day streak</span>
                  <span className="task-reward">+100 coins</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Special Offer Banner */}
        <div className="special-offer">
          <div className="offer-content">
            <h4>Summer Sale!</h4>
            <p>Last Chance - Save 67% & Get Premium</p>
            <button className="offer-btn">Claim Offer</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop 
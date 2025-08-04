import React from 'react';
import '../styles/IndexPage.css';

function IndexPage({ onSignup }) {
  return (
    <div className="index-page">
      <div className="index-container">
        <div className="welcome-section">
          <div className="logo-section">
            <div className="logo-icon">🎯</div>
            <h1 className="app-title">Hobby Log</h1>
            <p className="app-subtitle">Your Personal Growth Companion</p>
          </div>
          
          <div className="hero-content">
            <h2 className="hero-title">
              Discover, Track, and Master Your Hobbies
            </h2>
            <p className="hero-description">
              Start your journey of personal growth with our intelligent hobby tracking system. 
              Connect with your perfect companion and achieve your goals together.
            </p>
          </div>

          <div className="cta-section">
            <button className="signup-button" onClick={onSignup}>
              <span className="button-icon">🚀</span>
              <span>Get Started</span>
            </button>
            <p className="signup-subtitle">
              Join thousands of users on their hobby journey
            </p>
          </div>
        </div>

        <div className="features-preview">
          <div className="feature-item">
            <div className="feature-icon">📊</div>
            <span>Track Progress</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🎯</div>
            <span>Set Goals</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🏆</div>
            <span>Earn Rewards</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">👥</div>
            <span>Join Community</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
import React from 'react';

// This component is ready to be used. Just copy and paste it into your project.
function HobbyLogLandingPage({ startDemo }) {
  return (
    <>
      <style>
        {`
          /* --- Google Font Import --- */
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

          /* --- CSS 변수 및 기본 설정 --- */
          :root {
            --primary-color: #5A67D8; /* Indigo */
            --primary-light: #7f8ce2;
            --secondary-color: #3f4a9b;
            --text-dark: #1A202C; /* Gray 900 */
            --text-medium: #4A5568; /* Gray 600 */
            --text-light: #A0AEC0; /* Gray 400 */
            --bg-light: #F7FAFC; /* Gray 100 */
            --bg-white: #FFFFFF;
            --border-color: #E2E8F0; /* Gray 300 */
            --shadow-sm: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
            --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            --radius-md: 12px;
            --radius-lg: 20px;
          }

          /* --- 리셋 및 기본 스타일 --- */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          html {
            scroll-behavior: smooth;
          }

          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            color: var(--text-dark);
            background-color: var(--bg-white);
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            overflow-x: hidden;
          }
          
          .landing-container {
            width: 100%;
          }

          /* --- 섹션 공통 스타일 --- */
          .section {
            padding: 8rem 2rem;
            max-width: 1280px;
            margin: 0 auto;
          }

          .section-title {
            font-size: 2.75rem;
            font-weight: 800;
            text-align: center;
            margin-bottom: 1rem;
            color: var(--text-dark);
          }
          
          .section-subtitle {
            font-size: 1.15rem;
            text-align: center;
            color: var(--text-medium);
            max-width: 600px;
            margin: 0 auto 4rem auto;
          }

          /* --- 애니메이션 --- */
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
            opacity: 0;
          }

          /* --- Hero Section --- */
          .hero-section {
            background-color: var(--bg-light);
            min-height: 100vh;
            display: flex;
            align-items: center;
            padding: 4rem 2rem;
          }
          
          .hero-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: center;
            gap: 4rem;
            max-width: 1280px;
            margin: 0 auto;
          }

          .hero-text .hero-tag {
            display: inline-block;
            background-color: #E9D8FD; /* Light Purple */
            color: #805AD5; /* Purple */
            padding: 0.5rem 1rem;
            border-radius: 999px;
            font-weight: 600;
            margin-bottom: 1.5rem;
          }

          .hero-text .hero-title {
            font-size: 4rem;
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: 1.5rem;
            /* THIS IS THE FIX: Prevents text from overflowing its container */
            overflow-wrap: break-word;
          }

          .hero-text .hero-description {
            font-size: 1.2rem;
            color: var(--text-medium);
            margin-bottom: 2.5rem;
            max-width: 500px;
          }

          .cta-button {
            background-color: var(--primary-color);
            color: var(--bg-white);
            border: none;
            padding: 1rem 2.5rem;
            font-size: 1.1rem;
            font-weight: 600;
            border-radius: var(--radius-md);
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            transition: all 0.3s ease;
            box-shadow: var(--shadow-md);
          }
          
          .cta-button:hover {
            background-color: var(--primary-light);
            transform: translateY(-3px);
            box-shadow: var(--shadow-lg);
          }
          
          /* Phone Mockup */
          .hero-visual {
            perspective: 1500px;
          }
          
          .phone-mockup {
            width: 320px;
            height: 640px;
            background-color: #1a1a1a;
            border-radius: 48px;
            padding: 16px;
            box-shadow: var(--shadow-lg);
            transform: rotateY(-15deg) rotateX(5deg);
            transition: transform 0.4s ease;
          }
          
          .hero-visual:hover .phone-mockup {
             transform: rotateY(0deg) rotateX(0deg);
          }

          .phone-screen {
            width: 100%;
            height: 100%;
            background: linear-gradient(145deg, #2D3748, #1A202C);
            border-radius: 36px;
            padding: 2rem 1.5rem;
            color: white;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            position: relative;
            overflow: hidden;
          }
          
          .mockup-header { font-weight: 600; font-size: 1rem; }
          .mockup-card {
            background: rgba(255, 255, 255, 0.1);
            padding: 1rem;
            border-radius: var(--radius-md);
            backdrop-filter: blur(10px);
          }
          .mockup-card-title { font-weight: 500; font-size: 0.9rem; margin-bottom: 0.5rem; color: var(--text-light); }
          .mockup-card-content { font-size: 1.5rem; font-weight: 700; }
          
          .mockup-map-placeholder {
            flex-grow: 1;
            background: url('https://www.transparenttextures.com/patterns/subtle-carbon.png'), linear-gradient(145deg, #4A5568, #2D3748);
            border-radius: var(--radius-md);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            color: var(--primary-light);
          }


          /* --- Features Section --- */
          .features-section {
            background-color: var(--bg-white);
          }
          
          .features-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
          }

          .feature-card {
            background: var(--bg-light);
            padding: 2.5rem 2rem;
            border-radius: var(--radius-lg);
            text-align: center;
            transition: all 0.3s ease;
            border: 1px solid transparent;
          }
          
          .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-md);
            border-color: var(--primary-color);
          }

          .feature-icon {
            height: 64px;
            width: 64px;
            margin: 0 auto 1.5rem auto;
            border-radius: var(--radius-md);
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--primary-color);
            color: white;
            font-size: 2rem;
            font-weight: bold;
          }

          .feature-card h3 {
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 0.75rem;
          }
          
          .feature-card p {
            color: var(--text-medium);
          }
          
          /* --- How it Works Section --- */
          .how-it-works-section {
            background-color: var(--bg-light);
          }
          
          .steps-container {
            display: flex;
            flex-direction: column;
            gap: 4rem;
            position: relative;
          }
          
          /* Timeline line */
          .steps-container::before {
            content: '';
            position: absolute;
            top: 40px;
            bottom: 40px;
            left: 39px;
            width: 2px;
            background-color: var(--border-color);
            z-index: 0;
          }

          .step {
            display: flex;
            align-items: flex-start;
            gap: 2rem;
            position: relative;
            z-index: 1;
          }

          .step-number {
            width: 80px;
            height: 80px;
            background-color: var(--bg-white);
            color: var(--primary-color);
            border: 2px solid var(--primary-color);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            font-weight: 700;
            flex-shrink: 0;
          }

          .step-content h3 {
            font-size: 1.75rem;
            font-weight: 700;
            margin-bottom: 1rem;
          }
          
          .step-content p {
            font-size: 1.1rem;
            color: var(--text-medium);
            max-width: 650px;
          }


          /* --- Features Detail Section --- */
          .feature-detail {
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: center;
            gap: 5rem;
            margin-bottom: 8rem;
          }
          
          .feature-detail:last-child { margin-bottom: 0; }
          .feature-detail.reverse { grid-template-columns: 1fr 1fr; }
          .feature-detail.reverse .feature-detail-content { grid-column: 2 / 3; grid-row: 1 / 2; }
          .feature-detail.reverse .feature-detail-visual { grid-column: 1 / 2; grid-row: 1 / 2; }

          .feature-detail-content h2 {
            font-size: 2.25rem;
            font-weight: 800;
            margin-bottom: 1.5rem;
          }

          .feature-detail-content .description {
            color: var(--text-medium);
            margin-bottom: 2rem;
            font-size: 1.1rem;
          }

          .feature-list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .feature-list li {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-weight: 500;
          }
          
          .feature-list li::before {
            content: '✓';
            color: var(--primary-color);
            font-weight: 700;
            font-size: 1.2rem;
          }
          
          .feature-detail-visual {
            background-color: var(--bg-light);
            border-radius: var(--radius-lg);
            padding: 2rem;
            min-height: 450px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: var(--shadow-md);
          }
          
          /* Visual Mocks */
          .visual-mock {
             width: 100%;
             height: 100%;
             border-radius: var(--radius-md);
             background-color: var(--bg-white);
             padding: 1.5rem;
             box-shadow: var(--shadow-sm);
             color: var(--text-medium);
             text-align: center;
             display:flex;
             align-items: center;
             justify-content: center;
             font-weight: 600;
          }

          /* --- CTA Section --- */
          .cta-section {
            background-color: var(--text-dark);
            color: var(--bg-white);
            text-align: center;
            padding: 6rem 2rem;
          }
          
          .cta-section h2 {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 1.5rem;
          }
          
          .cta-section p {
            color: var(--text-light);
            font-size: 1.15rem;
            max-width: 600px;
            margin: 0 auto 2.5rem auto;
          }
          
          .cta-button.large {
            padding: 1.2rem 3rem;
            font-size: 1.2rem;
          }

          /* --- Footer --- */
          .footer {
            background-color: var(--bg-light);
            padding: 5rem 2rem 2rem;
            border-top: 1px solid var(--border-color);
          }
          
          .footer-content {
            max-width: 1280px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr;
            gap: 3rem;
          }
          
          .footer-section h4 {
            font-size: 1.1rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            color: var(--text-dark);
          }

          .footer-section p, .footer-section li {
            color: var(--text-medium);
            margin-bottom: 0.5rem;
          }
          
          .footer-section ul { list-style: none; }
          .footer-section ul li { cursor: pointer; transition: color 0.2s; }
          .footer-section ul li:hover { color: var(--primary-color); }
          
          .footer-bottom {
            max-width: 1280px;
            margin: 4rem auto 0;
            padding-top: 2rem;
            border-top: 1px solid var(--border-color);
            text-align: center;
            color: var(--text-medium);
          }


          /* --- Responsive Design --- */
          @media (max-width: 1024px) {
            .hero-content { grid-template-columns: 1fr; text-align: center; }
            .hero-text .hero-description { margin: 0 auto 2.5rem auto; }
            .hero-visual { margin-top: 4rem; }
            .phone-mockup { transform: rotateY(0) rotateX(0); }
            
            .features-grid { grid-template-columns: repeat(2, 1fr); }
            .feature-detail, .feature-detail.reverse { grid-template-columns: 1fr; }
            .feature-detail.reverse .feature-detail-content { grid-column: auto; grid-row: auto; }
            .feature-detail.reverse .feature-detail-visual { grid-column: auto; grid-row: auto; }
            .feature-detail .feature-detail-content { text-align: center; }
            .feature-detail .feature-list li { justify-content: center; }
            .feature-detail-visual { margin-bottom: 3rem; }
            
            .footer-content { grid-template-columns: 1fr 1fr; }
            .footer-section:first-child { grid-column: 1 / 3; }
          }
          
          @media (max-width: 768px) {
            .section { padding: 5rem 1.5rem; }
            .section-title { font-size: 2.25rem; }
            .hero-section { padding: 5rem 1.5rem; }
            .hero-text .hero-title { font-size: 3rem; }
            
            .features-grid { grid-template-columns: 1fr; }
            
            .step { flex-direction: column; text-align: center; align-items: center; }
            .steps-container::before { left: 50%; transform: translateX(-50%); }

            .footer-content { grid-template-columns: 1fr; }
            .footer-section:first-child { grid-column: auto; }
          }
        `}
      </style>
      <div className="landing-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-text fade-in-up">
              <div className="hero-tag">Your Passion, Perfected</div>
              <h1 className="hero-title">Discover, Track, and Master Your Hobbies</h1>
              <p className="hero-description">
                Find amazing hobby places around you, track your progress, and connect with fellow enthusiasts. 
                Turn your interests into achievements with Hobby Log.
              </p>
              <button className="cta-button" onClick={startDemo}>
                <span>🚀</span>
                <span>Start Demo</span>
              </button>
            </div>
            <div className="hero-visual fade-in-up">
              <div className="phone-mockup">
                <div className="phone-screen">
                  <div className="mockup-header">Hobby Explorer</div>
                  <div className="mockup-card">
                    <div className="mockup-card-title">Monthly Achievement</div>
                    <div className="mockup-card-content">📊 83%</div>
                  </div>
                  <div className="mockup-card">
                    <div className="mockup-card-title">Places Visited</div>
                    <div className="mockup-card-content">🏆 12</div>
                  </div>
                  <div className="mockup-map-placeholder">
                    <span>🗺️</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section section">
          <h2 className="section-title">Why Choose Hobby Log?</h2>
          <p className="section-subtitle">Discover powerful features designed to elevate your hobby experience from simple tracking to meaningful growth.</p>
          <div className="features-grid">
            <div className="feature-card fade-in-up">
              <div className="feature-icon">🗺️</div>
              <h3>Smart Discovery</h3>
              <p>Find the best hobby places near you with our intelligent location-based recommendations.</p>
            </div>
            <div className="feature-card fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="feature-icon">📊</div>
              <h3>Progress Tracking</h3>
              <p>Monitor your hobby journey with detailed statistics and personalized insights.</p>
            </div>
            <div className="feature-card fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="feature-icon">🏆</div>
              <h3>Achievement System</h3>
              <p>Earn badges and complete challenges as you explore new places and master your hobbies.</p>
            </div>
            <div className="feature-card fade-in-up" style={{animationDelay: '0s'}}>
              <div className="feature-icon">👥</div>
              <h3>Thriving Community</h3>
              <p>Connect with fellow hobby enthusiasts, share your experiences, and get inspired.</p>
            </div>
            <div className="feature-card fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="feature-icon">🎯</div>
              <h3>Custom Goals</h3>
              <p>Set personalized goals and track your progress with flexible scheduling options.</p>
            </div>
            <div className="feature-card fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="feature-icon">🎁</div>
              <h3>Exclusive Rewards</h3>
              <p>Earn coins and unlock premium features as you achieve your hobby milestones.</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works-section section">
          <h2 className="section-title">Get Started in 3 Easy Steps</h2>
          <p className="section-subtitle">Hobby Log is designed to be intuitive and fun, so you can start your journey without any hassle.</p>
          <div className="steps-container">
            <div className="step fade-in-up">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Explore Places</h3>
                <p>Browse through curated hobby places on our interactive map. From tennis courts to art galleries, find your perfect spot.</p>
              </div>
            </div>
            <div className="step fade-in-up">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Track Your Progress</h3>
                <p>Log your visits and track your mood. Watch your progress grow with beautiful charts and statistics.</p>
              </div>
            </div>
            <div className="step fade-in-up">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Achieve Your Goals</h3>
                <p>Complete challenges, earn badges, and level up your hobby mastery. Share your achievements with the community.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Detail Section */}
        <section className="features-detail-section section">
          <div className="feature-detail fade-in-up">
            <div className="feature-detail-content">
              <h2>Interactive Map Experience</h2>
              <p className="description">Navigate through the best hobby destinations with our intuitive map interface. Each location is carefully curated and includes detailed information.</p>
              <ul className="feature-list">
                <li>Real-time location filtering</li>
                <li>Personalized recommendations</li>
                <li>Mobile-optimized interface</li>
                <li>User ratings and reviews</li>
              </ul>
            </div>
            <div className="feature-detail-visual">
                <div className="visual-mock">🗺️ Interactive Map UI Mockup</div>
            </div>
          </div>

          <div className="feature-detail reverse fade-in-up">
            <div className="feature-detail-content">
              <h2>Comprehensive Analytics</h2>
              <p className="description">Get deep insights into your hobby journey with our advanced analytics dashboard. Track your mood patterns, visit frequency, and progress over time.</p>
              <ul className="feature-list">
                <li>Detailed progress charts</li>
                <li>Mood tracking and analysis</li>
                <li>Visit history and patterns</li>
                <li>Goal completion rates</li>
              </ul>
            </div>
            <div className="feature-detail-visual">
                <div className="visual-mock">📊 Analytics Dashboard UI Mockup</div>
            </div>
          </div>
          
          <div className="feature-detail fade-in-up">
            <div className="feature-detail-content">
              <h2>Gamified Experience</h2>
              <p className="description">Make your hobby journey exciting with our gamification system. Earn badges, complete challenges, and compete with friends while pursuing your passions.</p>
              <ul className="feature-list">
                <li>Various achievement badges</li>
                <li>Daily and weekly challenges</li>
                <li>Experience-based progress levels</li>
                <li>Community ranking system</li>
              </ul>
            </div>
            <div className="feature-detail-visual">
              <div className="visual-mock">🏆 Gamification Elements UI Mockup</div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <h2 className="fade-in-up">Ready to Start Your Hobby Journey?</h2>
          <p className="fade-in-up" style={{animationDelay: '0.1s'}}>Join thousands of users who are already discovering new passions and achieving their goals with Hobby Log.</p>
          <div className="fade-in-up" style={{animationDelay: '0.2s'}}>
              <button className="cta-button large" onClick={startDemo}>
                <span>🚀</span>
                <span>Start Your Demo Now</span>
              </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Hobby Log</h4>
              <p>Your personal hobby exploration companion.</p>
            </div>
            <div className="footer-section">
              <h4>Features</h4>
              <ul>
                <li>Smart Discovery</li>
                <li>Progress Tracking</li>
                <li>Community</li>
                <li>Challenges</li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
             <div className="footer-section">
              <h4>Social</h4>
              <ul>
                <li>Instagram</li>
                <li>Facebook</li>
                <li>Blog</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Hobby Log. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default HobbyLogLandingPage;
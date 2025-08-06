import React from 'react';
import mapUiImage from '../assets/mockups/map_ui.png';

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
            background: linear-gradient(145deg, #ffffff, #f8f9fa);
            border-radius: 36px;
            padding: 1rem;
            color: #1a202c;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            position: relative;
            overflow: hidden;
            box-shadow: inset 0 0 0 1px rgba(0,0,0,0.1);
          }
          
          /* Phone Screen UI Elements */
          .mockup-status-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.7rem;
            font-weight: 600;
            color: #1a202c;
            padding: 0.25rem 0.5rem;
          }
          
          .status-time {
            font-weight: 700;
          }
          
          .status-icons {
            display: flex;
            gap: 0.25rem;
            font-size: 0.6rem;
          }
          
          .mockup-app-header {
            text-align: center;
            padding: 0.5rem 0;
            border-bottom: 1px solid rgba(0,0,0,0.1);
            margin-bottom: 0.75rem;
          }
          
          .app-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 0.125rem;
          }
          
          .app-subtitle {
            font-size: 0.7rem;
            color: var(--text-medium);
            font-weight: 500;
          }
          
          .mockup-main-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }
          
          .mockup-card {
            background: linear-gradient(145deg, #ffffff, #f1f3f4);
            padding: 0.75rem;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            border: 1px solid rgba(0,0,0,0.05);
          }
          
          .mockup-card.primary {
            background: linear-gradient(145deg, var(--primary-color), var(--primary-light));
            color: white;
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }
          
          .mockup-card-icon {
            font-size: 1.5rem;
            width: 2.5rem;
            height: 2.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255,255,255,0.2);
            border-radius: 8px;
          }
          
          .mockup-card-info {
            flex: 1;
          }
          
          .mockup-card-title {
            font-size: 0.7rem;
            opacity: 0.9;
            margin-bottom: 0.125rem;
            font-weight: 500;
          }
          
          .mockup-card-content {
            font-size: 1rem;
            font-weight: 700;
          }
          
          .mockup-stats-row {
            display: flex;
            gap: 0.5rem;
            margin: 0.5rem 0;
          }
          
          .mockup-stat-item {
            flex: 1;
            text-align: center;
            background: rgba(255,255,255,0.8);
            padding: 0.5rem;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          
          .stat-number {
            font-size: 1rem;
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 0.125rem;
          }
          
          .stat-label {
            font-size: 0.6rem;
            color: var(--text-medium);
            font-weight: 500;
          }
          
          .mockup-map-container {
            flex: 1;
            background: rgba(255,255,255,0.9);
            border-radius: 12px;
            padding: 0.75rem;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .map-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.8rem;
            font-weight: 600;
            color: var(--text-dark);
            padding-bottom: 0.5rem;
            border-bottom: 1px solid rgba(0,0,0,0.1);
          }
          
          .mockup-map-area {
            flex: 1;
            position: relative;
            background: linear-gradient(135deg, #e3f2fd, #f1f8e9);
            border-radius: 8px;
            min-height: 120px;
            overflow: hidden;
          }
          
          .map-marker {
            position: absolute;
            font-size: 1.2rem;
            z-index: 2;
            animation: markerFloat 2s ease-in-out infinite;
          }
          
          @keyframes markerFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
          }
          
          .user-location {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 1rem;
            z-index: 3;
            color: #2196F3;
          }
          
          .mockup-tab-bar {
            display: flex;
            background: rgba(255,255,255,0.95);
            border-radius: 16px;
            padding: 0.5rem;
            box-shadow: 0 -2px 8px rgba(0,0,0,0.1);
            margin-top: 0.5rem;
          }
          
          .tab-item {
            flex: 1;
            text-align: center;
            padding: 0.5rem;
            border-radius: 12px;
            transition: all 0.2s ease;
            cursor: pointer;
          }
          
          .tab-item.active {
            background: var(--primary-color);
            color: white;
            font-size: 1rem;
          }
          
          .tab-item:not(.active) {
            opacity: 0.6;
            font-size: 0.9rem;
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

          /* Analytics Demo */
          .analytics-demo {
            width: 100%;
            height: 100%;
            border-radius: var(--radius-md);
            background-color: var(--bg-white);
            padding: 1.5rem;
            box-shadow: var(--shadow-sm);
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .demo-header {
            font-weight: 700;
            font-size: 1rem;
            color: var(--text-dark);
            margin-bottom: 1rem;
            text-align: center;
          }

          .demo-section-title {
            font-size: 0.8rem;
            font-weight: 600;
            color: var(--text-medium);
            margin-bottom: 0.5rem;
          }

          /* Mood Graph Demo */
          .demo-mood-graph {
            display: flex;
            align-items: end;
            gap: 0.3rem;
            height: 60px;
            padding: 0.5rem;
            background-color: var(--bg-light);
            border-radius: 8px;
          }

          .demo-mood-bar-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
            height: 100%;
            position: relative;
          }

          .demo-mood-bar {
            width: 100%;
            min-height: 8px;
            border-radius: 2px 2px 0 0;
            margin-bottom: 0.25rem;
          }

          .demo-mood-bar.good {
            background: linear-gradient(to top, #4CAF50, #81C784);
          }

          .demo-mood-bar.low {
            background: linear-gradient(to top, #FF7043, #FFAB91);
          }

          .demo-day-label {
            font-size: 0.6rem;
            color: var(--text-medium);
            font-weight: 500;
          }

          /* SDT Scores Demo */
          .demo-sdt-scores {
            display: flex;
            gap: 0.75rem;
            padding: 0.5rem;
            background-color: var(--bg-light);
            border-radius: 8px;
          }

          .demo-score-item {
            flex: 1;
            text-align: center;
          }

          .demo-score-value {
            font-size: 1rem;
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 0.25rem;
          }

          .demo-score-label {
            font-size: 0.7rem;
            color: var(--text-medium);
            font-weight: 500;
          }

          /* Stats Demo */
          .demo-stats-grid {
            display: flex;
            gap: 0.75rem;
          }

          .demo-stat-item {
            flex: 1;
            text-align: center;
            padding: 0.5rem;
            background-color: var(--bg-light);
            border-radius: 8px;
          }

          .demo-stat-number {
            font-size: 1rem;
            font-weight: 700;
            color: var(--text-dark);
            margin-bottom: 0.25rem;
          }

          .demo-stat-label {
            font-size: 0.7rem;
            color: var(--text-medium);
            font-weight: 500;
          }

          /* Challenges Demo */
          .challenges-demo {
            width: 100%;
            height: 100%;
            border-radius: var(--radius-md);
            background-color: var(--bg-white);
            padding: 1.5rem;
            box-shadow: var(--shadow-sm);
            display: flex;
            flex-direction: column;
            gap: 1rem;
            overflow-y: auto;
          }

          /* Progress Overview */
          .demo-progress-bars {
            padding: 0.5rem;
            background-color: var(--bg-light);
            border-radius: 8px;
          }

          .demo-progress-bar {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .demo-progress-label {
            font-size: 0.7rem;
            font-weight: 600;
            color: var(--text-dark);
          }

          .demo-progress-track {
            height: 8px;
            background-color: var(--border-color);
            border-radius: 4px;
            overflow: hidden;
          }

          .demo-progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #4CAF50, #66BB6A);
            border-radius: 4px;
            transition: width 0.3s ease;
          }

          /* Challenge Items */
          .demo-challenges-list {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .demo-challenge-item {
            display: flex;
            align-items: center;
            padding: 0.75rem;
            background-color: var(--bg-light);
            border-radius: 8px;
            gap: 0.75rem;
          }

          .demo-challenge-item.completed {
            opacity: 0.7;
            background-color: #E8F5E8;
          }

          .demo-challenge-icon {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            background-color: var(--bg-white);
            border-radius: 6px;
            box-shadow: var(--shadow-sm);
          }

          .demo-challenge-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }

          .demo-challenge-title {
            font-size: 0.8rem;
            font-weight: 600;
            color: var(--text-dark);
          }

          .demo-challenge-progress {
            font-size: 0.7rem;
            color: var(--text-medium);
            font-weight: 500;
          }

          .demo-challenge-reward {
            font-size: 1rem;
          }

          /* Stats Summary */
          .demo-stats-summary {
            display: flex;
            gap: 0.75rem;
          }

          .demo-summary-item {
            flex: 1;
            text-align: center;
            padding: 0.5rem;
            background-color: var(--bg-light);
            border-radius: 8px;
          }

          .demo-summary-number {
            font-size: 1rem;
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 0.25rem;
          }

          .demo-summary-label {
            font-size: 0.7rem;
            color: var(--text-medium);
            font-weight: 500;
          }

          /* Map Demo */
          .map-demo {
            width: 100%;
            height: 100%;
            border-radius: var(--radius-md);
            background-color: var(--bg-white);
            padding: 1.5rem;
            box-shadow: var(--shadow-sm);
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .demo-map-area {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .demo-map-container {
            flex: 1;
            position: relative;
            min-height: 200px;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: var(--shadow-sm);
          }

          .demo-map-bg {
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #E3F2FD, #F1F8E9);
            position: relative;
            overflow: hidden;
          }

          .demo-map-grid {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px);
            background-size: 20px 20px;
            opacity: 0.3;
          }

          .demo-marker {
            position: absolute;
            transform: translate(-50%, -50%);
            z-index: 2;
          }

          .demo-marker-icon {
            width: 28px;
            height: 28px;
            background-color: var(--bg-white);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            border: 2px solid var(--primary-color);
            animation: markerBounce 2s ease-in-out infinite;
          }

          @keyframes markerBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }

          .demo-current-location {
            position: absolute;
            transform: translate(-50%, -50%);
            z-index: 3;
          }

          .demo-location-dot {
            width: 12px;
            height: 12px;
            background-color: #2196F3;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            position: relative;
            z-index: 2;
          }

          .demo-location-pulse {
            position: absolute;
            top: -8px;
            left: -8px;
            width: 28px;
            height: 28px;
            border: 2px solid #2196F3;
            border-radius: 50%;
            animation: pulse 2s ease-in-out infinite;
            opacity: 0.6;
          }

          @keyframes pulse {
            0% {
              transform: scale(0.8);
              opacity: 0.6;
            }
            50% {
              transform: scale(1.2);
              opacity: 0.3;
            }
            100% {
              transform: scale(0.8);
              opacity: 0.6;
            }
          }

          .demo-map-info {
            display: flex;
            gap: 1rem;
            padding: 0.75rem;
            background-color: var(--bg-light);
            border-radius: 8px;
          }

          .demo-info-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex: 1;
          }

          .demo-info-icon {
            font-size: 1rem;
          }

          .demo-info-text {
            font-size: 0.8rem;
            font-weight: 500;
            color: var(--text-dark);
          }

          /* Map Demo Image */
          .map-demo-image {
            width: 100%;
            height: 100%;
            border-radius: var(--radius-md);
            overflow: hidden;
            box-shadow: var(--shadow-md);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .map-ui-screenshot {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: var(--radius-md);
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
                Turn your interests into achievements with Mind Mate.
              </p>
              <button className="cta-button" onClick={startDemo}>
                <span>🚀</span>
                <span>Start Demo</span>
              </button>
            </div>
            <div className="hero-visual fade-in-up">
              <div className="phone-mockup">
                <div className="phone-screen">
                  {/* Status Bar */}
                  <div className="mockup-status-bar">
                    <span className="status-time">9:41</span>
                  </div>
                  
                  {/* App Header */}
                  <div className="mockup-app-header">
                    <div className="app-title">Mind Mate</div>
                    <div className="app-subtitle">Your Hobby Companion</div>
                  </div>

                  {/* Main Content */}
                  <div className="mockup-main-content">
                    <div className="mockup-card primary">
                      <div className="mockup-card-icon">🎯</div>
                      <div className="mockup-card-info">
                        <div className="mockup-card-title">Today's Goal</div>
                        <div className="mockup-card-content">Visit Tennis Court</div>
                      </div>
                    </div>
                    
                    <div className="mockup-stats-row">
                      <div className="mockup-stat-item">
                        <div className="stat-number">15</div>
                        <div className="stat-label">Days Active</div>
                      </div>
                      <div className="mockup-stat-item">
                        <div className="stat-number">8</div>
                        <div className="stat-label">Places</div>
                      </div>
                      <div className="mockup-stat-item">
                        <div className="stat-number">🏆</div>
                        <div className="stat-label">Level 3</div>
                      </div>
                    </div>

                    <div className="mockup-map-container">
                      <div className="map-header">
                        <span>📍</span>
                        <span>Nearby Hobby Spots</span>
                      </div>
                      <div className="mockup-map-area">
                        <div className="map-marker" style={{ top: '30%', left: '40%' }}>🎾</div>
                        <div className="map-marker" style={{ top: '60%', left: '70%' }}>☕</div>
                        <div className="map-marker" style={{ top: '70%', left: '30%' }}>🧗</div>
                        <div className="user-location">📍</div>
                      </div>
                    </div>
                  </div>

                  
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section section">
          <h2 className="section-title">Why Choose Mind Mate?</h2>
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
          <p className="section-subtitle">Mind Mate is designed to be intuitive and fun, so you can start your journey without any hassle.</p>
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
                <div className="map-demo-image">
                  <img src={mapUiImage} alt="Interactive Map UI" className="map-ui-screenshot" />
                </div>
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
                <div className="analytics-demo">
                  <div className="demo-header">📊 Analytics Dashboard</div>
                  
                  {/* Mood Graph */}
                  <div className="demo-mood-section">
                    <div className="demo-section-title">Weekly Mood Trends</div>
                    <div className="demo-mood-graph">
                      {[3.2, 4.1, 2.8, 3.9, 4.5, 3.7, 4.2].map((mood, index) => (
                        <div key={index} className="demo-mood-bar-container">
                          <div 
                            className={`demo-mood-bar ${mood < 3.5 ? 'low' : 'good'}`}
                            style={{ height: `${(mood / 5) * 100}%` }}
                          />
                          <span className="demo-day-label">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* SDT Scores */}
                  <div className="demo-sdt-section">
                    <div className="demo-section-title">Personality Insights</div>
                    <div className="demo-sdt-scores">
                      <div className="demo-score-item">
                        <div className="demo-score-value">78%</div>
                        <div className="demo-score-label">Autonomy</div>
                      </div>
                      <div className="demo-score-item">
                        <div className="demo-score-value">85%</div>
                        <div className="demo-score-label">Competence</div>
                      </div>
                      <div className="demo-score-item">
                        <div className="demo-score-value">72%</div>
                        <div className="demo-score-label">Relatedness</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Activity Stats */}
                  <div className="demo-stats-section">
                    <div className="demo-stats-grid">
                      <div className="demo-stat-item">
                        <div className="demo-stat-number">47</div>
                        <div className="demo-stat-label">Days Active</div>
                      </div>
                      <div className="demo-stat-item">
                        <div className="demo-stat-number">23</div>
                        <div className="demo-stat-label">Adventures</div>
                      </div>
                    </div>
                  </div>
                </div>
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
              <div className="challenges-demo">
                <div className="demo-header">🏆 Challenge System</div>
                
                {/* Progress Overview */}
                <div className="demo-progress-overview">
                  <div className="demo-section-title">Challenge Progress</div>
                  <div className="demo-progress-bars">
                    <div className="demo-progress-bar">
                      <div className="demo-progress-label">Active Challenges: 8/12</div>
                      <div className="demo-progress-track">
                        <div className="demo-progress-fill" style={{ width: '67%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Sample Challenges */}
                <div className="demo-challenges-list">
                  <div className="demo-section-title">Current Challenges</div>
                  <div className="demo-challenge-item">
                    <div className="demo-challenge-icon">🎾</div>
                    <div className="demo-challenge-info">
                      <div className="demo-challenge-title">Tennis Master</div>
                      <div className="demo-challenge-progress">15/20 visits</div>
                    </div>
                    <div className="demo-challenge-reward">🏆</div>
                  </div>
                  
                  <div className="demo-challenge-item">
                    <div className="demo-challenge-icon">☕</div>
                    <div className="demo-challenge-info">
                      <div className="demo-challenge-title">Coffee Explorer</div>
                      <div className="demo-challenge-progress">7/10 shops</div>
                    </div>
                    <div className="demo-challenge-reward">☕</div>
                  </div>
                  
                  <div className="demo-challenge-item completed">
                    <div className="demo-challenge-icon">👣</div>
                    <div className="demo-challenge-info">
                      <div className="demo-challenge-title">First Steps</div>
                      <div className="demo-challenge-progress">Completed!</div>
                    </div>
                    <div className="demo-challenge-reward">✅</div>
                  </div>
                </div>
                
                {/* Stats Summary */}
                <div className="demo-stats-summary">
                  <div className="demo-summary-item">
                    <div className="demo-summary-number">12</div>
                    <div className="demo-summary-label">Badges</div>
                  </div>
                  <div className="demo-summary-item">
                    <div className="demo-summary-number">8</div>
                    <div className="demo-summary-label">Active</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <h2 className="fade-in-up">Ready to Start Your Hobby Journey?</h2>
          <p className="fade-in-up" style={{animationDelay: '0.1s'}}>Join thousands of users who are already discovering new passions and achieving their goals with Mind Mate.</p>
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
              <h4>Mind Mate</h4>
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
            <p>&copy; {new Date().getFullYear()} Mind Mate. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default HobbyLogLandingPage;
# 🧠 Mind Mate - AI-Powered Hobby & Personal Interest Analysis Platform

<div align="center">

![Mind Mate Banner](https://img.shields.io/badge/Mind%20Mate-Personal%20Growth%20Platform-5A67D8?style=for-the-badge&logo=brain&logoColor=white)

**Discover, Track, and Master Your Hobbies with AI-Powered Personal Analysis**

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?style=flat&logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![OpenAI Ready](https://img.shields.io/badge/OpenAI-Integration%20Ready-412991?style=flat&logo=openai&logoColor=white)](https://openai.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat)](LICENSE)

</div>

## 🌟 Overview

Mind Mate is a revolutionary Progressive Web Application (PWA) that combines hobby tracking with AI-powered personal interest analysis. Built for modern web browsers with React and advanced psychological assessment tools, it provides personalized recommendations and insights to help users discover, track, and master their hobbies.

### ✨ Key Features

- **🧠 AI-Powered Conversations**: Chat with your virtual pet companion powered by OpenAI API for personalized hobby discussions and insights
- **📊 Self-Determination Theory (SDT) Assessment**: Scientific personality analysis to understand your intrinsic motivations and preferences  
- **🦄 Virtual Pet Companions**: Choose and interact with AI-powered pet characters that adapt to your personality
- **🗺️ Interactive Hobby Discovery**: Find nearby hobby locations with intelligent map-based recommendations
- **📈 Progress Tracking & Analytics**: Comprehensive mood tracking, visit history, and personal growth analytics
- **🏆 Gamified Experience**: Achievement system with challenges, badges, and experience levels
- **👥 Social Community**: Connect with fellow hobby enthusiasts and share experiences
- **🛍️ Rewards System**: Earn coins and unlock premium features through hobby engagement
- **📱 Progressive Web App**: Full mobile experience with offline capabilities

### 🔮 Upcoming AI Features

- **🤖 OpenAI API Integration**: Advanced conversational AI for personalized hobby recommendations and motivational coaching
- **📊 Personal Interest Analysis**: Machine learning algorithms to analyze user behavior and suggest optimal hobby paths
- **💬 Intelligent Chat System**: Natural language processing for meaningful conversations with virtual pet companions
- **🎯 AI-Driven Goal Setting**: Smart goal recommendations based on personality assessment and progress patterns

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Modern web browser with PWA support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jaylions/SNU_IN_SV_MindMate.git
   cd SNU_IN_SV_MindMate/hobby-log
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Create .env file in the hobby-log directory
   echo "VITE_OPENAI_API_KEY=your_openai_api_key_here" > .env
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to see the application running.

### Build for Production

```bash
npm run build
npm run preview
```

## 🏗️ Architecture & Technology Stack

### Core Technologies

- **Frontend Framework**: React 19.1.0 with Hooks
- **Build Tool**: Vite 7.0.4 for fast development and optimized builds
- **Styling**: Custom CSS with Glass Morphism design patterns
- **Maps & Location**: Leaflet with React-Leaflet for interactive maps
- **Routing**: React Router DOM for client-side navigation
- **State Management**: React hooks (useState, useEffect) with context API
- **PWA Features**: Service Worker for offline functionality

### AI & Analytics Integration (Planned)

- **Conversational AI**: OpenAI GPT API for pet companion interactions
- **Personal Analysis**: Machine learning models for hobby preference analysis
- **Behavioral Insights**: User interaction pattern analysis
- **Recommendation Engine**: AI-driven hobby and location suggestions

### Project Structure

```
src/
├── components/
│   ├── LandingPage.jsx          # Marketing landing page
│   ├── MainPage.jsx             # Main dashboard with pet companion
│   ├── RegistrationPage.jsx     # User onboarding & SDT assessment
│   ├── PetSelectionPage.jsx     # Virtual pet selection interface
│   ├── MapView.jsx              # Interactive hobby location map
│   ├── Community.jsx            # Social features & user profiles
│   ├── Shop.jsx                 # Rewards store & premium features
│   ├── Challenges.jsx           # Gamification & achievement system
│   ├── ProfilePage.jsx          # User profile & statistics
│   ├── LiquidBar.jsx            # Animated progress indicators
│   └── LocationBottomSheet.jsx  # Location detail modal
├── styles/
│   ├── HomePage.css             # Main app styling
│   ├── LandingPage.css          # Landing page specific styles
│   ├── RegistrationPage.css     # Onboarding flow styles
│   └── [component].css          # Component-specific stylesheets
├── assets/
│   ├── character/               # Pet character images & avatars
│   └── mockups/                 # UI mockups & screenshots
├── App.jsx                      # Main application router
└── main.jsx                     # Application entry point
```

## 📱 Features & User Flow

### 1. Onboarding Experience
- **Welcome Landing**: Responsive marketing page with feature showcase
- **User Registration**: Nickname and gender selection
- **SDT Personality Assessment**: 5-question psychological evaluation
- **Pet Selection**: Choose virtual companion based on personality

### 2. Core Application Features

#### Dashboard & Pet Interaction
- **Pet Companion Interface**: Interactive chat with AI-powered responses (OpenAI integration planned)
- **Daily Check-ins**: Mood tracking and activity logging
- **Experience System**: Pet evolution based on user engagement
- **Real-time Notifications**: Goal reminders and achievement alerts

#### Location Discovery & Mapping
- **Interactive Maps**: Powered by Leaflet with custom markers
- **Hobby Location Database**: Tennis courts, cafes, art studios, etc.
- **GPS Integration**: Find nearby activities based on current location
- **Location Reviews**: User ratings and detailed information

#### Progress Analytics
- **Mood Tracking**: Daily emotional state monitoring with trend analysis
- **Visit History**: Comprehensive activity logs with time-based insights
- **SDT Score Tracking**: Autonomy, Competence, and Relatedness metrics
- **Goal Completion Rates**: Visual progress indicators with achievement tracking

#### Gamification System
- **Challenge Framework**: Daily, weekly, and milestone-based objectives
- **Badge System**: Unlockable achievements for various activities
- **Experience Levels**: Progressive difficulty and reward scaling
- **Leaderboards**: Community ranking and social competition

### 3. Social & Community Features
- **User Profiles**: Customizable profiles with hobby preferences
- **Activity Sharing**: Post achievements and experiences
- **Community Feed**: Discover what others are doing in their hobby journey
- **Group Challenges**: Collaborative goals and team-based activities

## 🧠 Psychological Framework

### Self-Determination Theory (SDT) Integration

Mind Mate is built on scientific psychological principles, specifically Self-Determination Theory, which identifies three basic psychological needs:

1. **Autonomy**: The need to feel volitional and self-directed
2. **Competence**: The need to feel effective and capable
3. **Relatedness**: The need for connection and belonging

#### Assessment Questions Framework
```javascript
const SDT_ASSESSMENT = {
  intrinsic_vs_extrinsic: "Motivation source analysis",
  autonomy_vs_structure: "Independence preference evaluation", 
  competence_vs_relatedness: "Achievement vs connection priority",
  independent_vs_collaborative: "Problem-solving approach",
  solitary_vs_social: "Environmental preference assessment"
};
```

### Personality-Based Recommendations

The app analyzes user responses to provide:
- **Personalized Pet Companions**: Character selection based on SDT scores
- **Hobby Suggestions**: Activities aligned with psychological profile
- **Goal Setting**: Realistic objectives based on motivation patterns
- **Community Matching**: Connect with like-minded individuals

## 🤖 AI Integration Roadmap

### Phase 1: OpenAI Chat Integration
```javascript
// Planned API integration
const chatWithPet = async (userMessage, petPersonality, userSDT) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system", 
        content: `You are a ${petPersonality} pet companion helping with hobby development. 
                 User SDT profile: Autonomy: ${userSDT.autonomy}%, 
                 Competence: ${userSDT.competence}%, 
                 Relatedness: ${userSDT.relatedness}%`
      },
      { role: "user", content: userMessage }
    ]
  });
  return response.choices[0].message.content;
};
```

### Phase 2: Advanced Analytics
- **Behavioral Pattern Analysis**: ML models to identify user engagement patterns
- **Predictive Recommendations**: AI-powered suggestions for optimal activity timing
- **Emotional Intelligence**: Sentiment analysis of user inputs for mood insights
- **Adaptive Goal Setting**: Dynamic objective adjustment based on progress patterns

### Phase 3: Community Intelligence
- **Smart Matching**: AI-powered user compatibility analysis
- **Group Formation**: Automatic community building based on interests and personality
- **Content Curation**: Personalized feed algorithms for relevant community content

## 🎨 Design Philosophy

### Glass Morphism UI
- **Translucent Elements**: Frosted glass effects with backdrop blur
- **Depth & Hierarchy**: Layered design with subtle shadows and gradients
- **Color Psychology**: Calming color palette promoting focus and well-being
- **Accessibility**: WCAG 2.1 AA compliant with proper contrast ratios

### Mobile-First Approach
- **Responsive Design**: 480px container optimized for mobile experience
- **Progressive Enhancement**: Desktop features that enhance but don't replace mobile functionality
- **Touch-Optimized**: Gesture-friendly interfaces with appropriate tap targets
- **PWA Standards**: Offline functionality and app-like experience

### User Experience Principles
- **Cognitive Load Reduction**: Simple, intuitive navigation patterns
- **Positive Reinforcement**: Celebration of small wins and progress
- **Personalization**: Adaptive interface based on user preferences
- **Emotional Design**: Delightful micro-interactions and animations

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally  
- `npm run lint` - Run ESLint for code quality
- `npm run predeploy` - Prepare build for deployment
- `npm run deploy` - Deploy to GitHub Pages

### Development Guidelines

1. **Component Architecture**
   - Functional components with hooks
   - Props interface documentation
   - Error boundary implementation
   - Accessibility attributes (ARIA)

2. **State Management**
   - Local state with useState for component-specific data
   - Context API for global user state
   - Custom hooks for reusable logic
   - Effect cleanup for subscriptions

3. **Styling Standards**
   - CSS custom properties for theming
   - Mobile-first responsive breakpoints
   - Component-scoped styles
   - Glass morphism design tokens

4. **Performance Optimization**
   - Code splitting with React.lazy
   - Image optimization and lazy loading
   - Service Worker for caching strategies
   - Bundle analysis and tree shaking

### Testing Strategy

```bash
# Unit testing (to be implemented)
npm run test

# E2E testing (to be implemented) 
npm run test:e2e

# Performance testing
npm run lighthouse
```

## 🌐 Deployment & Infrastructure

### Supported Platforms

- **Vercel**: Automatic deployments with GitHub integration
- **Netlify**: JAMstack hosting with form handling
- **GitHub Pages**: Static hosting for demonstration builds
- **AWS Amplify**: Full-stack deployment with backend integration

### Environment Configuration

```env
# Production Environment Variables
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_API_BASE_URL=https://api.mindmate.app
VITE_ANALYTICS_ID=your_analytics_id
VITE_MAP_API_KEY=your_mapbox_token
```

### Performance Metrics
- **Lighthouse Score**: Target 90+ across all categories
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Bundle Size**: Main bundle < 500KB gzipped
- **Time to Interactive**: < 3 seconds on 3G networks

## 🔒 Security & Privacy

### Data Protection
- **Local Storage**: Sensitive data encrypted using Web Crypto API
- **API Security**: HTTPS-only communication with CORS policies
- **User Privacy**: GDPR compliance with explicit consent mechanisms
- **Data Minimization**: Collect only essential information for functionality

### Authentication (Planned)
- **OAuth Integration**: Google, Facebook, and Apple Sign-In
- **JWT Tokens**: Secure session management
- **Role-Based Access**: User permissions for community features
- **Account Recovery**: Secure password reset workflows

## 📊 Analytics & Monitoring

### User Analytics (Privacy-Focused)
- **Anonymized Usage Metrics**: Feature adoption and engagement patterns
- **Performance Monitoring**: Real-time error tracking and performance insights
- **A/B Testing Framework**: Data-driven feature optimization
- **User Feedback Integration**: In-app feedback collection and analysis

### Technical Monitoring
- **Error Tracking**: Automated error reporting and alerting
- **Performance Monitoring**: Real User Monitoring (RUM) with Core Web Vitals
- **Uptime Monitoring**: Service availability and response time tracking
- **Security Monitoring**: Vulnerability scanning and dependency updates

## 🤝 Contributing

We welcome contributions to Mind Mate! Please read our [Contributing Guidelines](CONTRIBUTING.md) before getting started.

### Development Process

1. **Fork the repository** and create a feature branch
2. **Follow coding standards** and write comprehensive tests
3. **Submit a Pull Request** with detailed description of changes
4. **Code Review** process with automated testing
5. **Deployment** after approval and testing

### Areas for Contribution

- **AI Integration**: OpenAI API implementation and optimization
- **Mobile Experience**: Native app development for iOS/Android
- **Accessibility**: WCAG 2.1 AAA compliance improvements
- **Internationalization**: Multi-language support
- **Analytics**: Advanced user behavior analysis features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team**: For the amazing React 19 framework
- **Vite Team**: For lightning-fast development experience  
- **Leaflet Community**: For open-source mapping capabilities
- **OpenAI**: For enabling conversational AI possibilities
- **Design Inspiration**: Glass morphism and modern UI/UX principles
- **Psychology Research**: Self-Determination Theory foundations
- **Open Source Community**: For countless libraries and tools that make this possible

## 🎯 Roadmap & Future Features

### Q1 2025: AI Integration
- [ ] OpenAI API integration for pet conversations
- [ ] Natural language processing for user input analysis
- [ ] Intelligent hobby recommendations based on chat interactions
- [ ] Emotional sentiment analysis for mood tracking

### Q2 2025: Advanced Analytics  
- [ ] Machine learning models for user behavior prediction
- [ ] Advanced SDT score tracking and evolution
- [ ] Personalized goal optimization algorithms
- [ ] Community interaction analysis and matching

### Q3 2025: Mobile Native Apps
- [ ] React Native mobile applications
- [ ] Push notifications for goal reminders
- [ ] Offline-first architecture with sync capabilities
- [ ] Native device integrations (camera, GPS, calendar)

### Q4 2025: Enterprise Features
- [ ] Team and organization accounts
- [ ] Corporate wellness program integration
- [ ] Advanced analytics dashboard for organizations
- [ ] API access for third-party integrations

---

<div align="center">

**Made with ❤️ for hobby enthusiasts and personal growth seekers worldwide**

[🌐 Live Demo](https://jaylions.github.io/SNU_IN_SV_MindMate/) • [📧 Contact](mailto:contact@mindmate.app) • [🐛 Report Bug](https://github.com/jaylions/SNU_IN_SV_MindMate/issues) • [✨ Request Feature](https://github.com/jaylions/SNU_IN_SV_MindMate/issues)

</div>
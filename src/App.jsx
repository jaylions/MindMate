import { useState } from 'react'
import './App.css'
import RegistrationPage from './components/RegistrationPage'
import PetSelectionPage from './components/PetSelectionPage'
import LandingPage from './components/LandingPage'
import MainPage from './components/MainPage'
import MapView from './components/MapView'
import Community from './components/Community'
import Shop from './components/Shop'
import Challenges from './components/Challenges'
import ProfilePage from './components/ProfilePage'

function App() {
  const [view, setView] = useState('landing')
  const [userData, setUserData] = useState(null)

  // Initial flow handlers
  const startDemo = () => {
    setView('registration')
  }

  const handleRegistrationComplete = (data) => {
    setUserData(data)
    setView('petSelection')
  }

  const handlePetSelectionComplete = (completeData) => {
    setUserData(completeData)
    setView('main')
  }

  // Navigation handlers
  const MapsToMap = () => {
    setView('map')
  }

  const MapsToMain = () => {
    setView('main')
  }

  const MapsToCommunity = () => {
    setView('community')
  }

  const MapsToShop = () => {
    setView('shop')
  }

  const MapsToChallenges = () => {
    setView('challenges')
  }

  const MapsToProfile = () => {
    setView('profile')
  }

  return (
    <div className="App">
      {view === 'landing' && (
        <LandingPage startDemo={startDemo} />
      )}
      {view === 'registration' && (
        <RegistrationPage onComplete={handleRegistrationComplete} />
      )}
      {view === 'petSelection' && (
        <PetSelectionPage 
          userInfo={userData?.userInfo}
          sdtResults={userData?.sdtResults}
          onComplete={handlePetSelectionComplete}
        />
      )}
      {view === 'main' && (
        <MainPage 
          MapsToMap={MapsToMap} 
          MapsToCommunity={MapsToCommunity}
          MapsToShop={MapsToShop}
          MapsToChallenges={MapsToChallenges}
          MapsToProfile={MapsToProfile}
          userData={userData}
        />
      )}
      {view === 'map' && (
        <MapView 
          MapsToMain={MapsToMain} 
          MapsToCommunity={MapsToCommunity}
          MapsToShop={MapsToShop}
          MapsToProfile={MapsToProfile}
        />
      )}
      {view === 'community' && (
        <Community 
          MapsToMain={MapsToMain}
          MapsToMap={MapsToMap}
          MapsToShop={MapsToShop}
          MapsToProfile={MapsToProfile}
        />
      )}
      {view === 'shop' && (
        <Shop 
          MapsToMain={MapsToMain}
          MapsToMap={MapsToMap}
          MapsToCommunity={MapsToCommunity}
          MapsToProfile={MapsToProfile}
        />
      )}
      {view === 'challenges' && (
        <Challenges MapsToMain={MapsToMain} />
      )}
      {view === 'profile' && (
        <ProfilePage
          userData={userData}
          MapsToMain={MapsToMain}
          MapsToChallenges={MapsToChallenges}
          MapsToMap={MapsToMap}
          MapsToCommunity={MapsToCommunity}
          MapsToShop={MapsToShop}
        />
      )}
    </div>
  )
}

export default App

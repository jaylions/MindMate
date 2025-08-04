import { useState } from 'react'
import './App.css'
import LandingPage from './components/LandingPage'
import MainPage from './components/MainPage'
import MapView from './components/MapView'
import Community from './components/Community'
import Shop from './components/Shop'
import Challenges from './components/Challenges'

function App() {
  const [view, setView] = useState('landing')

  const startDemo = () => {
    setView('main')
  }

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

  return (
    <div className="App">
      {view === 'landing' && (
        <LandingPage startDemo={startDemo} />
      )}
      {view === 'main' && (
        <MainPage 
          MapsToMap={MapsToMap} 
          MapsToCommunity={MapsToCommunity}
          MapsToShop={MapsToShop}
          MapsToChallenges={MapsToChallenges}
        />
      )}
      {view === 'map' && (
        <MapView MapsToMain={MapsToMain} />
      )}
      {view === 'community' && (
        <Community MapsToMain={MapsToMain} />
      )}
      {view === 'shop' && (
        <Shop MapsToMain={MapsToMain} />
      )}
      {view === 'challenges' && (
        <Challenges MapsToMain={MapsToMain} />
      )}
    </div>
  )
}

export default App

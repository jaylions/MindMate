import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import LiquidBar from './LiquidBar'

// Leaflet 기본 마커 아이콘 문제 해결
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// 커스텀 마커 아이콘 생성
const createCustomIcon = (color) => {
  return L.divIcon({
    html: `
      <div style="
        background: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        color: white;
        font-weight: bold;
      ">
        <span style="transform: rotate(45deg);">📍</span>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  })
}

function MapView({ MapsToMain, MapsToCommunity, MapsToShop, MapsToProfile }) {
  const [showStats, setShowStats] = useState(true)
  const [mapReady, setMapReady] = useState(true)
  // 샌프란시스코의 실제 취미 장소 데이터
  const hobbyPlaces = [
    {
      id: 1,
      name: "Golden Gate Tennis Courts",
      position: [37.7694, -122.4862],
      type: "tennis",
      color: "#4CAF50",
      description: "Outdoor tennis courts with beautiful city views"
    },
    {
      id: 2,
      name: "Touchstone Climbing Gym",
      position: [37.7749, -122.4194],
      type: "climbing",
      color: "#FF5722",
      description: "Indoor climbing gym with bouldering and top-rope"
    },
    {
      id: 3,
      name: "Blue Bottle Coffee",
      position: [37.7849, -122.4094],
      type: "coffee",
      color: "#795548",
      description: "Artisanal coffee shop with craft brewing"
    },
    {
      id: 4,
      name: "Yoga Tree Studio",
      position: [37.7849, -122.4294],
      type: "yoga",
      color: "#9C27B0",
      description: "Vinyasa and Hatha yoga classes"
    },
    {
      id: 5,
      name: "San Francisco Public Library",
      position: [37.7793, -122.4163],
      type: "reading",
      color: "#2196F3",
      description: "Central library with reading rooms and study spaces"
    },
    {
      id: 6,
      name: "SFMOMA",
      position: [37.7858, -122.4011],
      type: "art",
      color: "#E91E63",
      description: "Modern art museum with contemporary exhibitions"
    },
    {
      id: 7,
      name: "Blue Bear School of Music",
      position: [37.8080, -122.4177],
      type: "music",
      color: "#FF9800",
      description: "Music school offering lessons and workshops"
    },
    {
      id: 8,
      name: "18 Reasons Cooking School",
      position: [37.7648, -122.4220],
      type: "cooking",
      color: "#F44336",
      description: "Culinary classes and cooking workshops"
    },
    {
      id: 9,
      name: "Conservatory of Flowers",
      position: [37.7702, -122.4612],
      type: "gardening",
      color: "#8BC34A",
      description: "Botanical garden with plant care workshops"
    },
    {
      id: 10,
      name: "Koret Pool",
      position: [37.7694, -122.4862],
      type: "swimming",
      color: "#00BCD4",
      description: "Indoor swimming pool with lap lanes"
    }
  ]

  if (!mapReady) {
    return (
      <div className="map-view">
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
          <p>Loading Map...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="map-view">
      
      
      
      {/* Toggle Stats Button */}
      {!showStats && (
        <button className="show-stats-btn" onClick={() => setShowStats(true)}>
          📊 Stats
        </button>
      )}
      
      {/* Simplified Map View */}
      <MapContainer center={[37.8715, -122.2730]} zoom={14} style={{ height: 'calc(100vh - 140px)', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {hobbyPlaces.map((place) => (
          <Marker key={place.id} position={place.position} icon={createCustomIcon(place.color)}>
            <Popup>
              <h3>{place.name}</h3>
              <p>{place.description}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="nav-items">
          <div className="nav-item" onClick={MapsToMain}>
            <div className="nav-icon">🏠</div>
            <div className="nav-label">Home</div>
          </div>
          <div className="nav-item active">
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

export default MapView 
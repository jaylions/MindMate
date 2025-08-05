import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import LiquidBar from './LiquidBar'

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

function MapView({ MapsToMain }) {
  const [showStats, setShowStats] = useState(true)
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

  return (
    <div className="map-view">
      <button className="back-button" onClick={MapsToMain}>
        Back
      </button>
      
      {/* Map Statistics Overlay */}
      {showStats && (
        <div className="map-stats-overlay">
          <div className="stats-header">
            <h3>Exploration Progress</h3>
            <button className="close-stats" onClick={() => setShowStats(false)}>✕</button>
          </div>
          <div className="map-progress-grid">
            <div className="map-progress-item">
              <LiquidBar 
                value={10} 
                maxValue={20} 
                color="#4CAF50" 
                height={50} 
                label="Places Found"
                animated={true}
              />
            </div>
            <div className="map-progress-item">
              <LiquidBar 
                value={7} 
                maxValue={10} 
                color="#66BB6A" 
                height={50} 
                label="Types Explored"
                animated={true}
              />
            </div>
          </div>
          <div className="single-map-progress">
            <LiquidBar 
              value={60} 
              maxValue={100} 
              color="#81C784" 
              height={40} 
              label="Map Coverage"
              animated={true}
            />
          </div>
        </div>
      )}
      
      {/* Toggle Stats Button */}
      {!showStats && (
        <button className="show-stats-btn" onClick={() => setShowStats(true)}>
          📊 Stats
        </button>
      )}
      
      <MapContainer 
        center={[37.7749, -122.4194]} 
        zoom={13} 
        style={{ width: '100%', height: '100vh' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {hobbyPlaces.map((place) => (
          <Marker 
            key={place.id} 
            position={place.position}
            icon={createCustomIcon(place.color)}
          >
            <Popup>
              <div style={{ textAlign: 'center', padding: '8px', minWidth: '200px' }}>
                <h3 style={{ margin: '0 0 8px 0', color: place.color, fontSize: '16px' }}>{place.name}</h3>
                <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#666', textTransform: 'capitalize' }}>
                  Type: {place.type}
                </p>
                <p style={{ margin: '0', fontSize: '11px', color: '#888', fontStyle: 'italic' }}>
                  {place.description}
                </p>
                <div style={{ marginTop: '10px' }}>
                  <LiquidBar 
                    value={Math.random() * 100} 
                    maxValue={100} 
                    color={place.color} 
                    height={25} 
                    label="Popularity"
                    animated={false}
                  />
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default MapView 
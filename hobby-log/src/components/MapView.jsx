import React, { useState, useEffect } from 'react'
import '../styles/MapView.css'
import LocationBottomSheet from './LocationBottomSheet'
import LocationSummaryCard from './LocationSummaryCard'

function MapView({ MapsToMain, MapsToCommunity, MapsToShop, MapsToProfile }) {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [MapContainer, setMapContainer] = useState(null)
  const [TileLayer, setTileLayer] = useState(null)
  const [Marker, setMarker] = useState(null)
  const [Popup, setPopup] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const [isSummaryOpen, setIsSummaryOpen] = useState(false)

  // 동적으로 react-leaflet 컴포넌트들을 로드
  useEffect(() => {
    const loadMapComponents = async () => {
      try {
        // Leaflet CSS 로드
        if (!document.querySelector('link[href*="leaflet.css"]')) {
          const link = document.createElement('link')
          link.rel = 'stylesheet'
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
          document.head.appendChild(link)
        }

        // react-leaflet 컴포넌트들 동적 import
        const leafletComponents = await import('react-leaflet')
        const L = await import('leaflet')

        // Leaflet 기본 마커 아이콘 문제 해결
        delete L.default.Icon.Default.prototype._getIconUrl
        L.default.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        })

        setMapContainer(() => leafletComponents.MapContainer)
        setTileLayer(() => leafletComponents.TileLayer)
        setMarker(() => leafletComponents.Marker)
        setPopup(() => leafletComponents.Popup)
        setMapLoaded(true)
      } catch (error) {
        console.error('Error loading map components:', error)
      }
    }

    loadMapComponents()
  }, [])

  // 다양한 취미 장소 데이터 (일부 추천 장소 포함)
  const hobbyPlaces = [
    {
      id: 1,
      name: "Golden Gate Tennis Courts",
      position: [37.7694, -122.4862],
      description: "Outdoor tennis courts with beautiful city views",
      icon: "🎾",
      type: 'tennis',
      recommended: true
    },
    {
      id: 2,
      name: "Touchstone Climbing Gym",
      position: [37.7749, -122.4194],
      description: "Indoor climbing gym with bouldering and top-rope",
      icon: "🧗",
      type: 'climbing',
      recommended: true
    },
    {
      id: 3,
      name: "Blue Bottle Coffee",
      position: [37.7849, -122.4094],
      description: "Artisanal coffee shop with craft brewing",
      icon: "☕",
      type: 'cafe',
      recommended: false
    },
    {
      id: 4,
      name: "Ping Pong Social Club",
      position: [37.7810, -122.4110],
      description: "Trendy ping pong bar and lounge",
      icon: "🏓",
      type: 'pingpong',
      recommended: false
    },
    {
      id: 5,
      name: "Artisan Sculpture Studio",
      position: [37.7705, -122.4470],
      description: "Community sculpture and pottery classes",
      icon: "🗿",
      type: 'sculpture',
      recommended: true
    },
    {
      id: 6,
      name: "Metal Craft Workshop",
      position: [37.7650, -122.4300],
      description: "Learn metalworking and jewelry making",
      icon: "⚒️",
      type: 'metal',
      recommended: false
    },
    {
      id: 7,
      name: "Sunset Table Tennis",
      position: [37.7620, -122.4780],
      description: "Friendly table tennis club for all levels",
      icon: "🏓",
      type: 'pingpong',
      recommended: false
    },
    {
      id: 8,
      name: "Dream Tennis Academy",
      position: [37.7590, -122.4660],
      description: "Tennis lessons and tournaments for all ages",
      icon: "🎾",
      type: 'tennis',
      recommended: false
    },
    {
      id: 9,
      name: "Urban Climb Center",
      position: [37.7680, -122.4150],
      description: "Modern climbing gym with classes and events",
      icon: "🧗",
      type: 'climbing',
      recommended: false
    },
    {
      id: 10,
      name: "Gallery of Modern Art",
      position: [37.7850, -122.4010],
      description: "Contemporary art exhibitions and workshops",
      icon: "🖼️",
      type: 'art',
      recommended: true
    }
  ]

  const handleMarkerClick = (place) => {
    setSelectedLocation(place)
    setIsSummaryOpen(true)
  }

  const handleCloseSummary = () => {
    setIsSummaryOpen(false)
    setSelectedLocation(null)
  }

  const handleViewDetails = () => {
    setIsSummaryOpen(false)
    setIsBottomSheetOpen(true)
  }

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false)
    setSelectedLocation(null)
  }

  if (!mapLoaded) {
    return (
      <div className="map-view">
        <div className="loading-container">
          <div className="loading-text">
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>🗺️</div>
            <div>Loading Map...</div>
          </div>
        </div>

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

  return (
    <div className="map-view">
      {/* Header */}
      <div className="map-header">
        <h1 className="map-title">🗺️ Discover Hobby Spots</h1>
        <p className="map-subtitle">Check the red places recommended for you!</p>
      </div>

      {/* Map Container with Card Style */}
      <div className="map-container-wrapper">
        <div className="map-card">
          <MapContainer 
            center={[37.7749, -122.4194]} 
            zoom={13} 
            style={{ height: '100%', width: '100%' }}
          >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {hobbyPlaces.map((place) => {
            // 모든 마커에 이모티콘, 추천 장소는 빨간 테두리, 나머지는 파란 테두리
            let markerOptions = {};
            if (window.L) {
              markerOptions.icon = window.L.divIcon({
                className: place.recommended ? 'recommended-marker-simple' : 'normal-marker-simple',
                iconSize: [36, 36],
                html: `<div style="background:#fff;border:3px solid ${place.recommended ? '#e74c3c' : '#3498db'};border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;box-shadow:0 0 16px ${place.recommended ? '#e74c3c80' : '#3498db80'};"><span style='font-size:22px;'>${place.icon}</span></div>`
              });
            }
            return (
              <Marker 
                key={place.id} 
                position={place.position}
                eventHandlers={{
                  click: () => handleMarkerClick(place)
                }}
                {...markerOptions}
              >
                <Popup>
                  <div>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>{place.name} {place.recommended && <span style={{color:'#e74c3c',fontWeight:'bold',marginLeft:'6px'}}>Recommended</span>}</h3>
                    <p style={{ margin: 0, fontSize: '14px' }}>{place.description}</p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
        </div>
        
        {/* Map Info Panel */}
        <div className="map-info-panel">
          <div className="info-item">
            <span className="info-icon">📍</span>
            <span className="info-text">{hobbyPlaces.length} Hobby Spots</span>
          </div>
          <div className="info-item">
            <span className="info-icon">🌟</span>
            <span className="info-text">San Francisco, CA</span>
          </div>
        </div>

      </div>

      {/* Bottom Navigation - matching other pages */}
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

      {/* Location Summary Card */}
      <LocationSummaryCard
        isOpen={isSummaryOpen}
        location={selectedLocation}
        onClose={handleCloseSummary}
        onViewDetails={handleViewDetails}
      />

      {/* Location Bottom Sheet */}
      <LocationBottomSheet
        isOpen={isBottomSheetOpen}
        location={selectedLocation}
        onClose={handleCloseBottomSheet}
      />
    </div>
  )
}

export default MapView

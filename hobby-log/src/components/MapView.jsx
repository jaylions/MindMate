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
  const [userLocationIcon, setUserLocationIcon] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const [isSummaryOpen, setIsSummaryOpen] = useState(false)
  const [userLocation] = useState([37.78, -122.4394]) // San Francisco center
  const [mapRef, setMapRef] = useState(null)

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

        // Create custom user location icon (📍 emoji)
        const customUserIcon = new L.default.DivIcon({
          html: `<div style="
            font-size: 24px;
            text-align: center;
            line-height: 1;
            filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
          ">📍</div>`,
          className: 'custom-user-marker',
          iconSize: [24, 24],
          iconAnchor: [12, 24],
          popupAnchor: [0, -24]
        })

        // Create special recommended place icon
        const createRecommendedIcon = (emoji) => {
          return new L.default.DivIcon({
            html: `<div style="
              width: 40px;
              height: 40px;
              background: radial-gradient(circle, #FFD700 0%, #FFA500 70%);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 20px;
              box-shadow: 0 4px 12px rgba(255, 215, 0, 0.6), 0 0 20px rgba(255, 215, 0, 0.3);
              border: 3px solid #FFF;
              animation: recommendedBounce 2s ease-in-out infinite;
              position: relative;
            ">${emoji}⭐</div>`,
            className: 'recommended-marker-simple',
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [0, -20]
          })
        }

        setMapContainer(() => leafletComponents.MapContainer)
        setTileLayer(() => leafletComponents.TileLayer)
        setMarker(() => leafletComponents.Marker)
        setPopup(() => leafletComponents.Popup)
        setUserLocationIcon(customUserIcon)
        
        // Store the createRecommendedIcon function for use in rendering
        window.createRecommendedIcon = createRecommendedIcon
        
        setMapLoaded(true)
      } catch (error) {
        console.error('Error loading map components:', error)
      }
    }

    loadMapComponents()
  }, [])

  // 샘플 취미 장소 데이터
  const hobbyPlaces = [
    {
      id: 1,
      name: "Golden Gate Tennis Courts",
      position: [37.7694, -122.4862],
      description: "Outdoor tennis courts with beautiful city views",
      icon: "🎾"
    },
    {
      id: 2,
      name: "Touchstone Climbing Gym",
      position: [37.7749, -122.4194],
      description: "Indoor climbing gym with bouldering and top-rope",
      icon: "🧗"
    },
    {
      id: 3,
      name: "Blue Bottle Coffee",
      position: [37.7849, -122.4094],
      description: "Artisanal coffee shop with craft brewing",
      icon: "☕"
    },
    {
      id: 4,
      name: "The Book Club Café",
      position: [37.7649, -122.4394],
      description: "Cozy bookstore café with weekly book club meetings",
      icon: "📚"
    },
    {
      id: 5,
      name: "Mission Rock Music Studio",
      position: [37.7649, -122.3894],
      description: "Recording studio and rehearsal space for bands",
      icon: "🎸"
    },
    {
      id: 6,
      name: "GameOn Arcade",
      position: [37.7849, -122.4294],
      description: "Retro arcade with modern gaming tournaments",
      icon: "🎮"
    },
    {
      id: 7,
      name: "Castro Climbing Co.",
      position: [37.7609, -122.4350],
      description: "Boutique climbing gym with personalized training",
      icon: "🧗‍♀️"
    },
    {
      id: 8,
      name: "Maker Workshop SF",
      position: [37.7549, -122.4194],
      description: "DIY crafting studio with woodworking and pottery",
      icon: "🔨"
    },
    {
      id: 9,
      name: "Tennis Club Marina",
      position: [37.8049, -122.4394],
      description: "Premium tennis club with professional coaching",
      icon: "🎾"
    },
    {
      id: 10,
      name: "Sunset Book Exchange",
      position: [37.7449, -122.4694],
      description: "Independent bookstore with author reading events",
      icon: "📖"
    },
    {
      id: 11,
      name: "Jazz Corner SF",
      position: [37.7749, -122.4494],
      description: "Intimate jazz venue with live performances",
      icon: "🎷"
    },
    {
      id: 12,
      name: "VR Gaming Lounge",
      position: [37.7949, -122.4194],
      description: "Cutting-edge VR gaming experience center",
      icon: "🥽"
    },
    {
      id: 13,
      name: "Art & Craft Collective",
      position: [37.7349, -122.4394],
      description: "Community art space for painting and crafting",
      icon: "🎨"
    },
    {
      id: 14,
      name: "Rock Climbing Outdoors",
      position: [37.7894, -122.4794],
      description: "Outdoor climbing guide service and gear rental",
      icon: "⛰️"
    },
    {
      id: 15,
      name: "Indie Music Venue",
      position: [37.7549, -122.4094],
      description: "Small venue showcasing local indie bands",
      icon: "🎤"
    },
    {
      id: 16,
      name: "Board Game Café",
      position: [37.7749, -122.4594],
      description: "Café with 500+ board games and tournaments",
      icon: "🎯"
    },
    {
      id: 17,
      name: "Knitting Circle Studio",
      position: [37.7449, -122.4094],
      description: "Yarn shop with knitting classes and circles",
      icon: "🧶"
    },
    {
      id: 18,
      name: "Electronic Music Lab",
      position: [37.7649, -122.4594],
      description: "Electronic music production and DJ lessons",
      icon: "🎧"
    }
  ]

  // 추천 장소 ID 설정 (3-4개 선정)
  const recommendedPlaceIds = [2, 6, 11, 13] // Touchstone Climbing, GameOn Arcade, Jazz Corner SF, Art & Craft Collective

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

  const handleGoToMyLocation = () => {
    if (mapRef) {
      mapRef.setView(userLocation, 15)
    }
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
        <p className="map-subtitle">Check Recommended places around you</p>
      </div>

      {/* Map Container with Card Style */}
      <div className="map-container-wrapper">
        <div className="map-card">
          <MapContainer 
            center={userLocation} 
            zoom={13} 
            style={{ height: '100%', width: '100%' }}
            ref={setMapRef}
          >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {/* User Location Marker */}
          <Marker position={userLocation} icon={userLocationIcon}>
            <Popup>
              <div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>📍 Your Location</h3>
                <p style={{ margin: 0, fontSize: '14px' }}>You are here in San Francisco</p>
              </div>
            </Popup>
          </Marker>

          {/* Hobby Places Markers */}
          {hobbyPlaces.map((place) => {
            const isRecommended = recommendedPlaceIds.includes(place.id);
            const markerIcon = isRecommended && window.createRecommendedIcon 
              ? window.createRecommendedIcon(place.icon) 
              : undefined;
            
            return (
              <Marker 
                key={place.id} 
                position={place.position}
                icon={markerIcon}
                zIndexOffset={isRecommended ? 1000 : 0}
                eventHandlers={{
                  click: () => handleMarkerClick(place)
                }}
              >
                <Popup>
                  <div>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>
                      {isRecommended ? '⭐ ' : ''}{place.name}
                    </h3>
                    <p style={{ margin: 0, fontSize: '14px' }}>{place.description}</p>
                    {isRecommended && (
                      <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#FFD700', fontWeight: 'bold' }}>
                        🌟 Recommended for you!
                      </p>
                    )}
                  </div>
                </Popup>
              </Marker>
            )
          })}
        </MapContainer>
        
        {/* My Location Button */}
        <button 
          className="my-location-btn"
          onClick={handleGoToMyLocation}
          title="Go to My Location"
        >
          📍
        </button>
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

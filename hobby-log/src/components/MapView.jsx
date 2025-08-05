import React, { useState, useEffect } from 'react'

function MapView({ MapsToMain, MapsToCommunity, MapsToShop, MapsToProfile }) {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [MapContainer, setMapContainer] = useState(null)
  const [TileLayer, setTileLayer] = useState(null)
  const [Marker, setMarker] = useState(null)
  const [Popup, setPopup] = useState(null)

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

  // 샘플 취미 장소 데이터
  const hobbyPlaces = [
    {
      id: 1,
      name: "Golden Gate Tennis Courts",
      position: [37.7694, -122.4862],
      description: "Outdoor tennis courts with beautiful city views"
    },
    {
      id: 2,
      name: "Touchstone Climbing Gym",
      position: [37.7749, -122.4194],
      description: "Indoor climbing gym with bouldering and top-rope"
    },
    {
      id: 3,
      name: "Blue Bottle Coffee",
      position: [37.7849, -122.4094],
      description: "Artisanal coffee shop with craft brewing"
    }
  ]

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
        <p className="map-subtitle">Find amazing places around you</p>
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
          {hobbyPlaces.map((place) => (
            <Marker key={place.id} position={place.position}>
              <Popup>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>{place.name}</h3>
                  <p style={{ margin: 0, fontSize: '14px' }}>{place.description}</p>
                </div>
              </Popup>
            </Marker>
          ))}
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
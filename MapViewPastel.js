import React, { useState, useEffect, useRef } from 'react';

// For actual map implementation, you'll need to install: npm install leaflet react-leaflet
// This version includes a styled map container that mimics the look until you add real map tiles

const MapViewPastel = () => {
  // Sample data for hobby places - in a real app, this would come from props or API
  const [hobbyPlaces] = useState([
    {
      id: 1,
      name: "Blooming Garden Café",
      category: "Garden & Coffee",
      note: "A magical place where flowers bloom and stories unfold over warm tea.",
      lat: 37.7749,
      lng: -122.4194,
      type: "garden",
      icon: "🌸"
    },
    {
      id: 2,
      name: "The Cozy Corner Library",
      category: "Books & Wonder",
      note: "Whispered tales and gentle adventures await between these shelves.",
      lat: 37.7849,
      lng: -122.4094,
      type: "library",
      icon: "📚"
    },
    {
      id: 3,
      name: "Moonbeam Art Studio",
      category: "Creative Haven",
      note: "Where dreams take shape and colors dance together in harmony.",
      lat: 37.7649,
      lng: -122.4294,
      type: "art",
      icon: "🎨"
    }
  ]);

  const [userLocation, setUserLocation] = useState({ lat: 37.7749, lng: -122.4194 });
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);

  // Soft pastel color palette inspired by dreamy storybooks
  const colors = {
    // Main background - soft cream like aged parchment
    background: '#FDF9F3',
    // Gentle pastel accents
    mintGreen: '#B8E6B8',
    lavender: '#E1D5E7',
    peachPink: '#FFD3D3',
    skyBlue: '#C8E4F0',
    creamyYellow: '#FFF2CC',
    // Soft neutrals for text and borders
    softGray: '#8B9A9B',
    warmWhite: '#FEFEFE',
    gentleShadow: 'rgba(0, 0, 0, 0.08)'
  };

  // Styles object using CSS-in-JS for the cozy, whimsical theme
  const styles = {
    // Main container with gentle, storybook-like styling
    container: {
      width: '100%',
      height: '100vh',
      backgroundColor: colors.background, // Soft cream base like aged paper
      fontFamily: "'Nunito', 'Quicksand', sans-serif", // Friendly, rounded typography
      position: 'relative',
      overflow: 'hidden'
    },

    // Header with dreamy, floating appearance
    header: {
      position: 'absolute',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      backgroundColor: colors.warmWhite,
      padding: '12px 24px',
      borderRadius: '25px', // Heavy rounding for soft, pill-like shape
      boxShadow: `0 4px 20px ${colors.gentleShadow}`, // Gentle floating shadow
      border: `2px solid ${colors.lavender}`, // Soft lavender border for whimsy
    },

    // Title text with magical feel
    title: {
      margin: 0,
      color: colors.softGray,
      fontSize: '20px',
      fontWeight: '600',
      textAlign: 'center',
      letterSpacing: '0.5px' // Slightly spaced for elegance
    },

    // Map container with watercolor-style background and street patterns
    mapContainer: {
      width: '100%',
      height: '100%',
      position: 'relative',
      // Watercolor-inspired background with organic shapes and soft colors
      background: `
        radial-gradient(circle at 20% 30%, ${colors.skyBlue}40 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, ${colors.mintGreen}30 0%, transparent 50%),
        radial-gradient(circle at 60% 70%, ${colors.peachPink}25 0%, transparent 40%),
        radial-gradient(circle at 30% 80%, ${colors.lavender}35 0%, transparent 50%),
        radial-gradient(circle at 90% 60%, ${colors.creamyYellow}40 0%, transparent 45%),
        linear-gradient(45deg, ${colors.background}95, ${colors.skyBlue}10)
      `,
      // Add subtle texture pattern to mimic watercolor paper
      backgroundImage: `
        repeating-linear-gradient(
          45deg,
          transparent,
          transparent 20px,
          ${colors.softGray}05 20px,
          ${colors.softGray}05 21px
        )
      `,
      overflow: 'hidden'
    },

    // Watercolor street overlay to simulate map roads
    streetOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        linear-gradient(90deg, ${colors.softGray}15 0%, transparent 2%, transparent 98%, ${colors.softGray}15 100%),
        linear-gradient(0deg, ${colors.softGray}10 0%, transparent 1%, transparent 99%, ${colors.softGray}10 100%),
        linear-gradient(45deg, transparent 45%, ${colors.softGray}08 50%, transparent 55%),
        linear-gradient(-45deg, transparent 30%, ${colors.softGray}06 35%, transparent 40%)
      `,
      backgroundSize: '200px 200px, 150px 150px, 300px 300px, 250px 250px',
      backgroundPosition: '0 0, 50px 50px, 100px 0, 0 100px',
      opacity: 0.6,
      pointerEvents: 'none'
    },

    // Organic watercolor blobs to add more artistic feel
    watercolorBlob: {
      position: 'absolute',
      borderRadius: '50% 40% 60% 30%',
      opacity: 0.1,
      pointerEvents: 'none',
      filter: 'blur(1px)'
    },

    // Player marker with bouncing animation and sparkle effect
    playerMarker: {
      position: 'absolute',
      width: '40px',
      height: '40px',
      backgroundColor: colors.peachPink,
      borderRadius: '50%', // Perfect circle
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      color: 'white',
      boxShadow: `0 4px 15px ${colors.gentleShadow}, 0 0 20px ${colors.peachPink}40`, // Glowing effect
      border: `3px solid ${colors.warmWhite}`,
      animation: 'gentleBounce 2s ease-in-out infinite', // Soft bouncing animation
      cursor: 'pointer',
      zIndex: 500
    },

    // Hobby place markers with hover effects
    hobbyMarker: {
      position: 'absolute',
      width: '50px',
      height: '50px',
      backgroundColor: colors.warmWhite,
      borderRadius: '20px', // Rounded square for charm
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      boxShadow: `0 3px 12px ${colors.gentleShadow}`,
      border: `2px solid ${colors.lavender}`,
      cursor: 'pointer',
      transition: 'all 0.3s ease', // Smooth hover transitions
      zIndex: 400,
      ':hover': {
        transform: 'scale(1.1)', // Gentle growth on hover
        boxShadow: `0 6px 20px ${colors.gentleShadow}, 0 0 15px ${colors.lavender}40`
      }
    },

    // Discovery Card - the magical information popup
    discoveryCard: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      maxWidth: '400px',
      backgroundColor: colors.warmWhite,
      borderRadius: '25px', // Heavy rounding for storybook feel
      padding: '25px',
      boxShadow: `0 10px 40px ${colors.gentleShadow}, 0 0 30px ${colors.lavender}20`, // Floating shadow
      border: `3px solid ${colors.mintGreen}`,
      zIndex: 2000,
      animation: 'fadeIn 0.3s ease-out' // Gentle appearance animation
    },

    // Card header with whimsical styling
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
      paddingBottom: '15px',
      borderBottom: `2px dashed ${colors.lavender}40` // Soft dashed border
    },

    // Large emoji icon in the card
    cardIcon: {
      fontSize: '40px',
      marginRight: '15px',
      padding: '10px',
      backgroundColor: colors.creamyYellow,
      borderRadius: '15px',
      boxShadow: `0 2px 8px ${colors.gentleShadow}`
    },

    // Card title styling
    cardTitle: {
      margin: 0,
      color: colors.softGray,
      fontSize: '22px',
      fontWeight: '700',
      lineHeight: '1.3'
    },

    // Information sections in the card
    infoSection: {
      marginBottom: '15px'
    },

    // Labels with friendly, non-technical language
    infoLabel: {
      display: 'block',
      color: colors.softGray,
      fontSize: '14px',
      fontWeight: '600',
      marginBottom: '5px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      opacity: 0.8
    },

    // Information text with warm, inviting style
    infoText: {
      color: colors.softGray,
      fontSize: '16px',
      lineHeight: '1.5',
      margin: 0
    },

    // Close button with whimsical design
    closeButton: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      background: colors.peachPink,
      border: 'none',
      borderRadius: '50%',
      width: '35px',
      height: '35px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '18px',
      color: 'white',
      boxShadow: `0 2px 8px ${colors.gentleShadow}`,
      transition: 'all 0.2s ease'
    },

    // Overlay background when discovery card is open
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)', // Gentle dark overlay
      zIndex: 1500,
      backdropFilter: 'blur(3px)' // Soft blur effect for modern touch
    },

    // Helper tooltip for user interaction
    helpTooltip: {
      position: 'absolute',
      bottom: '30px',
      right: '30px',
      backgroundColor: colors.creamyYellow,
      padding: '12px 18px',
      borderRadius: '20px',
      boxShadow: `0 3px 15px ${colors.gentleShadow}`,
      fontSize: '14px',
      color: colors.softGray,
      fontWeight: '500',
      border: `2px solid ${colors.skyBlue}`,
      zIndex: 1000,
      maxWidth: '200px',
      textAlign: 'center'
    }
  };

  // CSS animations defined as a string to inject into the document
  const animations = `
    @keyframes gentleBounce {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translate(-50%, -60%); }
      to { opacity: 1; transform: translate(-50%, -50%); }
    }
    
    @keyframes sparkle {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }
  `;

  // Inject animations into the document head
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = animations;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  // Handle clicking on a hobby place marker
  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
    setIsDiscoveryOpen(true);
  };

  // Close the discovery card
  const closeDiscovery = () => {
    setIsDiscoveryOpen(false);
    setSelectedPlace(null);
  };

  // Get marker color based on hobby type for visual variety
  const getMarkerStyle = (type) => {
    const typeColors = {
      garden: colors.mintGreen,
      library: colors.skyBlue,
      art: colors.lavender,
      coffee: colors.peachPink,
      default: colors.creamyYellow
    };
    
    return {
      ...styles.hobbyMarker,
      borderColor: typeColors[type] || typeColors.default,
      backgroundColor: colors.warmWhite,
    };
  };

  return (
    <div style={styles.container}>
      {/* Floating header with dreamy title */}
      <div style={styles.header}>
        <h1 style={styles.title}>✨ The Dreamer's Atlas ✨</h1>
      </div>

      {/* Main map area with watercolor-style background */}
      <div style={styles.mapContainer}>
        {/* Watercolor street overlay for artistic map feel */}
        <div style={styles.streetOverlay}></div>
        
        {/* Organic watercolor blobs for artistic atmosphere */}
        <div style={{
          ...styles.watercolorBlob,
          top: '10%',
          left: '15%',
          width: '120px',
          height: '80px',
          backgroundColor: colors.mintGreen
        }}></div>
        <div style={{
          ...styles.watercolorBlob,
          top: '60%',
          right: '20%',
          width: '100px',
          height: '90px',
          backgroundColor: colors.peachPink
        }}></div>
        <div style={{
          ...styles.watercolorBlob,
          bottom: '20%',
          left: '70%',
          width: '80px',
          height: '100px',
          backgroundColor: colors.skyBlue
        }}></div>
        <div style={{
          ...styles.watercolorBlob,
          top: '30%',
          left: '60%',
          width: '60px',
          height: '80px',
          backgroundColor: colors.lavender
        }}></div>

        {/* Player location marker with bouncing animation */}
        <div 
          style={{
            ...styles.playerMarker,
            left: '50%', // Center horizontally for demo
            top: '50%',  // Center vertically for demo
            transform: 'translate(-50%, -50%)'
          }}
          title="Your magical location"
        >
          ⭐ {/* Sparkling star to represent the user */}
        </div>

        {/* Hobby place markers scattered around the map */}
        {hobbyPlaces.map((place, index) => (
          <div
            key={place.id}
            style={{
              ...getMarkerStyle(place.type),
              // Demo positioning - in real app, these would be calculated from lat/lng
              left: `${30 + (index * 20)}%`,
              top: `${40 + (index * 10)}%`,
            }}
            onClick={() => handlePlaceClick(place)}
            onMouseEnter={(e) => {
              // Hover effect for gentle scaling
              e.target.style.transform = 'scale(1.1)';
              e.target.style.boxShadow = `0 6px 20px ${colors.gentleShadow}, 0 0 15px ${colors.lavender}40`;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = `0 3px 12px ${colors.gentleShadow}`;
            }}
            title={`Discover ${place.name}`}
          >
            {place.icon}
          </div>
        ))}
      </div>

      {/* Helpful tooltip for user guidance */}
      <div style={styles.helpTooltip}>
        💫 Tap the sparkling places to discover magical locations nearby!
      </div>

      {/* Discovery Card - appears when a location is selected */}
      {isDiscoveryOpen && selectedPlace && (
        <>
          {/* Gentle overlay background */}
          <div style={styles.overlay} onClick={closeDiscovery} />
          
          {/* The magical discovery card */}
          <div style={styles.discoveryCard}>
            {/* Whimsical close button */}
            <button style={styles.closeButton} onClick={closeDiscovery}>
              ✕
            </button>

            {/* Card header with icon and title */}
            <div style={styles.cardHeader}>
              <div style={styles.cardIcon}>
                {selectedPlace.icon}
              </div>
              <div>
                <h2 style={styles.cardTitle}>{selectedPlace.name}</h2>
              </div>
            </div>

            {/* Location information with friendly labels */}
            <div style={styles.infoSection}>
              <span style={styles.infoLabel}>What Kind of Place</span>
              <p style={styles.infoText}>{selectedPlace.category}</p>
            </div>

            <div style={styles.infoSection}>
              <span style={styles.infoLabel}>A Little Note</span>
              <p style={styles.infoText}>{selectedPlace.note}</p>
            </div>

            {/* Additional whimsical element */}
            <div style={{
              textAlign: 'center',
              marginTop: '20px',
              padding: '15px',
              backgroundColor: colors.background,
              borderRadius: '15px',
              border: `2px dashed ${colors.mintGreen}60`
            }}>
              <span style={{
                fontSize: '14px',
                color: colors.softGray,
                fontStyle: 'italic'
              }}>
                ✨ Ready for your next adventure? ✨
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MapViewPastel;
import React, { useEffect, useState } from 'react';
import '../styles/LocationSummaryCard.css';

const LocationSummaryCard = ({ isOpen, location, onClose, onViewDetails }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  // Mock data for summary
  const mockSummaryData = {
    rating: 4.6,
    distance: '0.3km',
    checkIns: Math.floor(Math.random() * 50) + 10,
    isOpen: true
  };

  const handleViewDetails = () => {
    onViewDetails();
    onClose();
  };

  return (
    <>
      <div 
        className={`summary-overlay ${isOpen ? 'visible' : ''}`}
        onClick={onClose}
      />
      <div className={`location-summary-card ${isOpen ? 'open' : ''}`}>
        {/* Close button */}
        <button className="summary-close-btn" onClick={onClose}>
          ✕
        </button>

        {/* Main content */}
        <div className="summary-content">
          {/* Icon and basic info */}
          <div className="summary-header">
            <div className="summary-icon">
              {location?.icon || '📍'}
            </div>
            <div className="summary-info">
              <h3 className="summary-title">{location?.name || 'Unknown Location'}</h3>
              <p className="summary-description">{location?.description || 'No description available'}</p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="summary-stats">
            <div className="stat-item">
              <span className="stat-icon">⭐</span>
              <span className="stat-text">{mockSummaryData.rating}</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">📍</span>
              <span className="stat-text">{mockSummaryData.distance}</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">👥</span>
              <span className="stat-text">{mockSummaryData.checkIns}</span>
            </div>
            <div className="stat-item">
              <span className={`status-indicator ${mockSummaryData.isOpen ? 'open' : 'closed'}`}>
                {mockSummaryData.isOpen ? 'Open' : 'Closed'}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="summary-actions">
            <button className="quick-action-btn check-in">
              <span className="btn-icon">📍</span>
              Check In
            </button>
            <button className="quick-action-btn save">
              <span className="btn-icon">❤️</span>
              Save
            </button>
            <button className="view-details-btn" onClick={handleViewDetails}>
              View Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationSummaryCard;
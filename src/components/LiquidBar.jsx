import React, { useState, useEffect, useRef } from 'react';
import '../styles/LiquidBar.css';

const LiquidBar = ({ value, maxValue, color, height, label, animated }) => {
  const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
  const barRef = useRef(null);

  useEffect(() => {
    if (animated && barRef.current) {
      const keyframes = [
        { width: '0%' },
        { width: `${percentage}%` }
      ];
      const timing = {
        duration: 1000,
        easing: 'ease-out',
        fill: 'forwards'
      };
      barRef.current.animate(keyframes, timing);
    }
  }, [animated, percentage]);

  return (
    <div className="liquid-bar-container" style={{ height: `${height}px` }}>
      <div className="liquid-bar-background">
        <div
          ref={barRef}
          className="liquid-bar-fill"
          style={{ 
            width: animated ? undefined : `${percentage}%`,
            backgroundColor: color || '#4CAF50' 
          }}
        ></div>
        <div className="liquid-bar-waves"></div>
      </div>
      {label && <div className="liquid-bar-label">{label}</div>}
    </div>
  );
};

export default LiquidBar;

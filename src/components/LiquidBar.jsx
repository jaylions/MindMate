import React, { useState, useEffect } from 'react'

function LiquidBar({ value = 50, maxValue = 100, color = '#4CAF50', height = 60, width = '100%', animated = true, label = '' }) {
  const [currentValue, setCurrentValue] = useState(0)
  const uniqueId = React.useRef(Math.random().toString(36).substr(2, 9)).current
  
  useEffect(() => {
    if (animated) {
      const animationDuration = 1500
      const steps = 30
      const increment = value / steps
      let step = 0
      
      const timer = setInterval(() => {
        step++
        setCurrentValue(increment * step)
        
        if (step >= steps) {
          clearInterval(timer)
          setCurrentValue(value)
        }
      }, animationDuration / steps)
      
      return () => clearInterval(timer)
    } else {
      setCurrentValue(value)
    }
  }, [value, animated])
  
  const percentage = Math.min((currentValue / maxValue) * 100, 100)
  
  return (
    <div className="liquid-bar-container" style={{ width, height }}>
      {label && <div className="liquid-bar-label">{label}</div>}
      <div className="liquid-bar-wrapper">
        <svg 
          width="100%" 
          height={height} 
          viewBox={`0 0 300 ${height}`} 
          className="liquid-bar-svg"
        >
          <defs>
            <linearGradient id={`liquidGradient-${uniqueId}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.8" />
              <stop offset="50%" stopColor={color} stopOpacity="0.9" />
              <stop offset="100%" stopColor={color} stopOpacity="1" />
            </linearGradient>
            <filter id={`glow-${uniqueId}`}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Background */}
          <rect 
            width="100%" 
            height="100%" 
            fill="rgba(255, 255, 255, 0.1)" 
            rx="15" 
            ry="15"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="1"
          />
          
          {/* Liquid */}
          <path
            d={`M 0,${height} 
                L 0,${height - (height * percentage / 100)} 
                Q 75,${height - (height * percentage / 100) - 5} 150,${height - (height * percentage / 100)} 
                T 300,${height - (height * percentage / 100)} 
                L 300,${height} 
                Z`}
            fill={`url(#liquidGradient-${uniqueId})`}
            filter={`url(#glow-${uniqueId})`}
            className="liquid-fill"
          />
          
          {/* Wave animation */}
          <path
            d={`M 0,${height - (height * percentage / 100)} 
                Q 75,${height - (height * percentage / 100) - 8} 150,${height - (height * percentage / 100)} 
                T 300,${height - (height * percentage / 100)}`}
            fill="none"
            stroke={color}
            strokeWidth="2"
            opacity="0.6"
            className="liquid-wave"
          />
        </svg>
        
        {/* Percentage text */}
        <div className="liquid-bar-text">
          <span className="liquid-percentage">{Math.round(percentage)}%</span>
          <span className="liquid-value">{Math.round(currentValue)}/{maxValue}</span>
        </div>
      </div>
    </div>
  )
}

export default LiquidBar
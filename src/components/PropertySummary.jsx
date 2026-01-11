import React, { useState } from 'react';
import './PropertySummary.css';
import sarahImage from '../assets/sarah.jpg';
import HouseRulesModal from './HouseRulesModal'; // Ensure this path is correct
import toast from 'react-hot-toast'; // Make sure this is installed and imported

function PropertySummary({ trip }) {
  const [showRules, setShowRules] = useState(false);

  const handleCopyMapUrl = () => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(trip.address)}`;
    navigator.clipboard.writeText(mapUrl).then(() => {
      alert('Map location link copied!');
    });
  };

  return (
    <div className="property-summary-card">
      <img src={trip.image} alt={trip.title} className="summary-image" />
      <div className="summary-content">
        <h2>{trip.title}</h2>
        <div className="info-list">
          <div className="info-item">
            <svg className="info-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Check-in: {trip.checkIn}</span>
          </div>
          <div className="info-item">
            <svg className="info-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Check-out: {trip.checkOut}</span>
          </div>
          <div className="info-item">
            <svg className="info-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span>{trip.guests} Guests</span>
          </div>
          <div className="info-item">
            <svg className="info-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            <span>{trip.nights} Nights</span>
          </div>
          <div className="info-item clickable" onClick={() => setShowRules(true)}>
            <svg className="info-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span>House Rules</span>
          </div>
        </div>

        <h3>Property Information</h3>
        <div className="summary-address">
          <svg className="info-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span className="address-text">{trip.address}</span>
          <button className="share-address-btn" onClick={handleCopyMapUrl}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
          </button>
        </div>

        {showRules && <HouseRulesModal onClose={() => setShowRules(false)} />}

        <div className="summary-map">
          <iframe
            title="property-location"
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyA6gcVSFU1RchSKHy30vFSN3z-LBjoMV2I&q=${encodeURIComponent(trip.address)}`}
          ></iframe>
        </div>

        <h3>Amenities</h3>
        <div className="amenities-grid">
          {trip.amenities.map(item => (
            <div className="amenity-tag" key={item.text}>{item.text}</div>
          ))}
        </div>

        <h3>Your Property Manager</h3>
        <div className="manager-info">
          <img src={sarahImage} alt={trip.propertyManager.name} />
          <div>
            <h4>{trip.propertyManager.name}</h4>
            <p>{trip.propertyManager.phone}</p>
            <p>{trip.propertyManager.email}</p>
          </div>
        </div>

        <h3>Maintenance Number</h3>
        <p className="maintenance-number">{trip.maintenanceNumber}</p>
        <div className="manager-actions">
          <button className="call-btn">Call Maintenance</button>
          <button className="message-btn">Message Manager</button>
        </div>
      </div>
    </div>
  );
}

export default PropertySummary;

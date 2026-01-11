// src/components/PlacesToVisit/PlacesToVisit.jsx - THE FINAL, PIXEL-PERFECT VERSION

import React from 'react';
import './PlacesToVisit.css';

function PlacesToVisit({ places }) {
  if (!places || places.length === 0) {
    return null;
  }

  return (
    <div className="places-container">
      {/* The header from the previous correct version was fine */}
      <div className="places-title-header">
        <div className="places-icon-wrapper">
            
        </div>
        <div>
            <h3>Places to Visit Nearby</h3>
            <p>Discover local attractions and experiences during your stay</p>
        </div>
      </div>
      
      <div className="places-list">
        {places.map((place, index) => (
          <div key={index} className="place-card">
            <div className="place-image-container">
              <img src={place.image} alt={place.name} />
              <span className="place-category-tag">{place.category}</span>
            </div>
            <div className="place-content">
                <div className="place-header">
                    <h4>{place.name}</h4>
                    <span className="place-rating">★ {place.rating}</span>
                </div>
                <p className="place-description">{place.description}</p>
                <div className="place-info">
                    <span>📍 {place.distance}</span>
                    <span>🕒 {place.drive}</span>
                </div>
                <div className="place-footer">
                    <div className="place-tags">
                        {place.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                    </div>
                    <a href="#" className="directions-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
                        Directions
                    </a>
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- THIS IS THE NEW FINAL BOX --- */}
      <div className="recommendations-box">
        <div className="recommendations-icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        </div>
        <div>
            <h4>Need more recommendations?</h4>
            <p>Contact our concierge team for personalized suggestions and reservations.</p>
        </div>
      </div>

    </div>
  );
}

export default PlacesToVisit;
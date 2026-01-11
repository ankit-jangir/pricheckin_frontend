// src/components/BookingCard/BookingCard.jsx - FINAL VERSION

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingCard.css';
import locationIcon from '../assets/location-icon.svg';
import calendarIcon from '../assets/calendar-icon.svg';
import userIcon from '../assets/user-icon.svg';

function BookingCard({ trip }) {
  const navigate = useNavigate();

  const handlePreCheckin = () => {
    // Navigate to the dynamic check-in route with the trip's ID
    navigate(`/checkin/${trip.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="booking-card">
      <div className="card-image-container">
        <img src={trip.image} alt={trip.title} className="card-image" />
        <span className="card-status">{trip.status}</span>
      </div>
      <div className="card-content">
        <h3 className="card-title">{trip.title}</h3>
        <div className="card-detail-item">
          <img src={locationIcon} alt="Location" />
          <span>{trip.location}</span>
        </div>
        <div className="card-detail-item">
          <img src={calendarIcon} alt="Date" />
          <span>{trip.dates}</span>
        </div>
        <div className="card-detail-item">
          <img src={userIcon} alt="Guests" />
          <span>{trip.guests} Guests</span>
        </div>
        <div className="card-footer">
          <span className="card-price">${trip.price}</span>
          <button 
            className="pre-checkin-btn"
            onClick={handlePreCheckin}
          >
            Pre-check in
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingCard;
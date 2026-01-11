// src/pages/BookingConfermation.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { tripsData } from "../data/mockTrips";
import "./BookingConfermation.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PropertySummary from "../components/PropertySummary";
import Concierge from "../components/Concierge";
import PlacesToVisit from "../components/PlacesToVisit";
import ChatIcon from "../assets/chat.png";

function BookingConfermation() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [guests, setGuests] = useState([]);
  const [progress, setProgress] = useState(0);


  useEffect(() => {
    const currentTrip = tripsData.find((t) => t.id === parseInt(tripId));
    if (currentTrip) {
      setTrip(currentTrip);
      setGuests(currentTrip.guestList || []);
    }
  }, [tripId]);

   // Calculate progress (same as CheckinPage)
  useEffect(() => {
    const checkedInCount = guests.filter((g) => g.checkedIn).length;
    const totalGuests = guests.length;

    const percent =
      totalGuests > 0
        ? Math.round((checkedInCount / totalGuests) * 100)
        : 0;

    setProgress(percent);
  }, [guests]);

  if (!trip) return <div>Loading Experience...</div>;

  return (
    <div className="stay-experience-wrapper">
      <Header />

      <main className="stay-experience-main">
        {/* ===== Welcome Header ===== */}
        <div className="welcome-header">
          <div className="welcome-header-left">
            <button className="back-button" onClick={() => navigate(-1)}>
              ←
            </button>
            <div>
              <h1>Welcome To Your Stay</h1>
              <p>
                Your check-in was successful! Enjoy your stay at {trip.title}.
              </p>
            </div>
          </div>
        </div>

        {/* ===== Feedback Bar ===== */}
        <div className="feedback-bar">
          <div className="feedback-bar-content">
            <span className="take-action-tag">★ Take Action</span>
            <h3>Complete Your Stay Experience</h3>
            <p>
              Feedback will be active 12 hours before checkout. Complete your
              feedback and enjoy 10% off your next stay.
            </p>
          </div>

          <button
            className="feedback-btn"
            onClick={() => navigate(`/feedback/${trip.id}`)}
          >
            <span className="feedback-text">
              <img src={ChatIcon} alt="Chat" width="18" />
              Give Feedback
            </span>
            <small className="feedback-offer">Get 10% off</small>
          </button>
        </div>

        {/* ===== Dashboard Layout ===== */}
        <div className="dashboard-layout">
          {/* LEFT COLUMN */}
          <div className="left-column">
            <Concierge />
            <PlacesToVisit places={trip.nearbyPlaces} />
          </div>

          {/* RIGHT COLUMN */}
          <div className="right-column">
            {/* === Guest Check-In Status (RIGHT SIDE, TOP) === */}
             <div className="checkin-status-card">
              <div className="checkin-header">
                <h3>Guest Check-In Status</h3>
                <span className="checkin-percentage">{progress}%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="checkin-list">
                {guests.map((guest, index) => (
                  <label
                    key={guest.id}
                    className={`checkin-item ${
                      guest.checkedIn ? "checked" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={guest.checkedIn}
                      readOnly
                    />
                    Guest {index + 1}: {guest.name}
                  </label>
                ))}
              </div>
            </div>


            {/* === Property Section (BELOW CHECK-IN STATUS) === */}
            <PropertySummary trip={trip} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default BookingConfermation;

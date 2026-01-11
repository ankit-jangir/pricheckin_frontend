// src/pages/MyTripsPage.jsx - THE FINAL, WORKING DASHBOARD

import React, { useState } from 'react';
import './MyTripsPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookingCard from '../components/BookingCard';
import { tripsData } from '/src/data/mockTrips.js';


function MyTripsPage() {
  const [activeTab, setActiveTab] = useState('Upcoming');

  // This is the logic to filter trips based on the active tab
  const filteredTrips = tripsData.filter(trip => trip.status === activeTab);

  return (
    <div className="my-trips-page">
      <Header />
      
      <main className="trips-main-content">
        <h1 className="page-title">My Trips</h1>
        
        <div className="tabs">
          <button 
            className={`tab-btn ${activeTab === 'Upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('Upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={`tab-btn ${activeTab === 'Past' ? 'active' : ''}`}
            onClick={() => setActiveTab('Past')}
          >
            Past
          </button>
          <button 
            className={`tab-btn ${activeTab === 'Cancelled' ? 'active' : ''}`}
            onClick={() => setActiveTab('Cancelled')}
          >
            Cancelled
          </button>
        </div>
        
        <div className="trips-grid">
          {filteredTrips.length > 0 ? (
            filteredTrips.map(trip => (
              <BookingCard key={trip.id} trip={trip} />
            ))
          ) : (
            <p className="no-trips-message">No {activeTab.toLowerCase()} trips found.</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MyTripsPage;
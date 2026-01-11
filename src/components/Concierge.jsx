// src/components/Concierge/Concierge.jsx - FINAL, WORKING VERSION
import React from 'react';
import './Concierge.css';
import Services from '../components/Services';
import reqIcon from '../assets/req.png'

function Concierge() {
  return (
    <div className="concierge-container">
        <div className="concierge-header">
            <div>
                <h3>Concierge Services</h3>
                <p>Our concierge team is available 24/7 to assist with your requests</p>
            </div>
            <button className="view-all-btn">5% OFF</button>
        </div>
        <Services />
        <div className="request-form">
            <div className="request-section">
  <div className="request-heading">
        <img src={reqIcon} alt="Request Icon" width="20" height="20"   />
    <h4>Submit a request</h4>
    </div>

    </div>
     <textarea placeholder="Describe your request"></textarea>

            <div className="request-actions">
                <button className="submit-request-btn">Submit</button>
                <button className="call-service-btn">Call For Service</button>
            </div>
        </div>
    </div>
  );
}
export default Concierge;
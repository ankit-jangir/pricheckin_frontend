// src/components/Services/Services.jsx
import React, { useState } from 'react';
import './Services.css';
import { servicesData } from '../data/mockTrips'; // Importing our new data

// Importing images from src/assets
import TransportImg from '../assets/Transport.png';
import FrameImg from '../assets/Frame.png';
import ActivitiesImg from '../assets/Activities.png';
import CallImg from '../assets/Call.png';

// Define image components
const DiningIcon = () => <img src={FrameImg} alt="Dining" className="tab-icon" />;
const TransportIcon = () => <img src={TransportImg} alt="Transport" className="tab-icon" />;
const AssistanceIcon = () => <img src={CallImg} alt="Assistance" className="tab-icon" />;
const ActivitiesIcon = () => <img src={ActivitiesImg} alt="Activities" className="tab-icon" />;

// Match icons to tab names
const tabIcons = {
  Dining: <DiningIcon />,
  Transport: <TransportIcon />,
  Assistance: <AssistanceIcon />,
  Activities: <ActivitiesIcon />
};

const tabs = ['Dining', 'Transport', 'Assistance', 'Activities'];

function Services() {
  const [activeTab, setActiveTab] = useState('Dining');
  const currentService = servicesData[activeTab];

  return (
    <div className="services-container">
      <div className="services-tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`service-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tabIcons[tab]}
            <span>{tab}</span>
          </button>
        ))}
      </div>

      <div className="service-content">
        <img src="/checkin.png" alt={activeTab} className="service-image" />
        <div className="service-options-grid">
          {currentService.options.map(option => (
            <div key={option} className="service-option">
              <svg className="check-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>{option}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;

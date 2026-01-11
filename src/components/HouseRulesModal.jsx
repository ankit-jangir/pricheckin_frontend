import React from 'react';
import './HouseRulesModal.css';

function HouseRulesModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>House Rules</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="rules-content">
          <ul>
            <li>No smoking inside the property.</li>
            <li>No pets allowed unless previously agreed upon.</li>
            <li>Quiet hours are from 10 PM to 8 AM.</li>
            <li>Please respect the neighbors and keep noise to a minimum.</li>
            <li>Do not move furniture.</li>
            <li>Report any damages immediately to the property manager.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default HouseRulesModal; 
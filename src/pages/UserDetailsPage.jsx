// src/pages/UserDetailsPage.jsx - THE FINAL, CORRECTED VERSION

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; 
import './UserDetailsPage.css';
import detailsBg from '../assets/details-bg.svg';
import whatsappIcon from '../assets/whatsapp-icon.svg';



function UserDetailsPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+91',
    phone: '',
    gender: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  // Validation checks...
  if (!formData.firstName /* ... and other fields */) {
    // You can even use toasts for errors!
    toast.error('Please fill all the required fields.'); 
    return;
  }
  if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email address.');
      return;
  }
  
  console.log('Form Data Submitted:', formData);

  // --- THE FIX IS HERE ---
  // 1. Show the success toast (यह non-blocking है)
  toast.success('Details saved successfully!');

  // 2. Immediately navigate to the next page
  navigate('/my-trips');
  // ---------------------
};

  return (
    <div className="details-container">
      {/* Left Panel */}
      <div className="details-left-panel" style={{ backgroundImage: `url(${detailsBg})` }}>
        <div className="panel-overlay">
          <img src="/logo.png" alt="Staymaster Logo" className="details-logo" />
          <div className="details-quote">
            <span className="quote-mark">“</span>
            <p>Your perfect getaway is just a few details away. Fill them in to continue.</p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="details-right-panel">
        
          <div className="form-header">
            <svg className="menu-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </div>
          <form onSubmit={handleSubmit} className="details-form">

            {/* --- THIS IS THE CORRECTED STRUCTURE --- */}
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required/>
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required/>
            </div>
            {/* -------------------------------------- */}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required/>
            </div>
            <div className="form-row">
              <div className="form-group country-code-group">
                <label htmlFor="countryCode">Phone number</label>
                <select name="countryCode" id="countryCode" value={formData.countryCode} onChange={handleChange}>
                  <option value="+91">+91 (IND)</option>
                  <option value="+1">+1 (USA)</option>
                </select>
              </div>
              <div className="form-group phone-number-group">
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} maxLength="10" required/>
              </div>
            </div>
            <div className="form-group">
              <label>Gender</label>
              <div className="gender-options">
                <input type="radio" id="male" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} />
                <label htmlFor="male">Male</label>
                <input type="radio" id="female" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} />
                <label htmlFor="female">Female</label>
                <input type="radio" id="non-binary" name="gender" value="Non-Binary" checked={formData.gender === 'Non-Binary'} onChange={handleChange} />
                <label htmlFor="non-binary">Non-Binary</label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required/>
            </div>
            <div className="action-buttons">
              <button type="submit" className="save-btn">Save</button>
              <a href="https://wa.me/9694896933" target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
                <img src={whatsappIcon} alt="WhatsApp" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </form>
       
      </div>
    </div>
  );
}

export default UserDetailsPage;
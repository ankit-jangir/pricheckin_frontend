// src/pages/GuestFormPage.jsx - Updated to match Figma design

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { tripsData } from "../data/mockTrips";
import toast from "react-hot-toast";
import "./GuestFormPage.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function GuestFormPage() {
  const { tripId, guestId } = useParams();
  const navigate = useNavigate();
  const [guestName, setGuestName] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
    dob: "",
    city: "",
    state: "",
    country: "",
    address: "",
    zip: "",
    idFile: null,
    declaration: false,
    gstBill: false,
    gstNumber: "",
    businessName: "",
    stayedBefore: "", // 👈 added
  });

  useEffect(() => {
    const trip = tripsData.find((t) => t.id === parseInt(tripId));
    const guest = trip?.guestList.find((g) => g.id === guestId);
    if (guest) {
      setGuestName(guest.name);
      const [firstName, lastName] = guest.name.split(" ");
      setFormData((prev) => ({
        ...prev,
        firstName: firstName || "",
        lastName: lastName || "",
      }));
    }
  }, [tripId, guestId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, idFile: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.declaration) {
      toast.error("You must agree to the declaration.");
      return;
    }
    console.log("Form Submitted:", formData);
    toast.success(`${guestName}'s details saved successfully!`);
    navigate(`/checkin/${tripId}/declaration`);
  };

  return (
    <div className="guest-form-page-wrapper">
      <Header />
      <main className="guest-form-main">
        <div className="guest-form-container">
          <div className="guest-form-header">
            <h2>Guest Check-in</h2>
            <p>Complete the form to speed up your check-in for {guestName}</p>
            <button
              className="close-btn"
              onClick={() => navigate(`/checkin/${tripId}`)}
            >
              ×
            </button>
          </div>

          <form
            id="guest-form-id"
            onSubmit={handleSubmit}
            className="guest-details-form"
          >
            {/* Name Row */}
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            {/* Email and Mobile Row */}
            <div className="form-row">
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange} 
                  placeholder="jhondoe@email.com"
                  required
                />
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <div className="mobile-input-wrapper">
                  <span className="country-code">+91</span>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    maxLength={10}
                    placeholder="88664 *****"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Gender and DOB Row */}
            <div className="form-row">
              <div className="form-group">
                <label>Select Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-Binary">Non-Binary</option>
                </select>
              </div>
              <div className="form-group">
                <label>Select Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Address Section */}
            <div className="form-group">
              <label>
                Address <span className="required">*</span>
              </label>
              <div className="address-row">
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Enter City <span className="required">*</span>{" "}
                  </option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bangalore">Bangalore</option>
                </select>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select State <span className="required">*</span>
                  </option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Karnataka">Karnataka</option>
                </select>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Country <span className="required">*</span>
                  </option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                </select>
              </div>
              <input
                type="text"
                name="address"
                placeholder="Enter Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            {/* Zip Code */}
            {/* Zip Code and Stayed Before Row */}
            <div className="form-row">
              {/* Zip Code */}
              <div className="form-group zip-code-group">
                <label>
                  Zip Code <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  placeholder="400001"
                  required
                />
              </div>

              {/* Stayed Before Question */}
              <div className="form-group stayed-before-group">
                <label>Have you stayed with us before?</label>
                <div className="radio-options">
                  <label>
                    <input
                      type="radio"
                      name="stayedBefore"
                      value="Yes"
                      checked={formData.stayedBefore === "Yes"}
                      onChange={handleChange}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="stayedBefore"
                      value="No"
                      checked={formData.stayedBefore === "No"}
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>

            {/* Upload ID */}
            <div className="form-group upload-id-group">
              <label>
                Upload Id <span className="required">*</span>
              </label>
              <div className="file-upload-container">
                <label htmlFor="id-upload" className="file-upload-label">
                  <div className="upload-content">
                    <svg
                      className="upload-icon"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17,8 12,3 7,8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <span className="upload-text">Upload Id</span>
                  </div>
                  {formData.idFile && (
                    <span className="upload-success">
                      ✓ ID uploaded successfully!
                    </span>
                  )}
                </label>
                <input
                  type="file"
                  id="id-upload"
                  name="idFile"
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png,.pdf"
                  required
                />
              </div>
              <p className="upload-helper-text">
                Please upload a valid government-issued ID (passport, driver's
                license, etc.)
              </p>
            </div>

            {/* Declaration Checkbox */}
            <div className="checkbox-container">
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="declaration"
                  name="declaration"
                  checked={formData.declaration}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="declaration">
                  I declare that the government ID proof, which states my
                  residential address provide is valid. In case, I am not an NRI
                  or an OCI card holder, I will provide a valid Visa and I
                  further declare that I will be complying with all regulations
                  applicable to me, including but limited to the FRRO
                  regulations. I also accept the declaration signed by Me/Main
                  Guest under the ‘Upload Id’ section here.
                </label>
              </div>

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="gstBill"
                  name="gstBill"
                  checked={formData.gstBill}
                  onChange={handleChange}
                />
                <label htmlFor="gstBill">Receive a GST bill</label>
              </div>
            </div>

            {/* Business Details (conditional) */}
            {formData.gstBill && (
              <div className="business-details">
                <h4>Business Details</h4>
                <div className="business-inputs">
                  <input
                    type="text"
                    name="gstNumber"
                    placeholder="Enter GST number"
                    value={formData.gstNumber}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="businessName"
                    placeholder="Enter business name"
                    value={formData.businessName}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="action-buttons-container">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate(`/checkin/${tripId}`)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="complete-btn"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Complete Check-in
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default GuestFormPage;

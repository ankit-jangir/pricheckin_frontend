// src/pages/Login.jsx - FINAL & CORRECT STRUCTURE

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import backgroundImage from "../assets/login-bg.svg";
import { Number_verifiy } from "../redux/Api/login_Api";
import { useDispatch } from "react-redux";
import allCountries from "country-telephone-data";
import Toast from "../utils/toastService";
function Login() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const dispatch = useDispatch();

  const countries = allCountries.allCountries.map((c) => ({
    name: c.name,
    code: `+${c.dialCode}`,
  }));
  


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phoneNumber.trim() === "") {
      Toast.validation("Phone number is required");
      return;
    }

    if (phoneNumber.trim().length < 7) {
      Toast.validation("Enter a valid phone number");
      return;
    }

    const finalPhone = `${countryCode}${phoneNumber}`;

    try {
      const response = await dispatch(
        Number_verifiy(finalPhone)
      ).unwrap();
      localStorage.setItem("phoneNumber", finalPhone);
      if (response?.success) {
        Toast.success(response.message);
        navigate("/verify-otp", { state: { phoneNumber: finalPhone } });
      } else {
        Toast.warn("Failed to send OTP");
      }
    } catch (error) {
      Toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div
      className="login-page-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="screen-overlay">
        <div className="content-wrapper">
          <div className="panel quote-panel">
            <div className="quote-icon">“</div>
            <p className="quote-text">
              Tell us your travel dreams, we will make them come true!
            </p>
          </div>

          <div className="separator"></div>

          <div className="panel form-panel">
            <h2>Welcome to staymaster</h2>
            <p className="subtitle">Login or Sign up</p>

            <form className="phone-form" onSubmit={handleSubmit}>
              {/* --- THIS IS THE NEW, CORRECT STRUCTURE --- */}

              {/* Box 1: Country Code (It's not a real input, just looks like one) */}
              <div className="input-field">
                <select
                  className="country-select"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  {countries.length > 0 &&
                    countries.map((c) => (
                      <option key={`${c.name}-${c.code}`} value={c.code}>
                        {c.name} ({c.code})
                      </option>
                    ))}
                </select>
              </div>

              {/* Box 2: Phone Number Input */}
              <div className="input-field">
                <input
                  type="tel"
                  className="phone-input"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  maxLength={10}
                />
              </div>

              <button type="submit" className="continue-btn">
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

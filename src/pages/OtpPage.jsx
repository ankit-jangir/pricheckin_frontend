// src/pages/OtpPage.jsx - FINAL WORKING VERSION

import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OtpPage.css";
import backgroundImage from "../assets/login-bg.svg";
import { useDispatch } from "react-redux";
import { Number_verifiy, verifyOTP } from "../redux/Api/login_Api";
import Toast from "../utils/toastService";
import { setGuestToken } from "../redux/slices/login_slice";
function OtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const phoneNumber = location.state?.phoneNumber || "your number";

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  // States for the resend logic
  const [resendTimer, setResendTimer] = useState(0);
  const [resendMessage, setResendMessage] = useState("");

  // --- THIS IS THE MISSING PIECE: useEffect for the timer ---
  useEffect(() => {
    let timerId;
    if (resendTimer > 0) {
      timerId = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    // Cleanup function: this runs when the component unmounts or timer changes
    return () => clearInterval(timerId);
  }, [resendTimer]);

  
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const enteredOtp = otp.join("");
  const phoneNumber = localStorage.getItem("phoneNumber");

  if (!phoneNumber || enteredOtp.length !== 6) {
    Toast.validation("Phone number or OTP is invalid.");
    return;
  }
  dispatch(
    verifyOTP({
      phone: phoneNumber,
      otp: Number(enteredOtp),
    })
  )
    .unwrap()
    .then((res) => {
      Toast.success(res?.message || "OTP verified successfully!");
      if (res?.guestToken) {
         document.cookie = `guestToken=${res.guestToken}; path=/; max-age=2592000; secure; samesite=strict`;
      } else {
        console.log("TOKEN NOT FOUND IN RESPONSE");
      }
      dispatch(setGuestToken(res.guestToken || null));
      navigate("/my-trips");
    })
    .catch((error) => {
      Toast.error(error?.message || "Invalid OTP. Please try again.");
    });
};

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;

    const finalPhone = localStorage.getItem("phoneNumber");

    if (!finalPhone) {
      Toast.validation("Phone number not found.");
      return;
    }

    try {
      const response = await dispatch(Number_verifiy(finalPhone)).unwrap();
      Toast.success(response?.message || "OTP sent successfully.");
      setResendMessage("OTP resent successfully!");

      setResendTimer(30);

      setTimeout(() => {
        setResendMessage("");
      }, 3000);
    } catch (error) {
      Toast.error(error?.message || "Failed to resend OTP");
    }
  };

  return (
    <div
      className="otp-page-container"
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
            <h2>Verify your number</h2>
            <p className="subtitle">
              We've sent the code via SMS to {phoneNumber}
            </p>
            <form className="otp-form" onSubmit={handleSubmit}>
              <div className="otp-input-container">
                {otp.map((data, index) => (
                  <input
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="otp-input"
                    type="tel"
                    inputMode="numeric"
                    maxLength="1"
                    key={index}
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onFocus={(e) => e.target.select()}
                  />
                ))}
              </div>
              <button type="submit" className="continue-btn">
                Continue
              </button>

              {/* --- THIS IS THE MISSING/UPDATED JSX --- */}
              <div className="resend-container">
                {resendMessage ? (
                  <p className="resend-success">{resendMessage}</p>
                ) : (
                  <p className="resend-text">
                    Didn't receive the code?{" "}
                    {resendTimer > 0 ? (
                      <span className="timer-text">
                        Resend in {resendTimer}s
                      </span>
                    ) : (
                      <a href="#" onClick={handleResendOtp}>
                        Resend
                      </a>
                    )}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpPage;

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

import "./StayExperience.css";

import headerBgImage from "../assets/header-bg-image.jpeg";
import thumbsUpIcon from "../assets/thumbs-up-icon.png";
import giftIcon from "../assets/gift-icon.png";
import sparkleIcon from "../assets/sparkle-icon.jpg";
import copyIcon from "../assets/copy-icon.jpg";
import downloadIcon from "../assets/download-icon.png";
import refundIcon from "../assets/refund-icon.png";

const StayExperience = () => {
  const navigate = useNavigate();
  const { tripId } = useParams();

  const [showRefundModal, setShowRefundModal] = useState(false);

  const discountCode = "FEEDBACK10";

  const handleCopyCode = () => {
    navigator.clipboard.writeText(discountCode);
    toast.success("Code copied to clipboard!");
  };

  return (
    <div className="stay-experience-container">
      <Header />

      {/* ================= HEADER ================= */}
      <header className="se-header">
        <img src={headerBgImage} alt="Ocean sunset" className="se-header-bg" />
        <div className="se-header-overlay">
          <span className="se-thank-you-pill">Thank You!</span>
          <h1 className="se-header-title">Your Feedback Has Been Submitted</h1>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="se-main-content">
        <div className="se-icon-wrapper">
          <img src={thumbsUpIcon} alt="Thumbs Up" />
        </div>

        <h2 className="se-main-title">We appreciate your feedback!</h2>
        <p className="se-subtitle">
          Your comments help us improve our services and provide better
          experiences for future guests.
        </p>

        {/* ================= GIFT CARD ================= */}
        <div className="se-gift-card">
          <img src={sparkleIcon} alt="" className="se-sparkle-icon" />

          <div className="se-gift-card-content">
            <div className="se-gift-header">
              <div className="se-gift-icon-wrapper">
                <img src={giftIcon} alt="" />
              </div>
              <div>
                <h3>Special Gift for You!</h3>
                <p>Enjoy 10% off your next stay</p>
              </div>
            </div>

            <div className="se-code-box">
              <div className="se-code-display">
                <span>{discountCode}</span>
              </div>
              <button onClick={handleCopyCode} className="se-copy-btn">
                <img src={copyIcon} alt="" />
                Copy Code
              </button>
            </div>
          </div>
        </div>

        {/* ================= ACTION BUTTONS ================= */}
        <div className="se-action-buttons">
          <button
            className="se-btn se-btn-download"
            onClick={() => navigate(`/invoice/${tripId}`)}
          >
            <img src={downloadIcon} alt="" />
            Download Invoice
          </button>

          <button
            className="se-btn se-btn-refund"
            onClick={() => setShowRefundModal(true)}
          >
            <img src={refundIcon} alt="" />
            Refund Security Deposit
          </button>
        </div>

        <button onClick={() => navigate(-1)} className="se-return-link">
          Return to Stay Information
        </button>
      </main>

      <Footer />

      {/* ================= REFUND MODAL ================= */}
      {showRefundModal && (
        <div className="refund-modal-backdrop">
          <div className="refund-modal">
            <div className="refund-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <h2>Refund in Progress</h2>
            <p>
              The security deposit refund has been successfully initiated via
              Razorpay and is now under processing. This may take some time
              depending on your bank and payment method.
            </p>

            <button
              className="refund-ok-btn"
              onClick={() => setShowRefundModal(false)}
            >
              Ok, got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StayExperience;

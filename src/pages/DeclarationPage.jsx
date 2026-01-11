// src/pages/DeclarationPage.jsx - Updated to match Figma design exactly

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import './DeclarationPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import frameIcon from '../assets/Frame.svg';
import VectorIcon from '../assets/Vector.png';  
import GiftIcon from '../assets/Gift.png';
function DeclarationPage() {
  const navigate = useNavigate();
  const { tripId } = useParams();

  // State to manage the form sections
  const [declarationChecked, setDeclarationChecked] = useState(false);
  const [isDeclared, setIsDeclared] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const handleSignDeclaration = () => {
    if (declarationChecked) {
      setIsDeclared(true);
      toast.success('Declaration Signed!');
    } else {
      toast.error('Please agree to the terms before signing.');
    }
  };
  
  const handlePayNow = () => {
    // In a real app, this would open a payment gateway.
    // Here, we'll just simulate a successful payment.
    setIsPaid(true);
    toast.success('Security Deposit Paid!');
  };
  
  const handleContinue = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Navigate to the final success page or back to trips
    toast.success('Check-in Complete!');
    navigate(`/booking-confermation/${tripId}`);
  };

  return (
    <div className="declaration-page-wrapper">
      <Header />
      <main className="declaration-main">
        <div className="declaration-container">
          {/* --- Questionnaire Section --- */}
          <section className="info-section questionnaire">
            <div className="questionnaire-header">
              Answer these questions to make your stay comfortable
            </div>
            <div className="questionnaire-body">
              <div className="form-group">
                <label>Have you stayed with us before?</label>
                 <div className="custom-select-wrapper">
                <select>
                  <option>Select Your Answer</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
                </div>
              </div>
              <div className="form-group">
                <label>Purpose of Trip</label>
                   <div className="custom-select-wrapper">
                <select>
                  <option>Select Your Answer</option>
                  <option>Business</option>
                  <option>Leisure</option>
                  <option>Other</option>
                </select>
                </div>
              </div>
              <div className="form-group">
                <label>Group Type</label>
                <div className="custom-select-wrapper">
                <select>
                  <option>Select Your Answer</option>
                  <option>Solo</option>
                  <option>Couple</option>
                  <option>Family</option>
                  <option>Friends</option>
                </select>
                </div>
              </div>
            </div>
          </section>

          {/* --- Main Check-in Section --- */}
       
          <section className="info-section main-checkin">
            <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
            <h1>Complete Your Check-In</h1>

            {/* Declaration Box */}
            <h3 className='section-h3'>Declaration</h3>
            <div className="declaration-box">
              
              <div className="declaration-text">
                <p>I hereby declare that all information provided during the check-in process is true and accurate to the best of my knowledge. I understand that providing false information may result in the cancellation of my reservation without refund.</p>
                <p>I acknowledge that I am responsible for the condition of the property during my stay and will report any damages or issues immediately. I agree to pay for any damages caused by me or my guests during the stay.</p>
                <p>I understand that check-in time is 3:00 PM and check-out time is 11:00 AM unless otherwise arranged. I agree to comply with all house rules and local regulations during my stay.</p>
              </div>
              <div className="checkbox-group">
                <input 
                  type="checkbox" 
                  id="declare-agree" 
                  checked={declarationChecked} 
                  onChange={(e) => setDeclarationChecked(e.target.checked)} 
                />
                <label htmlFor="declare-agree">
                  I hereby confirm that I have read and agree to the terms and conditions of this declaration
                </label>
              </div>
              <button 
                className={`sign-btn ${isDeclared ? 'completed' : ''}`} 
                onClick={handleSignDeclaration}
                disabled={isDeclared}
              >
                {isDeclared ? '✓ Signed' : 'Sign Declaration'}
              </button>
            </div>

            {/* Security Deposit Box */}
            <div className="deposit-box">
              <h3>
  <img
    src={frameIcon}
    alt="Security Icon"
    width={40}
    height={40}
    style={{ verticalAlign: 'middle', marginRight: '-12px' }}
  />
  Security Deposit
</h3>
             <div className="deposit-info">
  <p className="icon-paragraph">
    <span className="icon-wrapper">
      <img src={VectorIcon} alt="Security Icon" />
    </span>
    <strong>
     A security deposit of $500 is required for your stay. This deposit is fully refundable within 7 days after check-out, provided there is no damage to the property or its contents.
    </strong>
  </p>
<p className="plain-paragraph">
  The security deposit covers potential damages, excessive cleaning needs, or violations of house rules. Any deductions will be itemized and communicated to you before processing.
</p>

</div>
          <div>
  <div className="offer-box">
    <div className="offer-badge">
      <span className="icon">
        <img src={GiftIcon} alt="Special Offer Icon" width={16} height={16} />
      </span>
      <span className="label">Special Offer</span>
      <span className="offer-text">Pay now to get 5% off on concierge services!</span>
    </div>
    <p>
      Complete your security deposit payment now and receive a 5% discount on all concierge services during your stay, including airport transfers, in-house dining, and activity bookings.
    </p>
  </div>
</div>

  <button 
    className={`pay-btn ${isPaid ? 'completed' : ''}`}
    onClick={handlePayNow}
    disabled={isPaid}
  >
    {isPaid ? '✓ Paid' : 'Pay Now'}
  </button>
</div>

            
            <button 
              className="continue-btn"
              onClick={handleContinue}
              disabled={!isDeclared}
            >
              Continue
               
            </button>
   
            <p className="helper-text">Please complete both sections above to continue</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default DeclarationPage;
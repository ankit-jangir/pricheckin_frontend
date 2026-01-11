// src/pages/FeedbackPage.jsx - THE FINAL, CORRECTED VERSION

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { tripsData } from "../data/mockTrips";
import toast from "react-hot-toast";
import "./FeedbackPage.css";
import StarRating from "../components/StarRating";
import Header from "../components/Header";
import Footer from "../components/Footer";
import submitIcon from "../assets/submit.png";
import reqIcon from "../assets/req.png";
import googleIcon from "../assets/google.png";
import StayExperience from "./StayExperience";
import { FiArrowLeft } from "react-icons/fi";
function FeedbackPage() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);

  // --- STATE FOR PRIVATE FEEDBACK ---
  const [overallRating, setOverallRating] = useState(0);
  const [cleanliness, setCleanliness] = useState(0);
  const [comfort, setComfort] = useState(0);
  const [location, setLocation] = useState(0);
  const [amenities, setAmenities] = useState(0);
  const [service, setService] = useState(0);
  const [comment, setComment] = useState("");
  const [propertyManager, setPropertyManager] = useState(0);
  const [propertyManager1, setPropertyManager1] = useState(0);
  const [propertyManager2, setPropertyManager2] = useState(0);
  const [caretaker, setCaretaker] = useState(0);

  useEffect(() => {
    const currentTrip = tripsData.find((t) => t.id === parseInt(tripId));
    setTrip(currentTrip);
  }, [tripId]);

  const handleSubmit = () => {
    console.log({
      overallRating,
      cleanliness,
      comfort,
      location,
      amenities,
      service,
      comment,
      caretaker,
      propertyManager,
    });
    toast.success("Thank you for your valuable feedback!");
    navigate(`/stay-experience/${tripId}`);
  };

  // This creates the link for the Google Review button
  const googleReviewLink = `https://www.google.com/search?q=${encodeURIComponent(
    trip?.title + ", " + trip?.location
  )}`;

  if (!trip) return <div>Loading...</div>;

  return (
    <div className="feedback-page-wrapper">
      <Header />
      <main className="feedback-main">
        <div className="feedback-container">
          <div className="info-bar">
            <p>
              Complete this step to get your{" "}
              <strong>security deposit back</strong>. Please fill up the
              feedback form to get <strong>10% off</strong> your next stay.
            </p>
          </div>
          <div className="review-card">
            <div className="share-experience-section">
              <button
                className="share-back-btn"
                onClick={() => navigate(-1)}
                aria-label="Go back"
              >
                <FiArrowLeft />
              </button>

              <div className="share-text">
                <h2>Share Your Experience</h2>
                <p>
                  We value your feedback. Fill the form and let us know how you
                  enjoyed your stay!
                </p>
              </div>
            </div>

            <div className="card-header">
              <h3>Public Review</h3>
              <span className="recommended-tag">Recommended</span>
            </div>
            <p className="card-subtitle">
              Share your experience publicly to help future travelers make
              informed decisions
            </p>
            <div className="google-review-widget">
              <div className="widget-header">
                <img src={googleIcon} alt="Google" className="google-logo" />
                <div>
                  <h4>{trip.title}</h4>
                  <p>{trip.address}</p>
                  <p className="reviews-count">
                    <span className="rating-badge">4.8 ★</span> (326 reviews)
                  </p>
                </div>
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="widget-thumbnail"
                />
              </div>
              <div className="widget-body">
                <h4>Share Your Experience</h4>
                {/* This is just visual, the real rating happens on Google */}
                <div className="visual-stars">★★★★★</div>
                <p className="widget-prompt">
                  Your review will help others learn about this business
                </p>
                <a
                  href={googleReviewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="write-review-link"
                >
                  Write a Review
                </a>
              </div>
            </div>
          </div>

          <div className="review-card">
            <div className="card-header">
              <h3>Private Feedback For Us</h3>
              <span className="recommended-tag">Recommended</span>
            </div>
            <div className="rating-group">
              <label>Overall Rating</label>
              <StarRating
                rating={overallRating}
                onRatingChange={setOverallRating}
              />
            </div>
            <div className="rating-grid">
              <div className="rating-item">
                <label>Cleanliness</label>
                <StarRating
                  rating={cleanliness}
                  onRatingChange={setCleanliness}
                />
              </div>
              <div className="rating-item">
                <label>Property Manager</label>
                <StarRating
                  rating={propertyManager}
                  onRatingChange={setPropertyManager}
                />
              </div>
              {/* <div className="rating-item">
                <label>Property Manager</label>
                <StarRating
                  rating={propertyManager1}
                  onRatingChange={setPropertyManager1}
                />
              </div>
              <div className="rating-item">
                <label>Property Manager</label>
                <StarRating
                  rating={propertyManager2}
                  onRatingChange={setPropertyManager2}
                />
              </div> */}

              <div className="rating-item">
                <label>Caretaker</label>
                <StarRating rating={caretaker} onRatingChange={setCaretaker} />
              </div>

              <div className="rating-item">
                <label>Comfort</label>
                <StarRating rating={comfort} onRatingChange={setComfort} />
              </div>
              <div className="rating-item">
                <label>Location</label>
                <StarRating rating={location} onRatingChange={setLocation} />
              </div>
              <div className="rating-item">
                <label>Amenities</label>
                <StarRating rating={amenities} onRatingChange={setAmenities} />
              </div>
              <div className="rating-item">
                <label>Service</label>
                <StarRating rating={service} onRatingChange={setService} />
              </div>
            </div>
            <div className="comment-section">
              <label className="icon-label">
                <img src={reqIcon} alt="Comment" className="label-icon" />
                Additional Comment
              </label>
              <textarea
                placeholder="Share you thoughts about this experience"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <div className="feedback-actions">
                <button className="cancel-btn" onClick={() => navigate(-1)}>
                  Cancel
                </button>
                <button className="submit-btn" onClick={handleSubmit}>
                  <img
                    src={submitIcon} // import karke use karo
                    alt="Submit"
                    className="btn-icon"
                    onClick={() => navigate(`/stay-experience/${tripId}`)}
                  />
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FeedbackPage;

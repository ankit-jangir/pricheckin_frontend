import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { tripsData } from "../data/mockTrips";
import Services from "../components/Services";
import "./CheckinPage.css";
import sarah from "../assets/sarah.jpg";
import whatsappgreen from "../assets/whatsappgreen.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FiShare2 } from "react-icons/fi";
import { FiInfo } from "react-icons/fi";
const conciergeAvatar = sarah; // Avatar image

function CheckinPage() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [guests, setGuests] = useState([]);
  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState("guest");
  useEffect(() => {
    const currentTrip = tripsData.find((t) => t.id === parseInt(tripId));
    if (currentTrip) {
      setTrip(currentTrip);
      setGuests(currentTrip.guestList);
    }
  }, [tripId]);

  useEffect(() => {
    const checkedInCount = guests.filter((g) => g.checkedIn).length;
    const totalGuests = guests.length;
    const newProgress =
      totalGuests > 0 ? (checkedInCount / totalGuests) * 100 : 0;
    setProgress(newProgress);
  }, [guests]);

  const handleCheckin = (guestId) => {
    setGuests((currentGuests) =>
      currentGuests.map((guest) =>
        guest.id === guestId ? { ...guest, checkedIn: true } : guest
      )
    );
    toast.success("Guest checked in successfully!");
  };

  const handleShareGuestLink = (guest) => {
    const guestLink = `${window.location.origin}/checkin/${trip.id}/guest/${guest.id}`;

    navigator.clipboard
      .writeText(guestLink)
      .then(() => {
        toast.success(`${guest.name} Link copied to clipboard!`);
      })
      .catch((err) => {
        toast.error("Could not copy link.");
        console.error("Copy failed", err);
      });
  };
  const handleCopyMapUrl = () => {
    const mapUrl = `https://www.google.com/maps/search/?api=&query=${encodeURIComponent(
      trip.address
    )}`;
    navigator.clipboard
      .writeText(mapUrl)
      .then(() => {
        toast.success("Map location link copied!");
      })
      .catch((err) => {
        toast.error("Could not copy location link.");
        console.error("Map copy failed", err);
      });
  };

  const handleWhatsAppRedirect = () => {
    const phoneNumber = "918767519675";
    window.open(
      `https://wa.me/${phoneNumber}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  if (!trip) return <div>Loading...</div>;

  return (
    <div className="checkin-page-wrapper">
      <Header />
      <div className="checkin-page-layout">
        {/* Left Panel */}
        <div className="checkin-status-panel">
          <h2>Pre Check-In</h2>
          <p className="description">
            Welcome to your upcoming stay! Please complete the check-in process
            for all guests before arrival.
          </p>

          {/* === NEW INSTRUCTIONAL BOX === */}
          <div className="checkin-info-box">
            To ensure seamless entry to the stay, all guests in your group must
            complete the check-in process. Your check in is not complete till
            all the guests in the group complete their check in. Thank you for
            your cooperation!
          </div>

          <h3>Guest Check-in Status</h3>
          <div className="status-container">
            <div className="progress-circle-container">
              <svg className="progress-ring" viewBox="0 0 120 120">
                <circle className="progress-ring-bg" r="54" cx="60" cy="60" />
                <circle
                  className="progress-ring-fg"
                  r="54"
                  cx="60"
                  cy="60"
                  style={{
                    strokeDasharray: 339.29,
                    strokeDashoffset: 339.29 - (progress / 100) * 339.29,
                  }}
                />
              </svg>
              <div className="progress-text-outside">
                <p>Remaining: {100 - Math.round(progress)}%</p>
                <p>Checked In: {Math.round(progress)}%</p>
              </div>
            </div>
            <div className="legend">
              <p>
                <span className="dot checked-in"></span> Checked In
              </p>
              <p>
                <span className="dot not-checked-in"></span> Not Checked In
              </p>
            </div>
          </div>
          <div className="who-checkin-wrapper">
            <h3 className="who-title">Who is Completing This Check-In?</h3>

            {/* Guest */}
            <label className="who-option">
              <input
                type="radio"
                name="checkinRole"
                checked={selected === "guest"}
                onChange={() => setSelected("guest")}
              />
              <span className="who-label">Guest</span>
            </label>

            {/* Booker */}
            <label className="who-option">
              <input
                type="radio"
                name="checkinRole"
                checked={selected === "booker"}
                onChange={() => setSelected("booker")}
              />

              <div className="who-booker">
                <span className="who-label">
                  Booker (not staying at the property)
                </span>

                <span className="who-info">
                  <FiInfo size={12} />
                  <span className="who-tooltip">
                    Select &quot;Booker&quot; if you are completing check-in on
                    behalf of the guests
                  </span>
                </span>
              </div>
            </label>
          </div>

          <h3>Guest List</h3>
          <ul className="guest-list">
            {guests.map((guest, index) => (
              <li key={guest.id}>
                <div className="guest-info">
                  <input type="checkbox" checked={guest.checkedIn} readOnly />
                  <label>
                    Guest {index + 1}: {guest.name}
                  </label>
                </div>
                <div className="guest-actions">
                  {/* Check-in / Edit button */}
                  {guest.checkedIn ? (
                    <>
                      <div className="status-tag checked">✔ checked-in</div>
                      <button
                        className="edit-view-btn"
                        onClick={() =>
                          navigate(`/checkin/${trip.id}/guest/${guest.id}`)
                        }
                      >
                        Edit/View
                      </button>
                    </>
                  ) : (
                    <button
                      className="checkin-btn"
                      onClick={() => {
                        navigate(`/checkin/${trip.id}/guest/${guest.id}`);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      Check In
                    </button>
                  )}

                  {/* NEW SHARE BUTTON */}
                  <button
                    className="share-guest-btn icon-only"
                    onClick={() => handleShareGuestLink(guest)}
                  >
                    <FiShare2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="actions">
            {/* <button className="share-btn" onClick={handleShareLink}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72" /></svg>
              Share Form Link
            </button> */}
            <button
              className="save-btn-dark"
              onClick={() => navigate("/my-trips")}
            >
              Save & Continue
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="property-details-panel">
          <img src={trip.image} alt={trip.title} className="property-image" />
          <div className="property-info-box">
            <h2>{trip.title}</h2>
            <div className="info-grid">
              <div className="info-list">
                <div className="info-item">🏠 Check-in: {trip.checkIn}</div>
                <div className="info-item">🏠 Check-out: {trip.checkOut}</div>
                <div className="info-item">👥 {trip.guests} Guests</div>
                <div className="info-item">🌙 {trip.nights} Nights</div>
              </div>
            </div>

            <h3>Property Information</h3>
            <div className="address-container">
              <svg
                className="info-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <p className="address-text">{trip.address}</p>
              <svg
                className="share-icon"
                onClick={handleCopyMapUrl}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </div>

            <div className="map-container">
              <iframe
                title="property-location"
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(
                  trip.address
                )}`}
              ></iframe>
            </div>
            <Services />

            <div className="contact-host-section">
              <h3> Contact Concierge </h3>
              <div
                className="whatsapp-contact-card"
                onClick={handleWhatsAppRedirect}
                role="button"
                tabIndex="0"
              >
                <div className="whatsapp-info">
                  <img
                    src={conciergeAvatar}
                    alt="Host Avatar"
                    className="whatsapp-avatar"
                  />
                  <span className="whatsapp-number">+91 887675 19675</span>
                </div>
                <img
                  src={whatsappgreen}
                  alt="WhatsApp"
                  className="whatsapp-icon"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CheckinPage;

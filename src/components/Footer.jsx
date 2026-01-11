import React from "react";
import "./Footer.css";
import logo from "../assets/logo.png";
import whatsappIcon from "../assets/whatsapp-icon.svg";
function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-left">
          <img src={logo} alt="Staymaster Logo" className="footer-logo" />
          <h2>Experiential stays for Happy Holidays!</h2>
          <p>Welcome to the brand that helps you master the new way to stay</p>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://thestaymaster.com/assets/images/facebook-icon.svg"
                alt="Facebook"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://thestaymaster.com/assets/images/instagram-icon.svg"
                alt="Instagram"
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://thestaymaster.com/assets/images/twitter-icon.svg"
                alt="Twitter"
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://thestaymaster.com/assets/images/linkedin-icon.svg"
                alt="LinkedIn"
              />
            </a>
          </div>
        </div>
        <div className="footer-right">
          <div className="footer-links-column">
            <h4>Home</h4>
            <a href="https://thestaymaster.com/about">About us</a>
            <a href="https://thestaymaster.com/host">Host</a>
            <a href="https://thestaymaster.com/stay/all">Stay</a>
            <a href="https://thestaymaster.com/contact-us">Contact Us</a>
          </div>
          <div className="footer-links-column">
            <h4>Stays</h4>
            <a href="https://thestaymaster.com/stay/all">Stays in Goa</a>
          </div>
          <div className="footer-links-column">
            <h4>Collections</h4>
            <a href="https://thestaymaster.com/stay/masterpiece">Masterpiece</a>
            <a href="https://thestaymaster.com/stay/amazing-pools">
              Amazing Pools
            </a>
            <a href="https://thestaymaster.com/stay/celebrity-favourites">
              Celebrity Favourites
            </a>
            <a href="https://thestaymaster.com/stay/pet-friendly">
              Pet Friendly
            </a>
            <a href="https://thestaymaster.com/stay/pocket-friendly">
              Pocket Friendly
            </a>
            <a href="https://thestaymaster.com/stay/culinary-delights">
              Culinary Delights
            </a>
          </div>
          <div className="footer-links-column">
            <a href="https://thestaymaster.com/stay/new-launches">
              New Launches
            </a>
            <a href="https://thestaymaster.com/stay/sea-view">Sea View</a>
            <a href="https://thestaymaster.com/stay/nature">Nature</a>
            <a href="https://thestaymaster.com/stay/couple-escapades">
              Couple Escapades
            </a>
            <a href="https://thestaymaster.com/stay/close-to-beaches">
              Close to Beaches
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright © All rights reserved Staymaster Pvt. Ltd.</p>
        <a href="https://thestaymaster.com/privacy-policy" target="_blank">
          {" "}
          Privacy
        </a>
        <a
          href="https://thestaymaster.com/terms-and-conditions"
          target="_blank"
        >
          {" "}
          Terms & Condition
        </a>
        <a
          href="https://wa.me/9694896933"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
        >
          <img src={whatsappIcon} alt="WhatsApp" />
          <span>WhatsApp Us</span>
        </a>
      </div>
    </footer>
  );
}
export default Footer;

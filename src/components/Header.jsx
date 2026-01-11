import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logog.png";
import { logoutApi } from "../redux/Api/login_Api";
import { useDispatch } from "react-redux";
import Toast from "../utils/toastService";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const isLoggedIn = !!getCookie("guestToken");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
  setIsMenuOpen(false);

  try {
    const res = await dispatch(logoutApi()).unwrap();

    // Redux token cleanup is already done in logoutApi.fulfilled
    // Delete guestToken cookie
    document.cookie = "guestToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    Toast.success(res?.message || "Logged out successfully");
    navigate("/", { replace: true }); // replace history → back button se login/OTP page na dikhe
  } catch (error) {
    Toast.error(error?.message || "Logout failed");
    console.error("Logout error:", error);
  }
};


  // Function to toggle the menu's state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="main-header">
      <img src={logo} alt="Staymaster Logo" className="header-logo" />

      {/* Only render the menu container if the user is logged in */}
      {isLoggedIn && (
        <div className="header-menu-container">
          {/* The hamburger icon button */}
          <button
            onClick={toggleMenu}
            className="hamburger-icon"
            aria-label="Toggle menu"
          >
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </button>

          {/* The dropdown menu, which is rendered conditionally */}
          {isMenuOpen && (
            <div className="logout-dropdown">
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;

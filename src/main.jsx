import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login.jsx";
import OtpPage from "./pages/OtpPage.jsx";
import UserDetailsPage from "./pages/UserDetailsPage.jsx";
import MyTripsPage from "./pages/MyTripsPage.jsx";
import CheckinPage from "./pages/CheckinPage.jsx";
import GuestFormPage from "./pages/GuestFormPage.jsx";
import DeclarationPage from "./pages/DeclarationPage.jsx";
import BookingConfermation from "./pages/BookingConfermation.jsx";
import FeedbackPage from "./pages/FeedbackPage.jsx";
import StayExperience from "./pages/StayExperience.jsx";
import InvoicePage from "./pages/InvoicePage.jsx";

import { Provider } from "react-redux";
import { store } from "./redux/store.jsx";
import OtpRoute from "./OtpRoute.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />

        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<Login />} />

            <Route
              path="/verify-otp"
              element={
                <OtpRoute>
                  <OtpPage />
                </OtpRoute>
              }
            />
            <Route
              path="/user-details"
              element={
                <ProtectedRoute>
                  <UserDetailsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-trips"
              element={
                <ProtectedRoute>
                  <MyTripsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/checkin/:tripId"
              element={
                <ProtectedRoute>
                  <CheckinPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/checkin/:tripId/guest/:guestId"
              element={
                <ProtectedRoute>
                  <GuestFormPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/checkin/:tripId/declaration"
              element={
                <ProtectedRoute>
                  <DeclarationPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/booking-confermation/:tripId"
              element={
                <ProtectedRoute>
                  <BookingConfermation />
                </ProtectedRoute>
              }
            />

            <Route
              path="/feedback/:tripId"
              element={
                <ProtectedRoute>
                  <FeedbackPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/stay-experience/:tripId"
              element={
                <ProtectedRoute>
                  <StayExperience />
                </ProtectedRoute>
              }
            />

            <Route
              path="/invoice/:tripId"
              element={
                <ProtectedRoute>
                  <InvoicePage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

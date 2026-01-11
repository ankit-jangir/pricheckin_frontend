import React from "react";
import { Navigate } from "react-router-dom";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

function ProtectedRoute({ children }) {
  const token = getCookie("guestToken");
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;

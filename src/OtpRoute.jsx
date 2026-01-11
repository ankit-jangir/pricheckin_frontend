import React from "react";
import { Navigate } from "react-router-dom";

function OtpRoute({ children }) {
  const phone = localStorage.getItem("phoneNumber");

  if (!phone) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default OtpRoute;

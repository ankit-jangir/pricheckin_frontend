import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "../../utils/toastService";
import { getCookieToken, removeCookieToken } from "../../utils/cookiesHelper";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYXBpX3VzZXJAdGhlc3RheW1hc3Rlci5jb20iLCJpZCI6MjB9LCJpYXQiOjE3MDk0NDg0OTh9.t8gKWETvXtOBC_sLOjYbCcIzIrROpvhlGRFG4zGEOLI";

// verifyNumber
export const Number_verifiy = createAsyncThunk(
  "verifyNumber",
  async (number, { rejectWithValue }) => {
    try {
      const responce = await fetch(
        `${BASE_URL}/api/users/register-with-phone`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${authToken}`,
          },
          credentials: "include",
          body: JSON.stringify({ phone: number }),
        }
      );

      const data = await responce.json();
      if (!responce.ok) {
        return rejectWithValue(data);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//otpverifiy
export const verifyOTP = createAsyncThunk(
  "verifyOTP",
  async ({ phone, otp }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/users/verifyOTP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ phone, otp }),
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data);
      }
      
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logoutApi = createAsyncThunk(
  "auth/logoutApi",
  async (_, { getState, rejectWithValue, dispatch }) => {
    try {
      const token = getState()?.numberverifiy?.guestToken || getCookieToken();

      if (!token) return rejectWithValue({ message: "Token not found" });

      const response = await fetch(`${BASE_URL}/api/users/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) return rejectWithValue(data);

      removeCookieToken(); // cookies se remove
      dispatch({ type: "numberverifiy/logout" }); // Redux se remove

      return data;
    } catch (error) {
      return rejectWithValue({
        message: error?.message || "Logout failed",
      });
    }
  }
);


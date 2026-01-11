import { createSlice } from "@reduxjs/toolkit";
import { logoutApi, Number_verifiy, verifyOTP } from "../Api/login_Api";

const initialState = {
  data: null,
  otpData: null,
  loading: false,
  error: null,
};

const numberverifiySlice = createSlice({
  name: "numberverifiy",
  initialState,
  reducers: {
    clearNumberState: (state) => {
      state.data = null;
      state.otpData = null;
      state.loading = false;
      state.error = null;
    },
    setGuestToken: (state, action) => {
      state.guestToken = action.payload;
    },
    logout: (state) => {
      state.guestToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Number_verifiy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Number_verifiy.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(Number_verifiy.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "Failed to send OTP";
      });

    // OTP verification
    builder
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.otpData = action.payload;
        state.guestToken = action.payload?.guestToken || null;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "OTP verification failed";
      });

    builder.addCase(logoutApi.fulfilled, (state) => {
      state.guestToken = null;
    });
  },
});

export const { clearNumberState, setGuestToken ,logout } = numberverifiySlice.actions;
export default numberverifiySlice.reducer;

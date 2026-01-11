import { combineReducers } from "@reduxjs/toolkit";
import numberverifiy from "./slices/login_slice";

const RootReducer = combineReducers({
  number: numberverifiy,
});

export default RootReducer;

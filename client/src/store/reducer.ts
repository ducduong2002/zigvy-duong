import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./login/userSlice";

const rootReducer = combineReducers({
  user: userReducer,

});

export default rootReducer;

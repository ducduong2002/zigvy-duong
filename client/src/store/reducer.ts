import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./login/userSlice";
import tasksReducer from "./task/taskSlice"

const rootReducer = combineReducers({
  user: userReducer,
  tasks: tasksReducer

});

export default rootReducer;

import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./login/userSlice";
import tasksReducer from "./task/taskSlice" 
import projectsReducer from "./project/projectSlice"

const rootReducer = combineReducers({
  user: userReducer,
  tasks: tasksReducer,
  projects: projectsReducer

});

export default rootReducer;

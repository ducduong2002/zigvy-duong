import { takeEvery, call, put } from "redux-saga/effects";
import {
  loginSuccess,
  registerSuccess,
  loginRequest,
  registerRequest,
} from "./userSlice"; // import the success actions
import api from "../api"; // Assuming you're using axios

// Define the login API call
const loginApi = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

const signupApi = async (email: string, password: string, name: string) => {
  const response = await api.post("/auth/signup", { email, password, name });
  return response.data;
};

const handleLogin = function* (action: ReturnType<typeof loginRequest>) {
  try {
    const { email, password } = action.payload;
    console.log('Sending login request with:', { email, password }); 
    const response = yield call(api.post, '/auth/login', { email, password });
    const { user, token } = response.data;
    yield put(loginSuccess({ user, token }));
  } catch (error) {
    console.error('Login error:', error);
  }
};


// Worker saga for signup
function* handleSignup(action: ReturnType<typeof registerRequest>) {
  try {
    const { email, password, name } = action.payload;
    const data = yield call(signupApi, email, password, name);
    yield put(registerSuccess(data)); // Dispatch register success
  } catch (error) {
    console.error("Signup error", error);
    // Optionally dispatch a failure action here
  }
}

// Watcher saga

function* registerSaga() {
  yield takeEvery(loginRequest.type, handleLogin); // Use the .type property for action type
  yield takeEvery(registerRequest.type, handleSignup);
}

export default registerSaga;

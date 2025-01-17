
import { Login, Register, User } from "@/container/type";
import { createSlice, PayloadAction, createAsyncThunk  } from "@reduxjs/toolkit";
import axios from 'axios';
import baseURL from "../api"
interface UserState {
  token: string | null;
  userId: string | null;
  userInfo: User;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export const signUpRequest = createAsyncThunk(
  'user/signUpRequest',
  async ({ email, password, name }: Register, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3002/auth/signup", { email, password, name });
      const { token, _id } = response.data;
      localStorage.setItem("userId", _id);
      return { token, _id };
    } catch (error) {
      return rejectWithValue(error || 'Something went wrong');
    }
  }
);

export const loginRequest = createAsyncThunk(
  'user/loginRequest',
  async ({ email, password }: Login, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3002/auth/login", { email, password });
      const { token, _id } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", _id);
      return { token, _id };
    } catch (error) {
      return rejectWithValue(error || 'Something went wrong');
    }
  }
);

export const fetchUserProfileRequest = createAsyncThunk(
  'user/fetchUserProfileRequest',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const _id = localStorage.getItem("userId");

      if (!_id || !token) throw new Error("Missing token or userId");

      const response = await axios.get(`http://localhost:3002/user/profile/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error || 'Failed to fetch user profile');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    userId: null,
    userInfo: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  } as UserState,
  reducers: {
    logout(state) {
      state.userInfo = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUpRequest.fulfilled, (state, action: PayloadAction<{ token: string; _id: string }>) => {
      state.token = action.payload.token;
      state.userId = action.payload._id;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(signUpRequest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string; 
    });


    builder.addCase(loginRequest.pending, (state ) => {
      state.loading = true;
    });
    builder.addCase(loginRequest.fulfilled, (state, action: PayloadAction<{ token: string; _id: string }>) => {
      state.token = action.payload.token;
      state.userId = action.payload._id;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(loginRequest.rejected, (state, action) => {
      state.loading = false;
      state.token = null;
      state.userId = null;
      state.isAuthenticated = false;
      state.error = action.payload as string; 
    });

    builder.addCase(fetchUserProfileRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserProfileRequest.fulfilled, (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchUserProfileRequest.rejected, (state, action) => {
      state.loading = false;
      state.userInfo = null;
      state.error = action.payload as string; 
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

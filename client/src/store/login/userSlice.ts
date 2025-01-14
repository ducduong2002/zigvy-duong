import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface User {
  userId: string;
  name: string;
  email: string;
  token: string;
}
interface UserState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest(
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) {
      state.loading = true;
      state.error = null; // Clear any previous errors
    },
    registerRequest(
      state,
      action: PayloadAction<{ email: string; password: string; name: string }>
    ) {
      state.loading = true;
      state.error = null; // Clear any previous errors
    },
    loginSuccess(state, action: PayloadAction<{ user: any; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    },
    registerSuccess(
      state,
      action: PayloadAction<{ user: any; token: string }>
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { loginSuccess, registerSuccess, loginRequest, registerRequest } = userSlice.actions;
export default userSlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  uid: string | null;
  email: string | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  uid: null,
  email: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        uid: string;
        email: string | null;
        accessToken: string | null;
      }>
    ) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
    },
    clearUser: (state) => {
      state.uid = null;
      state.email = null;
      state.accessToken = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;

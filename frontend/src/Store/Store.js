import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { isLoggedIn: false },
  reducers: {
    userLogin(state) {
      state.isLoggedIn = true;
    },
    userLogout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const userActions = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

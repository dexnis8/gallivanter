import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: sessionStorage.getItem("tk") || null,
  isAuth: sessionStorage.getItem("tk") ? true : false,
  // isAuth: true,
  createTourStep: 1,
  user: {
    uuid: "",
    first_name: sessionStorage.getItem("first_name"),
    last_name: sessionStorage.getItem("last_name"),
    email: "",
    whatsapp_number: "",
  },
};
const AuthTokenSlice = createSlice({
  name: "AuthToken",
  initialState,
  reducers: {
    setToken: (state, action) => {
      sessionStorage.setItem("tk", action.payload);
      state.isAuth = true;
      state.token = action.payload;
    },
    setUser: (state, action) => {
      sessionStorage.setItem("first_name", action?.payload?.first_name);
      sessionStorage.setItem("last_name", action?.payload?.last_name);
      state.user.uuid = action.payload?.uuid;
      state.user.email = action.payload?.email;
      state.user.first_name = action.payload?.first_name;
      state.user.last_name = action.payload?.last_name;
      state.user.whatsapp_number = action.payload?.whatsapp_number;
    },
    unsetToken: (state) => {
      sessionStorage.removeItem("tk");
      sessionStorage.clear();
      localStorage.clear();
      state.isAuth = false;
      state.token = null;
    },
    nextTourStep: (state) => {
      state.createTourStep = 2;
    },
  },
});

export const { setToken, unsetToken, setUser, nextTourStep } =
  AuthTokenSlice.actions;
export default AuthTokenSlice.reducer;
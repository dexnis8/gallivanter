import { configureStore } from "@reduxjs/toolkit";
import { AuthApi } from "./api/AuthApi";
import authTokenReducer from "./slices/authToken";
import modalsSlice from "./slices/modalsSlice";
// import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { Services } from "./api/Services";
// import { setupListeners } from "@reduxjs/toolkit/query/react";

export const store = configureStore({
  reducer: {
    authToken: authTokenReducer,
    modals: modalsSlice,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [Services.reducerPath]: Services.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthApi.middleware, Services.middleware),
});
// setupListeners(store.dispatch);

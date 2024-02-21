import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addStore: false,
};

const modalsSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleAddStoreModal: (state) => {
      state.addStore = !state.addStore;
    },
  },
});

export const { toggleAddStoreModal } = modalsSlice.actions;
export default modalsSlice.reducer;

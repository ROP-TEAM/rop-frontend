import { createSlice } from "@reduxjs/toolkit";

interface sidePopupSlide {
  isShow: boolean;
}

const initialState: sidePopupSlide = {
  isShow: false,
};
const sidePopupSlide = createSlice({
  name: "sidePopup",
  initialState,
  reducers: {
    openPopup: (state) => {
      state.isShow = true;
    },
    closePopup: (state) => {
      state.isShow = false;
    },
    togglePopup: (state) => {
      state.isShow = !state.isShow;
    },
  },
});

export const { openPopup, closePopup, togglePopup } = sidePopupSlide.actions;
export default sidePopupSlide.reducer;

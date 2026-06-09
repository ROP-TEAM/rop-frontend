import { createSlice } from "@reduxjs/toolkit";

interface sidePopupSlice {
  isShowControl: boolean;
  isShowDetail: boolean;
}

const initialState: sidePopupSlice = {
  isShowControl: true,
  isShowDetail: false,
};
const sidePopupSlide = createSlice({
  name: "sidePopup",
  initialState,
  reducers: {
    controlOpen: (state) => {
      state.isShowControl = true;
    },
    detailOpen: (state) => {
      state.isShowDetail = true;
    },
    controlClose: (state) => {
      state.isShowControl = false;
    },
    detailClose: (state) => {
      state.isShowDetail = false;
    },
    controlToggle: (state) => {
      state.isShowControl = !state.isShowControl;
    },
    DetailToggle: (state) => {
      state.isShowDetail = !state.isShowDetail;
    },
  },
});

export const {
  detailClose,
  detailOpen,
  DetailToggle,
  controlClose,
  controlOpen,
  controlToggle,
} = sidePopupSlide.actions;
export default sidePopupSlide.reducer;

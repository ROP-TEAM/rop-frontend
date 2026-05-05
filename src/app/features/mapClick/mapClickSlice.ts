import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MapClickSlice } from "./mapClick.types";
import { Location } from "@/types/api.types";
const initialState: MapClickSlice = {
  isOnFocus: false,
  lat: 0,
  lng: 0,
};
const mapClickSlice = createSlice({
  name: "mapClick",
  initialState,
  reducers: {
    setOnFocus: (state, action: PayloadAction<boolean>) => {
      state.isOnFocus = action.payload;
    },
    setLatLng: (state, action: PayloadAction<Location>) => {
      // if (!state.isOnFocus) return;
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
  },
});
export const { setOnFocus, setLatLng } = mapClickSlice.actions;
export default mapClickSlice.reducer;

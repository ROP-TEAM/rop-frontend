import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MapClickSlice } from "./mapClick.types";
import { Location } from "@/types/api.types";
const initialState: MapClickSlice = {
  elementInputId: "",
  isOnFocus: false,
  lat: 0,
  lng: 0,
};
const mapClickSlice = createSlice({
  name: "mapClick",
  initialState,
  reducers: {
    setOnFocus: (
      state,
      action: PayloadAction<{ isOnFocus: boolean; elementInputId: string }>,
    ) => {
      state.isOnFocus = action.payload.isOnFocus;
      state.elementInputId = action.payload.elementInputId;
    },
    setLatLng: (
      state,
      action: PayloadAction<{
        lat: number;
        lng: number;
        // elementInputId: string;
      }>,
    ) => {
    //   if (state.elementInputId !== action.payload.elementInputId) return;
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
  },
});
export const { setOnFocus, setLatLng } = mapClickSlice.actions;
export default mapClickSlice.reducer;

import { Location } from "@/components/form/LocationInput/LocationInput.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = {
  lat: 0,
  lng: 0,
};
const mapCenterSlice = createSlice({
  name: "mapCenter",
  initialState,
  reducers: {
    setMapCenter: (state, action: PayloadAction<Location>) => {
      return action.payload;
    },
  },
});

export const { setMapCenter } = mapCenterSlice.actions;
export default mapCenterSlice.reducer;

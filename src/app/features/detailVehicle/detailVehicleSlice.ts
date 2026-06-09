import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Vehicle } from "../vehicle/vehicle.types";

const initialState: Vehicle = {
  id: -1,
  name: "",
  capacity: 0,
  model: "",
  plateNumber: "",
  profile_id: 0,
  workTimeStart: 0,
  workTimeEnd: 0,
  breakTimeStart: 0,
  breakTimeEnd: 0,
  maxTask: 0,
  skills: [],
};

const detailVehicleSlice = createSlice({
  name: "detailVehicle",
  initialState,
  reducers: {
    addVehicle: (state, action: PayloadAction<Vehicle>) => {
      return action.payload;
    },
  },
});

export const { addVehicle } = detailVehicleSlice.actions;
export default detailVehicleSlice.reducer;

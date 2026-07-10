import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OptimizeResPayload } from "./optimize.types";

interface OptimizeSlice {
  optimize: OptimizeResPayload;
}

const initialState: OptimizeSlice = {
  optimize: {
    routes: [],
    depotLat: null,
    depotLon: null,
    dropReasons: [],
    message: "",
  },
};

const optimizeSlice = createSlice({
  name: "optimize",
  initialState,
  reducers: {
    setOptimizeResult: (state, action: PayloadAction<OptimizeResPayload>) => {
      state.optimize = action.payload;
    },
    clearOptimizeResult: (state) => {
      state.optimize = {
        routes: [],
        depotLat: null,
        depotLon: null,
        dropReasons: [],
        message: "",
      };
    },
  },
});

export const { setOptimizeResult, clearOptimizeResult } = optimizeSlice.actions;
export default optimizeSlice.reducer;

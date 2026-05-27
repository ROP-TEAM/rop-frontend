import { Order } from "@/app/types/order";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderSlice {
  order: Order[];
}
const initialState: OrderSlice = {
  order: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.order.push(action.payload);
    },
    deleteOrder: (state, action: PayloadAction<number>) => {
      state.order = state.order.filter((o) => o.id != action.payload);
    },
    patchOrder: (state, action: PayloadAction<Order>) => {
      const newOrderIndex = state.order.findIndex(
        (o) => o.id === action.payload.id,
      );
      if (newOrderIndex !== -1) {
        state.order[newOrderIndex] = action.payload;
      }
    },
  },
});

export const { addOrder, deleteOrder, patchOrder } = orderSlice.actions;
export default orderSlice.reducer;

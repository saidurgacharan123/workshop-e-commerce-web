import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      state.items = action.payload.items;
      state.totalAmount = action.payload.totalAmount;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === newItem.id
      );
      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
      state.totalAmount += newItem.price * newItem.quantity;
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);
      if (itemIndex >= 0) {
        const itemToRemove = state.items[itemIndex];
        state.totalAmount -= itemToRemove.price * itemToRemove.quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const { setCart, addItemToCart, removeItemFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

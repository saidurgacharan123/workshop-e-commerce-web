import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../user/actions/user-slice";
import cartReducer from "../cart/actions/cart-slice";
import orderReducer from "../order/actions/order-slice";
import productReducer from "../products/actions/product-slice";

// Configure the store
const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    orders: orderReducer,
    products: productReducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import itemReducer from '../redux/item/itemSlice';
import authReducer from '../redux/auth/authSlice';

export const store = configureStore({
  reducer: {
    items: itemReducer,
    auth: authReducer
  }
})
import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import productReducer from './productSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


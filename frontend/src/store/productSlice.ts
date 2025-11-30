import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
    productIds: string[];
    currentProductIndex: number;
}

const initialState: ProductState = {
    productIds: [],
    currentProductIndex: 0,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProductIds: (state, action: PayloadAction<string[]>) => {
            state.productIds = action.payload;
            // Reset index if current index is out of bounds or if list changes significantly
            if (state.currentProductIndex >= action.payload.length) {
                state.currentProductIndex = 0;
            }
        },
        nextProduct: (state) => {
            if (state.productIds.length === 0) return;
            state.currentProductIndex = (state.currentProductIndex + 1) % state.productIds.length;
        },
        prevProduct: (state) => {
            if (state.productIds.length === 0) return;
            state.currentProductIndex = (state.currentProductIndex - 1 + state.productIds.length) % state.productIds.length;
        },
        setCurrentProductIndex: (state, action: PayloadAction<number>) => {
            if (action.payload >= 0 && action.payload < state.productIds.length) {
                state.currentProductIndex = action.payload;
            }
        }
    },
});

export const { setProductIds, nextProduct, prevProduct, setCurrentProductIndex } = productSlice.actions;
export default productSlice.reducer;

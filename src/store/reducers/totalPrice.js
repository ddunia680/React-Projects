import { createSlice } from "@reduxjs/toolkit";

export const totalPriceSlice = createSlice({
    name: 'totalPrice',
    initialState: {
        totalPrice: 0
    },

    reducers: {
        ADDTOTALPRICE: (state, action) => {
            state.totalPrice = action.payload;
        }
    }
});

export const { ADDTOTALPRICE } = totalPriceSlice.actions;

export default totalPriceSlice.reducer;
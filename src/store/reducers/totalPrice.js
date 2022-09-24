import { createSlice } from "@reduxjs/toolkit";

export const totalPriceSlice = createSlice({
    name: 'totalPrice',
    initialState: {
        totalPrice: 0
    },

    reducers: {
        ADDTOTALPRICE: (state, action) => {
            state.totalPrice = action.payload;
        },

        RESETTOTALPRICE: (state, action) => {
            state.totalPrice = 0;
        }
    }
});

export const { ADDTOTALPRICE, RESETTOTALPRICE } = totalPriceSlice.actions;

export default totalPriceSlice.reducer;
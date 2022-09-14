import { createSlice } from "@reduxjs/toolkit";

export const articlesSlice = createSlice({
    name: 'articles',
    initialState: {
        articles: {}
    },

    reducers: {
        ADDARTICLES: (state, action) => {
            state.articles = {
                fish: action.payload.fish,
                fruits: action.payload.fruits,
                meat: action.payload.meat,
                rice: action.payload.rice,
                ships: action.payload.ships
            }
        }
        
    }
});

export const { ADDARTICLES } = articlesSlice.actions;

export default articlesSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios-orders';

export const sendArticles = createAsyncThunk(
    'data/sendArticles',
    order => {
        return axios.post('/orders.json', order)
        .then(response => response.data)
    }
)

export const getArticles = createAsyncThunk(
    'data/getArticles',
    () => {
        return axios.get('/articles.json')
        .then(response => response.data)
    }
)

export const articlesSlice = createSlice({
    name: 'articles',
    initialState: {
        articles: null,
        statusSend: 'idle',
        statusGet: 'idle',
        error: ''
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
        },
        SETSTATUS: (state, action) => {
            state.statusSend = action.payload
        }
        
    }, 
    extraReducers(builder) {
        builder
        .addCase(sendArticles.pending, (state, action) => {
            state.statusSend = 'loading'
        })
        .addCase(sendArticles.fulfilled, (state, action) => {
            state.statusSend = 'succeeded'
        })
        .addCase(sendArticles.rejected, (state, action) => {
            state.statusSend = 'failed'
            state.error = action.error.message
        })

        builder
        .addCase(getArticles.pending, (state, action) => {
            state.statusGet = 'loading'
        })
        .addCase(getArticles.fulfilled, (state, action) => {
            state.statusGet = 'succeeded'
            state.articles = action.payload
        })
        .addCase(getArticles.rejected, (state, action) => {
            state.statusGet = 'failed'
        })
    }
});

export const { ADDARTICLES, SETSTATUS } = articlesSlice.actions;

export default articlesSlice.reducer;
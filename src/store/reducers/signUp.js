import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const sendSignUpReq = createAsyncThunk('singup', (authData) => {
    const authentData = {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
    }
    return axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBBZ2WzweQSURC2RsURAhfU0Zym-ikuDkE', authentData)
    .then(response => { 
        console.log(response.data);
        return response.data
    });
});

export const signupSlice = createSlice({
    name: 'signup',
    initialState: {
        signup: null,
        status: 'idle',
        error: null
    }, 
    reducers: {
        CLEARERROR: (state, action) => {
            state.error = null
        }
    },
    extraReducers(builder) {
        builder
            .addCase(sendSignUpReq.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(sendSignUpReq.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.signup = action.payload
            })
            .addCase(sendSignUpReq.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
            })
    }
})

export const { CLEARERROR } = signupSlice.actions;

export default signupSlice.reducer
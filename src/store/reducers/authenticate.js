import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const sendAuth = createAsyncThunk('singin', (authData) => {
    const authentData = {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
    }
    return axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBBZ2WzweQSURC2RsURAhfU0Zym-ikuDkE', authentData)
    .then(response => {
        return response.data
    })
});

export const AuthentSlice = createSlice({
    name: 'Authent',
    initialState: {
        Authent: null,
        status: 'idle',
        token: null,
        userId: null,
        error: null,
        timeout: null,
        signinCase: true
    }, 
    reducers: {
        SWITCHCASE: (state, action) => {
            state.signinCase = !state.signinCase;
        },

        LOGOUT: (state, action) => {
            state.token = null;
            state.userId = null;
            state.timeout = null;

            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('expirationDate');
        },

        SETTOKEN: (state, action) => {
            state.token = action.payload
        },

        SETNEWTIMEOUT: (state, action) => {
            state.timeout = action.payload
        },
        CLEARERROR: (state, action) => {
            state.error = null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(sendAuth.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(sendAuth.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.signup = action.payload
                state.token = action.payload.idToken
                state.userId = action.payload.localId
                state.timeout = action.payload.expiresIn

                const expirationDate = 
                    new Date(
                        new Date().getTime() + action.payload.expiresIn * 1000
                    )
                localStorage.setItem('token', action.payload.idToken)
                localStorage.setItem('userId', action.payload.localId)
                localStorage.setItem('expirationDate', expirationDate)

            })
            .addCase(sendAuth.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
            })
    }
})

export const { SWITCHCASE, LOGOUT, SETTOKEN, SETNEWTIMEOUT, CLEARERROR } = AuthentSlice.actions;

export default AuthentSlice.reducer
import { configureStore } from "@reduxjs/toolkit";
import articlesSlice from "./reducers/articles";
import totalPriceSlice from "./reducers/totalPrice";
import signupSlice from "./reducers/signUp";
import authenticateSlice from "./reducers/authenticate";

const store = configureStore({
    reducer: {
        articles: articlesSlice,
        totalPrice: totalPriceSlice,
        signup: signupSlice,
        authenticate: authenticateSlice
    }
});

export default store;


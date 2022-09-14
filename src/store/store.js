import { configureStore } from "@reduxjs/toolkit";
import articlesSlice from "./reducers/articles";
import totalPriceSlice from "./reducers/totalPrice";

const store = configureStore({
    reducer: {
        articles: articlesSlice,
        totalPrice: totalPriceSlice
    }
});

export default store;


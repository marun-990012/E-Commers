import { configureStore } from "@reduxjs/toolkit";
import categorySlice from '../slices/categorySlice';
import productSlice from '../slices/productSlice';
import userSlice from '../slices/userSlice';
import accountSlice from '../slices/accountSlice';
const store=configureStore({
    reducer:{
        categories:categorySlice,
        products:productSlice,
        users:userSlice,
        account:accountSlice
    }
});

export default store;
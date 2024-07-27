import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const store = configureStore({
    reducer : {
        auth: authSlice,
        // TODO: add More slices here  for posts
    }
})

export default store; 
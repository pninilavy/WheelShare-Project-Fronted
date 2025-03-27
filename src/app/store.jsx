import { configureStore } from "@reduxjs/toolkit";
import  userSlice from "../features/User/userSlice";
import signInSlice from "../features/Pages/SignInSlice";

export const store=configureStore({
    reducer:{
        user:userSlice,
        showSignIn:signInSlice
    }
})
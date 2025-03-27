import { createSlice } from "@reduxjs/toolkit";
import { Navigate, useNavigate } from "react-router-dom";
 

export const signInSlice = createSlice({
  name: "showSignIn",
  initialState: {
    showSignIn: false,
  },
  reducers: {
    setshowSignIn: (state, action) => {
      state.showSignIn = action.payload;
    },
  },
});
export const { setshowSignIn } = signInSlice.actions;
export default signInSlice.reducer;

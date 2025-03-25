import { Cookie } from "@mui/icons-material";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect } from "react";

export const serverSignUp = createAsyncThunk(
  "user-SignUp",
  async (user, thunkApi) => {
    let { data } = await axios.post(
      "https://localhost:7249/api/User/SignUp",
      user
    );
    console.log(data);
    return data;
  }
);
 
export const serverSignIn = createAsyncThunk(
  "user-SignIn",
  async (user, thunkApi) => {
    try {
      let { data } = await axios.post(
        "https://localhost:7249/api/User/SignIn",
        user
      );
      console.log(data);
      if (data) {
        localStorage.setItem("token", data.token);
      } else {
        console.log("Token not received:", data);
      }
      return data;
    } catch (error) {
      console.error("Error during SignIn:", error);
      throw error;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    status: null,
    message: "",
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      console.log(state.currentUser);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(serverSignIn.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })

      .addCase(serverSignIn.rejected, (state, action) => {
        state.currentUser = action.payload;
        state.status = "failed";
        state.message = "קרתה תקלה בהתחברות";
      })

      .addCase(serverSignIn.pending, (state, action) => {
        state.currentUser = action.payload;
        state.status = "pending";
        state.message = "...בטעינה";
      })

      .addCase(serverSignUp.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        console.log("הצליח");
      })

      .addCase(serverSignUp.rejected, (state, action) => {
        state.currentUser = action.payload;
        state.status = "failed";
        state.message = "קרתה תקלה ביצירת משתמש חדש";
        console.log("תקלה");
      })
      .addCase(serverSignUp.pending, (state, action) => {
        state.currentUser = action.payload;
        state.status = "pending";
        state.message = "...בטעינה";
      });
  },
});
export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;


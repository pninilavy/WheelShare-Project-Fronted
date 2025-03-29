
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// פעולה להרשמה
export const serverSignUp = createAsyncThunk(
  "user-SignUp",
  async (user, thunkApi) => {
    try {
      let { data } = await axios.post(
        "https://localhost:7249/api/User/SignUp",
        user
      );
      if (!data) {
        return thunkApi.rejectWithValue("המשתמש כבר קיים במערכת");
      }
       if (data?.message) {
        return data; 
       }
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || "קרתה תקלה");
    }
  }
);

// פעולה להתחברות
export const serverSignIn = createAsyncThunk(
  "user-SignIn",
  async (user, thunkApi) => {
    try {
      let { data } = await axios.post(
        "https://localhost:7249/api/User/SignIn",
        user
      );
      if (data) {
        localStorage.setItem("token", data.token); 
      }
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || "קרתה תקלה");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    signUpStatus: "idle",
    signInStatus: "idle", 
    signUpMessage: "", 
    signInMessage: "",
    showSignUpSnackbar: false, 
    showSignInSnackbar: false, 
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    resetStatus: (state) => {
      state.signUpStatus = "idle";
      state.signInStatus = "idle";
      state.signUpMessage = "";
      state.signInMessage = "";
      state.showSignUpSnackbar = false;
      state.showSignInSnackbar = false;
    },
  

    resetMessages: (state) => {
      state.signUpStatus = "idle";
      state.signInStatus = "idle";
      state.signUpMessage = "";
      state.signInMessage = "";
      state.showSignUpSnackbar = false;
      state.showSignInSnackbar = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // הרשמה הצלחה
      .addCase(serverSignUp.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.signUpStatus = "success";
        state.signUpMessage = "ההרשמה בוצעה בהצלחה!";
        state.showSignUpSnackbar = true;
      })
      // הרשמה כישלון
      .addCase(serverSignUp.rejected, (state, action) => {
        state.signUpStatus = "failed";
        state.signUpMessage = action.payload || "קרתה תקלה ביצירת משתמש חדש";
        state.showSignUpSnackbar = true;
      })
      // הרשמה בהמתנה
      .addCase(serverSignUp.pending, (state) => {
        state.signUpStatus = "pending";
        state.signUpMessage = "...נרשם";
        state.showSignUpSnackbar = false;
      })

      // התחברות הצלחה
      .addCase(serverSignIn.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.signInStatus = "success";
        state.signInMessage = "התחברת בהצלחה!";
        state.showSignInSnackbar = true;
      })
      // התחברות כישלון
      .addCase(serverSignIn.rejected, (state, action) => {
        state.signInStatus = "failed";
        state.signInMessage = action.payload || "קרתה תקלה בהתחברות";
        state.showSignInSnackbar = true;
      })
      // התחברות בהמתנה
      .addCase(serverSignIn.pending, (state) => {
        state.signInStatus = "pending";
        state.signInMessage = "...מתחבר";
        state.showSignInSnackbar = false;
      });
  },
});

export const { setCurrentUser, resetMessages,resetStatus } = userSlice.actions;

export default userSlice.reducer;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../Styles/SignIn.css";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  Grid,
} from "@mui/material";
import { Badge, Email } from "@mui/icons-material";
import { serverSignIn } from "./userSlice";
import FormsBackground from "../Pages/FormsBackground";

export default function LoginForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    idNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = formData.idNumber && formData.email;

  return (
    <div className="SignInForm">      
    <FormsBackground></FormsBackground>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(serverSignIn(formData));
        }}
        sx={{
          maxWidth: 600,
          mx: "auto",
          p: 4,
          borderRadius: 5,
          backgroundColor: "white",
          direction: "rtl",
          boxShadow: "0px 4px 20px rgba(0, 224, 121, 0.5)",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          textAlign="center"
          fontWeight="bold"
          color="#00E079"
          padding="15px"
        >
          Sign In
        </Typography>

        <Grid container spacing={2}>
          {[
            { label: "תעודת זהות", name: "idNumber", icon: <Badge /> },
            { label: "מייל", name: "email", type: "email", icon: <Email /> },
          ].map(({ label, name, type = "text", icon }) => (
            <Grid item xs={12} sm={6} key={name}>
              <TextField
                label={label}
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                fullWidth
                required={false}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ color: "#00E079" }}>
                      {icon}
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: "25px",
                    backgroundColor: "#F5F5F5",
                    fontSize: "16px",
                    height: "55px",
                    color: "gray",
                    "&:focus-within fieldset": {
                      borderColor: "#00E079 !important",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: { color: "#00E079" },
                }}
              />
            </Grid>
          ))}
        </Grid>

        <Button
          onClick={(e) => {
            e.preventDefault();
            dispatch(serverSignIn(formData));
          }}
          type="submit"
          variant="contained"
          sx={{
            mt: 3,
            backgroundColor: "#00E079",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            borderRadius: "25px",
            width: "50%",
            py: 1,
            mx: "auto",
            display: "block",
            boxShadow: "0px 4px 15px rgba(0, 224, 121, 0.5)",
            "&:hover": { backgroundColor: "#00C96B" },
          }}
          disabled={!isFormValid}
        >
          התחברות
        </Button>
      </Box>
    </div>
  );
}

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../Styles/SignUp.css"
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  InputAdornment,
  Grid,
} from "@mui/material";
import {
  AccountCircle,
  Email,
  Phone,
  Badge,
  Wc,
  Payment,
} from "@mui/icons-material";
import { serverSignUp } from "./userSlice";
import FormsBackground from "../Pages/FormsBackground";

export default function SignUpForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    idNumber: "",
    gender: "",
    rides: [],
    payment: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="SignUpForm">
      <FormsBackground></FormsBackground>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 600,
          mx: "auto",
          p: 4,
          borderRadius: 5,
          backgroundColor: "white",
          direction: "rtl",
          boxShadow: "0px 4px 20px rgba(0, 224, 121, 0.5)",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          position: "relative",
          zIndex: 2,         
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
          Sign Up
        </Typography>

        <Grid container spacing={2}>
          {[
            { label: "שם פרטי", name: "firstName", icon: <AccountCircle /> },
            { label: "שם משפחה", name: "lastName", icon: <AccountCircle /> },
            { label: "מספר טלפון", name: "phoneNumber", icon: <Phone /> },
            { label: "מייל", name: "email", type: "email", icon: <Email /> },
            { label: "מספר זהות", name: "idNumber", icon: <Badge /> },
          ].map(({ label, name, type = "text", icon }) => (
            <Grid item xs={12} sm={6} key={name}>
              <TextField
                label={label}
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                fullWidth
                required:false="true"
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

          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="מין"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              fullWidth
              required:false="true"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ color: "#00E079" }}>
                    <Wc />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: "25px",
                  backgroundColor: "#F5F5F5",
                  fontSize: "16px",
                  height: "55px",
                  "&:focus-within fieldset": {
                    borderColor: "#00E079 !important",
                  },
                },
              }}
              InputLabelProps={{
                sx: { color: "#00E079" },
              }}
            >
              <MenuItem value="male">זכר</MenuItem>
              <MenuItem value="female">נקבה</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Button
          onClick={(e) => {
            e.preventDefault();
            dispatch(serverSignUp(formData));
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
        >
          אני רוצה להירשם
        </Button>
      </Box>
    </div>
  );
}

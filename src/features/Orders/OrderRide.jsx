import React, { useState } from "react";
import "../Styles/OrderRide.css";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  InputAdornment,
  Grid,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { People, LocationOn, Home } from "@mui/icons-material";
import FormsBackground from "../Pages/FormsBackground";

export default function RideBookingForm() {
  const [formData, setFormData] = useState({
    driverId: 0,
    vehicleId: 2007,

    date: "",
    time: "",
    duration: "",
    seats: "",
    sharedRide: false,
    destination: "",
    address: "",
    locationDetection: false,
  });

  const [openDialog, setOpenDialog] = useState(false);

  function parseJwt(token) {
    const base64Url = token.split(".")[1];

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
  const orderRide = () => {
    const token = localStorage.getItem("token");
    const userData = parseJwt(token);
    console.log(userData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitchChange = (e) => {
    setFormData({ ...formData, sharedRide: e.target.checked });
  };

  const handleLocationChoice = (choice) => {
    setFormData((prevData) => ({ ...prevData, locationDetection: choice }));
    setOpenDialog(false); // סגירת ההודעה ישירות לאחר הבחירה
  };

  const handleAddressFocus = () => {
    setOpenDialog(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ride Booking Data Submitted:", formData);
  };

  return (
    <div className="OrderRideForm">
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
          הזמנת נסיעה
        </Typography>

        <Grid container spacing={2}>
          {[
            { label: "תאריך", name: "date", type: "date" },
            { label: "שעה", name: "time", type: "time" },
            { label: "מספר שעות", name: "duration", type: "number" },
            {
              label: "מספר מושבים",
              name: "seats",
              type: "number",
              icon: <People />,
            },
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
                  startAdornment: icon ? (
                    <InputAdornment position="start" sx={{ color: "#00E079" }}>
                      {icon}
                    </InputAdornment>
                  ) : null,
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
                  shrink: true,
                }}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <TextField
              label="כתובת"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              required:false="true"
              onFocus={handleAddressFocus}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ color: "#00E079" }}>
                    <Home />
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
              InputLabelProps={{ sx: { color: "#00E079" } }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.sharedRide}
                  onChange={handleSwitchChange}
                  color="success"
                  sx={{ ".MuiSwitch-thumb": { backgroundColor: "#00E079" } }}
                />
              }
              label="מעוניין בנסיעה משותפת"
              sx={{ color: "#00E079" }}
            />
          </Grid>

          {formData.sharedRide && (
            <Grid item xs={12}>
              <TextField
                label="תחנת יעד"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                fullWidth
                required:false="true"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ color: "#00E079" }}>
                      <LocationOn />
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
                InputLabelProps={{ sx: { color: "#00E079" } }}
              />
            </Grid>
          )}
        </Grid>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>?האם מעוניין בזיהוי מקום</DialogTitle>
          <DialogActions>
            <Button onClick={() => handleLocationChoice(true)} color="success">
              כן
            </Button>
            <Button onClick={() => handleLocationChoice(false)} color="error">
              לא
            </Button>
          </DialogActions>
        </Dialog>

        <Button
          onClick={(e) => {
            e.preventDefault();
            orderRide();
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
          להזמין נסיעה
        </Button>
      </Box>
    </div>
  );
}

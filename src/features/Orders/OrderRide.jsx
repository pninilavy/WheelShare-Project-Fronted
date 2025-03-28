import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../Styles/OrderRide.css"; // Adjust the path if necessary
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  Grid,
  Switch,
  FormControlLabel,
  Snackbar,
  Alert,
  Slide,
  CircularProgress,
} from "@mui/material";
import { People, LocationOn, Home } from "@mui/icons-material";
import FormsBackground from "../Pages/FormsBackground";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../User/userSlice";
function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

export default function RideBookingForm() {
  const dispatch=useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
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
  
    useEffect(() => {
      //קבלת הטוקן במקרה שהמשתמש מחובר
      const fetchData =  () => {
        const token = localStorage.getItem("token");
        try {
          const userData =  parseJwt(token);
          dispatch(setCurrentUser(userData));
        } catch (error) {
          console.error("Error parsing token:", error);
        }
      };
   
        fetchData();
      
  

    }, []);
  // מצב טעינה והודעה
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [formData, setFormData] = useState({
    driveId: 0,
    vehicleId: null,
    sourceStationID: null,
    destinationStationID: null,
    sourceAddress: "",
    destinationAddress: "",
    sourceLatitude:0,
    sourceLongitude:0, 
    destinationLatitude:0,
    destinationLongitude:0,
    date: "",
    startTime: "",
    endTime: "",
    status: "ONHOLD",
    totalCost: 0,
    sharedRide: false,
    numSeats: 0,
  });

  const orderRide = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("שגיאה: אין טוקן במערכת");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    const updatedFormData = {
      ...formData,
      driveId: currentUser?.Id,
      startTime: formData.startTime + ":00",
      endTime: formData.endTime + ":00",
    };

    console.log("Form Data Before Sending:", updatedFormData);
    setLoading(true);

    try {
      let { data } = await axios.post(
        "https://localhost:7249/api/Ride",
        updatedFormData
      );
      if (data === null) {
        setMessage("מצטערים, אין רכב פנוי");
        setSnackbarSeverity("error");
      } else {
        setMessage("הזמנתך נקלטה במערכת");
        setSnackbarSeverity("success");
      }
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error Sending Request:", error.response?.data);
      setMessage("אירעה שגיאה בשליחת ההזמנה");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitchChange = (e) => {
    setFormData({ ...formData, sharedRide: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ride Booking Data Submitted:", formData);
  };

  return (
    <div className="OrderRideForm">
      <FormsBackground />
      {/* הודעה מוצגת למעלה במרכז */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={SlideTransition}
        sx={{ width: "100%" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{
            fontSize: "18px",
            p: 2,
            width: "350px",
            textAlign: "right", // מיושר לימין
            backgroundColor:
              snackbarSeverity === "success"
                ? "#68e098" // ירוק בהיר
                : snackbarSeverity === "error"
                  ? "#ffc7c7"
                  : "#ffc7c7", // אדום בהיר או אפור למקרים אחרים
            color: "white",
          }}
        >
          {message}
        </Alert>
      </Snackbar>
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
            { label: "שעת התחלה", name: "startTime", type: "time" },
            { label: "שעת סיום", name: "endTime", type: "time" },
            {
              label: "מספר מושבים",
              name: "numSeats",
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
                required
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
                InputLabelProps={{ sx: { color: "#00E079" }, shrink: true }}
              />
            </Grid>
          ))}
          {[
            { label: "כתובת מוצא", name: "sourceAddress", icon: <Home /> },
            {
              label: "כתובת יעד",
              name: "destinationAddress",
              icon: <LocationOn />,
            },
          ].map(({ label, name, icon }) => (
            <Grid item xs={12} key={name}>
              <TextField
                label={label}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                fullWidth
                required
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
                InputLabelProps={{ sx: { color: "#00E079" } }}
              />
            </Grid>
          ))}
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
        </Grid>
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
            height: "55px",
            py: 1,
            mx: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 4px 15px rgba(0, 224, 121, 0.5)",
            "&:hover": { backgroundColor: "#00C96B" },
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "להזמין נסיעה"
          )}
        </Button>
      </Box>
    </div>
  );
}

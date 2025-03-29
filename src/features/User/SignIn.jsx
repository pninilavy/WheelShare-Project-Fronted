
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Styles/SignIn.css";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  Grid,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Badge, Email } from "@mui/icons-material";
import { serverSignIn, resetStatus } from "./userSlice";
import FormsBackground from "../Pages/FormsBackground";
import { setshowSignIn } from "../Pages/SignInSlice";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signInStatus, signInMessage } = useSelector((state) => state.user);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    idNumber: "",
  });

  useEffect(() => {
    dispatch(resetStatus());
  }, [dispatch]);

  useEffect(() => {
    if (
      signInStatus &&
      (signInStatus === "failed" || signInStatus === "success")
    ) {
      setOpenSnackbar(true);
    }
  }, [signInStatus]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(serverSignIn(formData));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setTimeout(() => {
      if (signInStatus !== "pending") {
        dispatch(resetStatus());
      }
    }, 300);
  };

  const isFormValid = formData.idNumber && formData.email;

  return (
    <div className="SignInForm">
      <FormsBackground />
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
          התחברות
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
        </Grid>

        <Button
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
          disabled={signInStatus === "pending" || !isFormValid}
        >
          {signInStatus === "pending" ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "התחברות"
          )}
        </Button>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ width: "100%" }}
      >
        <Alert
          severity={signInStatus === "failed" ? "error" : "success"}
          sx={{
            fontSize: "18px",
            p: 2,
            width: "350px",
            textAlign: "right",
            direction: "rtl",
            backgroundColor: signInStatus === "success" ? "#68e098" : "#ffc7c7",
            color: "white",
            position: "relative",
          }}
        >
          {signInMessage ||
            (signInStatus === "success" ? "ההתחברות הצליחה!" : "קרתה תקלה")}

          <Box
            component="span"
            onClick={handleCloseSnackbar}
            sx={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                border: "1px solid white",
              },
            }}
          >
            ✖
          </Box>
        </Alert>
      </Snackbar>
    </div>
  );
}



import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Styles/SignUp.css";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  InputAdornment,
  Grid,
  Snackbar,
  Alert,
  Slide,
  FormHelperText,
} from "@mui/material";
import { AccountCircle, Email, Phone, Badge, Wc } from "@mui/icons-material";
import { serverSignUp } from "./userSlice";
import FormsBackground from "../Pages/FormsBackground";
import { resetStatus } from "./userSlice";

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

export default function SignUpForm() {
  const dispatch = useDispatch();
  const { signUpStatus, signUpMessage } = useSelector((state) => state.user);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    idNumber: "",
    gender: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [idError, setIdError] = useState("");

  useEffect(() => {
    dispatch(resetStatus());
  }, [dispatch]);

  useEffect(() => {
    if (
      signUpStatus &&
      (signUpStatus === "failed" || signUpStatus === "success")
    ) {
      setOpenSnackbar(true);
    }
  }, [signUpStatus]);

const isValidIdNumber = (idNumber) => {
  const regex = /^[0-9]{9}$/;
  return regex.test(idNumber);
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "idNumber" && !isValidIdNumber(e.target.value)) {
      setIdError("מספר תעודת הזהות אינו תקין");
    } else {
      setIdError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (idError) {
      return;
    }

    setIsSubmitting(true);
    dispatch(serverSignUp(formData));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setTimeout(() => {
      if (signUpStatus !== "pending") {
        dispatch(resetStatus());
      }
    }, 300);
  };

  return (
    <div className="SignUpForm">
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
          הרשמה
        </Typography>

        <Grid container spacing={2}>
          {["firstName", "lastName", "phoneNumber", "email", "idNumber"].map(
            (name, index) => (
              <Grid item xs={12} sm={6} key={name}>
                <TextField
                  label={
                    ["שם פרטי", "שם משפחה", "מספר טלפון", "מייל", "מספר זהות"][
                      index
                    ]
                  }
                  name={name}
                  type={name === "email" ? "email" : "text"}
                  value={formData[name]}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ color: "#00E079" }}
                      >
                        {
                          [
                            <AccountCircle />,
                            <AccountCircle />,
                            <Phone />,
                            <Email />,
                            <Badge />,
                          ][index]
                        }
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
                  InputLabelProps={{ sx: { color: "#00E079" } }}
                />
                {name === "idNumber" && idError && (
                  <FormHelperText error>{idError}</FormHelperText>
                )}
              </Grid>
            )
          )}

          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="מין"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              fullWidth
              required
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
              InputLabelProps={{ sx: { color: "#00E079" } }}
            >
              <MenuItem value="male">זכר</MenuItem>
              <MenuItem value="female">נקבה</MenuItem>
            </TextField>
          </Grid>
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
          disabled={!!idError} 
        >
          אני רוצה להירשם
        </Button>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={SlideTransition}
        sx={{ width: "100%" }}
      >
        <Alert
          severity={signUpStatus === "failed" ? "error" : "success"}
          sx={{
            fontSize: "18px",
            p: 2,
            width: "350px",
            textAlign: "right",
            direction: "rtl",
            backgroundColor: signUpStatus === "success" ? "#68e098" : "#ffc7c7",
            color: "white",
            position: "relative",
          }}
        >
          {signUpMessage?.message ||
            (signUpStatus === "success" ? "נרשמת בהצלחה!" : "קרתה תקלה")}

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

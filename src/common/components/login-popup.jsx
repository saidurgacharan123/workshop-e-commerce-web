import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setUser } from "../../user/actions/user-slice"; // Redux action to set user state
import { loginUser } from "../../user/actions/user-actions"; // Axios API call
import { useNavigate } from "react-router-dom"; // For navigation
import "../../assets/styles/login.css"; // Importing the separate CSS file

const LoginPopup = ({ open, onClose, onLoginSuccess }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null); // State to store login failure errors

  // Validation Schema with Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Handle Login with API Call
  const handleLogin = async (values) => {
    const { email, password } = values;

    try {
      const response = await loginUser({ email, password }); // API call to login
      const { data } = response; // Extract user data and token from response
      // Dispatch user data and token to Redux store
      dispatch(setUser({ token: data?.result?.token }));
      localStorage.setItem("token", data?.result?.token);
      onLoginSuccess(); // Close the popup and proceed with adding the product to the cart
    } catch (error) {
      console.log(error);
      // Capture and set login failure error
      setLoginError(error?.response?.data?.error?.message ?? "Login failed. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ touched, errors }) => (
            <Form className="login-form">
              <div>
                <Field
                  as={TextField}
                  label="Email"
                  name="email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </div>
              <div>
                <Field
                  as={TextField}
                  label="Password"
                  name="password"
                  type="password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </div>
              {loginError && (
                <Typography color="error" style={{ marginTop: "10px" }}>
                  {loginError} {/* Displaying login failure error */}
                </Typography>
              )}
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  className="login-button"
                >
                  Login
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => navigate("/register")} color="secondary">
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginPopup;

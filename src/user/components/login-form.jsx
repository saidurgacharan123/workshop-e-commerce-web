import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../actions/user-slice"; // Redux action to set user state
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { loginUser } from "../actions/user-actions"; // Axios API call
import "../../assets/styles/login.css"; // Importing the separate CSS file

const Login = () => {
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
      dispatch(setUser({ token:data?.result?.token }));
      localStorage.setItem("token",data?.result?.token)
    navigate("/products")
      // Redirect to the appropriate dashboard based on user role
     
    } catch (error) {
        console.log(error)
      // Capture and set login failure error
      setLoginError(error?.response?.data?.error?.message ?? "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <Typography variant="h5" className="login-title">
        Login
      </Typography>

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
            <div>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={() => navigate("/register")}
                className="register-button"
              >
                Register
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;

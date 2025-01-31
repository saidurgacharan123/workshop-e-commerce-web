import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Grid } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { registerUser } from "../actions/user-actions"; // Importing the register action
import "../../assets/styles/login.css"; // Reusing the same CSS file for consistent styling

const Register = () => {
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState(null); // State for handling registration errors

  // Validation Schema with Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    role: Yup.string()
      .oneOf(['Admin', 'User'], "Role must be either 'Admin' or 'User'")
      .required("Role is required"),
    address: Yup.string().required("Address is required"),
  });

  // Handle Registration with API Call
  const handleRegister = async (values) => {
    const { name, email, password, phone, role, address } = values;

    try {
      const response = await registerUser({ name, email, password, phone, role, address }); // API call to register
      alert("Registration successful! Please login.");
      navigate("/login"); // Redirect to login page after successful registration

    } catch (error) {
      // Handle API errors
      setRegisterError(error.message || "An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <Typography variant="h5" className="login-title">
        Register
      </Typography>

      <Formik
        initialValues={{ name: "", email: "", password: "", confirmPassword: "", phone: "", role: "", address: "" }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ touched, errors }) => (
          <Form className="login-form">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  label="Name"
                  name="name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
              </Grid>
              <Grid item xs={12} sm={6}>
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  label="Phone"
                  name="phone"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  label="Role (Admin/User)"
                  name="role"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={touched.role && Boolean(errors.role)}
                  helperText={touched.role && errors.role}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  label="Address"
                  name="address"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={touched.address && Boolean(errors.address)}
                  helperText={touched.address && errors.address}
                />
              </Grid>
            </Grid>
            {registerError && (
              <Typography color="error" style={{ marginTop: "10px" }}>
                {registerError} {/* Displaying registration failure error */}
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
                Register
              </Button>
            </div>
            <div>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={() => navigate("/login")}
                className="register-button"
              >
                Already have an account? Login
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;

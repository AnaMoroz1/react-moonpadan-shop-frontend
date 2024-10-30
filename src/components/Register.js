import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../styles/Moon.css";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

// Validation schema using Yup
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "The username must be between 3 and 20 characters.")
    .max(20, "The username must be between 3 and 20 characters.")
    .required("This field is required!"),
  email: yup
    .string()
    .email("This is not a valid email.")
    .required("This field is required!"),
  password: yup
    .string()
    .min(4, "The password must be between 6 and 40 characters.")
    .max(40, "The password must be between 6 and 40 characters.")
    .required("This field is required!"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setMessage("");
    setSuccessful(false);

    try {
      const response = await AuthService.register(data.username, data.email, data.password);
      // Check if response has a message property(response) => {
        setMessage(response?.message || "Registartion successful!");
        setSuccessful(true);
        navigate("/login", { replace: true });
      } catch (error) {
        // Improved error handling
      const resMessage =
          error.response?.data?.message ||
          error.message ||
         "Registration failed. Please try again.";
        setMessage(resMessage);
        setSuccessful(false);
      }
  };
  
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="register-username">Username</label>
                <input
                  type="text"
                  id="register-username"
                  className="form-control"
                  {...register("username")}
                  autoComplete="username"
                />
                {errors.username && (
                  <div className="alert alert-danger" role="alert">
                    {errors.username.message}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="register-email"
                  className="form-control"
                  {...register("email")}
                  autoComplete="email"
                />
                {errors.email && (
                  <div className="alert alert-danger" role="alert">
                    {errors.email.message}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="register-password">Password</label>
                <input
                  type="password"
                  id="register-password"
                  className="form-control"
                  {...register("password")}
                  autoComplete="new-password"
                />
                {errors.password && (
                  <div className="alert alert-danger" role="alert">
                    {errors.password.message}
                  </div>
                )}
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;

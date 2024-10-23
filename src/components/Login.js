import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom'; // Hook for programmatic navigation
import Form from "react-validation/build/form";
import Input from "react-validation/build/input"; // Input component for validation
import CheckButton from "react-validation/build/button"; // Button for validation checking
import '../styles/Moon.css';
import AuthService from "../services/auth.service";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role= "alert">
            This field is required!
            </div>
        );
    }
};
const Login = () => {
    let navigate = useNavigate(); // Use the navigate function to redirect users after login
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState(""); // Store the username input
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // Store loading state while logging in
    const [message, setMessage] = useState(""); // Store error/success messages

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);  // Update the username state
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);  // Update the password state
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);    // Set loading to true while processing login

    form.current.validateAll();

    if (checkBtn.current?.context?._errors?.length === 0) {
        AuthService.login(username, password)
        .then(
            () => {
    navigate("/profile");  // Navigate to the profile page on success
                window.location.reload();   /*Reload the page to update the state */
            },
            (error) => {
                const resMessage = 
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();

                    setLoading(false);
                    setMessage(resMessage);
            }
        );
    } else {
        setLoading(false); // Stop loading animation if there are validation errors
    }
    };

    return(
        <div className="col-md-12">
            <div className="card card-container">
            {/* Profile image for the login form */}
            <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile=img"
            className="profile-img-card"
            />

            {/* Form with validation */}
            <Form onSubmit={handleLogin} ref={form}>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={onChangeUsername}
                validations={[required]}
               />
             </div>

        <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
             type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required]}
                />
        </div>

        <div className="form-group">
                {/* Submit button with loading animation */}
                <button className="btn btn-primary btn-block" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
        </div>
    {/* Error message if login fails */}            
    {message && (
    <div className="form-group">
        <div className="alert alert-danger" role="alert">
                 {message}
                </div>
             </div>
)}
            {/* Invisible button used to check for form validation errors */}
            <CheckButton style= {{ display: "none" }} ref={checkBtn} />
              </Form>
             </div>
            </div>
       
    );
};

  export default Login;


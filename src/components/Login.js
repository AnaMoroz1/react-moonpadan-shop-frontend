import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../styles/Moon.css";
import AuthService from "../services/auth.service";

const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [message, setMessage] = useState("");

    const onSubmit = async (data) => {
        setMessage("");
        
        try {
            await AuthService.login(data.username, data.password);
            navigate("/profile", { replace: true });
        } catch (error) {
            const resMessage =
            error.response?.data?.message || error.message ||
            "Login failed. Please try again.";
        setMessage(resMessage);
        }
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile"
                    className="profile-img-card"
                />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="login-username">Username</label>
                        <input
                            type="text"
                            id="login-username"
                            className="form-control"
                            {...register("username", { required: "This field is required!" })}
                            autoComplete="username"
                        />
                        {errors.username && (
                            <div className="alert alert-danger" role="alert">
                                {errors.username.message}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="login-password">Password</label>
                        <input
                            type="password"
                            id="login-password"
                            className="form-control"
                            {...register("password", { required: "This field is required!" })}
                            autoComplete="current-password"
                        />
                        {errors.password && (
                            <div className="alert alert-danger" role="alert">
                                {errors.password.message}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-block" disabled={isSubmitting}>
                            {isSubmitting && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import userService from "../services/userService";


const Login = () => {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const history = useNavigate(); // Get access to the history object for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call userService.login with email and password
      const userData = await userService.login(email, password);
      // If login is successful, navigate to the home page
      history.push("/home");
    } catch (error) {
      // Handle login error (e.g., display error message)
      console.error("Login failed:", error);
    }
  };

  return (
    <LoginWrapper>
      <div className="container">
        <div className="login-top">
          <h2>Login</h2>
          <p>
            Login to your account to access your courses and other features.
          </p>
        </div>

        <div className="login-form">
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn">
                Login
                </button>
                <p className="statement">Don't have an account yet? <Link to="/signup"><span className="signup-link">Sign up</span></Link></p>
            </form>
            </div>
      </div>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  padding: 40px 0;
  display: flex;
    flex-direction: column;
  .login-top p {
    font-size: 1.8rem;
  }

    .login-form {
        margin-top: 40px;
        .form-control {
        margin-bottom: 20px;
        label {
            display: block;
            margin-bottom: 10px;
        }
        input {
            width: 100%;
            padding: 10px;
            font-size: 1.6rem;
            border-radius: 6px;
            border: 1px solid var(--clr-black);
        }
        }
        .btn {
        background: var(--clr-black);
        color: var(--clr-white);
        padding: 10px 20px;
        border-radius: 0px;
        font-size: 1.6rem;
        cursor: pointer;
        transition: var(--transition);
        &:hover {
            background: var(--clr-primary-5);
            color: var(--clr-black);
            border: 1px solid var(--clr-black);
        }
        }
    }
    .statement {
        font-size: 1.6rem;
        margin-top: 20px;
        .signup-link {
        color: var(--clr-primary-5);
        cursor: pointer;
        font-weight: 700;
        }
    }


`;


export default Login;
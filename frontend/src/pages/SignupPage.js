import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SignupPage = () => {
  return (
    <SignUpWrapper>
      <div className="container">
        <div className="signup-top">
          <h2>Sign up</h2>
          <p>
            Sign up for a free account to access your courses and other features.
          </p>
        </div>

        <div className="signup-form">
          <form>
            <div className="form-control">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" />
            </div>
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" />
            </div>
            <div className="form-control">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" />
            </div>
            <div className="form-control">
                <label htmlFor="telephone">Telephone</label>
                <input type="tel" id="telephone" />
            </div>
            <button type="submit" className="btn">
              signup
            </button>
            <p className="statement">
            Already have an account? {" "}
              <Link to="/login"><span className="signup-link" >Login here</span></Link>
            </p>
          </form>
        </div>
      </div>
    </SignUpWrapper>
  );
};

const SignUpWrapper = styled.div`
padding: 40px 0;
display: flex;
  flex-direction: column;
.signup-top p {
  font-size: 1.8rem;
}

  .signup-form {
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

export default SignupPage;

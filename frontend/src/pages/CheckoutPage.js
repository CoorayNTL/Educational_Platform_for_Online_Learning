import React from "react";
import styled from "styled-components";

const CheckoutPage = () => {
  return (
    <CheckoutWrapper>
      <div className="container">
        <div className="checkout-top">
          <h2>Checkout</h2>
          <p>
            Please fill in your details to complete your purchase.
          </p>
        </div>

        <div className="checkout-form">
          <form>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" />
            </div>
            <div className="form-control">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" />
            </div>
            <div className="form-control">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" />
            </div>
            <div className="form-control">
              <label htmlFor="city">City</label>
              <input type="text" id="city" />
            </div>
            <div className="form-control">
              <label htmlFor="telephone">Telephone</label>
              <input type="tel" id="telephone" />
            </div>
            <button type="submit" className="btn">
              checkout
            </button>
          </form>
        </div>
      </div>
    </CheckoutWrapper>
  );
};

const CheckoutWrapper = styled.div`
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    .checkout-top p {
      font-size: 1.8rem;
    }
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
      padding: 10px 20px;
      font-size: 1.6rem;
      background: var(--clr-black);
      color: var(--clr-white);
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: var(--transition);
      &:hover {
        background: var(--clr-white);
        color: var(--clr-black);
      }
    }
    `;

export default CheckoutPage;
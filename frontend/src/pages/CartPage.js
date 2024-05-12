import React from 'react';
import { useCartContext } from '../context/cart_context';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import CartItem from "../components/CartItem";
import { MdClear } from "react-icons/md";

const CartPage = () => {
  const { cart: cartItems, total_items, total_amount, clearCart } = useCartContext();

  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:8001/payments/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "user123",
          courseId: "12345",
          amount: 20,
          currency: "USD"
        })
        ,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      const { url } = await response.json();
      window.location = url;
    } catch (error) {
      console.error(error);
    }
  };

  if (cartItems.length < 1) {
    return (
      <NotFoundWrapper>
        <div className='container'>No items found in the cart.</div>
      </NotFoundWrapper>
    )
  }

  return (
    <CartWrapper>
      <div className='container'>
        <div className='cart-pg-title'>
          <h3>Shopping Cart</h3>
        </div>
        <div className='cart-grid grid'>
          <div className='cart-grid-left'>
            <div className='flex flex-wrap flex-between'>
              <div className='cart-count-info'>
                <span className='fw-7 fs-18'>{total_items}</span> Course in Cart
              </div>
              <button type="button" className='cart-clear-btn flex fs-15 fw-6 text' onClick={() => clearCart()}>
                <MdClear className='text-pink' />
                <span className='d-inline-block text-pink'>Clear All</span>
              </button>
            </div>

            <div className='cart-items-list grid'>
              {cartItems.map(cartItem => (
                <CartItem key={cartItem.courseID} cartItem={cartItem} />
              ))}
            </div>
          </div>
          <div className='cart-grid-right'>
            <div className='cart-total'>
              <span className='d-block fs-18 fw-6'>Total:</span>
              <div className='cart-total-value fw-8'>${total_amount.toFixed(2)}</div>
              <button type="button" className='checkout-btn bg-purple text-white fw-6' onClick={handleCheckout}>Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </CartWrapper>
  )
}

const NotFoundWrapper = styled.div`
  padding: 30px 0;
  font-weight: 600;
`;

const CartWrapper = styled.div`
  padding: 30px 0;
  .card-pg-title{
    padding: 20px 0 6px 0;
  }
  .cart-grid{
    row-gap: 40px;
    .cart-grid-left{
      margin-bottom: 30px;
    }

    .cart-clear-btn{
      span{
        margin-left: 6px;
      }
    }

    .cart-items-list{
      margin-top: 20px;
      row-gap: 12px;
    }
    .cart-total-value{
      font-size: 34px;
    }
    .checkout-btn{
      padding: 14px 28px;
      letter-spacing: 1px;
      margin-top: 12px;
      transition: var(--transition);

      &:hover{
        background-color: var(--clr-dark);
      }
    }
    .cart-total{
      padding-bottom: 50px;
    }

    @media screen and (min-width: 992px){
      grid-template-columns: 70% 30%;;
      column-gap: 32px;
    }
  }
`;

export default CartPage;

import { faArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Cart.css'

const Cart = ({ cart, deleteCart, children }) => {
    // console.log(cart)
    let total = 0;
    let shipping = 0;
    let quantity = 0;
    cart.map(item => {
        quantity = quantity + item.quantity;
        total = total + item.price * item.quantity;
        shipping = shipping + item.shipping;
    })
    const tax = total * 0.1;
    const grandTotal = total + tax + shipping;
    return (
        <div className='cart-container'>
            <h2>Order summary</h2>
            <p>Selected items: {quantity}</p>
            <p>Total Price: ${total.toFixed(2)}</p>
            <p>Total Shipping Charge: ${shipping}</p>
            <p>Tax: ${tax.toFixed(2)} </p>
            <h3>Grand Total: ${grandTotal.toFixed(2)}</h3>
            <button onClick={deleteCart}>
                Clear Cart
                <FontAwesomeIcon style={{ marginLeft: '10px' }} icon={faTrash}></FontAwesomeIcon>
            </button>
            {children}
        </div>
    );
};

export default Cart;
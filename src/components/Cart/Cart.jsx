import { faArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Cart.css'

const Cart = ({ cart }) => {
    return (
        <div className='cart-container'>
            <h2>Order summary</h2>
            <p>Selected items: {cart.length}</p>
            <p>Total Price:</p>
            <p>Total Shipping Charge:</p>
            <p>Tax: </p>
            <h2>Grand Total:</h2>
            <button>
                Clear Cart
                <FontAwesomeIcon style={{ marginLeft: '10px' }} icon={faTrash}></FontAwesomeIcon>
            </button>
            <button style={{ backgroundColor: '#ff9900', marginTop: '16px' }}>
                Review Order
                <FontAwesomeIcon style={{ marginLeft: '10px', }} icon={faArrowRight}></FontAwesomeIcon>
            </button>
        </div>
    );
};

export default Cart;
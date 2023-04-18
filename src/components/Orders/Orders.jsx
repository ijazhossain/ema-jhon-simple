import React, { useContext, useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Order.css'
import { deleteCartFromDb, getCart, removeFromDb } from '../../utilities/fakeDB';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../providers/AuthProvider';


const Orders = () => {
    const savedCart = useLoaderData()
    const { user } = useContext(AuthContext)
    console.log(user);

    const [cart, setCart] = useState(savedCart)
    const handleDelete = (id) => {
        const remaining = cart.filter(product => product.id !== id);
        setCart(remaining)
        removeFromDb(id)

    }
    const deleteCart = () => {
        setCart([])
        deleteCartFromDb()
    }
    return (
        <div className='shop-container'>

            <div className='cart-item-container'>
                {
                    cart.map(cartItem => <ReviewItem
                        key={cartItem.id}
                        cartItem={cartItem}
                        handleDelete={handleDelete}
                    ></ReviewItem>)
                }
            </div>
            <div>
                <Cart
                    cart={cart}
                    deleteCart={deleteCart}
                >
                    <Link to="/checkout">
                        <button style={{ backgroundColor: '#ff9900', marginTop: '16px' }}>
                            Proceed Checkout
                            <FontAwesomeIcon style={{ marginLeft: '10px', }} icon={faCreditCard}></FontAwesomeIcon>
                        </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;
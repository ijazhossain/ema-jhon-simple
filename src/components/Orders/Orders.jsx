import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Order.css'
import { deleteCartFromDb, getCart, removeFromDb } from '../../utilities/fakeDB';

const Orders = () => {
    const savedCart = useLoaderData()

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
                ></Cart>
            </div>
        </div>
    );
};

export default Orders;
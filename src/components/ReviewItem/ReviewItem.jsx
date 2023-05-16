import React from 'react';
import './ReviewItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';


const ReviewItem = ({ cartItem, handleDelete }) => {
    // console.log(cartItem);
    const { _id, img, name, price, shipping } = cartItem;
    // console.log(id)

    return (
        <div className='cart-item'>
            <img src={img} alt="" />
            <div className='cart-info'>
                <div title={name} className='grow'>
                    <h3>{name.length > 25 ? name.slice(0, 25) + '...' : name}</h3>
                    <p>Price: <span>${price}</span></p>
                    <p>Shipping Charge : ${shipping}</p>
                </div>
                <button onClick={() => handleDelete(_id)} className='delete-btn fa-xl'>
                    <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                </button>
            </div>
        </div>
    );
};

export default ReviewItem;
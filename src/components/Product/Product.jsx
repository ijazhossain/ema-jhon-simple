import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'

const Product = (props) => {
    // console.log(props.handleAddTOCart);
    const { id, img, name, price, seller, ratings } = props.product;
    const handleAddToCart = props.handleAddToCart;

    return (
        <div className='product-container'>

            <div style={{ padding: '8px' }}>
                <img src={img} alt="product image" />
            </div>

            <div style={{ paddingLeft: '14px' }}>
                <h2>{name}</h2>
                <p>Price: ${price}</p>
                <p><small>Manufacturer: {seller}</small></p>
                <p><small>Rating: {ratings} stars</small></p>
            </div>
            <button onClick={() => handleAddToCart(props.product)}>


                <span> Add to cart</span>
                <FontAwesomeIcon style={{ marginLeft: '10px' }} icon={faShoppingCart}></FontAwesomeIcon>
            </button>
        </div>
    );
};

export default Product;
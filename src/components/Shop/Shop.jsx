import React, { useEffect, useState } from 'react';
import { addToDb, deleteCartFromDb, getCart } from '../../utilities/fakeDB';
import Cart from '../Cart/Cart';
import { faArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])

    const handleAddToCart = (selectedProduct) => {
        const exists = cart.find(product => product.id === selectedProduct.id)
        if (exists) {
            exists.quantity = exists.quantity + 1;
            const rest = cart.filter(product => product.id !== selectedProduct.id)
            setCart([...rest, exists])
        } else {
            selectedProduct.quantity = 1;
            setCart([...cart, selectedProduct])
        }
        addToDb(selectedProduct.id)
    }
    const deleteCart = () => {
        setCart([])
        deleteCartFromDb()
    }
    useEffect(() => {
        fetch('product.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    useEffect(() => {
        const storedCart = getCart();
        // console.log(storedCart)
        const savedProducts = []
        for (const id in storedCart) {
            const saveProduct = products.find(product => product.id === id)
            if (saveProduct) {
                const quantity = storedCart[id]
                saveProduct.quantity = quantity;
                savedProducts.push(saveProduct)
            }
        }
        setCart(savedProducts)
    }, [products])


    return (
        <div className='shop-container'>
            <div className='products-container'>
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className='order-summary'>
                <Cart
                    cart={cart}
                    deleteCart={deleteCart}
                >
                    <Link to="/orders">
                        <button style={{ backgroundColor: '#ff9900', marginTop: '16px' }}>
                            Review Order
                            <FontAwesomeIcon style={{ marginLeft: '10px', }} icon={faArrowRight}></FontAwesomeIcon>
                        </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;
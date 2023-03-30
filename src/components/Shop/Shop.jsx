import React, { useEffect, useState } from 'react';
import { addToDb, getCart } from '../../utilities/fakeDB';
import Cart from '../Cart/Cart';

import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])
    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart)
        addToDb(product.id)
    }
    useEffect(() => {
        fetch('product.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    useEffect(() => {
        const storedCart = getCart();
        console.log(storedCart)
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
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;
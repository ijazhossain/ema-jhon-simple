import React, { useEffect, useState } from 'react';
import { addToDb, deleteCartFromDb, getCart } from '../../utilities/fakeDB';
import Cart from '../Cart/Cart';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Product from '../Product/Product';
import { Link, useLoaderData } from 'react-router-dom';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(10)


    const { totalProducts } = useLoaderData();
    // console.log(totalProducts);

    const totalPages = Math.ceil(totalProducts / itemsPerPage)
    const pageNumber = [...Array(totalPages).keys()]
    console.log(pageNumber);
    const options = [5, 10, 20]
    const handleSelectChange = (event) => {
        setItemsPerPage(parseInt(event.target.value))
    }


    const handleAddToCart = (selectedProduct) => {
        const exists = cart.find(product => product._id === selectedProduct._id)
        if (exists) {
            exists.quantity = exists.quantity + 1;
            const rest = cart.filter(product => product._id !== selectedProduct._id)
            setCart([...rest, exists])
        } else {
            selectedProduct.quantity = 1;
            setCart([...cart, selectedProduct])
        }
        addToDb(selectedProduct._id)
    }
    const deleteCart = () => {
        setCart([])
        deleteCartFromDb()
    }
    /* useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []) */
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`);
            const data = await response.json();
            setProducts(data)
        }
        fetchData()
    }, [currentPage, itemsPerPage])

    // changing code for pagination
    useEffect(() => {
        const storedCart = getCart();
        const ids = Object.keys(storedCart);
        fetch('http://localhost:5000/productById', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(cartItems => {
                console.log('Cart Items', cartItems);
                const savedProducts = []
                for (const id in storedCart) {
                    const saveProduct = cartItems.find(product => product._id === id)
                    if (saveProduct) {
                        const quantity = storedCart[id]
                        saveProduct.quantity = quantity;
                        savedProducts.push(saveProduct)
                    }
                }
                setCart(savedProducts)
            })
        // console.log(storedCart)

    }, [])

    return (
        <>
            <div className='shop-container'>
                <div className='products-container'>
                    {
                        products.map(product => <Product
                            key={product._id}
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
            {/* Pagination */}
            <div className='pagination'>
                <p>current page {currentPage} and items per page {itemsPerPage}</p>
                {
                    pageNumber.map(number => <button
                        key={number}
                        className={currentPage === number ? "selected" : ''}
                        onClick={() => setCurrentPage(number)}
                    >
                        {number}
                    </button>)
                }
                <select value={itemsPerPage} onChange={handleSelectChange}>
                    {
                        options.map(option => <option
                            key={option}
                            value={option}

                        >{option}</option>)
                    }
                </select>
            </div>
        </>
    );
};

export default Shop;
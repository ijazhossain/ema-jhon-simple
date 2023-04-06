import React from 'react';
import logo from '../../images/Logo.svg'
import './Header.css'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='header'>
            <nav>
                <img src={logo} alt="" />
                <div>
                    <Link to="/">Shop</Link>
                    <Link to="/orders">Order</Link>
                    <Link to="/inventory">Inventory</Link>
                    <Link to="/login">LogIn</Link>
                </div>
            </nav>
        </div>
    );
};

export default Header;
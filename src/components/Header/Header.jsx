import React, { useContext } from 'react';
import logo from '../../images/Logo.svg'
import './Header.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const Header = () => {
    const { user, logOut } = useContext(AuthContext)
    const handleSignOut = () => {
        logOut()
            .then(() => { })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className='header'>
            <nav>
                <img src={logo} alt="" />
                <div>
                    <Link to="/">Shop</Link>
                    <Link to="/orders">Order</Link>
                    <Link to="/inventory">Inventory</Link>
                    {user && <span className='email-text'>{user.email}</span>}
                    {user ? <button onClick={handleSignOut} className='signOut-btn'>Sign Out</button>
                        : <Link to="/login">LogIn</Link>}
                </div>
            </nav>
        </div>
    );
};

export default Header;
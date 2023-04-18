import React, { useContext } from 'react';
import './LogIn.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import googleImg from '../../assets/google.png'
import { AuthContext } from '../../providers/AuthProvider';

const LogIn = () => {
    const { user, userSignIn, googleSignIn, loading } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/';
    if (loading) {
        return <h1 className='loading'>Loading...</h1>
    }
    const handleSignInSubmit = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        userSignIn(email, password)
            .then(result => {
                const signedUser = result.user;
                console.log(signedUser)
                // form.reset()
                navigate(from, { replace: true });
            }).catch(error => {
                console.error(error)
            })
    }
    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                const user = result.user
                console.log(user)
                navigate(from, { replace: true });
            }).catch(error => {
                console.log(error)
            })
    }
    return (
        <div className='lower-container'>

            <div className='form-container'>
                <h2>Log in</h2>
                <form onSubmit={handleSignInSubmit}>
                    <div className='form-control'>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" required />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" required />
                    </div>
                    <input className='submit-btn' type="submit" value="Login" />
                </form>
                <p><small>New to Ema-john? <Link to="/register"><span className='link-text'>Create A New Account</span></Link></small></p>
                <div className='or-div'>
                    <div className='or-div-line'></div>
                    <p>Or</p>
                    <div className='or-div-line'></div>
                </div>

                <button onClick={handleGoogleLogin} className='user-btn'>
                    <img src={googleImg} alt="google photo" />
                    <p>Continue with Google</p>
                </button>

            </div>
        </div>
    );
};

export default LogIn;
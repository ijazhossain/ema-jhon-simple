import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import googleImg from '../../assets/google.png'
import { AuthContext } from '../../providers/AuthProvider';

const Register = () => {
    const { user, createUser, googleSignIn, loading } = useContext(AuthContext)
    // console.log(createUser);
    if (loading) {
        return <h1 className='loading'>Loading...</h1>
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        console.log(name, email, password, confirmPassword);
        if (password !== confirmPassword) {
            alert('Password did not match')
            return; l
        }
        createUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
                form.reset()
            }).catch(error => {
                console.error(error)
            })
    }
    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                const user = result.user
                console.log(user)
            }).catch(error => {
                console.log(error)
            })
    }
    return (
        <div style={{ height: '900px' }} className='lower-container'>

            <div style={{ height: '890px' }} className='form-container'>
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-control'>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" required />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" required />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" required />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" required />
                    </div>
                    <input className='submit-btn' type="submit" value="Sign Up" />
                </form>
                <p><small>Already have an account? <Link to="/login"><span className='link-text'> Login</span></Link></small></p>
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

export default Register;
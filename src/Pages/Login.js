import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from '../Components/Header';
import '../App.css';
import { BACKEND_URL } from "../Constants";
import Footer from "../Components/Footer";

function Login() {

    const navigate = new useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(true);

    const saveProfile = async () => {
        const profile = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password,
            type: 'user'
        }
        await fetch(BACKEND_URL + '/User/SignUp', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(profile)
        }).then(res => res.json())
            .then(data => {
                if (data.status_code === 200) {
                    setEmail('');
                    setPassword('');
                    setFirstName('');
                    setLastName('');
                    setIsRegistered(true);
                }
                else
                    alert(data.message);
            });
    }

    const login = async () => {
        const profile = {
            email: email,
            password: password
        }
        await fetch(BACKEND_URL + '/User/Login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(profile)
        }).then(res => res.json())
            .then(async data => {
                if (data.status_code === 200) {
                    if (data.response["password"] === password) {
                        await localStorage.setItem('email', email);
                        setEmail('');
                        setPassword('');
                        // if (data.response["type"] === "admin") {
                        //     localStorage.setItem('isAdmin', true);
                        //     navigate('/admin/home');
                        // } else {
                        //     localStorage.setItem('isAdmin', false);
                        //     navigate('/home');
                        // }
                        await getCart(email);
                        await navigate('/home');
                    } else {
                        alert("Incorrect password");
                    }
                }
                else
                    alert(data.response);
            });
    }

    const getCart = async (email) => {
        await fetch(BACKEND_URL + '/User/GetCart?email=' + email, {
            method: 'GET'
        }).then(res => res.json())
            .then(data => {
                if (data.status_code === 200) {
                    console.log(data.response.products);
                    localStorage.setItem('cart', JSON.stringify(data.response.products));
                }
                else
                    alert(data.response);
            });
    }

    return (
        <>
            <Header />
            <div className="login-body">
                <h1>{isRegistered ? 'Login' : 'Create Account'}</h1>
                <div className="login-form">
                    {
                        isRegistered ?
                            null :
                            <>
                                <p className="login-label">First Name</p>
                                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="login-input" />
                                <p className="login-label">Last Name</p>
                                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="login-input" />
                            </>
                    }
                    <p className="login-label">Email</p>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="login-input" />
                    <p className="login-label">Password</p>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="login-input" />
                    <div style={{ display: 'flex' }}>
                        <div className={isRegistered ? "selected-btn" : "not-selected-btn"}
                            onClick={() => {
                                if (!isRegistered)
                                    setIsRegistered(!isRegistered);
                                else
                                    login();
                            }}
                        >Login</div>
                        <div className={isRegistered ? "not-selected-btn" : "selected-btn"} style={{ marginLeft: '10px' }}
                            onClick={() => {
                                if (isRegistered)
                                    setIsRegistered(!isRegistered);
                                else
                                    saveProfile();
                            }}
                        >Sign Up</div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Login;

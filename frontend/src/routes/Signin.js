import React, { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import "../CSS/Signin.css"
import axios from 'axios';

const SignIn = () => {
    const [isPasswordWrong,setPasswordMsg] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/signin/', JSON.stringify(formData), {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            navigate("/");
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setPasswordMsg(true);
            }
            else {
                console.error('There was an error!', error);
            }
        }
    }

    useEffect(() => {
        if (isPasswordWrong) {
            const timer = setTimeout(() => {
                setPasswordMsg(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isPasswordWrong]);

    return (
        <div className="container">
            <div className="row justify-content-center">
                {isPasswordWrong && 
                    <div className="alert alert-danger" role="alert">
                        Invalid Email or Password
                    </div>
                }
                <div className="col-md-6">
                    <div className="login-box">
                        <div className="illustration">
                            <img src="/arrow.png" alt="Illustration" />
                        </div>
                        <h2>Welcome Back to EthSkillVerify</h2>
                        <p>To connect with us please login with your personal information by email address and password.</p>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    name='email'
                                    placeholder="Email Address" 
                                    onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    name='password'
                                    placeholder="Password" 
                                    onChange={handleChange} />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Login Now</button>
                        </form>
                        <p className="forgot-password text-right">
                            <a href="#">Forgot Password?</a>
                        </p>
                        <button type="button" className="btn btn-secondary btn-block" onClick={()=>navigate('/signup')}>Create Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;

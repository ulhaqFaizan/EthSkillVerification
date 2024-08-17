import React, { useState,useEffect } from "react";
import { Link,useNavigate } from 'react-router-dom';
import "../CSS/Navbar.css"
import { useCookies } from 'react-cookie';

function Navbar(){
    const [cookies,removeCookie] = useCookies(['EthSkillVerifyData']);
    const [isSignedIn,setSignIn] = useState(false)
    const navigate = useNavigate();
    const handleButtonClick = (flag) => {
        if(flag){
            removeCookie('EthSkillVerifyData', { path: '/' });
            navigate("/")
        }
        navigate("/signin")
    }

    useEffect(() => {
        const userData = cookies.EthSkillVerifyData;
        if (userData) {
            try {
                console.log(userData);
                console.log(isSignedIn)
                if(userData.email === '' || !userData.role === ''){
                    setSignIn(false)
                }
                setSignIn(true)
            } catch (e) {
                console.error('Error parsing user data:', e);
            }
        }
    }, [cookies.EthSkillVerifyData]);

    return (
        <nav className="navbar navbar-expand border-secondary border-bottom navbar-light bg-light">
            <div className="container-fluid m-2">
                <div className="col-4">
                    <Link to="/" className="navbar-brand h1 text-dark fs-3">EthSkillVerify</Link>
                </div>
                <div className="col-8">
                    <div className="container row">
                        <div className="col-4 d-flex justify-content-center align-items-center">
                            <form className="d-flex">
                                <input id="search" className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-secondary" type="submit">Search</button>
                            </form>
                        </div>
                        <div className="col-8 d-flex justify-content-end align-items-center">
                            <div className="d-flex justify-content-center align-items-center">
                                <Link to="/" className="ms-1 me-1 p-2 nav-link">Home</Link>
                                <Link to="/profile" className="ms-1 me-1 p-2 nav-link">Profile</Link>
                                <Link to="/voting" className="ms-1 me-1 p-2 nav-link">Voting</Link>
                                { isSignedIn ? 
                                    <button className="ms-1 me-1 btn btn-dark" type="submit" onClick={()=>handleButtonClick(isSignedIn)}>Sign Out</button>
                                     :
                                    <button className="ms-1 me-1 btn btn-dark" type="submit" onClick={()=>handleButtonClick(isSignedIn)}>Sign In</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
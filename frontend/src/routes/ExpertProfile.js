import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Expert.css';
import Navbar from "./Navbar";
import EditProfileModel from "./EditProfileModel";
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Expert = () => {
    const [profileModel, setProfileModel] = useState(false)
    const [user,setUser] = useState({})
    const [cookies] = useCookies(['EthSkillVerifyData']);
    const [current,setCurrent] = useState('Available')
    const navigate = useNavigate();
    const toggleEditProfileModal = () => {
        setProfileModel(!profileModel);
    };

    const toggleModal = () => {
        if (current === "Available") {
            
        } else {
            navigate('/rate');
        }
    };

    useEffect(()=>{
        async function fetchData() {
            const userData = cookies.EthSkillVerifyData;
            if (userData && userData.email) {
                try {
                    const response = await axios.get('/api/user/profile', {
                        params: { email: userData.email }
                    });
                    
                    setUser(response.data);
                } catch (error) {
                    console.error('There was an error!', error);
                }
            }
        }
        fetchData();
    },[cookies.EthSkillVerifyData])

    return (
        <div>
            <Navbar/>
            <div className="container mt-5">
                <i className="bi bi-pencil-square fs-4 text-dark float-end" onClick={toggleEditProfileModal}></i>
                <div className="profile-header">
                    <img src='https://via.placeholder.com/100' alt={`${user.fullname}'s profile`} className="profile-picture" />
                    <div className="profile-info">
                        <h2 className="profile-name">{user.fullname}</h2>
                        <p><label className="fw-bold">Email:</label> {user.email}</p>
                        <p><label className="fw-bold">Website:</label> {user.web}</p>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-md-3">
                        <div className="card task text-center bg-light" onClick={()=>{setCurrent('Available')}}>
                            <div className="card-body">
                                <h5 className="card-title">Available Task</h5>
                                <p className="card-text display-4">18</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card task text-center bg-light" onClick={()=>{setCurrent('Active')}}>
                            <div className="card-body">
                                <h5 className="card-title">Active Task</h5>
                                <p className="card-text display-4">13</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card task text-center bg-light" onClick={()=>{setCurrent('Completed')}}>
                            <div className="card-body">
                                <h5 className="card-title">Completed</h5>
                                <p className="card-text display-4">5</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-center bg-light">
                            <div className="card-body">
                                <h5 className="card-title">Productivity</h5>
                                <p className="card-text display-4">76%</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        {current} Task
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Skill Holder Name</th>
                                    <th scope="col">Id</th>
                                    <th scope="col">Skill Name</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{user.fullname}</td>
                                    <td>34</td>
                                    <td>JavaScript</td>
                                    <td>{current}</td>
                                    {current !== "Completed" 
                                        ?   
                                            <td>
                                                <button 
                                                    type="button" 
                                                    className="btn btn-primary"
                                                    onClick={toggleModal}
                                                    >
                                                        {current === "Available" ? "Take Profile" : "Rate"}
                                                </button>
                                            </td>
                                        :
                                            <td>
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" style={{width: '50%'}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </td>
                                        }
                                </tr>
                                <tr>
                                    <td>Steve Martin</td>
                                    <td>47</td>
                                    <td>Blockchain fundamental</td>
                                    <td>{current}</td>
                                    {current !== "Completed"
                                        ? 
                                            <td>
                                                <button 
                                                    type="button" 
                                                    className="btn btn-primary"
                                                    onClick={toggleModal}
                                                    >
                                                        {current === "Available" ? "Take Profile" : "Rate"}
                                                </button>
                                            </td>   
                                        :
                                            <td>
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" style={{width: '70%'}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </td>
                                    }
                                </tr>
                                <tr>
                                    <td>Laura Da Silva</td>
                                    <td>120</td>
                                    <td>web3.js</td>
                                    <td>{current}</td>
                                    {current !== "Completed"
                                        ? 
                                            <td>
                                                <button 
                                                    type="button" 
                                                    className="btn btn-primary"
                                                    onClick={toggleModal}
                                                    >
                                                        {current === "Available" ? "Take Profile" : "Rate"}
                                                </button>
                                            </td>
                                        :
                                            <td>
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" style={{width: '10%'}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </td>
                                    }
                                </tr>
                                <tr>
                                    <td>Mitchell Johnson</td>
                                    <td>89</td>
                                    <td>Polkadot</td>
                                    <td>{current}</td>
                                    {current !== "Completed"
                                        ?
                                            <td>
                                                <button 
                                                    type="button" 
                                                    className="btn btn-primary"
                                                    onClick={toggleModal}
                                                    >
                                                        {current === "Available" ? "Take Profile" : "Rate"}
                                                </button>
                                            </td>
                                        :
                                            <td>
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" style={{width: '40%'}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </td>
                                    }
                                </tr>
                                <tr>
                                    <td>Ian Bell</td>
                                    <td>108</td>
                                    <td>HTML</td>
                                    <td>{current}</td>
                                    {current !== "Completed" 
                                        ?
                                            <td>
                                                <button 
                                                    type="button" 
                                                    className="btn btn-primary"
                                                    onClick={toggleModal}
                                                    >
                                                        {current === "Available" ? "Take Profile" : "Rate"}
                                                </button>
                                            </td>
                                        :
                                            <td>
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" style={{width: '100%'}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </td>
                                    }
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {profileModel && <EditProfileModel user={user} onClose={toggleEditProfileModal}/>}
            </div>
        </div>
        
    );
};

export default Expert;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Expert.css';
import Navbar from "./Navbar";
import EditProfileModel from "./EditProfileModel";
import RateModel from './Rate';

const Admin = () => {

    const [profileModel, setProfileModel] = useState(false)
    const [profile,setProfile] = useState({
        picture: 'https://via.placeholder.com/100',
        web:'https://via.placeholder.com/100',
        fullName: 'Admin Name',
        mobile: '+1234567890',
        email: 'john.doe@example.com',
        skills: ['JavaScript', 'React', 'CSS']
    })

    const toggleEditProfileModal = () => {
        setProfileModel(!profileModel);
    };

    return (
        <div>
            <Navbar/>
            <div className="container mt-5">
                <i className="bi bi-pencil-square fs-4 text-dark float-end" onClick={toggleEditProfileModal}></i>
                <div className="profile-header">
                    <img src={profile.picture} alt={`${profile.fullName}'s profile`} className="profile-picture" />
                    <div className="profile-info">
                        <h2 className="profile-name">{profile.fullName}</h2>
                        <p><label className="fw-bold">Email:</label> {profile.email}</p>
                        <p><label className="fw-bold">Website:</label> {profile.web}</p>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        Pending Expert Profiles
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Expert Name</th>
                                    <th scope="col">Id</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{profile.fullName}</td>
                                    <td>34</td>
                                    <td>
                                        <button type="button" className="btn btn-primary">Verify</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Steve Martin</td>
                                    <td>47</td>
                                    <td>
                                        <button type="button" className="btn btn-primary">Verify</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Laura Da Silva</td>
                                    <td>120</td>
                                    <td>
                                        <button type="button" className="btn btn-primary">Verify</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Mitchell Johnson</td>
                                    <td>89</td>
                                    <td>
                                        <button type="button" className="btn btn-primary">Verify</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Ian Bell</td>
                                    <td>108</td>
                                    <td>
                                        <button type="button" className="btn btn-primary">Verify</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {profileModel && <EditProfileModel {...profile} onClose={toggleEditProfileModal}/>}
            </div>
        </div>
        
    );
};

export default Admin;

import React,{useState,useEffect} from "react";
import JobListing from "./JobListing";
import "../CSS/SkillHolder.css"
import Navbar from "./Navbar";
import Model from "./Model";
import EditProfileModel from "./EditProfileModel";
import axios from 'axios';
import { useCookies } from 'react-cookie';

const SkillHolder = () =>{
    const [cookies] = useCookies(['EthSkillVerifyData']);
    const [showPopup, setShowPopup] = useState(false);
    const [profileModel, setProfileModel] = useState(false)
    const [modalProps, setModalProps] = useState({});
    const [profile,setProfile] = useState({
        unverified: [
            {
                name:'Javascript',
                link:'www.example.com',
                file:[]
            },
            {
                name:'web3.js',
                link:'www.example.com',
                file:[]
            }
        ],
        verified: []
    })
    const [user,setUser] = useState({})

    const handleButton = (props) => {
        setModalProps(props);
        setShowPopup(true);
    };

    const closeModal = () => {
        setShowPopup(false);
    };

    const toggleEditProfileModal = () => {
        setProfileModel(!profileModel);
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

    useEffect(()=>{
        async function fetchData() {
            const userData = cookies.EthSkillVerifyData;
            if (userData && userData.email) {
                try {
                    const response = await axios.get('/api/skill/info', {
                        params: { uid: userData.uid },
                    });
                    console.log('responce 2: ',response);
                    
                    // setProfile((prevProfile) => ({
                    //     ...prevProfile,
                    //     unverified: response.data
                    // }));
                } catch (error) {
                    console.error('There was an error!', error);
                }
            }
        }
        fetchData();
    },[cookies.EthSkillVerifyData])

    if(showPopup || profileModel) {
        document.body.classList.add('active-modal')
      } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <div>
            <Navbar/>
            <div className="user-profile m-5">
                <i className="bi bi-pencil-square fs-4 text-dark float-end" onClick={toggleEditProfileModal}></i>
                <div className="profile-header">
                    <img src='https://via.placeholder.com/100' alt={`${user.fullname}'s profile`} className="profile-picture" />
                    <div className="profile-info">
                        <h2 className="profile-name">{user.fullname}</h2>
                        <p><label className="fw-bold">Email:</label> {user.email}</p>
                        <p><label className="fw-bold">Website:</label> {user.website !== "" ? user.website : 'not defined'}</p>
                    </div>
                </div>
                <hr/>
                <div className="profile-skills-section">
                    <div className="skills-header">
                        <h3>Skills</h3>
                        <button className="float-end btn btn-primary" onClick={() => handleButton({
                            name: '',
                            file: null,
                            link: '',
                            flag:0,
                            button: 'Submit'
                        })}>+ Add Skill</button>
                    </div>
                    <div className="skills-content">
                    <div className="focus-skills">
                        <h4>Verified Skills</h4>
                        <div className="skills-grid">
                        {profile.verified.map((skill, index) => (
                            <div className="skill-card" key={index}>
                                <p className="skill-rating">Rating:</p>
                                <p className="skill-level">{index + 1}/10</p>
                                <p className="skill-name text-success fw-bold">{skill}</p>
                            </div>
                        ))}
                        </div>
                    </div>
                    <div className="additional-skills">
                        <h4>Unverified Skills</h4>
                        <div className="skills-grid">
                        {profile.unverified.map((skill, index) => (
                            <div className="skill-card" key={index}>
                                <i className="bi bi-pencil-square text-primary" onClick={() => handleButton({
                                    name: skill.name,
                                    file: null,
                                    link: skill.link,
                                    flag:1,
                                    button: 'Update'
                                })}></i>
                                <p className="skill-name text-success fw-bold">{skill.name}</p>
                                <button type="button" class="btn btn-danger">Delete</button>
                            </div>
                        ))}
                        </div>
                    </div>
                    </div>
                </div>
                <JobListing/>
                {showPopup && <Model {...modalProps} onClose={closeModal}/>}
                {profileModel && <EditProfileModel user={user} onClose={toggleEditProfileModal}/>}
            </div>
        </div>
    )
}

export default SkillHolder
import React,{useState} from "react";
import { Link,useNavigate } from 'react-router-dom';
import "../CSS/Home.css"
import Navbar from "./Navbar";

function Home(){
    const navigate = useNavigate();
    return (
        <div>
            <Navbar/>
            <div className="text-center">
                <h3 className="mt-5">Connect your wallet and vote on Todays' proposals.</h3>
                <button type="button" className="btn btn-info" onClick={()=>navigate("/voting")}>Go for Vote</button>
            </div>
            <div className="section-1 d-flex justify-content-center align-items-center mt-5 bg-light p-5">
                <div className="info-1 text-center p-4">
                    <p>
                        Our platform enables skill holders to have their profiles and skillsets verified
                        by real experts. Users can add their skills and get them authenticated by professionals
                        in the field. This ensures that the skills listed are credible and recognized by
                        industry experts. It's a space where your expertise can be validated by those who know best.
                    </p>
                    <button type="button" className="btn btn-dark" onClick={()=>navigate("/profile")}>Add Your Skill Here</button>
                </div>
                <div className="info-2 text-center">
                    <img src="requirements.png" className="img-fluid image" />
                </div>
            </div>

            <div className="section-2 d-flex justify-content-center align-items-center mt-5 p-5">
                <div className="info-2 text-center">
                    <img src="verification.png" className="img-fluid image" />
                </div>
                <div className="info-1 text-center p-4">
                    <p>
                        This platform allows experts to evaluate and rate the profiles and skillsets of individuals, 
                        making it easier for employers to identify verified skilled professionals. Experts can contribute 
                        by assessing skill holders, adding value to the platform. This helps in building a trusted database 
                        of qualified individuals, beneficial for both job seekers and employers. Click below to begin rating 
                        profiles and skillsets.
                    </p>
                    <button type="button" className="btn btn-dark" onClick={()=>navigate("/profile")}>Take Profiles</button>
                </div>
            </div>
        </div>
    )
}

export default Home
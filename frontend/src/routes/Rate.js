import React,{useState} from "react";
import Navbar from "./Navbar";
import { Link,useNavigate } from 'react-router-dom';
import "../CSS/Rate.css"
import axios from 'axios';

function RateModel(){
    const navigate = useNavigate();
    const [events, setEvents] = useState(0);
    const [experience, setExperience] = useState(0);
    const [certi, setCerti] = useState(0);

    const [data,setData] = useState({
        id:'',
        expertId:'',
        skill:'',
        fundamental:'',
        technical:'',
        practical:'',
        project:'',
        event: events,
        experiencePoint: experience,
        certification: certi
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/rate/skill/', JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log(response);
            navigate("/profile");
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <div>
            <Navbar/>
            <div className="skill-rating-container">
                <div className="profile-header-rating">
                    <div className="profile-info-rating">
                    <h1>Marisa Jones</h1>
                    <p className="profile-status">Skill Name</p>
                    </div>
                </div>
                <div className="skills-table">
                    <form>
                        <table>
                        <thead>
                            <tr>
                                <th>Skill Rating Criteria</th>
                                <th>Expert Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Fundamental</td>
                                <td>
                                    <input 
                                        type="range" 
                                        name="fundamental"
                                        className="form-range" 
                                        min="0" 
                                        max="10" 
                                        value={data.fundamental}
                                        onChange={handleChange}
                                        id="customRange2"/>
                                </td>
                            </tr>
                            <tr>
                                <td>Technical</td>
                                <td>
                                    <input 
                                        type="range" 
                                        name="technical"
                                        className="form-range" 
                                        min="0" 
                                        max="10" 
                                        value={data.technical}
                                        onChange={handleChange}
                                        id="customRange2"/>
                                </td>
                            </tr>
                            <tr>
                                <td>Practical</td>
                                <td>
                                    <input 
                                        type="range" 
                                        name="practical"
                                        className="form-range" 
                                        min="0" 
                                        max="10" 
                                        value={data.practical}
                                        onChange={handleChange}
                                        id="customRange2"/>
                                </td>
                            </tr>
                            <tr>
                                <td>Projects</td>
                                <td>
                                    <input 
                                        type="range" 
                                        name="project"
                                        className="form-range" 
                                        min="0" 
                                        max="10" 
                                        value={data.project}
                                        onChange={handleChange}
                                        id="customRange2"/>
                                </td>
                            </tr>
                            <tr>
                                <td>External Event Participation</td>
                                <td>
                                    <div className="counter-container">
                                        <button onClick={(e)=>{
                                            e.preventDefault()
                                            if(events >= 1){
                                                setEvents(events-1)
                                            }}} className="counter-button">-</button>
                                        <span className="counter-display">{events} events participated</span>
                                        <button onClick={(e)=>{
                                            e.preventDefault()
                                            setEvents(events+1)}} className="counter-button">+</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Experience</td>
                                <td>
                                    <div className="counter-container">
                                        <button onClick={(e)=>{
                                            e.preventDefault()
                                            if(experience >= 1){
                                                setExperience(experience-1)
                                            }}} className="counter-button">-</button>
                                        <span className="counter-display">{experience} Years</span>
                                        <button onClick={(e)=>{
                                            e.preventDefault()
                                            setExperience(experience+1)}} className="counter-button">+</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Certification</td>
                                <td>
                                    <div className="counter-container">
                                        <button onClick={(e)=>{
                                            e.preventDefault()
                                            if(certi >= 1){
                                                setCerti(certi-1)
                                            }}} className="counter-button">-</button>
                                        <span className="counter-display">{certi} certifications</span>
                                        <button onClick={(e)=>{
                                            e.preventDefault()
                                            setCerti(certi+1)}} className="counter-button">+</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        </table>
                        <button type="button" className="btn btn-primary mt-4">Submit Rating</button>
                    </form>
                </div>
            </div>
        </div>
        
    )
}

export default RateModel
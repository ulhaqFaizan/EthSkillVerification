import React,{useState} from "react";
import { Link } from 'react-router-dom';
import "../CSS/Candidate.css"
import ProposalDetailModel from "./ProposalDetail";

function Candidate({candidate}){

    const [showPopup, setShowPopup] = useState(false);
    const toggleModal = () => {
        setShowPopup(!showPopup);
    };

    return (
        <tr>
            <td>{candidate.name}</td>
            <td>{candidate.email}</td>
            <td>{candidate.productivity}</td>
            <td>{candidate.holder}</td>
            <td>{candidate.skill}</td>
            <td><button className="btn btn-primary" onClick={toggleModal}>Details</button></td>
            {showPopup && <ProposalDetailModel onClose={toggleModal}/>}
            <td>
                <button className="btn btn-success me-1"><span class="material-symbols-outlined">thumb_up</span></button>
                <button className="btn btn-danger ms-1"><span class="material-symbols-outlined">thumb_down</span></button>
            </td>
        </tr>
    )
}

export default Candidate
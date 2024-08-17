import React from "react";
import { Link } from 'react-router-dom';
import "../CSS/Model.css"
import "../CSS/ProposalDetail.css"

function ProposalDetailModel({onClose}){
    return (
        <div className="popup" onClick={onClose}>
            <div className="popup-contain rounded-3 p-3" onClick={(e)=>e.stopPropagation()}>
                <div className="mb-4">
                    <button className="btn btn-danger close rounded-circle float-end fw-bold" onClick={onClose}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>
                <h3>Proposal Detail</h3>
                <hr/>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="">
                        <div className="fs-5">Proposal Issuer</div>
                        <div className="text-secondary">Dave McCkenzie</div>
                    </div>
                    <div className="">
                        <div className="fs-5">Proposal Against</div>
                        <div className="text-secondary">Joe Doe</div>
                    </div>
                </div>
                <hr/>
                <div>
                    <div className="fs-5">Reasons:</div>
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </div>
                </div>
                <hr/>
                <div>
                    <div className="fs-5">Links:</div>
                    <p>https://via.placeholder.com/100</p>
                </div>
            </div>
        </div>
    )
}

export default ProposalDetailModel
import React, { useState, useEffect } from "react";
import "../CSS/Model.css";
import axios from 'axios';
import { useCookies } from 'react-cookie';

function Model({ name: initialName, file: initialFile, link: initialLink, flag, button, onClose }) {
    const [cookies] = useCookies(['EthSkillVerifyData']);
    const [data, setData] = useState({
        name: initialName || '',
        link: initialLink || '',
        file: initialFile || null,
        uid: ''
    });

    useEffect(() => {
        const userData = cookies.EthSkillVerifyData;
        if (userData) {
            setData(prevData => ({
                ...prevData,
                uid: userData.id
            }));
        }
    }, [cookies.EthSkillVerifyData]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "file") {
            setData(prevData => ({
                ...prevData,
                file: files[0]
            }));
        } else {
            setData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('link', data.link);
        formData.append('uid', data.uid);
        if (data.file) {
            formData.append('file', data.file);
        }
        
        try {
            const response = await axios.post('/api/skill/info/', formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            onClose();
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <div className="popup" onClick={onClose}>
            <div className="popup-contain rounded-3 p-3" onClick={(e) => e.stopPropagation()}>
                <div className="mb-4">
                    <button className="btn btn-danger close rounded-circle float-end fw-bold" onClick={onClose}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>
                <h2>Add Your Skill</h2>
                <form className="mt-3 p-2" onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-3">
                        <label htmlFor="skillname" className="form-label">Skill Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="skillname"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="link" className="form-label">External Link</label>
                        <input
                            type="text"
                            className="form-control"
                            id="link"
                            name="link"
                            value={data.link}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">Attach certificates or files</label>
                        <input 
                            className="form-control" 
                            type="file" 
                            id="formFile" 
                            name="file"
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="text-center mt-4">
                        <button type="submit" className="btn btn-primary close me-2">{button}</button>
                        <button type="button" className="btn btn-light close" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Model;

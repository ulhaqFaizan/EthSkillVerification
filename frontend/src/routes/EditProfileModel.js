import React,{useState} from "react";
import "../CSS/Model.css"
import axios from 'axios';

function EditProfileModel({user,onClose}){
    const [data,setData] = useState({
        fullname: user.fullname || '',
        email: user.email || '',
        website: user.website || '',
        mobile: user.mobile || ''
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
            const response = await axios.put('/api/user/update/profile', JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log(response);
            onClose()
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <div className="popup" onClick={onClose}>
            <div className="popup-contain rounded-3 p-3" onClick={(e)=>e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="fullname" className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="fullname"
                            name="fullname"
                            onChange={handleChange}
                            value={data.fullname}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fullname" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fullname" className="form-label">Mobile</label>
                        <input
                            type="text"
                            className="form-control"
                            id="mobile"
                            name="mobile"
                            onChange={handleChange}
                            value={data.mobile}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fullname" className="form-label">Website</label>
                        <input
                            type="text"
                            className="form-control"
                            id="website"
                            name="website"
                            onChange={handleChange}
                            value={data.website}
                        />
                    </div>
                    <div className="text-center mt-4">
                        <button type="submit" className="btn btn-primary close me-2">Update</button>
                        <button type="submit" className="btn btn-light close" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfileModel
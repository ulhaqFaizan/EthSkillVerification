import React,{useState,useEffect} from "react";
import { Link } from 'react-router-dom';
import "../CSS/Proposal.css"
import axios from 'axios';
import { useCookies } from 'react-cookie';

function Proposal({onClose}){
    const [cookies] = useCookies(['EthSkillVerifyData']);
    const [isClicked,setClick] = useState(false)
    const [data,setData] = useState({
        candidate:'',
        reasons:'',
        link:'',
        uid:'',
        file:null
    })

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "file") {
            setData({
                ...data,
                file: files[0]
            });
        } else {
            setData({
                ...data,
                [name]: value
            });
        }
    };

    const contacts = [
        {
          name: 'Dave Anderson',
          img: 'https://via.placeholder.com/50',
        },
        {
          name: 'Mike Spencer',
          img: 'https://via.placeholder.com/50',
        },
        {
          name: 'David Brantley',
          img: 'https://via.placeholder.com/50',
        },
        {
          name: 'Steve Martyn',
          img: 'https://via.placeholder.com/50',
        },
        {
          name: 'Jack Micheal',
          img: 'https://via.placeholder.com/50',
        }
      ];

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/proposal/post', JSON.stringify(data), {
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

    useEffect(() => {
        const userData = cookies.EthSkillVerifyData;
        if (userData) {
            setData(prevData => ({
                ...prevData,
                uid: userData.id
            }));
        }
    }, [cookies.EthSkillVerifyData]);

    return (
        <div className="proposal-model" onClick={onClose}>
            <div className="proposal-contain rounded-3 p-3" onClick={(e)=>e.stopPropagation()}>
                <div className="mb-4">
                    <button className="btn btn-danger close rounded-circle float-end fw-bold" onClick={onClose}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>
                <label className="fs-5">Select Exper</label>
                {isClicked ?
                    <div className="d-flex justify-content-between align-items-center mt-2 rounded-3">
                        <div className="d-flex justify-content-start align-items-center">
                            <img src={contacts[1].img} className="rounded-circle m-1" />
                            <p className="contact-name m-1">{data.candidate}</p>
                        </div>
                        <i className="bi bi-x-circle" onClick={()=>{setClick(false)}}></i>
                    </div>
                :
                    <div className="scroll-list rounded-3 border p-2">
                        {contacts.map((contact, index) => (
                            <div className="item border-bottom d-flex justify-content-start align-items-center mt-1 rounded-3" 
                                key={index} onClick={()=>{
                                    setData({
                                        ...data,
                                        candidate: contact.name
                                    })
                                    setClick(true)
                                }}>
                                <img src={contact.img} alt={contact.name} className="rounded-circle m-1" />
                                <p className="contact-name m-1">{contact.name}</p>
                            </div>
                        ))}
                    </div>
                }
                <form className="mt-3" onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" className="form-label">Describe Reasons</label>
                        <textarea 
                            className="form-control" 
                            name="reasons" 
                            id="exampleFormControlTextarea1" 
                            rows="3"
                            onChange={handleChange}></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">External link</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="link" 
                            id="exampleInputEmail1" 
                            onChange={handleChange}
                            aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label for="formFile" className="form-label">Attatch Supporting Documents</label>
                        <input 
                            className="form-control" 
                            type="file" 
                            id="formFile" 
                            name="file"
                            onChange={handleChange}
                            multiple/>
                    </div>
                    <div className="text-center mt-4">
                        <button type="submit" className="btn btn-primary close me-2">Send Proposal</button>
                        <button type="submit" className="btn btn-light close" onClick={onClose}>Cancel Proposal</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Proposal
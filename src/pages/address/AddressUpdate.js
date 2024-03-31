import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

function AddressUpdate(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const navigate=useNavigate();
    const {id}=useParams();

    const updateAddress=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8080/addresses/${id}/update`, {
            name:name,
            description:description
        })
            .then(res=>
                 navigate(`/addresses/${id}`)
            )
            .catch(err=>console.log(err))
    }

    const loadAddress=()=>{
        axios.get(`http://localhost:8080/addresses/${id}`)
            .then(res=>{
                 setName(res.data.name)
                 setDescription(res.data.description)
        })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadAddress();
    },[])
    return(
        <>
            <h2>Update Address</h2>
            <form onSubmit={updateAddress}>
                <div>
                    <label>Name:</label>
                    <input type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
                </div>
                <div>
                <label>Description:</label>
                    <textarea onChange={(e)=>setDescription(e.target.value)} value={description}/>
                </div>
                <input type="submit" value="Update Address"/>
            </form>
        </>
    )
}
export default AddressUpdate;
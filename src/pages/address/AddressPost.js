import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

function AddressPost(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const navigate=useNavigate();

    const createAddress=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8080/addresses/create", {
            name:name,
            description:description
        })
            .then(res=>
                 navigate("/addresses")
            )
            .catch(err=>console.log(err))
    }

    return(
        <>
            <h2>Post Address</h2>
            <form onSubmit={createAddress}>
                <div>
                    <label>Name:</label>
                    <input type="text" onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                <label>Description:</label>
                    <textarea onChange={(e)=>setDescription(e.target.value)}/>
                </div>
                <input type="submit" value="Post Address"/>
            </form>
        </>
    )
}
export default AddressPost;
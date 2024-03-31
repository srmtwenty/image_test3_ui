import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

function AddressDetail(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")

    const navigate=useNavigate();
    const {id}=useParams();

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
            <h2>Address Detail</h2>
            <p>Id: {id}</p>
            <p>Name: {name}</p>
            <p>Description: {description}</p>

        </>
    )
}
export default AddressDetail;
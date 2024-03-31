import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

function PersonUpdate(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const navigate=useNavigate();
    const {id}=useParams();
    const updatePerson=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8080/people/${id}/update`, {
            name:name,
            description:description
        })
            .then(res=>
                 navigate(`/people/${id}`)
            )
            .catch(err=>console.log(err))
    }

    const loadPerson=()=>{
        axios.get(`http://localhost:8080/people/${id}`)
            .then(res=>{
                 setName(res.data.name)
                 setDescription(res.data.description)
        })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadPerson();
    },[])
    return(
        <>
            <h2>Update Person</h2>
            <form onSubmit={updatePerson}>
                <div>
                    <label>Name:</label>
                    <input type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
                </div>
                <div>
                <label>Description:</label>
                    <textarea onChange={(e)=>setDescription(e.target.value)} value={description}/>
                </div>
                <input type="submit" value="Update Person"/>
            </form>
        </>
    )
}
export default PersonUpdate;
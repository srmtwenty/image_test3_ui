import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

function PersonPost(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const navigate=useNavigate();

    const createPerson=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8080/people/create", {
            name:name,
            description:description
        })
            .then(res=>
                 navigate("/people")
            )
            .catch(err=>console.log(err))
    }

    return(
        <>
            <h2>Post Person</h2>
            <form onSubmit={createPerson}>
                <div>
                    <label>Name:</label>
                    <input type="text" onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                <label>Description:</label>
                    <textarea onChange={(e)=>setDescription(e.target.value)}/>
                </div>
                <input type="submit" value="Post Person"/>
            </form>
        </>
    )
}
export default PersonPost;
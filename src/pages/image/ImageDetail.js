import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

function ImageDetail(){
    const [url, setUrl]=useState("")

    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const {id}=useParams();

    const loadImage=()=>{
        axios.get(`http://localhost:8080/files/${id}`)
            .then(res=>
                    {
                        console.log(res.data)
                        setName(res.data.name)
                        setDescription(res.data.description)
                        setUrl(res.data.url)
                    }
                )
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadImage()
    },[])

    return(
        <>
            <p>{id}: {name}</p>
            <p>{description}</p>
            <img src={`http://localhost:8080/files/${id}`}/>
        </>
    )
}
export default ImageDetail;
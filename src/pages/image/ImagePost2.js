import axios, {post} from 'axios';
import {React, useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';


function ImagePost2(){
    const [file, setFile]=useState(null);
    //const [name, setName]=useState("");
    //const [size, setSize]=useState(0);
    //const [type, setType]=useState("");

    const navigate=useNavigate()

    
    let axiosConfig={
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    const onFormSubmit=(e)=>{
        e.preventDefault();

        var postData=new FormData();
        //var input = document.querySelector('input[type="file"]')
        postData.append('file', file)
        console.log(postData)
        //var data = new FormData()
        //data.append('file', input.files[0])
        //console.log(data);
        
        axios.post("http://localhost:8080/files/upload", postData, axiosConfig)
            .then(res=>{
                setFile(res.data)
                console.log(res.data)
                navigate("/files")
            })
            .catch(err=>console.log(err))
    }

    return(
        <>
            <h2>Post Image</h2>
            <form onSubmit={onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" onChange={(e)=>setFile(e.target.files[0])} />
                <button type="submit">Upload</button>
            </form>
        </>
    )
}
export default ImagePost2;
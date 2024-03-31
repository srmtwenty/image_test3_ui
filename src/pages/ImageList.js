import axios from 'axios';
import {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';

function ImageList(){
    const [images, setImages]=useState([])
    const navigate=useNavigate();
    const loadImage=()=>{
        axios.get('http://localhost:8080/files')
            .then(res=>{
                setImages(res.data)
                console.log(res.data)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadImage()
    },[])

    const deleteImage=(id)=>{
        axios.delete(`http://localhost:8080/files/${id}/delete`)
            .then(res=>{
                window.location.reload();
                navigate("/files")
            })
            .catch(err=>console.log(err))
    }

    return(
        <>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Content</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        images.map((image, i)=>(
                        <tr key={i}>
                            <td><a href={`/files/${image.id}`}>{image.id}</a></td>
                            <td>{image.name}</td>
                            <td>
                                <img style={{width:"200px", padding: "5px"}} src={image.url}/>
                            </td>
                            <td>
                                <button onClick={()=>deleteImage(image.id)}>Delete Image</button>
                            </td>
                        </tr>
                     ))
                    }
                </tbody>
            </table>
            <Link to="/files/create">Post Image</Link>
        </>
    )
}
export default ImageList;
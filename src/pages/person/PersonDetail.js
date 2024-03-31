import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

function PersonDetail(){
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")
    const [aName, setAName]=useState("")

    const [addresses, setAddresses]=useState([])
    const [allAddresses, setAllAddresses]=useState([])
    const [images, setImages]=useState([])
    const [allImages, setAllImages]=useState([])
    const navigate=useNavigate();
    const {id}=useParams();

    const loadPerson=()=>{
        axios.get(`http://localhost:8080/people/${id}`)
            .then(res=>{
                 setName(res.data.name)
                 setDescription(res.data.description)
        })
            .catch(err=>console.log(err))
    }

    const loadImages=()=>{
        axios.get(`http://localhost:8080/people/${id}/images`)
            .then(res=>{
                setImages(res.data)
            })
            .catch(err=>console.log(err))
    }

    const loadAllImages=()=>{
        axios.get("http://localhost:8080/files")
            .then(res=>{
                setAllImages(res.data)
            })
            .catch(err=>console.log(err))
    }

    const loadAddresses=()=>{
        axios.get(`http://localhost:8080/people/${id}/addresses`)
            .then(res=>{
                setAddresses(res.data)
            })
            .catch(err=>console.log(err))
    }

    const loadAllAddresses=()=>{
        axios.get("http://localhost:8080/addresses")
            .then(res=>{
                setAllAddresses(res.data)
            })
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        loadPerson();
        loadAllImages();
        loadImages();
        loadAddresses();
        loadAllAddresses();
    },[])

    const addImage=(imageId)=>{
        axios.put(`http://localhost:8080/people/${id}/addImage/${imageId}`)
            .then(res=>{
                console.log("tag has been added!")
                //window.location.reload();
                navigate(`/people/${id}`)
            })
            .catch(err=>console.log(err))
    }

    const addAddress=(addressId)=>{
        axios.put(`http://localhost:8080/people/${id}/addAddress/${addressId}`)
            .then(res=>{
                console.log("Address has been added!")
                window.location.reload();
                navigate(`/people/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const removeAddress=(addressId)=>{
        axios.put(`http://localhost:8080/people/${id}/removeAddress/${addressId}`)
            .then(res=>{
                console.log("Address has been removed!")
                window.location.reload();
                navigate(`/people/${id}`)
            })
            .catch(err=>console.log(err))
    }
    const addAddress2=(e)=>{
        e.preventDefault()
        axios.put(`http://localhost:8080/people/${id}/addAddressAlt`,{
            name:aName
        })
            .then(res=>{
                setAName("")
                window.location.reload();
                navigate(`/people/${id}`)
                
            })
            .catch(err=>console.log(err))
              
    }

    return(
        <>
            <h2>Person Detail</h2>
            <p>Id: {id}</p>
            <p>Name: {name}</p>
            <p>Description: {description}</p>

            <p>Image List</p>
            {
                images.map((im, i)=>(
                    <ul key={i}>
                        <li><img src={im.url}/></li>
                    </ul>
                ))
                
            }
            
            <div>    
                <span>Addresses:</span>
                    <div>
                        <ul>
                            <li>
                                        
                                <form onSubmit={addAddress2}>
                                    <div>
                                        <input type="text"  placeholder="Enter URL" onChange={(e)=>setAName(e.target.value)}/>
                                        <input type="submit"/>
                                    </div> 
                                </form>
                                :<></>
                                             
                            </li>
                        </ul>
                                
                        <div> 
                        {   
                            addresses?
                            addresses.map((a, i)=>(
                            <div key={i}>
                                <a href={`/addresses/${a.id}`}>{a.name}</a>
                                <a href={`/files/${a.name}`}>Image</a>
                                <img src={`http://localhost:8080/files/${a.name}`} style={{width:"200px", padding: "5px"}}/>                  
                                    <button onClick={()=>removeAddress(a.id)}>x</button>
                                    :<></>
                            </div>
                            )):
                            <>Null</>
                        }
                        </div>
                    </div>
                              
            </div> 
            
            <h2>All Address List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Description</th>
                     
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allAddresses.map((aa, i)=>(
                        <tr key={i}>
                            <td><a href={`/addresses/${aa.id}`}>{aa.name}</a></td>
                            <td>{aa.description}
                            </td>

                            <td><button onClick={()=>addAddress(aa.id)}>Add</button>  </td>
                        </tr>
                     ))
                    }
                </tbody>
            </table>

            <h2>All Image List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>URL</th>
                        <th>Content</th>
                        
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allImages.map((image, i)=>(
                        <tr key={i}>
                            <td><a href={`/files/${image.id}`}>{image.id}</a></td>
                            <td>{image.name}</td>
                            <td>{image.url}</td>
                            <td>
                                <img style={{width:"200px", padding: "5px"}} src={image.url}/>
                            </td>
                       
                            <td><button onClick={()=>addImage(image.id)}>Add</button></td>
                        </tr>
                     ))
                    }
                </tbody>
            </table>
        </>
    )
}
export default PersonDetail;
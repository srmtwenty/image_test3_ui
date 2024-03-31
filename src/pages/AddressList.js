import axios from 'axios';
import {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';

function AddressList(){
    const [addresses, setAddresses]=useState([])

    const navigate=useNavigate();
    const loadAddresses=()=>{
        axios.get("http://localhost:8080/addresses")
            .then(res=>{
                setAddresses(res.data)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadAddresses();
    },[])

    const deleteAddress=(id)=>{
        axios.delete(`http://localhost:8080/addresses/${id}/delete`)
            .then(res=>
                {
                    window.location.reload();
                    navigate("/addresses")
                }
            )
    }
    return(
        <>
            <h2>Addresses List</h2>
            {
                addresses.length!=0?
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            addresses.map((address, i)=>(
                            <tr key={i}>
                                <td><a href={`/addresses/${address.id}`}>{address.id}</a></td>
                                <td>{address.name}</td>
                                <td><button onClick={()=>deleteAddress(address.id)}>Delete Address</button></td>
                            </tr>
                            ))
                        }
                        
                    </tbody>
                </table>
                :<h2>Loading...</h2>
            }
            <Link to="/addresses/create">Post Address</Link>
        </>
    )
}
export default AddressList;
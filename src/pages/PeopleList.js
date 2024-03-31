import axios from 'axios';
import {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';

function PeopleList(){
    const [people, setPeople]=useState([])

    const navigate=useNavigate();
    const loadPeople=()=>{
        axios.get("http://localhost:8080/people")
            .then(res=>{
                setPeople(res.data)
            })
            .catch(err=>console.log(err))
    }
    useEffect(()=>{
        loadPeople();
    },[])

    const deletePerson=(id)=>{
        axios.delete(`http://localhost:8080/people/${id}/delete`)
            .then(res=>
                {
                    window.location.reload();
                    navigate("/people")
                }
            )
    }
    return(
        <>
            <h2>People List</h2>
            {
                people.length!=0?
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
                            people.map((person, i)=>(
                            <tr key={i}>
                                <td><a href={`/people/${person.id}`}>{person.id}</a></td>
                                <td>{person.name}</td>
                                <td><button onClick={()=>deletePerson(person.id)}>Delete Person</button></td>
                            </tr>
                            ))
                        }
                        
                    </tbody>
                </table>
                :<h2>Loading...</h2>
            }
            <Link to="/people/create">Post Person</Link>
        </>
    )
}
export default PeopleList;
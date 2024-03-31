import axios from 'axios';
import {useEffect, useState} from 'react';

function Options2(){
    const [images, setImages]=useState([])

    const options = {
        method: 'GET',
        url: 'https://any-anime.p.rapidapi.com/v1/anime/gif/1',
        headers: {
            'X-RapidAPI-Key': '975633143amsh1e251e7b08108c5p1bb00fjsn4602ac35e468',
            'X-RapidAPI-Host': 'any-anime.p.rapidapi.com'
        }
    };

    const getUsers=
        async()=>{
            try{
                const response = await axios.request(options);
                console.log(response.data);
                setImages(response.data.images)
            }
            catch(err){
                console.log(err)
            }
        }
       
    
    useEffect(()=>{
        getUsers()
    },[])
    return(
        <>
            {
                images.map((image, i)=>(
                    <img key={i} src={image}/>
                ))
                
            }
        </>
    )
}
export default Options2;
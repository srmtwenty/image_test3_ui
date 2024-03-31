import axios from 'axios';

function Fetch(){

    const fetchImage=()=>{
        fetch('https://any-anime.p.rapidapi.com/v1/anime/gif', {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '975633143amsh1e251e7b08108c5p1bb00fjsn4602ac35e468',
                'X-RapidAPI-Host': 'any-anime.p.rapidapi.com'
            }
        })
        .then((response) => response.blob())
        .then((blob) => {
            const imageUrl = URL.createObjectURL(blob);
            const imageElement = document.createElement("gif");
            imageElement.src = imageUrl;
            const container = document.getElementById("image-container");
            container.appendChild(imageElement);
        });
    }
    return(
        <>
            

            <button onClick={()=>fetchImage()}>Fetch</button>
            
            <div id="image-container">

            </div>
        </>
    )
}
export default Fetch;
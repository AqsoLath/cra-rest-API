import React from "react";
import { useParams } from "react-router-dom";

export default function DetailDataFilm(){
    let params = useParams();

    const [itemsDetail, setItemsDetail] = React.useState({});
    const [loaded, setLoaded] = React.useState(false)
    
    React.useEffect(function(){
        async function getDetailData(){
            const request = await fetch('http://www.omdbapi.com/?apikey=67aca4ce&t=' + params.filmTitle);
            const data = await request.json();

            setItemsDetail(data)

            setLoaded(true)

            console.log(itemsDetail)
        }
        getDetailData();

        // console.log(itemsDetail)
        // console.log(params)
    }, [])

    return (
        <div>
        {!loaded ? <i>Loading...</i> :
        <div>
            <h1>Judul: {itemsDetail.Title}</h1>
            <h1>Tahun: {itemsDetail.Year}</h1>
            <h1>Pemeran: {itemsDetail.Actors}</h1>
        </div>
    }
    </div>
    )
}
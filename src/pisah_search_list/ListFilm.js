import { useParams, useNavigate } from "react-router-dom";
import React from "react";


export default function ListFilm(){

    const [itemsFilm, setItemsFilm] = React.useState([]);

    const [loaded, setLoaded] = React.useState(false);

    const params = useParams();

    const navigate = useNavigate();

    React.useEffect(function(){
        async function getListFilm(){
            // Kita isi variabel 's' dengan parameter url yang sudah dikirimkan dari SearchTitleFilm.js
            const request = await fetch('http://www.omdbapi.com/?apikey=67aca4ce&s=' + params.filmTitle)
            // Jadi di sini akan menampilkan sepuluh film yang namanya cocok dengan parameter url. 
            const data = await request.json();

            setItemsFilm(data);

            setLoaded(true)
        }
        getListFilm();
    }, [params.filmTitle])

    return (
        <div className="container mx-auto">
            <ul>
                {!loaded ? <i style={{ visibility: 'hidden' }}>loading...</i> :
                    <div>
                        {itemsFilm.Response === 'True' ?
                            <div className="grid grid-cols-4 mt-4">
                                {itemsFilm.Search.map(function (item) {
                                    return <div className="mx-2 my-4 text-center" key={item.imdbID} >
                                        <img className="h-80" src={item.Poster} alt={item.Title} />
                                        <h2 className="text-xl font-semibold text-emas mt-1 mb-2">{item.Title}</h2>
                                        <h3 className="rounded-full border-2 border-putih hover:bg-warna3 hover:text-warna1 py-1 cursor-pointer" onClick={function(){navigate('/film/detail/' + item.imdbID)}}>Detail</h3>
                                        {/* Agar url yang kita gunakan rapih saat kita mencet tombol detail kita masuk dulu ke route detail baru ke filmId agar yang ada di url film/detail/filmId */}
                                    </div>
                                })}
                            </div>
                            : <i>Film Tidak Ditemukan!!!</i>
                        }

                    </div>
                }
            </ul>

        </div>
    )
}
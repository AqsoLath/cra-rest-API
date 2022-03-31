import React from "react";
import { Link } from "react-router-dom";

export default function DataApiFilm() {

    // apikey: 67aca4ce



    const [itemsFilm, setItemsFilm] = React.useState([]);

    const [searchTitle, setSearchTitle] = React.useState('')

    const [loaded, setLoaded] = React.useState(false)

    function searchDataFilm(event) {

        event.preventDefault();

        // Jadi setelah disubmit judul yang telah dimasukkan akan dihapus
        document.getElementById('input-title').value = '';

        async function getDataFilm() {

            const request = await fetch('http://www.omdbapi.com/?apikey=67aca4ce&s=' + searchTitle);

            const dataFilm = await request.json();

            setItemsFilm(dataFilm);

            setLoaded(true)

            setSearchTitle('')

        }

        getDataFilm();
        console.log(itemsFilm)


    }

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-center">Cari Data Film Berdasarkan Judul</h1>
            <div className="mx-auto">
                <form className="text-center" onSubmit={searchDataFilm}>
                    <input className="border-2 border-slate-700 rounded caret-red-900 py-1 px-2 " type="text" placeholder="Masukkan Judul Film" id="input-title" onChange={function (event) {
                        setSearchTitle(event.target.value);

                    }} />
                    <button type="submit">Search</button>
                </form>
            </div>

            <ul>
                {!loaded ? <i style={{ visibility: 'hidden' }}>loading...</i> :
                    <div>
                        {itemsFilm.Response === 'True' ?
                            <div className="grid grid-cols-4 mt-4">
                                {itemsFilm.Search.map(function (item) {
                                    return <div className="mx-2 my-4 text-center" key={item.imdbID} >
                                        <img className="h-80" src={item.Poster} alt={item.Title} />
                                        <h2>{item.Title}</h2>
                                        <Link to={item.Title}>Detail</Link>
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
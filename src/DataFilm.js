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

            // Setelah dihapus judul yang kita masukkan di input, kita juga harus mereset state searchTitle menjadi string kosong.
            setSearchTitle('')

        }

        getDataFilm();

        // console.log(itemsFilm)


    }

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-center text-4xl font-semibold text-emas">Cari Data Film Berdasarkan Judul</h1>
            <div className="mx-auto mt-4">
                <form className="text-center" onSubmit={searchDataFilm}>
                    <input className="mr-4 border-2 border-warna3 rounded caret-emas bg-white text-warna1  focus:border-emas outline-0 w-96 placeholder-warna3 py-1 px-2 " type="text" placeholder="Masukkan Judul Film" id="input-title" onChange={function (event) {
                        setSearchTitle(event.target.value);

                    }} />
                    <button type="submit" className="py-1 px-2 bg-gradient-to-b from-emas to-yellow-300 rounded text-warna1 font-semibold">Search</button>
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
                                        <h2 className="text-xl font-semibold text-emas mt-1 mb-2">{item.Title}</h2>
                                        {/* Tombol Link ini berfungsi mirip seperti 'a' di html. dia akan pindah halaman ke halaman yang ditunjuk oleh item.Title (judul film). yang nantinya parameter url item.Title bisa kita gunakan untuk mengambil data menggunakan useParams().*/}
                                        {/* Karena masalah ada judul film yang sama maka item.Title diganti jadi item.imdbID (id yang diberikan oleh imdb) */}
                                        <Link to={item.imdbID}><h3 className="rounded-full border-2 border-putih hover:bg-warna3 hover:text-warna1 py-1">Detail</h3></Link>
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
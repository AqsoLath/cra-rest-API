import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function SearchTitleFilm() {

    const [searchTitle, setSearchTitle] = React.useState('')

    // Kita bisa menggunakan navigate untuk pindah halaman, sama seperti Link hanya saja navigate dapat digunakan dalam function, atau dalam kata lain mengirimkan parameter url
    const navigate = useNavigate();

    function searchDataFilm(event) {
        event.preventDefault();

        // di sini kita pake navigate akan mengirimkan parameter url berupa apa yang kita masukkan di inputan judul, setelah kita submit
        navigate(searchTitle);
        // jadi misal kita mengirim judul avengers, maka nanti avengers ini akan menjadi parameter url dan akan digunakan di ListFilm.js 
    }



    return (
        <div>
            <form className="text-center" onSubmit={searchDataFilm}>
                <input className="mr-4 border-2 border-warna3 rounded caret-emas bg-white text-warna1  focus:border-emas outline-0 w-96 placeholder-warna3 py-1 px-2 " type="text" placeholder="Masukkan Judul Film" id="input-title" onChange={function (event) {
                    setSearchTitle(event.target.value);

                }} />
                <button type="submit" className="py-1 px-2 bg-gradient-to-b from-emas to-yellow-300 rounded text-warna1 font-semibold"><Link to={searchTitle}>Search</Link></button>
                {/* Link to di sini akan berpindah ke halaman yang sudah kita masukan judul filmnya, sama seperti navigate. */}
            </form>
            {/* Outlet di sini berfungsi agar nested route yang sudah kita bikin di App.js dapat digunakan. dan ditempel persis di sini*/}
            <Outlet />
        </div>
    )
}
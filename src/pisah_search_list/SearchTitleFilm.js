import React from "react";
import { useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function SearchTitleFilm() {

    const [searchTitle, setSearchTitle] = React.useState('')

    // useRef() di sini penggunaanya mirip2 kayak document.getElementById() . jadi kita deklarasikan element mana yang mau ref-nya adalah inputTitle lalu bisa kita manipulasi element tersebut
    const inputTitle = useRef();

    // Kita bisa menggunakan navigate untuk pindah halaman, sama seperti Link hanya saja navigate dapat digunakan dalam function, atau dalam kata lain mengirimkan parameter url
    const navigate = useNavigate();

    function searchDataFilm(event) {
        event.preventDefault();

        // saat kita gak mengisi inputan judul atau kita kosongin, nanti akan ke halaman "Film-Tidak-Ditemukan"
        if (!searchTitle) {
            // console.log('halaman tidak ditemukan');
            navigate("search/Film-Tidak-Ditemukan")

        } else {
            // di sini kita pake navigate akan mengirimkan parameter url berupa apa yang kita masukkan di inputan judul, setelah kita submit
            navigate("search/" + searchTitle);
            // jadi misal kita mengirim judul avengers, maka nanti avengers ini akan menjadi parameter url dan akan digunakan di ListFilm.js 
        }


        // Sebelum judul masukkan dulu "search/" agar parameternya lebih rapih

        setSearchTitle('');

        // saat disubmit ubah inputannya menggunakan useRef() jadi string kosong
        inputTitle.current.value = '';
        // console.log(input)
    }



    return (
        <div className="mt-20">
            <h1 className="mt-4 font-bold text-center text-4xl text-emas">Cari Judul Film Berdasarkan Judul</h1>
            <form className="text-center mt-4" onSubmit={searchDataFilm}>
                {/* deklarasikan useRef()-nya mau di sini yaitu di inputan cari judul film */}
                <input ref={inputTitle} className="mr-4 border-2 border-warna3 rounded caret-emas bg-white text-warna1  focus:border-emas outline-0 w-96 placeholder-warna3 py-1 px-2 " type="text" placeholder="Masukkan Judul Film" id="input-title" onChange={function (event) {
                    setSearchTitle(event.target.value);

                }} />
                <button type="submit" className="py-1 px-2 bg-gradient-to-b from-emas to-yellow-300 rounded text-warna1 font-semibold">Search</button>
                {/* Link to di sini akan berpindah ke halaman yang sudah kita masukan judul filmnya, sama seperti navigate. */}
            </form>
            {/* Outlet di sini berfungsi agar nested route yang sudah kita bikin di App.js dapat digunakan. dan ditempel persis di sini*/}
            <Outlet />
        </div>
    )
}
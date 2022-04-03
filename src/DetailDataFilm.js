import React from "react";
import { useParams } from "react-router-dom";

export default function DetailDataFilm() {

    // useParams di sini berisi parameter url yang kita kirimkan dari DataFilm yang berupa objek, yang parameter dari objeknya adalah yang kita kirim dari App.js, karena kita mengirim dari App.js path-nya adalah :filmTitle jadi kita mengakses parameter url nya adalah params.filmTitle (sesuai yang kita kirim dari App.js)
    let params = useParams();
    // Jadi karena kita mengklik tombol detail di DataFilm yang ngirim parameter url nya adalah judul film, maka di DetailDataFilm kita bisa ngambil judul filmnya menggunakan useParams();

    // buat state itemsDetail untuk menampung detail dari film, yang posisi awalnya adalah objek kosong
    const [itemsDetail, setItemsDetail] = React.useState({});
    const [loaded, setLoaded] = React.useState(false)

    React.useEffect(function () {
        async function getDetailData() {
            // kita di sini mengambil ke API menggunakan parameternya adalah 't' yang berisi params.filmTitle (judul film yang kita kirimkan lewat parameter url), di sini kita tidak menggunakan parameter 's' tapi menggunakan 't' karena kita di sini hanya ingin menampilkan satu detail film berdasarkan judul film yang dikirim dari parameter url, karena parameter 's' menampilkan 10 judul film.
            // Karena masalah ada judul film yang sama maka item.Title diganti jadi item.imdbID (id yang diberikan oleh imdb) dan untuk parameter url nya diganti jadi i untuk mewakili id dilm
            const request = await fetch('https://www.omdbapi.com/?apikey=67aca4ce&i=' + params.filmId);
            const data = await request.json();

            // Setelah detail film sudah didapatkan kita masukkan ke dalam state itemsDetail.
            setItemsDetail(data)

            setLoaded(true)

            // console.log(itemsDetail)
        }
        getDetailData();

        // console.log(itemsDetail)
        // console.log(params)

        // kenapa useEffect nya dikasih parameter kedua params.filmTitle ...? karena ada warning kalo misalnya gak dikasih kayak gitu
    }, [params.filmId])

    return (
        <div className="container mx-auto mt-20">
            {!loaded ? <i>Loading...</i> :
                <div className="flex items-center">
                    {/* Lalu setelah kita dapatkan detail film nya tinggal kita tampilkan di halamannya */}
                    <div className="flex-none mx-4">
                        <img className="border-2 border-emas" src={itemsDetail.Poster} alt={itemsDetail.Title} />
                    </div>
                    <div className="flex-1">
                        <div className="mb-4">
                            <h1 className="text-4xl text-emas">{itemsDetail.Title}</h1>
                            <h2 className=" text-xl">{itemsDetail.Year} | {itemsDetail.imdbRating}</h2>
                        </div>
                        <div className="">
                            <h3>Actors: {itemsDetail.Actors}</h3>
                            <h3>Writer: {itemsDetail.Writer}</h3>
                            <h3>Genre: {itemsDetail.Genre}</h3>
                            <h3>Released: {itemsDetail.Released}</h3>

                            <div className="mt-2 text-sm">
                                <p className="leading-4">{itemsDetail.Plot}</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
// ===============================================================================
// === Jika ada step2 yang tidak ada penjelasannya, bisa dilihat di DataApi.js ===
// =============================================================================== 
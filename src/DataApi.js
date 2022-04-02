import React from "react";

export default function DataApi() {

    const [items, setItems] = React.useState({})
    const [loading, setLoading] = React.useState(true)

    //React.useEffect berfungsi untuk membaca/memantau apabila halaman telah dirender, jadi saat halaman dirender useEffect ini akan menjalankan fungsi yang ada di dalamnya. useEffect cocok untuk sebuah component yang direndernya hanya saat pertama kali halaman dirender, contoh saat memanggil data dari api, karena setelah mengambil data dari api kita tidak perlu untuk merender data API berulang2.
    React.useEffect(function () {
        async function getData() {
            // fetch merupakan fungsi di javascript untuk menagmbil data dari API.

            const request = await fetch('https://covid19.mathdro.id/api/countries/indonesia');
            // const request = await fetch('http://apicovid19indonesia-v2.vercel.app/api/indonesia')

            // .json() adalah fungsi untuk mengambil file json yang ada dari api tersebut
            const data = await request.json();

            // ubah state items dengan data yang sudah berubah menjadi json
            setItems(data);

            // ubah loading menjadi false yang artinya loading jadi hilang
            setLoading(false)
        }
        getData();
        // lalu parameter kedua dari use effect adalah array yang isinya state ataupun variabel yang jika state atau variabel tersebut dirender maka akan menjalankan fungsi yang ada di dalam useEffect. bisa juga berisi array kosong, jadi nanti dia hanya dijalankan saat halaman dirender pertama kali. 
    }, [])

    console.log(items);

    const dataPositif = items.confirmed.value;
    const dataMeninggal = items.deaths.value;
    const dataSembuh = items.recovered.value;


    return (
        <>
            {/* sebelum data selesai diambil dari api, tampilkan dulu tulisan loading */}
            {loading ? <i>loading...</i> :
                <div className="container mx-auto mt-20 ">
                    {/*jika data sudah selesai diambil maka tampilkan datanya  */}
                    <h1 className="text-slate-900 text-5xl font-semibold">Data Covid-19 di Indonesia</h1>
                    <div className="mt-4">
                        <h3 className="text-4xl font-medium text-yellow-600">Positif : {dataPositif}</h3>
                        <h3 className="text-4xl font-medium text-green-600">Sembuh : {dataSembuh}</h3>
                        <h3 className="text-4xl font-medium text-red-600">Meninggal : {dataMeninggal}</h3>
                    </div>

                </div>
            }
        </>
    )
}

// Di bawah ini merupakan component yang isinya data film yang dari api 
export function DataApiFilm() {

    // Sebelum kita bisa mengakses api nya kita harus mendapatkan apikey nya terlebih dahulu lewat web omdbnya
    // apikey: 67aca4ce

    // buat state untuk menampung data yang berasal dari api
    const [itemsFilm, setItemsFilm] = React.useState([]);

    // buat state untuk menampung inputan yang kita masukkan pada search bar
    const [searchTitle, setSearchTitle] = React.useState('')

    // buat state untuk menampung apakah api sudah selesai diambil
    const [loaded, setLoaded] = React.useState(false)

    // buat fungsi jika kita mengklik tombol "search" saat ingin mencari judul film
    function searchDataFilm(event) {

        // event.prevenDefault untuk mencegah halaman direload saat memencet tombol submit
        event.preventDefault();

        // buat fungsi asynchronus untuk mengambil data dari api omdb (API Film)
        async function getDataFilm() {

            // setelah mengklik tombol search/mensubmit dapat diasumsikan bahwa kita sudah memasukkan judul film yang kita ingin cari dan sudah dimasukkan ke dalam state searchTitle. Lalu kita melakukan request atau mengambil data dari api melalui url yang parameternya ada dua
            // parameter pertama adalah apikey yang didapat dari websitenya omdb dan parameter kedua adalah 's' yang berarti 'search title' atau judul dari film yang mau kita cari. nah karena kita sudah memasukkan judul filmnya ke dalam state searchTitle maka kita bisa isi parameter 's' dengan state searchTitle (judul film yang mau kita cari)
            const request = await fetch('http://www.omdbapi.com/?apikey=67aca4ce&s=' + searchTitle);

            // data di atas tersebut kita ubah ke dalam format json menggunakan fungsi .json();
            const dataFilm = await request.json();

            // setelah kita mendapatkan data json nya kita masukkan data tersebut ke dalam state itemsFilm 
            setItemsFilm(dataFilm);

            // setelah data film sudah dimasukkan ke dalam state itemsFilm yang berarti sudah selesai diload maka ubah state loaded yang awalnya false menjadi true
            setLoaded(true)
        }

        // setelah kita buat fungsi getDataFilm tentu saja kita perlu memanggil fungsinya yang berarti saat kita mejalankan fungsi searchDataFilm yang kita jalankan adalah fungsi getDatafilm
        getDataFilm();

        // fungsi untuk testing
        // console.log(searchTitle)
        // console.log(itemsFilm)
    }

    return (
        <div>
            <h1>Cari Data Film Berdasarkan Judul</h1>
            {/* buat form yang jika disubmit akan menjalankan fungsi searchDataFilm */}
            <form onSubmit={searchDataFilm}>
                {/* buat input yang nantinya berfungsi untuk mencari judul film yang ingin dicari */}
                <input type="text" onChange={function (event) {
                    // lalu ambil value/inputannya dan masukkan ke dalam state searchTitle
                    setSearchTitle(event.target.value)
                }} />
                <button type="submit">Search</button>
            </form>
            <ul>
                {/* state loaded di sini sebenarnya berfungsi agar kita tidak langsung menampilkan data film, melainkan menunggu sampai kita telah selesai mengambil data dari API. Oleh karena itu kita sembunyikan saja. Jika state loaded masih false yang berarti kita belum selesai mengambil data dari API maka jangan tampilkan data apapun. */}
                {!loaded ? <i style={{ visibility: 'hidden' }}>loading...</i> :
                    // Jika state loaded sudah true maka kita perlu dua pengkondisian
                    <div>
                        {/* Kondisi pertama adalah jika response nya adalah === 'True' (*HATI2 true di sini bukanlah boolean melainkan string, oleh karena itu kita menggunakan 3 sama dengan "===") */}
                        {itemsFilm.Response === 'True' ?
                            // Buat pengulangan menggunakan fungsi 'map'. karena array nya ada di dalam properti 'Search' maka setelah state itemsFilm kita tulis .Search, lalu baru map untuk pengulangannya
                            itemsFilm.Search.map(function (item) {
                                // Tampilkan 10 judul film (max-nya emang 10) yang relevan dengan yang kita masukkan diinput
                                // jangan lupa diberi key berupa id yang sudah ada dari API-nya :)
                                return <li key={item.imdbID}>{item.Title}</li>
                                // Jika kondisi pertama tidak terjadi yang berarti judul film tidak ada atau tidak ditemukan maka tampilkan pesan error
                            }) : <i>Film Tidak Ditemukan!!!</i>
                        }

                    </div>
                }
            </ul>
        </div>
    )
}
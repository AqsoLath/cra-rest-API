import './App.css'; 
import Home from './Home';
import DataApi from './DataApi';
import SearchTitleFilm from './pisah_search_list/SearchTitleFilm';
import ListFilm from './pisah_search_list/ListFilm'
// import DataFilm from './DataFilm';
import DetailDataFilm from './DetailDataFilm'
import { Routes, Route, Link } from "react-router-dom";

// ==== Baca ini terlebih dahulu untuk memahami alur projek nya ====
// ini projek belajar CRA Rest API, jadi ada banyak revisi dan catatan. untuk urutan revisi file nya adalah sebagai berikut:
// 1. DataApi.js = di situ ada data covid dan data film yang dasar
// 2. DataFilm.js dan DetailDataFilm.js = ada data film yang sudah bisa dilihat detailnya
// 3. Di dalam folder pisah_search_list = di situ ada dari nomer dua yang sudah diperbaiki lagi jadi saat kita sudah di detail film dan mencet back, film yang sebelumnya kita cari masih ada


function App() {
  return (
    <div className="App">
      <nav><Link to="/film">Film</Link></nav>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* :filmTitle menggunakan react router untuk mengambil parameter dari url menggunakan fungsi useParams(). misal kita ingin mengambil parameter dari url setelah kita mengirim judul filmnya dari DataFilm melalui tombol detail, jadi nanti kita bisa mengambil parameter url nya di dalam halaman DetailDataFilm*/}
        {/* Karena masalah ada judul film yang sama maka filmTitle diganti jadi filmId (id yang diberikan oleh imdb) */}
        <Route path="/film/detail/:filmId" element={<DetailDataFilm />} />

        <Route path="/covid" element={<DataApi />} />

        <Route path='film' element={<SearchTitleFilm/>}>
          <Route path="search/:filmTitle" element={<ListFilm />} />
        </Route>

        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
              <Link className='text-blue-400' to="/" >Back To Home</Link>
            </main>
          }
    />
      </Routes>
    </div>
  );
}

export default App;

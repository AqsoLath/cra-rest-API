import './App.css';
import DataApi from './DataApi';
import DataFilm from './DataFilm'
import DetailDataFilm from './DetailDataFilm'
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<DataFilm />} />
        <Route path=":filmTitle" element={<DetailDataFilm />} />

        <Route path="/covid" element={<DataApi />} />
      </Routes>
    </div>
  );
}

export default App;

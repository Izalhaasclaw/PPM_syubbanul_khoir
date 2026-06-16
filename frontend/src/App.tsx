import { BrowserRouter, Routes, Route } from "react-router-dom";
import Beranda from "./pages/Beranda";
import MainLayouts from "./layouts/mainLayouts";
import Artikel from "./pages/Artikel";
import DetailArtikel from "./pages/DetailArtikel";

function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<MainLayouts />}>
          <Route index element={<Beranda />} />
          <Route path="/Artikel" element={<Artikel />} />
          <Route path="/Artikel/:id" element={<DetailArtikel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
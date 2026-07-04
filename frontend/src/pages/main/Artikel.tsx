import { useState, useEffect } from "react";
import CardArtikel from "../../components/cardArtikel";
import { API } from "../../lib/axios";

interface Artikel {
  id: number;
  judul: string;
  isi: string;
  foto: string;
}

export default function HalamanArtikel() {
  const [semuaArtikel, setSemuaArtikel] = useState<Artikel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Mengubah maksimal artikel per halaman menjadi 12
  const articlesPerPage = 9;

  useEffect(() => {
    const fetchArtikel = async () => {
      try {
        const res = await API.get("/artikel-index");
        const result = res.data;
        const data = Array.isArray(result.data) ? result.data : result;

        setSemuaArtikel(data);
      } catch (error) {
        console.error("Gagal mengambil data artikel:", error);
      }
    };

    fetchArtikel();
  }, []);

  // Logika Perhitungan Halaman
  const totalArticles = semuaArtikel.length;
  const totalPages = Math.ceil(totalArticles / articlesPerPage);

  // Logika Pemotongan Data (Slice) per Halaman
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = semuaArtikel.slice(
    indexOfFirstArticle,
    indexOfLastArticle,
  );

  // Fungsi Navigasi Pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full min-h-screen bg-white py-25 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-10">
          Artikel dan Berita
        </h1>

        {/* 2. Grid disesuaikan menjadi hingga 4 kolom (cocok untuk kelipatan 12) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {currentArticles.length > 0 ? (
            currentArticles.map((artikel) => (
              /* 3. Wrapper untuk memaksa Card berasio 4:3 secara FIXED */
              <div
                key={artikel.id}
                className="w-full aspect-4/3 overflow-hidden flex flex-col *:flex-1 *:h-full"
              >
                <CardArtikel
                  title={artikel.judul}
                  imageUrl={artikel.foto}
                  category="Artikel"
                  link={`/Artikel/${artikel.id}`}
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center py-10">
              Tidak ada artikel yang ditemukan.
            </p>
          )}
        </div>

        {/* Pagination Section */}
        {totalArticles > 0 && (
          <div className="mt-16 flex flex-col items-center">
            <p className="text-sm text-gray-500 mb-4">
              Menampilkan {indexOfFirstArticle + 1} -{" "}
              {Math.min(indexOfLastArticle, totalArticles)} dari {totalArticles}{" "}
              artikel & berita
            </p>

            <div className="flex items-center gap-2">
              {/* Tombol Previous */}
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded-md transition-colors ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed text-gray-400"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                ‹
              </button>

              {/* Angka Halaman Dinamis */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => handlePageClick(number)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md border text-sm transition-colors ${
                      currentPage === number
                        ? "bg-[#35A2FD] text-white border-[#35A2FD]"
                        : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                    }`}
                  >
                    {number}
                  </button>
                ),
              )}

              {/* Tombol Next */}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded-md transition-colors ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed text-gray-400"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
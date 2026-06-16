import { useState } from "react";
import CardArtikel from "../components/cardArtikel";

// Data dummy diatur persis 9 artikel
const semuaArtikel = Array(9).fill(null).map((_, index) => ({
    id: index + 1,
    title: `Artikel ke-${index + 1}: Menjawab Tantangan Pelayanan Kesehatan, Universitas Harkat Negeri`,
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    category: "Artikel",
    link: `/Artikel/${index + 1}`
}));

export default function HalamanArtikel() {
    // State untuk melacak halaman aktif
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 9; // Menampilkan 9 artikel per halaman (3x3 grid)

    // Logika Perhitungan Halaman
    const totalArticles = semuaArtikel.length;
    const totalPages = Math.ceil(totalArticles / articlesPerPage);

    // Logika Pemotongan Data (Slice)
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = semuaArtikel.slice(indexOfFirstArticle, indexOfLastArticle);

    // Fungsi Navigasi
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
                
                <h1 className="text-3xl font-bold text-gray-900 mb-10">Artikel dan Berita</h1>

                {/* Grid Artikel 3x3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[800px]">
                    {currentArticles.map((artikel) => (
                        <CardArtikel 
                            key={artikel.id}
                            title={artikel.title}
                            imageUrl={artikel.imageUrl}
                            category={artikel.category}
                            link={artikel.link}
                        />
                    ))}
                </div>

                {/* Pagination Section */}
                {totalArticles > 0 && (
                    <div className="mt-16 flex flex-col items-center">
                        <p className="text-sm text-gray-500 mb-4">
                            Menampilkan {indexOfFirstArticle + 1} - {Math.min(indexOfLastArticle, totalArticles)} dari {totalArticles} artikel & berita
                        </p>
                        
                        <div className="flex items-center gap-2">
                            {/* Tombol Previous */}
                            <button 
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 border rounded-md transition-colors ${
                                    currentPage === 1 ? "opacity-50 cursor-not-allowed text-gray-400" : "hover:bg-gray-50 text-gray-700"
                                }`}
                            >
                                ‹
                            </button>
                            
                            {/* Angka Halaman Dinamis */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
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
                            ))}
                            
                            {/* Tombol Next */}
                            <button 
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-1 border rounded-md transition-colors ${
                                    currentPage === totalPages ? "opacity-50 cursor-not-allowed text-gray-400" : "hover:bg-gray-50 text-gray-700"
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
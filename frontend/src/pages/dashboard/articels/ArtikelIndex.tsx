import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../../lib/axios"; 
import {
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Calendar,
} from "lucide-react";

interface Artikel {
  id: number;
  foto: string;
  judul: string;
  isi: string;
  createdAt: string; 
}

const ITEMS_PER_PAGE = 7;

export default function ArtikelIndex() {
  const [artikelList, setArtikelList] = useState<Artikel[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchArtikel = async () => {
    try {
      setLoading(true);
      const res = await API.get("/artikel-index");
      
      const responseData = res.data;
      const result = responseData.data || responseData.artikel || responseData;

      if (Array.isArray(result)) {
        setArtikelList(result);
      } else {
        setArtikelList([]);
      }
    } catch (error) {
      console.error(error);
      alert("Gagal memuat data artikel.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, judul: string) => {
    const confirmDelete = window.confirm(
      `Apakah kamu yakin ingin menghapus artikel "${judul}"?`,
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/artikel-index/${id}`);
      alert("Artikel berhasil dihapus!");
      setArtikelList((prev) => prev.filter((item) => item.id !== id));
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Gagal menghapus artikel.";
      alert(errorMessage);
    }
  };

  useEffect(() => {
    fetchArtikel();
  }, []);

  const totalPages = Math.ceil(artikelList.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentArtikel = artikelList.slice(indexOfFirstItem, indexOfLastItem);

  const formatTanggal = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6 p-2">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Data Artikel</h1>
          <p className="text-sm text-gray-500">Kelola konten, berita, dan edukasi mading digital.</p>
        </div>
        <Link to="/artikel-index/create-artikel" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto justify-center bg-[#35A2FD] hover:bg-[#1D8DF5] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all shadow-sm">
            <Plus size={20} />
            Tambah Artikel
          </button>
        </Link>
      </div>

      {/* Main Content Area - Diperbaiki agar tidak double wrapper di mobile */}
      <div className="bg-transparent md:bg-white border-none md:border md:border-gray-100 rounded-xl overflow-hidden shadow-none md:shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-white border border-gray-100 rounded-xl">
            <Loader2 className="animate-spin mb-2" size={40} />
            <p>Memuat data artikel...</p>
          </div>
        ) : (
          <>
            {currentArtikel.length > 0 ? (
              <>
                {/* 1. TABLE MODE (Tampil di Tablet/Desktop: md ke atas) */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left table-fixed min-w-200">
                    <thead className="bg-[#0F172A] border-b border-[#0F172A]">
                      <tr>
                        <th className="w-20 px-6 py-4 text-sm font-semibold text-white uppercase text-center">ID</th>
                        <th className="w-28 px-6 py-4 text-sm font-semibold text-white uppercase">Foto</th>
                        <th className="w-1/4 px-6 py-4 text-sm font-semibold text-white uppercase">Judul</th>
                        <th className="w-1/3 px-6 py-4 text-sm font-semibold text-white uppercase">Isi Konten</th>
                        <th className="w-48 px-6 py-4 text-sm font-semibold text-white uppercase">Dibuat Pada</th>
                        <th className="w-32 px-6 py-4 text-sm font-semibold text-white uppercase text-center">Actions</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-50">
                      {currentArtikel.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 text-center font-semibold text-gray-500">#{item.id}</td>
                          <td className="px-6 py-4">
                            <img
                              src={item.foto || "https://placehold.co/150"}
                              alt={item.judul}
                              className="w-16 h-12 rounded-lg object-cover border bg-gray-100"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://placehold.co/150?text=No+Img";
                              }}
                            />
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-800 wrap-break-word">{item.judul}</td>
                          <td className="px-6 py-4 text-gray-500 text-sm truncate max-w-xs">{item.isi}</td>
                          <td className="px-6 py-4 text-gray-600 text-xs">
                            <div className="flex items-center gap-1.5">
                              <Calendar size={14} className="text-gray-400" />
                              <span>{formatTanggal(item.createdAt)}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-center gap-2">
                              <Link
                                to={`/artikel-index/edit-artikel/${item.id}`}
                                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg"
                                title="Edit Artikel"
                              >
                                <Edit size={18} />
                              </Link>
                              <button
                                onClick={() => handleDelete(item.id, item.judul)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                title="Hapus Artikel"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 2. CARD MODE (Tanpa background pembungkus ganda di mobile) */}
                <div className="block md:hidden space-y-4">
                  {currentArtikel.map((item) => (
                    <div key={item.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm space-y-3">
                      <div className="flex gap-3 items-start">
                        {/* Thumbnail Gambar */}
                        <img
                          src={item.foto || "https://placehold.co/150"}
                          alt={item.judul}
                          className="w-20 h-16 rounded-lg object-cover border bg-gray-100 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://placehold.co/150?text=No+Img";
                          }}
                        />
                        
                        {/* Info Singkat Konten */}
                        <div className="space-y-1 min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-gray-400">#{item.id}</span>
                          <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 wrap-break-words">
                            {item.judul}
                          </h3>
                          <div className="flex items-center gap-1 text-[11px] text-gray-500">
                            <Calendar size={12} className="text-gray-400 shrink-0" />
                            <span className="truncate">{formatTanggal(item.createdAt)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Cuplikan Isi Deskripsi Artikel */}
                      <p className="text-xs text-gray-500 line-clamp-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
                        {item.isi}
                      </p>

                      {/* Tombol Manajemen Aksi Card */}
                      <div className="flex justify-end gap-2 pt-1 border-t border-gray-50">
                        <Link to={`/artikel-index/edit-artikel/${item.id}`}>
                          <button className="text-xs font-medium text-green-600 hover:bg-green-50 px-3 py-1.5 rounded-md border border-green-100 flex items-center gap-1">
                            <Edit size={14} />
                            <span>Edit</span>
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id, item.judul)}
                          className="text-xs font-medium text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-md border border-red-100 flex items-center gap-1"
                        >
                          <Trash2 size={14} />
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20 text-gray-400 bg-white border border-gray-100 rounded-xl">
                Data artikel tidak ditemukan.
              </div>
            )}

            {/* Pagination Controls Footer - Disesuaikan agar tetap rapi */}
            <div className="mt-4 md:mt-0 bg-white px-6 py-4 border md:border-none border-gray-100 rounded-xl md:rounded-none md:border-t flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm md:shadow-none">
              <div className="text-sm text-gray-500 text-center sm:text-left">
                Menampilkan <span className="font-medium">{indexOfFirstItem + 1}</span> sampai{" "}
                <span className="font-medium">{Math.min(indexOfLastItem, artikelList.length)}</span> dari{" "}
                <span className="font-medium">{artikelList.length}</span> data
              </div>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors bg-white"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors bg-white"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
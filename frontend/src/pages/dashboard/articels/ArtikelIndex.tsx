import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../../lib/axios"; // 👈 1. Hubungkan ke instance Axios kamu
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
  createdAt: string; // 👈 Ubah dari created_at menjadi createdAt
}


const ITEMS_PER_PAGE = 7;

export default function ArtikelIndex() {
  const [artikelList, setArtikelList] = useState<Artikel[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // 👈 2. Menggunakan API.get("/artikel")
  const fetchArtikel = async () => {
    try {
      setLoading(true);
      const res = await API.get("/artikel");
      
      // Axios otomatis mem-parse response ke res.data
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

  // 👈 3. Menggunakan API.delete(`/artikel/${id}`)
  const handleDelete = async (id: number, judul: string) => {
    const confirmDelete = window.confirm(
      `Apakah kamu yakin ingin menghapus artikel "${judul}"?`,
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/artikel/${id}`);
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

  // Fungsi pembantu untuk memformat tanggal
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
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900">Data Artikel</h1>
          <p className="text-gray-500">Kelola konten, berita, dan edukasi mading digital.</p>
        </div>
        <Link to="/artikel/create-artikel">
          <button className="bg-[#35A2FD] hover:bg-[#1D8DF5] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all shadow-sm">
            <Plus size={20} />
            Tambah Artikel
          </button>
        </Link>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 className="animate-spin mb-2" size={40} />
            <p>Memuat data artikel...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left table-fixed min-w-200">
                <thead className="bg-[#0F172A] border-b border-[#0F172A] ">
                  <tr>
                    <th className="w-20 px-6 py-4 text-sm font-semibold text-white uppercase text-center">
                      ID
                    </th>
                    <th className="w-28 px-6 py-4 text-sm font-semibold text-white uppercase">
                      Foto
                    </th>
                    <th className="w-1/4 px-6 py-4 text-sm font-semibold text-white uppercase">
                      Judul
                    </th>
                    <th className="w-1/3 px-6 py-4 text-sm font-semibold text-white uppercase">
                      Isi Konten
                    </th>
                    <th className="w-48 px-6 py-4 text-sm font-semibold text-white uppercase">
                      Dibuat Pada
                    </th>
                    <th className="w-32 px-6 py-4 text-sm font-semibold text-white uppercase text-center">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                  {currentArtikel.length > 0 ? (
                    currentArtikel.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 text-center font-semibold text-gray-500">
                          #{item.id}
                        </td>
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
                        <td className="px-6 py-4 font-semibold text-gray-800 wrap-break-word">
                          {item.judul}
                        </td>
                        <td className="px-6 py-4 text-gray-500 text-sm truncate max-w-xs">
                          {item.isi}
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-xs">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-gray-400" />
                            <span>{formatTanggal(item.createdAt)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <Link
                              to={`/artikel/edit-artikel/${item.id}`}
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
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-20 text-gray-400">
                        Data artikel tidak ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="bg-white px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500">
                Menampilkan <span className="font-medium">{indexOfFirstItem + 1}</span> sampai{" "}
                <span className="font-medium">{Math.min(indexOfLastItem, artikelList.length)}</span> dari{" "}
                <span className="font-medium">{artikelList.length}</span> data
              </div>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="p-2 border rounded-lg disabled:opacity-50"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="p-2 border rounded-lg disabled:opacity-50"
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
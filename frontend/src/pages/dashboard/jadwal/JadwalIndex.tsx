import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, Loader2, Calendar, MapPin, Clock } from "lucide-react";
import { API } from "../../../lib/axios";

interface Jadwal {
  id: number;
  acara: string;
  lokasi: string;
  tanggal: string;
  waktu: string;
}

export default function JadwalIndex() {
  const [jadwalData, setJadwalData] = useState<Jadwal[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJadwal = async () => {
    try {
      setLoading(true);
      const res = await API.get("/jadwal");
      const responseData = res.data;
      
      // Menyesuaikan dengan response backend: res.status(200).json({ data: allJadwal })
      setJadwalData(responseData.data || responseData);
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Gagal memuat data jadwal.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus jadwal ini?")) return;

    try {
      await API.delete(`/jadwal/${id}`);
      alert("Jadwal berhasil dihapus!");
      // Refresh data setelah berhasil menghapus
      fetchJadwal();
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Gagal menghapus jadwal.";
      alert(errorMessage);
    }
  };

  useEffect(() => {
    fetchJadwal();
  }, []);

  // Format tanggal ke gaya lokal Indonesia (Contoh: 24 Juni 2026)
  const formatTanggal = (dateString: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString("id-ID", options);
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6 p-2">
      {/* HEADER UTAMA */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900">Data Jadwal</h1>
          <p className="text-gray-500">Kelola agenda acara, waktu pelaksanaan, beserta lokasi kegiatan mading.</p>
        </div>
        
        <Link to="/jadwal/create-jadwal">
          <button className="bg-[#35A2FD] hover:bg-[#1D8DF5] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all shadow-sm">
            <Plus size={18} />
            Tambah Jadwal
          </button>
        </Link>
      </div>

      {/* TABEL KONTEN */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 className="animate-spin mb-2" size={40} />
            <p>Memuat data jadwal...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left table-fixed min-w-225">
              <thead className="bg-[#0F172A] border-b border-[#0F172A]">
                <tr>
                  <th className="w-1/4 px-6 py-4 text-sm font-semibold text-white uppercase">Nama Acara</th>
                  <th className="w-1/4 px-6 py-4 text-sm font-semibold text-white uppercase">Lokasi</th>
                  <th className="w-1/5 px-6 py-4 text-sm font-semibold text-white uppercase">Tanggal</th>
                  <th className="w-1/6 px-6 py-4 text-sm font-semibold text-white uppercase">Waktu</th>
                  <th className="w-32 px-6 py-4 text-sm font-semibold text-white uppercase text-center">Aksi</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {jadwalData.length > 0 ? (
                  jadwalData.map((jadwal) => (
                    <tr key={jadwal.id} className="hover:bg-gray-50/50 transition-colors">
                      {/* Acara */}
                      <td className="px-6 py-5 font-semibold text-gray-800 wrap-break-word">
                        {jadwal.acara}
                      </td>
                      
                      {/* Lokasi */}
                      <td className="px-6 py-5 text-gray-600 text-sm wrap-break-word">
                        <div className="flex items-center gap-1.5 text-gray-700">
                          <MapPin size={16} className="text-gray-400 shrink-0" />
                          <span>{jadwal.lokasi}</span>
                        </div>
                      </td>
                      
                      {/* Tanggal */}
                      <td className="px-6 py-5 text-gray-600 text-sm">
                        <div className="flex items-center gap-1.5 text-gray-700">
                          <Calendar size={16} className="text-gray-400 shrink-0" />
                          <span>{formatTanggal(jadwal.tanggal)}</span>
                        </div>
                      </td>
                      
                      {/* Waktu */}
                      <td className="px-6 py-5 text-gray-600 text-sm">
                        <div className="flex items-center gap-1.5 text-gray-700">
                          <Clock size={16} className="text-gray-400 shrink-0" />
                          <span>{jadwal.waktu} WIB</span>
                        </div>
                      </td>

                      {/* Tombol Aksi */}
                      <td className="px-6 py-5 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <Link to={`/jadwal/edit-jadwal/${jadwal.id}`}>
                            <button className="p-2 text-gray-500 hover:text-[#35A2FD] hover:bg-blue-50 rounded-lg transition-colors" title="Edit Jadwal">
                              <Edit size={18} />
                            </button>
                          </Link>
                          <button 
                            onClick={() => handleDelete(jadwal.id)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                            title="Hapus Jadwal"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-20 text-gray-400">
                      Belum ada jadwal acara yang ditambahkan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
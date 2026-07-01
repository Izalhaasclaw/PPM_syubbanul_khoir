import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash2,
  Loader2,
  Calendar,
  MapPin,
  Clock,
} from "lucide-react";
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
      const res = await API.get("/jadwal-index");
      const responseData = res.data;

      setJadwalData(responseData.data || responseData);
    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "Gagal memuat data jadwal.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus jadwal ini?")) return;

    try {
      await API.delete(`/jadwal-index/${id}`);
      alert("Jadwal berhasil dihapus!");

      setJadwalData((prev) => prev.filter((item) => item.id !== id));
    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "Gagal menghapus jadwal.";
      alert(errorMessage);
    }
  };

  useEffect(() => {
    fetchJadwal();
  }, []);

  const formatTanggal = (dateString: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Date(dateString).toLocaleDateString("id-ID", options);
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6 p-2">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Data Jadwal</h1>
          <p className="text-sm text-gray-500">
            Kelola agenda acara, waktu pelaksanaan, beserta lokasi kegiatan mading.
          </p>
        </div>

        <Link to="/jadwal-index/create-jadwal" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto justify-center bg-[#35A2FD] hover:bg-[#1D8DF5] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all shadow-sm">
            <Plus size={18} />
            Tambah Jadwal
          </button>
        </Link>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-white border border-gray-100 rounded-xl shadow-sm">
          <Loader2 className="animate-spin mb-2" size={40} />
          <p>Memuat data jadwal...</p>
        </div>
      ) : jadwalData.length > 0 ? (
        <>
          {/* 1. TABLE MODE (Hanya tampil di Desktop: md ke atas) */}
          <div className="hidden md:block bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left table-fixed min-w-225">
                <thead className="bg-[#0F172A] border-b border-[#0F172A]">
                  <tr>
                    <th className="w-1/4 px-6 py-4 text-sm font-semibold text-white uppercase">
                      Nama Acara
                    </th>
                    <th className="w-1/4 px-6 py-4 text-sm font-semibold text-white uppercase">
                      Lokasi
                    </th>
                    <th className="w-1/5 px-6 py-4 text-sm font-semibold text-white uppercase">
                      Tanggal
                    </th>
                    <th className="w-1/6 px-6 py-4 text-sm font-semibold text-white uppercase">
                      Waktu
                    </th>
                    <th className="w-32 px-6 py-4 text-sm font-semibold text-white uppercase text-center">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                  {jadwalData.map((jadwal) => (
                    <tr
                      key={jadwal.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-5 font-semibold text-gray-800 wrap-break-word">
                        {jadwal.acara}
                      </td>
                      <td className="px-6 py-5 text-gray-600 text-sm wrap-break-word">
                        <div className="flex items-center gap-1.5 text-gray-700">
                          <MapPin size={16} className="text-gray-400 shrink-0" />
                          <span>{jadwal.lokasi}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-gray-600 text-sm">
                        <div className="flex items-center gap-1.5 text-gray-700">
                          <Calendar size={16} className="text-gray-400 shrink-0" />
                          <span>{formatTanggal(jadwal.tanggal)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-gray-600 text-sm">
                        <div className="flex items-center gap-1.5 text-gray-700">
                          <Clock size={16} className="text-gray-400 shrink-0" />
                          <span>{jadwal.waktu} WIB</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <Link to={`/jadwal-index/edit-jadwal/${jadwal.id}`}>
                            <button
                              className="p-2 text-gray-500 hover:text-[#35A2FD] hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit Jadwal"
                            >
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. CARD MODE (Hanya tampil di Mobile: tanpa wrapper ganda) */}
          <div className="block md:hidden space-y-4">
            {jadwalData.map((jadwal) => (
              <div
                key={jadwal.id}
                className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm space-y-3"
              >
                {/* Judul Acara */}
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-bold text-gray-900 text-base leading-snug wrap-break-words">
                    {jadwal.acara}
                  </h3>
                </div>

                {/* Detail Metadata (Lokasi, Tanggal, Waktu) */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin size={16} className="text-gray-400 shrink-0 mt-0.5" />
                    <span className="wrap-break-words">{jadwal.lokasi}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={16} className="text-gray-400 shrink-0" />
                    <span>{formatTanggal(jadwal.tanggal)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={16} className="text-gray-400 shrink-0" />
                    <span>{jadwal.waktu} WIB</span>
                  </div>
                </div>

                {/* Tombol Aksi di bagian bawah Card */}
                <div className="border-t border-gray-50 pt-3 flex justify-end gap-2">
                  <Link to={`/jadwal-index/edit-jadwal/${jadwal.id}`}>
                    <button
                      className="text-xs font-medium text-green-600 hover:bg-green-50 px-3 py-1.5 rounded-md border border-green-100 flex items-center gap-1 transition-colors"
                      title="Edit Jadwal"
                    >
                      <Edit size={14} />
                      <span>Edit</span>
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(jadwal.id)}
                    className="text-xs font-medium text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-md border border-red-100 flex items-center gap-1 transition-colors"
                    title="Hapus Jadwal"
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
        <div className="text-center py-20 text-gray-400 bg-white border border-gray-100 rounded-xl shadow-sm">
          Belum ada jadwal acara yang ditambahkan.
        </div>
      )}
    </div>
  );
}
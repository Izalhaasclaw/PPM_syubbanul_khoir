import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Edit,
  Loader2
} from "lucide-react";

interface Kontak {
  id: number;
  no_telepon: string;
  alamat: string;
  instagram: string;
  tiktok: string;
  youtube: string;
}

const API_URL = "http://localhost:3000/kontak";

export default function KontakIndex() {
  const [kontakData, setKontakData] = useState<Kontak[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchKontak = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Gagal mengambil data kontak");

      const responseData = await res.json();
      const result = responseData.data || responseData.kontak || responseData;

      if (Array.isArray(result)) {
        setKontakData(result);
      } else if (result && typeof result === "object") {
        // Jika API mengembalikan objek tunggal, bungkus ke dalam array
        setKontakData([result]);
      } else {
        setKontakData([]);
      }
    } catch (error) {
      console.error(error);
      alert("Gagal memuat data kontak.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKontak();
  }, []);

  // Ambil ID dari data pertama untuk keperluan routing Halaman Edit (jika data ada)
  const kontakId = kontakData[0]?.id || 1;

  return (
    <div className="space-y-6 p-2">
      {/* HEADER UTAMA */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900">Data Kontak</h1>
          <p className="text-gray-500">Kelola informasi hubungi kami dan media sosial.</p>
        </div>
        
        {/* PERBAIKAN: Tombol Tambah diganti menjadi Tombol Edit */}
        <Link to={`/kontak/edit-kontak/${kontakId}`}>
          <button className="bg-[#3B82F6] hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all shadow-sm">
            <Edit size={18} />
            Edit Kontak
          </button>
        </Link>
      </div>

      {/* TABEL KONTEN */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 className="animate-spin mb-2" size={40} />
            <p>Memuat data kontak...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left table-fixed min-w-225">
              <thead className="bg-[#0F172A] border-b border-[#0F172A]">
                <tr>
                  <th className="w-1/4 px-6 py-4 text-sm font-semibold text-white uppercase">
                    <div className="flex items-center gap-2">
                      No. Telepon
                    </div>
                  </th>
                  <th className="w-1/6 px-6 py-4 text-sm font-semibold text-white uppercase">
                    <div className="flex items-center gap-2">
                      Alamat
                    </div>
                  </th>
                  <th className="w-1/4 px-6 py-4 text-sm font-semibold text-white uppercase">
                    <div className="flex items-center gap-2">
                      Instagram
                    </div>
                  </th>
                  <th className="w-1/4 px-6 py-4 text-sm font-semibold text-white uppercase">
                    <div className="flex items-center gap-2">
                      TikTok
                    </div>
                  </th>
                  <th className="w-1/4 px-6 py-4 text-sm font-semibold text-white uppercase">
                    <div className="flex items-center gap-2">
                      YouTube
                    </div>
                  </th>
                  {/* Kolom Actions Telah Dihapus */}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {kontakData.length > 0 ? (
                  kontakData.map((kontak) => (
                    <tr key={kontak.id} className="hover:bg-gray-50/50 transition-colors">
                      {/* No Telepon */}
                      <td className="px-6 py-5 font-medium text-gray-800 wrap-break-word">
                        {kontak.no_telepon || "-"}
                      </td>
                      
                      {/* Alamat */}
                      <td className="px-6 py-5 text-gray-600 text-sm wrap-break-word whitespace-pre-line">
                        {kontak.alamat || "-"}
                      </td>
                      
                      {/* Instagram */}
                      <td className="px-6 py-5 text-gray-600 text-sm wrap-break-word">
                        {kontak.instagram ? (
                          <span className="text-blue-600 font-medium">@{kontak.instagram}</span>
                        ) : (
                          "-"
                        )}
                      </td>
                      
                      {/* TikTok */}
                      <td className="px-6 py-5 text-gray-600 text-sm wrap-break-word">
                        {kontak.tiktok ? (
                          <span className="text-gray-800 font-medium">@{kontak.tiktok}</span>
                        ) : (
                          "-"
                        )}
                      </td>
                      
                      {/* YouTube */}
                      <td className="px-6 py-5 text-gray-600 text-sm wrap-break-word">
                        {kontak.youtube || "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-20 text-gray-400">
                      Data kontak belum dikonfigurasi.
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
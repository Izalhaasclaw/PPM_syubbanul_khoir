import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Loader2 } from "lucide-react";
import { API } from "../../../lib/axios"; // 👈 1. Hubungkan ke instance Axios kamu

interface Info {
  id: number;
  no_telepon: string;
  alamat: string;
  instagram: string;
  tiktok: string;
  youtube: string;
}

export default function InfoIndex() {
  const [infoData, setInfoData] = useState<Info[]>([]);
  const [loading, setLoading] = useState(true);

  // 👈 2. Menggunakan API.get("/informasi") mendepak fetch bawaan
  const fetchInfo = async () => {
    try {
      setLoading(true);
      const res = await API.get("/informasi");
      
      // Axios otomatis mem-parse response ke res.data
      const responseData = res.data;
      const result = responseData.data || responseData.Info || responseData;

      if (Array.isArray(result)) {
        setInfoData(result);
      } else if (result && typeof result === "object") {
        // Jika API mengembalikan objek tunggal, bungkus ke dalam array
        setInfoData([result]);
      } else {
        setInfoData([]);
      }
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Gagal memuat data Info.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  // Ambil ID dari data pertama untuk keperluan routing Halaman Edit (jika data ada)
  const infoId = infoData[0]?.id || 1;

  return (
    <div className="space-y-6 p-2">
      {/* HEADER UTAMA */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900">Data Info</h1>
          <p className="text-gray-500">Kelola informasi hubungi kami dan media sosial resmi mading digital.</p>
        </div>
        
        {/* Tombol Edit disesuaikan dengan warna brand halaman lainnya */}
        <Link to={`/info/edit-info/${infoId}`}>
          <button className="bg-[#35A2FD] hover:bg-[#1D8DF5] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all shadow-sm">
            <Edit size={18} />
            Edit Info
          </button>
        </Link>
      </div>

      {/* TABEL KONTEN */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 className="animate-spin mb-2" size={40} />
            <p>Memuat data Info...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left table-fixed min-w-225">
              <thead className="bg-[#0F172A] border-b border-[#0F172A]">
                <tr>
                  <th className="w-1/4 px-6 py-4 text-sm font-semibold text-white uppercase">
                    No. Telepon
                  </th>
                  <th className="w-1/3 px-6 py-4 text-sm font-semibold text-white uppercase">
                    Alamat
                  </th>
                  <th className="w-1/4 px-6 py-4 text-sm font-semibold text-white uppercase">
                    Instagram
                  </th>
                  <th className="w-1/4 px-6 py-4 text-sm font-semibold text-white uppercase">
                    TikTok
                  </th>
                  <th className="w-1/4 px-6 py-4 text-sm font-semibold text-white uppercase">
                    YouTube
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {infoData.length > 0 ? (
                  infoData.map((info) => (
                    <tr key={info.id} className="hover:bg-gray-50/50 transition-colors">
                      {/* No Telepon */}
                      <td className="px-6 py-5 font-medium text-gray-800 wrap-break-word">
                        {info.no_telepon || "-"}
                      </td>
                      
                      {/* Alamat */}
                      <td className="px-6 py-5 text-gray-600 text-sm wrap-break-word whitespace-pre-line">
                        {info.alamat || "-"}
                      </td>
                      
                      {/* Instagram */}
                      <td className="px-6 py-5 text-gray-600 text-sm wrap-break-word">
                        {info.instagram ? (
                          <span className="text-[#35A2FD] font-medium">@{info.instagram}</span>
                        ) : (
                          "-"
                        )}
                      </td>
                      
                      {/* TikTok */}
                      <td className="px-6 py-5 text-gray-600 text-sm wrap-break-word">
                        {info.tiktok ? (
                          <span className="text-gray-800 font-medium">@{info.tiktok}</span>
                        ) : (
                          "-"
                        )}
                      </td>
                      
                      {/* YouTube */}
                      <td className="px-6 py-5 text-gray-600 text-sm wrap-break-word">
                        {info.youtube || "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-20 text-gray-400">
                      Data Info belum dikonfigurasi.
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
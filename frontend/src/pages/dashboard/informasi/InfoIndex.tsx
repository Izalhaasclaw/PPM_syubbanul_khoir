import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Loader2 } from "lucide-react";
import { API } from "../../../lib/axios"; 

interface Info {
  id: number;
  telepon: string;
  email: string;
  alamat: string;
  instagram: string;
  tiktok: string;
  youtube: string;
}

export default function InfoIndex() {
  const [infoData, setInfoData] = useState<Info[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInfo = async () => {
    try {
      setLoading(true);
      const res = await API.get("/informasi");
      
      const responseData = res.data;
      const result = responseData.data || responseData.Info || responseData;

      if (Array.isArray(result)) {
        setInfoData(result);
      } else if (result && typeof result === "object") {
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

  const infoId = infoData[0]?.id || 1;

  return (
    <div className="space-y-6 p-2">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Data Info</h1>
          <p className="text-sm text-gray-500">Kelola informasi hubungi kami dan media sosial resmi mading digital.</p>
        </div>
        
        <Link to={`/info/edit-info/${infoId}`} className="w-full sm:w-auto">
          <button className="w-full sm:w-auto justify-center bg-[#35A2FD] hover:bg-[#1D8DF5] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all shadow-sm">
            <Edit size={18} />
            Edit Info
          </button>
        </Link>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-white border border-gray-100 rounded-xl shadow-sm">
          <Loader2 className="animate-spin mb-2" size={40} />
          <p>Memuat data Info...</p>
        </div>
      ) : infoData.length > 0 ? (
        <>
          {/* 1. TABLE MODE (Hanya tampil di Tablet/Desktop: md ke atas) */}
          <div className="hidden md:block bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left table-fixed min-w-225">
                <thead className="bg-[#0F172A] border-b border-[#0F172A]">
                  <tr>
                    <th className="w-1/4 px-6 py-4 text-sm font-semibold text-white uppercase">WhatsApp</th>
                    <th className="w-1/4 px-6 py-4 text-sm font-semibold text-white uppercase">Email</th>
                    <th className="w-1/3 px-6 py-4 text-sm font-semibold text-white uppercase">Alamat</th>
                    <th className="w-1/4 px-6 py-4 text-sm font-semibold text-white uppercase">Instagram</th>
                    <th className="w-1/4 px-6 py-4 text-sm font-semibold text-white uppercase">TikTok</th>
                    <th className="w-1/4 px-6 py-4 text-sm font-semibold text-white uppercase">YouTube</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                  {infoData.map((info) => (
                    <tr key={info.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-5 font-medium text-gray-800 wrap-break-word">
                        {info.telepon || "-"}
                      </td>
                      <td className="px-6 py-5 font-medium text-gray-800 wrap-break-word">
                        {info.email || "-"}
                      </td>
                      <td className="px-6 py-5 text-gray-600 text-sm wrap-break-word whitespace-pre-line">
                        {info.alamat || "-"}
                      </td>
                      <td className="px-6 py-5 text-gray-600 text-sm wrap-break-word">
                        {info.instagram ? (
                          <span className="text-[#35A2FD] font-medium">@{info.instagram}</span>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="px-6 py-5 text-gray-600 text-sm wrap-break-word">
                        {info.tiktok ? (
                          <span className="text-gray-800 font-medium">@{info.tiktok}</span>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="px-6 py-5 text-gray-600 text-sm wrap-break-word">
                        {info.youtube || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. CARD MODE (Hanya tampil di Mobile: tanpa wrapper ganda) */}
          <div className="block md:hidden space-y-4">
            {infoData.map((info) => (
              <div key={info.id} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm space-y-4">
                
                {/* Section Kontak Utama */}
                <div className="space-y-3 pb-3 border-b border-gray-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Hubungi Kami</h3>
                  
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-semibold text-gray-400 uppercase">WhatsApp</span>
                    <span className="text-sm font-medium text-gray-800">{info.telepon || "-"}</span>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-semibold text-gray-400 uppercase">Email</span>
                    <span className="text-sm font-medium text-gray-800 break-all">{info.email || "-"}</span>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-semibold text-gray-400 uppercase">Alamat</span>
                    <span className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{info.alamat || "-"}</span>
                  </div>
                </div>

                {/* Section Media Sosial */}
                <div className="space-y-3 pt-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Media Sosial Resmi</h3>
                  <div className="grid grid-cols-1 gap-2">
                    
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100/50 flex flex-col gap-0.5">
                      <span className="text-[10px] text-pink-600 uppercase font-bold tracking-wider">Instagram</span>
                      <span className="text-sm font-semibold text-gray-800">{info.instagram ? `@${info.instagram}` : "-"}</span>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100/50 flex flex-col gap-0.5">
                      <span className="text-[10px] text-gray-900 uppercase font-bold tracking-wider">TikTok</span>
                      <span className="text-sm font-semibold text-gray-800">{info.tiktok ? `@${info.tiktok}` : "-"}</span>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100/50 flex flex-col gap-0.5">
                      <span className="text-[10px] text-red-600 uppercase font-bold tracking-wider">YouTube</span>
                      <span className="text-sm font-semibold text-gray-800 break-all">{info.youtube || "-"}</span>
                    </div>

                  </div>
                </div>

              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-20 text-gray-400 bg-white border border-gray-100 rounded-xl shadow-sm">
          Data Info belum dikonfigurasi.
        </div>
      )}
    </div>
  );
}
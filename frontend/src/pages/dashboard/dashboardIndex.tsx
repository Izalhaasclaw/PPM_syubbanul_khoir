import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../lib/axios"; 
import { 
  Users, 
  FileText, 
  Calendar, 
  Info as InfoIcon, // Di-rename agar tidak bentrok dengan penamaan tipe/variabel data info
  ArrowRight, 
  Plus, 
  LayoutDashboard, 
  Loader2 
} from "lucide-react";

export default function DashboardIndex() {
  const [stats, setStats] = useState({ 
    users: 0, 
    artikel: 0, 
    jadwal: 0, 
    informasi: 0 
  });
  const [infoId, setInfoId] = useState<number | null>(null); // 👈 State untuk menyimpan ID Informasi dari database
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Mengambil seluruh data statistik secara paralel dari database
        const [resUser, resArtikel, resJadwal, resInfo] = await Promise.all([
          API.get("/users").catch(() => ({ data: null })), 
          API.get("/artikel-index").catch(() => ({ data: null })),
          API.get("/jadwal-index").catch(() => ({ data: null })),
          API.get("/informasi").catch(() => ({ data: null })),
        ]);

        // --- 1. Hitung Total User ---
        let totalUser = 0;
        if (resUser?.data) {
          const uData = resUser.data.data || resUser.data.users || resUser.data;
          totalUser = Array.isArray(uData) ? uData.length : uData ? 1 : 0;
        }

        // --- 2. Hitung Total Artikel ---
        let totalArtikel = 0;
        if (resArtikel?.data) {
          const aData = resArtikel.data.data || resArtikel.data.artikel || resArtikel.data;
          totalArtikel = Array.isArray(aData) ? aData.length : aData ? 1 : 0;
        }

        // --- 3. Hitung Total Jadwal ---
        let totalJadwal = 0;
        if (resJadwal?.data) {
          const jData = resJadwal.data.data || resJadwal.data.jadwal || resJadwal.data;
          totalJadwal = Array.isArray(jData) ? jData.length : jData ? 1 : 0;
        }

        // --- 4. Hitung Total & Ambil ID Informasi ---
        let totalInfo = 0;
        if (resInfo?.data) {
          const iData = resInfo.data.data || resInfo.data.Info || resInfo.data;
          totalInfo = Array.isArray(iData) ? iData.length : iData ? 1 : 0;

          // Ambil item pertama dari data informasi untuk mendapatkan ID-nya 👈
          const firstInfo = Array.isArray(iData) ? iData[0] : iData;
          if (firstInfo && firstInfo.id) {
            setInfoId(firstInfo.id); // Simpan ID ke dalam state 👈
          }
        }

        // Simpan nilai riil dari database ke dalam State
        setStats({
          users: totalUser,
          artikel: totalArtikel,
          jadwal: totalJadwal,
          informasi: totalInfo,
        });

      } catch (error) {
        console.error("Gagal memuat data dari database:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-2 md:p-4 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-[#0F172A] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <h1 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2">
            <LayoutDashboard size={28} /> Selamat Datang di Dashboard!
          </h1>
          <p className="text-blue-50 opacity-90 max-w-xl text-sm md:text-base">
            Kelola konten artikel, manajemeni hak akses user, pantau jadwal mading, dan konfigurasi informasi platform Anda dari satu panel terpusat.
          </p>
        </div>
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        
        {/* Total Pengguna */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
          <div className="space-y-2 min-w-0 flex-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider truncate">Total Pengguna</p>
            {loading ? (
              <Loader2 className="animate-spin text-gray-400" size={24} />
            ) : (
              <h3 className="text-3xl font-bold text-gray-900">{stats.users}</h3>
            )}
            <Link to="/user" className="text-xs font-semibold text-[#35A2FD] hover:text-[#1D8DF5] inline-flex items-center gap-1 group">
              <span>Manajemen User</span>
              <ArrowRight size={12} className="transform transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500 shrink-0 ml-2">
            <Users size={24} />
          </div>
        </div>

        {/* Total Artikel */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
          <div className="space-y-2 min-w-0 flex-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider truncate">Total Artikel</p>
            {loading ? (
              <Loader2 className="animate-spin text-gray-400" size={24} />
            ) : (
              <h3 className="text-3xl font-bold text-gray-900">{stats.artikel}</h3>
            )}
            <Link to="/artikel-index" className="text-xs font-semibold text-[#35A2FD] hover:text-[#1D8DF5] inline-flex items-center gap-1 group">
              <span>Lihat Artikel</span>
              <ArrowRight size={12} className="transform transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#35A2FD] shrink-0 ml-2">
            <FileText size={24} />
          </div>
        </div>

        {/* Total Jadwal */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
          <div className="space-y-2 min-w-0 flex-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider truncate">Total Jadwal</p>
            {loading ? (
              <Loader2 className="animate-spin text-gray-400" size={24} />
            ) : (
              <h3 className="text-3xl font-bold text-gray-900">{stats.jadwal}</h3>
            )}
            <Link to="/jadwal-index" className="text-xs font-semibold text-[#35A2FD] hover:text-[#1D8DF5] inline-flex items-center gap-1 group">
              <span>Atur Jadwal</span>
              <ArrowRight size={12} className="transform transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500 shrink-0 ml-2">
            <Calendar size={24} />
          </div>
        </div>

        {/* Total Informasi */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
          <div className="space-y-2 min-w-0 flex-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider truncate">Data Informasi</p>
            {loading ? (
              <Loader2 className="animate-spin text-gray-400" size={24} />
            ) : (
              <h3 className="text-3xl font-bold text-gray-900">{stats.informasi}</h3>
            )}
            <Link to="/info" className="text-xs font-semibold text-[#35A2FD] hover:text-[#1D8DF5] inline-flex items-center gap-1 group">
              <span>Cek Info Kontak</span>
              <ArrowRight size={12} className="transform transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 shrink-0 ml-2">
            <InfoIcon size={24} />
          </div>
        </div>

      </div>

      {/* Quick Actions Container */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Aksi Cepat</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Tambah User */}
          <Link
            to="/user/create-user"
            className="flex items-center justify-between p-4 rounded-xl border border-dashed border-gray-200 hover:border-indigo-500 hover:bg-indigo-50/30 transition-all group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 bg-indigo-50 text-indigo-500 rounded-lg shrink-0">
                <Plus size={20} />
              </div>
              <div className="text-left min-w-0">
                <p className="font-semibold text-gray-800 text-sm truncate">Tambah User</p>
                <p className="text-xs text-gray-400 truncate">Daftarkan pengelola baru</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-gray-300 group-hover:text-indigo-500 shrink-0 ml-1 transition-colors" />
          </Link>

          {/* Buat Artikel */}
          <Link
            to="/artikel-index/create-artikel"
            className="flex items-center justify-between p-4 rounded-xl border border-dashed border-gray-200 hover:border-[#35A2FD] hover:bg-blue-50/30 transition-all group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 bg-blue-50 text-[#35A2FD] rounded-lg shrink-0">
                <Plus size={20} />
              </div>
              <div className="text-left min-w-0">
                <p className="font-semibold text-gray-800 text-sm truncate">Buat Artikel</p>
                <p className="text-xs text-gray-400 truncate">Rilis edukasi mading baru</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-gray-300 group-hover:text-[#35A2FD] shrink-0 ml-1 transition-colors" />
          </Link>

          {/* Tambah Jadwal */}
          <Link
            to="/jadwal-index/create-jadwal"
            className="flex items-center justify-between p-4 rounded-xl border border-dashed border-gray-200 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 bg-emerald-50 text-emerald-500 rounded-lg shrink-0">
                <Plus size={20} />
              </div>
              <div className="text-left min-w-0">
                <p className="font-semibold text-gray-800 text-sm truncate">Tambah Jadwal</p>
                <p className="text-xs text-gray-400 truncate">Susun agenda aktivitas mading</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-gray-300 group-hover:text-emerald-500 shrink-0 ml-1 transition-colors" />
          </Link>

          {/* Edit Informasi 👈 Sekarang tombol ini menggunakan dynamic ID atau mengarah ke list info jika ID belum termuat */}
          <Link
            to={infoId ? `/info/edit-info/${infoId}` : "/info"}
            className={`flex items-center justify-between p-4 rounded-xl border border-dashed border-gray-200 hover:border-amber-500 hover:bg-amber-50/30 transition-all group ${
              loading ? "pointer-events-none opacity-50" : ""
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 bg-amber-50 text-amber-500 rounded-lg shrink-0">
                <Plus size={20} />
              </div>
              <div className="text-left min-w-0">
                <p className="font-semibold text-gray-800 text-sm truncate">Ubah Info</p>
                <p className="text-xs text-gray-400 truncate">Kelola kontak & medsos</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-gray-300 group-hover:text-amber-500 shrink-0 ml-1 transition-colors" />
          </Link>

        </div>
      </div>
    </div>
  );
}
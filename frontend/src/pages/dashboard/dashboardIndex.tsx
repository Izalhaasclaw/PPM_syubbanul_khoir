import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../lib/axios"; 
import { Users, FileText, ArrowRight, Plus, LayoutDashboard, Loader2 } from "lucide-react";

export default function DashboardIndex() {
  const [stats, setStats] = useState({ artikel: 0, users: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        const [resArtikel, resUser] = await Promise.all([
          API.get("/artikel").catch(() => ({ data: { data: [] } })),
          API.get("/user").catch(() => ({ data: { data: [] } })), 
        ]);

        
        const totalArtikel = resArtikel.data?.data?.length || 0;
        const totalUser = resUser.data?.data?.length || 0;

        setStats({
          artikel: totalArtikel,
          users: totalUser,
        });
      } catch (error) {
        console.error("Gagal memuat data dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-4 space-y-8">
      {}
      <div className="bg-linear-to-r from-[#35A2FD] to-[#1D8DF5] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <h1 className="text-3xl font-extrabold flex items-center gap-2">
            <LayoutDashboard size={28} /> Selamat Datang di Dashboard!
          </h1>
          <p className="text-blue-50 opacity-90 max-w-xl text-sm md:text-base">
            Kelola konten artikel, manajemeni hak akses user, dan pantau perkembangan platform Anda dengan mudah dari satu panel terpusat.
          </p>
        </div>
        {}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Artikel</p>
            {loading ? (
              <Loader2 className="animate-spin text-gray-400" size={24} />
            ) : (
              <h3 className="text-4xl font-bold text-gray-900">{stats.artikel}</h3>
            )}
            <Link to="/artikel" className="text-sm font-semibold text-[#35A2FD] hover:text-[#1D8DF5] inline-flex items-center gap-1 group">
              Lihat Semua Artikel 
              <ArrowRight size={14} className="transform transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[#35A2FD]">
            <FileText size={28} />
          </div>
        </div>

        {}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Pengguna</p>
            {loading ? (
              <Loader2 className="animate-spin text-gray-400" size={24} />
            ) : (
              <h3 className="text-4xl font-bold text-gray-900">{stats.users}</h3>
            )}
            <Link to="/user" className="text-sm font-semibold text-[#35A2FD] hover:text-[#1D8DF5] inline-flex items-center gap-1 group">
              Lihat Manajemen User 
              <ArrowRight size={14} className="transform transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500">
            <Users size={28} />
          </div>
        </div>
      </div>

      {}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Aksi Cepat</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/artikel/create"
            className="flex items-center justify-between p-4 rounded-xl border border-dashed border-gray-200 hover:border-[#35A2FD] hover:bg-blue-50/30 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-[#35A2FD] rounded-lg">
                <Plus size={20} />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-800 text-sm">Buat Artikel Baru</p>
                <p className="text-xs text-gray-400">Rilis berita atau edukasi baru</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-gray-300 group-hover:text-[#35A2FD] transition-colors" />
          </Link>

          <Link
            to="/user/create"
            className="flex items-center justify-between p-4 rounded-xl border border-dashed border-gray-200 hover:border-indigo-500 hover:bg-indigo-50/30 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 text-indigo-500 rounded-lg">
                <Plus size={20} />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-800 text-sm">Tambah User Baru</p>
                <p className="text-xs text-gray-400">Daftarkan admin atau penulis baru</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-gray-300 group-hover:text-indigo-500 transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  );
}
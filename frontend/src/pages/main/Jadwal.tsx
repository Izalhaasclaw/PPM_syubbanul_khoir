import { useState, useEffect } from "react";
import CardJadwal, { type JadwalProps } from "../../components/CardJadwal";
import latar from "../../assets/1.png"; // Sesuaikan path gambarnya
import { API } from "../../lib/axios";

export default function Jadwal() {
  const [daftarJadwal, setDaftarJadwal] = useState<JadwalProps[]>([]);
  
  const [isLoading] = useState(true);
  const [error] = useState<string | null>(null);

  // Simulasi pemanggilan API/Database
  useEffect(() => {
    const fetchDatabase = async () => {
      try {
              const res = await API.get("/jadwal-index");
              const result = res.data;
              const data = Array.isArray(result.data) ? result.data : result;
      
              setDaftarJadwal(data);
            } catch (error) {
              console.error("Gagal mengambil data jadwal:", error);
            }
          };

    fetchDatabase();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white pb-20">
      
      {/* ================= HERO SECTION (FULLSCREEN) ================= */}
      <section 
        className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${latar})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6">
            Jadwal Acara Mendatang
          </h1>
          <p className="text-gray-200 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Ikuti dan hadiri syiar lantunan sholawat bersama kelompok Hadroh kami di berbagai tempat.
          </p>
        </div>
      </section>

      {/* ================= DAFTAR ACARA (GRID) ================= */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-16 relative z-20">
        
        <div className="min-h-125">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Semua Acara Kami</h2>
          
          {/* 1. Tampilkan Loading State */}
          {isLoading && (
            <div className="w-full py-20 text-center text-gray-500 font-medium">
              <svg className="animate-spin h-8 w-8 text-[#35A2FD] mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memuat jadwal dari database...
            </div>
          )}

          {/* 2. Tampilkan Error State */}
          {error && !isLoading && (
            <div className="w-full py-20 text-center text-red-500 font-medium">
              Maaf, terjadi kesalahan: {error}
            </div>
          )}

          {/* 3. Tampilkan Data Grid jika berhasil */}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {daftarJadwal.map((jadwal) => (
                <CardJadwal 
                  key={jadwal.id}
                  acara={jadwal.acara}
                  lokasi={jadwal.lokasi}
                  tanggal={jadwal.tanggal}
                  waktu={jadwal.waktu}
                />
              ))}
            </div>
          )}

          {/* 4. Tampilkan Pesan jika Database Kosong */}
          {!isLoading && !error && daftarJadwal.length === 0 && (
            <div className="w-full py-20 text-center text-gray-500 font-medium">
              Belum ada jadwal acara mendatang.
            </div>
          )}

        </div>
        
      </section>

    </div>
  );
}
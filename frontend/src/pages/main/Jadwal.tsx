import { useState, useEffect } from "react";
import CardJadwal, { type JadwalProps } from "../../components/CardJadwal";
import latar from "../../assets/bg2.png"; // Sesuaikan path gambarnya
import { API } from "../../lib/axios";

export default function Jadwal() {
  const [daftarJadwal, setDaftarJadwal] = useState<JadwalProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDatabase = async () => {
      try {
        setError(null); 
        
        const res = await API.get("/jadwal-index");
        const result = res.data;
        const data = Array.isArray(result.data) ? result.data : result;
  
        // ================= LOGIKA FILTER TANGGAL =================
        // 1. Ambil tanggal hari ini dan reset jamnya ke 00:00:00
        const hariIni = new Date();
        hariIni.setHours(0, 0, 0, 0);

        // 2. Filter hanya acara yang tanggalnya hari ini atau besok-besoknya
        const jadwalMendatang = data.filter((jadwal: JadwalProps) => {
          const tanggalAcara = new Date(jadwal.tanggal);
          tanggalAcara.setHours(0, 0, 0, 0); // Reset jam acara agar perbandingan tanggal adil
          
          return tanggalAcara >= hariIni; // Hanya lolos jika hari ini atau yang akan datang
        });
        // =========================================================

        setDaftarJadwal(jadwalMendatang);
      } catch (err: any) {
        console.error("Gagal mengambil data jadwal:", err);
        setError(err.message || "Gagal mengambil data jadwal");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDatabase();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white pb-16 md:pb-20">
      
      {/* ================= HERO SECTION ================= */}
      <section 
        className="relative w-full h-[80vh] md:h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${latar})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 text-center px-4 md:px-6 max-w-4xl mx-auto mt-8 md:mt-0">
          {/* Menyesuaikan ukuran font (text-2xl sm:text-4xl) agar teks judul tidak terpotong di layar HP */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 tracking-wide leading-tight">
            Jadwal Acara Mendatang
          </h1>
          <p className="text-gray-200 text-xs sm:text-sm md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-2">
            Ikuti dan hadiri syiar lantunan sholawat bersama kelompok Hadroh kami di berbagai tempat.
          </p>
        </div>
      </section>

      {/* ================= DAFTAR ACARA (GRID) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-12 md:pt-16 relative z-20">
        
        <div className="min-h-96 md:min-h-125">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 text-center sm:text-left">
            Semua Acara Kami
          </h2>
          
          {/* 1. Tampilkan Loading State */}
          {isLoading && (
            <div className="w-full py-16 md:py-20 text-center text-gray-500 font-medium text-sm md:text-base">
              <svg className="animate-spin h-8 w-8 text-[#35A2FD] mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memuat jadwal dari database...
            </div>
          )}

          {/* 2. Tampilkan Error State */}
          {error && !isLoading && (
            <div className="w-full py-16 md:py-20 text-center text-red-500 font-medium text-sm md:text-base px-4">
              Maaf, terjadi kesalahan: {error}
            </div>
          )}

          {/* 3. Tampilkan Data Grid jika berhasil */}
          {/* Grid otomatis menyesuaikan dari 1 kolom di mobile hingga 3 kolom di layar desktop */}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {daftarJadwal.map((jadwal) => (
                <div key={jadwal.id} className="w-full flex justify-center">
                  <CardJadwal 
                    acara={jadwal.acara}
                    lokasi={jadwal.lokasi}
                    tanggal={jadwal.tanggal}
                    waktu={jadwal.waktu}
                  />
                </div>
              ))}
            </div>
          )}

          {/* 4. Tampilkan Pesan jika Database Kosong atau Semua Jadwal Sudah Lewat */}
          {!isLoading && !error && daftarJadwal.length === 0 && (
            <div className="w-full py-16 md:py-20 text-center text-gray-500 font-medium text-sm md:text-base px-4">
              Belum ada jadwal acara mendatang.
            </div>
          )}

        </div>
        
      </section>

    </div>
  );
}
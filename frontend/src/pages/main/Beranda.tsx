import { useEffect, useState, useRef } from "react";
import Banner from "../../assets/asset_2.png";
import Bgcomejoinus from "../../assets/asset_3.png";
import BgAngka from "../../assets/asset_1.png";
import BgImage from "../../assets/bgdashboard.png";
import Button from "../../components/ui/Button";
import CardArtikel from "../../components/cardArtikel";
import { API } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { Calendar, ThumbsUp } from "lucide-react"; 

interface Artikel {
  id: number;
  judul: string;
  isi: string;
  foto: string;
}

export default function Beranda() {
  const navigate = useNavigate();
  const [daftarArtikel, setDaftarArtikel] = useState<Artikel[]>([]);
  const [noTelepon, setNoTelepon] = useState<string>("+62 877-2211-2002");
  const [totalAcara, setTotalAcara] = useState<number>(92); 
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);

  useEffect(() => {
    // Ambil Data Artikel
    const fetchArtikel = async () => {
      try {
        const res = await API.get("/artikel-index");
        const result = res.data;
        const data = Array.isArray(result.data) ? result.data : result;
        setDaftarArtikel(data.slice(0, 7));
      } catch (error) {
        console.error("Gagal mengambil data artikel:", error);
      }
    };

    // Ambil Data Nomor Telepon / Informasi
    const fetchKontakInfo = async () => {
      try {
        const res = await API.get("/informasi");
        const result = res.data;
        const data = result.data || result;
        const finalData = Array.isArray(data) ? data[0] : data;

        if (finalData && finalData.telepon) {
          setNoTelepon(finalData.telepon);
        }
      } catch (error) {
        console.error("Gagal mengambil data informasi kontak:", error);
      }
    };

    // Ambil Data Jadwal untuk Fakta Angka (Diubah ke /jadwal demi menghindari 404)
    const fetchJadwalCount = async () => {
      try {
        const res = await API.get("/jadwal-index");
        const result = res.data;
        const data = Array.isArray(result.data) ? result.data : result;
        
        const hitungTotal = (data?.length || 0) + 92;
        setTotalAcara(hitungTotal);
      } catch (error) {
        console.error("Gagal mengambil data jadwal:", error);
        setTotalAcara(92); 
      }
    };

    fetchArtikel();
    fetchKontakInfo();
    fetchJadwalCount(); 
  }, []);

  // Sistem Auto-Slide Scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || daftarArtikel.length === 0) return;

    const autoScroll = setInterval(() => {
      if (isHovered.current) return;

      const { scrollLeft, clientWidth, scrollWidth } = container;

      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 320, behavior: "smooth" });
      }
    }, 3500);

    return () => clearInterval(autoScroll);
  }, [daftarArtikel]);

  // Helper untuk membersihkan nomor WA
  const formatWAUrl = (num: string) => {
    const cleanNum = num.replace(/[^0-9]/g, "");
    if (cleanNum.startsWith("0")) {
      return `62${cleanNum.slice(1)}`;
    }
    return cleanNum;
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* ================= HERO SECTION ================= */}
      <section
        className="relative w-full h-[85vh] md:h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${BgImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-4 md:px-6 max-w-4xl mx-auto mt-12 md:mt-16">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-wide leading-tight">
            Nasyurul Khair Wal Barakah
          </h1>
          <p className="text-gray-200 text-xs sm:text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
            Menyiarkan kebaikan dan membawa keberkahan di tengah masyarakat
            melalui lantunan sholawat yang menyejukkan hati.
          </p>
        </div>
      </section>

      {/* BUTTON FLOATING (Bawah Kanan) */}
      <div className="fixed bottom-6 right-4 sm:right-10 z-50 flex justify-center shadow-xl rounded-full overflow-hidden">
        <a 
          href={`https://wa.me/${formatWAUrl(noTelepon)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button label="→ Gabung Sekarang" variant="primary" />
        </a>
      </div>

      {/* ================= ARTIKEL DAN BERITA ================= */}
      <section className="py-12 md:py-16 w-full mx-auto overflow-hidden">
        <h2 className="text-xl md:text-3xl font-bold text-[#0F172A] mb-6 md:mb-8 px-4 md:px-12">
          Artikel dan Berita
        </h2>

        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory px-4 md:px-12"
          onMouseEnter={() => { isHovered.current = true; }}
          onMouseLeave={() => { isHovered.current = false; }}
        >
          {/* Lebar item disesuaikan (w-[290px] sm:w-[380px] md:w-[450px]) agar tidak pecah/meluap di mobile */}
          <div className="flex w-max gap-4 md:gap-6 py-2">
            {daftarArtikel.map((artikel) => (
              <div
                key={artikel.id}
                className="w-70 sm:w-90 md:w-105 shrink-0 snap-center rounded-2xl overflow-hidden shadow-md"
              >
                <CardArtikel
                  title={artikel.judul}
                  imageUrl={artikel.foto}
                  link={`/artikel/${artikel.id}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-center px-4">
          <Button
            label="→ Baca Artikel Lainnya"
            variant="primary"
            onClick={() => navigate("/artikel")}
          />
        </div>
      </section>

      {/* ================= STATISTIK (FAKTA ANGKA) ================= */}
      <section
        className="relative w-full py-12 md:py-20 bg-white overflow-hidden flex flex-col items-center justify-center bg-no-repeat"
        style={{
          backgroundImage: `url(${BgAngka})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-xl md:text-3xl font-bold text-[#0F172A] mb-2 px-2">
            Hadroh Syubbanul Khoir dalam Angka
          </h2>
          <p className="text-gray-500 text-xs md:text-base mb-10 md:mb-16">
            Fakta dan Angka Hadroh Syubbanul Khoir
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 max-w-5xl mx-auto">
            
            {/* Card Stat 1 - Tahun Berdiri */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-10 flex flex-col items-center transition-transform hover:-translate-y-1">
              <div className="bg-[#0f172a] text-white w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4 md:mb-6 shrink-0">
                <Calendar className="w-8 h-8 md:w-9 md:h-9" strokeWidth={2} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">2017</h3>
              <p className="text-xs md:text-sm font-semibold text-gray-500">Berdiri Sejak</p>
            </div>

            {/* Card Stat 2 - Acara yang Diikuti */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-10 flex flex-col items-center transition-transform hover:-translate-y-1">
              <div className="bg-[#0f172a] text-white w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4 md:mb-6 shrink-0">
                <svg 
                  className="w-8 h-8 md:w-10 md:h-10"
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="7.5" strokeDasharray="3 2" opacity="0.6" />
                  <path d="M12 2.5v1M12 20.5v1M2.5 12h1M20.5 12h1" strokeWidth="2.5" />
                  <circle cx="12" cy="3" r="0.75" fill="currentColor" />
                  <circle cx="12" cy="21" r="0.75" fill="currentColor" />
                  <circle cx="3" cy="12" r="0.75" fill="currentColor" />
                  <circle cx="21" cy="12" r="0.75" fill="currentColor" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-1">{totalAcara}</h3>
              <p className="text-xs md:text-sm font-semibold text-gray-500">Acara yang Diikuti</p>
            </div>

            {/* Card Stat 3 - Kepuasan Pelanggan */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-10 flex flex-col items-center transition-transform hover:-translate-y-1">
              <div className="bg-[#0f172a] text-white w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4 md:mb-6 shrink-0">
                <ThumbsUp className="w-8 h-8 md:w-9 md:h-9" strokeWidth={2} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-1">99%</h3>
              <p className="text-xs md:text-sm font-semibold text-gray-500">Kepuasan Pelanggan</p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= BANNER IMAGE ================= */}
      <section className="w-full mt-6 md:mt-10">
        <img
          src={Banner}
          alt="Banner Nasyurul Khair"
          className="w-full h-auto max-h-112.5 object-cover"
        />
      </section>

      {/* ================= COME JOIN US (CTA) ================= */}
      <section
        className="w-full py-16 md:py-24 px-4 md:px-6 flex flex-col items-center justify-center text-center bg-cover bg-center relative"
        style={{ backgroundImage: `url(${Bgcomejoinus})` }}
      >
        <p className="text-gray-600 text-xs md:text-base mb-2 font-medium max-w-md">
          Menyiarkan kebaikan di tengah masyarakat
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] mb-6 md:mb-8">
          Come Join Us!
        </h2>
        <a 
          href={`https://wa.me/${formatWAUrl(noTelepon)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <Button label="→ Gabung Sekarang" variant="secondary" />
        </a>
      </section>
    </div>
  );
}
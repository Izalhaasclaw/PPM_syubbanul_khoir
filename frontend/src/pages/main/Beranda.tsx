import { useEffect, useState, useRef } from "react";
import Banner from "../../assets/Group 61.png";
import Bgcomejoinus from "../../assets/Group 60.png";
import BgAngka from "../../assets/group 63.png";
import BgImage from "../../assets/bgdashboard.png";
import Button from "../../components/ui/Button";
import CardArtikel from "../../components/cardArtikel";
import { API } from "../../lib/axios";
import { useNavigate } from "react-router-dom";

// 1. Sesuaikan Interface dengan Schema Database Anda
interface Artikel {
  id: number;
  judul: string;
  isi: string;
  foto: string;
}

export default function Beranda() {
  const navigate = useNavigate(); // 👈 Tambahkan ini
  const [daftarArtikel, setDaftarArtikel] = useState<Artikel[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);

  // 2. Ambil data dari API
  useEffect(() => {
    const fetchArtikel = async () => {
      try {
        const res = await API.get("/artikel-index");
        const result = res.data;
        const data = Array.isArray(result.data) ? result.data : result;

        // Ambil maksimal 7 artikel
        setDaftarArtikel(data.slice(0, 7));
      } catch (error) {
        console.error("Gagal mengambil data artikel:", error);
      }
    };

    fetchArtikel();
  }, []);

  // 3. Sistem Auto-Slide Scroll
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

  return (
    <div className="w-full min-h-screen bg-white">
      {/* ================= HERO SECTION ================= */}
      <section
        className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${BgImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-16">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-wide">
            Nasyurul Khair Wal Barakah
          </h1>
          <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-8">
            Menyiarkan kebaikan dan membawa keberkahan di tengah masyarakat
            melalui lantunan sholawat yang menyejukkan hati.
          </p>
        </div>
      </section>

      <div className="fixed bottom-0 right-10 z-50 flex justify-center mb-4">
        <Button
          label="→ Gabung Sekarang"
          variant="primary"
          onClick={() => alert("Gabung Sekarang clicked!")}
        />
      </div>

      {/* ================= ARTIKEL DAN BERITA ================= */}
      <section className="py-16 w-full mx-auto overflow-hidden">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-8 px-6 md:px-12">
          Artikel dan Berita
        </h2>

        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory px-4 md:px-12"
          onMouseEnter={() => {
            isHovered.current = true;
          }}
          onMouseLeave={() => {
            isHovered.current = false;
          }}
        >
          {/* Menggunakan gap-6 dan justify-start agar efek scroll horizontal berjalan rapi */}
          <div className="flex w-max gap-6 mx-auto justify-start py-4">
            {daftarArtikel.map((artikel) => (
              <div
                key={artikel.id}
                /* Menggunakan ukuran fixed landscape yang lebar sesuai gambar */
                className="w-75 sm:w-112.5 md:w-150 h-50 sm:h-70 md:h-87.5 shrink-0 snap-center rounded-2xl overflow-hidden shadow-lg"
              >
                <CardArtikel
                  title={artikel.judul}
                  imageUrl={artikel.foto}
                  link={`/artikel/${artikel.id}`}
                  category="Berita"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <Button
            label="→ Baca Artikel Lainnya"
            variant="primary"
            onClick={() => navigate("/artikel")} // 👈 Mengarah ke halaman /artikel
          />
        </div>
      </section>

      {/* ================= STATISTIK (FAKTA ANGKA) ================= */}
      <section
        className="relative w-full py-20 bg-white overflow-hidden flex flex-col items-center justify-center bg-no-repeat"
        style={{
          backgroundImage: `url(${BgAngka})`,
          backgroundSize: "100% auto",
          backgroundPosition: "center 90%",
        }}
      >
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-2">
            Hadroh Syubbanul Khoir dalam Angka
          </h2>
          <p className="text-gray-500 text-sm md:text-base mb-16">
            Fakta dan Angka Hadroh Syubbanul Khoir
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-14 max-w-5xl mx-auto">
            {/* Card Stat 1 */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10 flex flex-col items-center">
              <div className="bg-[#0f172a] text-white w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 60 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M30 28.9375C26.625 28.9375 23.76 27.76 21.405 25.405C19.0517 23.0517 17.875 20.1875 17.875 16.8125C17.875 13.4375 19.0517 10.5833 21.405 8.25C23.76 5.91667 26.625 4.75 30 4.75C33.375 4.75 36.24 5.91667 38.595 8.25C40.9483 10.5833 42.125 13.4375 42.125 16.8125C42.125 20.1875 40.9483 23.0517 38.595 25.405C36.24 27.76 33.375 28.9375 30 28.9375ZM15.75 53.1875C13.5417 53.1875 11.6767 52.4267 10.155 50.905C8.635 49.385 7.875 47.5208 7.875 45.3125V43.9375C7.875 42.1458 8.34417 40.4892 9.2825 38.9675C10.2192 37.4475 11.4792 36.2917 13.0625 35.5C15.7708 34.1667 18.5417 33.1558 21.375 32.4675C24.2083 31.7808 27.0833 31.4375 30 31.4375C33 31.4375 35.9167 31.7708 38.75 32.4375C41.5833 33.1042 44.3125 34.1042 46.9375 35.4375C48.5208 36.2292 49.7817 37.375 50.72 38.875C51.6567 40.375 52.125 42.0625 52.125 43.9375V45.3125C52.125 47.5208 51.365 49.385 49.845 50.905C48.3233 52.4267 46.4583 53.1875 44.25 53.1875H15.75Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">9999</h3>
              <p className="text-sm font-semibold text-gray-700">
                Member Hadroh
              </p>
            </div>

            {/* Card Stat 2 */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10 flex flex-col items-center">
              <div className="bg-[#0f172a] text-white w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 60 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.375 27.5C14.6667 27.5 14.0729 27.7396 13.5938 28.2188C13.1146 28.6979 12.875 29.2917 12.875 30V42.5C12.875 43.2083 13.1146 43.8021 13.5938 44.2812C14.0729 44.7604 14.6667 45 15.375 45C16.0833 45 16.6771 44.7604 17.1562 44.2812C17.6354 43.8021 17.875 43.2083 17.875 42.5V30C17.875 29.2917 17.6354 28.6979 17.1562 28.2188C16.6771 27.7396 16.0833 27.5 15.375 27.5ZM25 20C24.2917 20 23.6979 20.2396 23.2188 20.7188C22.7396 21.1979 22.5 21.7917 22.5 22.5V42.5C22.5 43.2083 22.7396 43.8021 23.2188 44.2812C23.6979 44.7604 24.2917 45 25 45C25.7083 45 26.3021 44.7604 26.7812 44.2812C27.2604 43.8021 27.5 43.2083 27.5 42.5V22.5C27.5 21.7917 27.2604 21.1979 26.7812 20.7188C26.3021 20.2396 25.7083 20 25 20ZM34.625 35C33.9167 35 33.3229 35.2396 32.8438 35.7188C32.3646 36.1979 32.125 36.7917 32.125 37.5V42.5C32.125 43.2083 32.3646 43.8021 32.8438 44.2812C33.3229 44.7604 33.9167 45 34.625 45C35.3333 45 35.9271 44.7604 36.4062 44.2812C36.8854 43.8021 37.125 43.2083 37.125 42.5V37.5C37.125 36.7917 36.8854 36.1979 36.4062 35.7188C35.9271 35.2396 35.3333 35 34.625 35ZM46.9375 28.25C45.6875 28.25 44.4688 28.0729 43.2812 27.7188C42.0938 27.3646 40.9583 26.8333 39.875 26.125L39.0625 26.9375C38.5208 27.4792 37.8854 27.75 37.1562 27.75C36.4271 27.75 35.7917 27.4792 35.25 26.9375C34.7083 26.3958 34.4375 25.7604 34.4375 25.0312C34.4375 24.3021 34.7083 23.6667 35.25 23.125L36.1875 22.25C35.5625 21.25 35.0833 20.1875 34.75 19.0625C34.4167 17.9375 34.25 16.7708 34.25 15.5625C34.25 12.0208 35.4792 9.02083 37.9375 6.5625C40.3958 4.10417 43.3958 2.875 46.9375 2.875H55.6875C56.7708 2.875 57.6979 3.26042 58.4688 4.03125C59.2396 4.80208 59.625 5.72917 59.625 6.8125V15.5625C59.625 19.1042 58.3958 22.1042 55.9375 24.5625C53.4792 27.0208 50.4792 28.25 46.9375 28.25ZM50.1875 12C49.6458 11.4583 49.0104 11.1875 48.2812 11.1875C47.5521 11.1875 46.9167 11.4583 46.375 12L43.25 15.1875C42.7083 15.7292 42.4375 16.3542 42.4375 17.0625C42.4375 17.7708 42.6875 18.3958 43.1875 18.9375C43.7292 19.5208 44.375 19.8125 45.125 19.8125C45.875 19.8125 46.5208 19.5417 47.0625 19L50.1875 15.875C50.7292 15.3333 51 14.6875 51 13.9375C51 13.1875 50.7292 12.5417 50.1875 12ZM8.25 57.125C6.04167 57.125 4.17708 56.3646 2.65625 54.8438C1.13542 53.3229 0.375 51.4583 0.375 49.25V15.75C0.375 13.5417 1.13542 11.6771 2.65625 10.1562C4.17708 8.63542 6.04167 7.875 8.25 7.875H25.3125C26.3958 7.875 27.3229 8.26042 28.0938 9.03125C28.8646 9.80208 29.25 10.7292 29.25 11.8125V25.375C29.25 27.5833 30.0104 29.4479 31.5312 30.9688C33.0521 32.4896 34.9167 33.25 37.125 33.25H45.6875C46.7708 33.25 47.6979 33.6354 48.4688 34.4062C49.2396 35.1771 49.625 36.1042 49.625 37.1875V49.25C49.625 51.4583 48.8646 53.3229 47.3438 54.8438C45.8229 56.3646 43.9583 57.125 41.75 57.125H8.25Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-1">9999</h3>
              <p className="text-sm font-semibold text-gray-700">Acara</p>
            </div>

            {/* Card Stat 3 */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10 flex flex-col items-center">
              <div className="bg-[#0f172a] text-white w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 60 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.6444 51.25C11.3815 51.25 10.3125 50.8125 9.4375 49.9375C8.5625 49.0625 8.125 47.9935 8.125 46.7306V9.375C8.125 8.84375 8.30479 8.39833 8.66438 8.03875C9.02396 7.67958 9.46937 7.5 10.0006 7.5C10.5323 7.5 10.9775 7.67958 11.3363 8.03875C11.6954 8.39833 11.875 8.84375 11.875 9.375V46.7306C11.875 46.9231 11.9552 47.0994 12.1156 47.2594C12.2756 47.4198 12.4519 47.5 12.6444 47.5H50 camps 50.5312 47.5 50.9765 47.6798 51.3356 48.0394C51.6952 48.399 51.875 48.8444 51.875 49.3756C51.875 49.9073 51.6952 50.3525 51.3356 50.7113C50.9765 51.25 50.5312 51.25 50 51.25H12.6444ZM18.8944 43.125C18.2815 43.125 17.7677 42.9177 17.3531 42.5031C16.9381 42.0881 16.7306 41.5742 16.7306 40.9613V24.9038C16.7306 24.2908 16.9381 23.7771 17.3531 23.3625C17.7677 22.9479 18.2815 22.7406 18.8944 22.7406H21.9713C22.6113 22.7406 23.1479 22.9577 23.5812 23.3919C24.0142 23.826 24.2306 24.3642 24.2306 25.0062V40.8688C24.2306 41.5108 24.0142 42.0473 23.5812 42.4781C23.1479 42.9094 22.6113 43.125 21.9713 43.125H18.8944ZM30.7694 43.125C30.1565 43.125 29.6427 42.9177 29.2281 42.5031C28.8131 42.0881 28.6056 41.5742 28.6056 40.9613V12.5C28.6056 11.8596 28.8223 11.3229 29.2556 10.89C29.6885 10.4571 30.2252 10.2406 30.8656 10.2406H33.9425C34.5554 10.2406 35.0692 10.4479 35.4837 10.8625C35.8983 11.2771 36.1056 11.7908 36.1056 12.4038V40.865C36.1056 41.5054 35.8892 42.0421 35.4562 42.475C35.0229 42.9083 34.4862 43.125 33.8462 43.125H30.7694ZM42.6444 43.125C42.0315 43.125 41.5175 42.9177 41.1025 42.5031C40.6879 42.0881 40.4806 41.5742 40.4806 40.9613V35C40.4806 34.3596 40.6973 33.8229 41.1306 33.39C41.5635 32.9571 42.1002 32.7406 42.7406 32.7406H45.8169C46.4302 32.7406 46.9442 32.9479 47.3587 33.3625C47.7733 33.7771 47.9806 34.2908 47.9806 34.9037V40.865C47.9806 41.5054 47.7642 42.0421 47.3312 42.475C46.8979 42.9083 46.3612 43.125 45.7212 43.125H42.6444Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-1">9999</h3>
              <p className="text-sm font-semibold text-gray-700">Dll</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BANNER IMAGE ================= */}
      <section className="w-full mt-10">
        <img
          src={Banner}
          alt="Banner Nasyurul Khair"
          className="w-full h-auto object-cover"
        />
      </section>

      {/* ================= COME JOIN US (CTA) ================= */}
      <section
        className="w-full py-32 px-6 flex flex-col items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${Bgcomejoinus})` }}
      >
        <p className="text-gray-700 text-sm md:text-base mb-3 font-medium">
          Menyiarkan kebaikan di tengah masyarakat
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-8">
          Come Join Us!
        </h2>
        <Button
          label="→ Gabung Sekarang"
          variant="secondary"
          onClick={() => alert("Gabung Sekarang clicked!")}
        />
      </section>
    </div>
  );
}

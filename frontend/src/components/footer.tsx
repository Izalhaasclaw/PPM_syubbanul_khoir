import { useEffect, useState } from "react";
import { API } from "../lib/axios"; 

interface Informasi {
  alamat: string;
  telepon: string;
  email: string;
  instagram: string;
  tiktok: string;
  youtube: string;
}

export function Footer() {
  // Data fallback (cadangan) jika database kosong / gagal dimuat
  const [info, setInfo] = useState<Informasi>({
    alamat:
      "Jl. Perumahan Mutiara Vantavin No.1, Pacul Kulon, Pacul, Kec. Talang, Kab. Tegal, Jawa Tengah 52193",
    telepon: "+62 877-2211-2002",
    email: "syukhoir@gmail.com",
    instagram: "#",
    tiktok: "#",
    youtube: "#",
  });

  useEffect(() => {
    let isMounted = true; // Flag untuk mencegah memory leak saat komponen unmount

    const fetchFooterInfo = async () => {
      try {
        const res = await API.get("/informasi"); 
        const result = res.data;
        const data = result.data || result;

        // Jika response berupa array, ambil index pertama
        const finalData = Array.isArray(data) ? data[0] : data;

        if (finalData && isMounted) {
          setInfo({
            alamat: finalData.alamat || info.alamat,
            telepon: finalData.telepon || info.telepon,
            email: finalData.email || info.email,
            instagram: finalData.instagram || "#",
            tiktok: finalData.tiktok || "#",
            youtube: finalData.youtube || "#",
          });
        }
      } catch (error) {
        console.error("Gagal mengambil data informasi footer:", error);
      }
    };

    fetchFooterInfo();

    return () => {
      isMounted = false; // Cleanup function
    };
  }, []);

  // Membersihkan nomor telepon agar aman saat di-redirect ke https://wa.me/
  const formatWAUrl = (num: string) => {
    const cleanNum = num.replace(/[^0-9]/g, "");
    if (cleanNum.startsWith("0")) {
      return `62${cleanNum.slice(1)}`;
    }
    return cleanNum;
  };

  // Helper untuk memvalidasi apakah string input merupakan URL valid atau hanya username saja
  const buildSocialUrl = (baseUrl: string, value: string, prefix: string = "") => {
    if (!value || value === "#") return "#";
    if (value.startsWith("http://") || value.startsWith("https://")) {
      return value;
    }
    return `${baseUrl}/${prefix}${value.replace("@", "")}`;
  };

  return (
    <footer className="bg-[#0f172a] text-slate-300 py-12 px-6 md:px-12 border-t-4 border-yellow-500/20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-sm font-semibold mb-8 tracking-widest text-center md:text-left opacity-60">
          OUR INFORMATION
        </h2>

        {/* Grid Responsif: 1 Kolom di HP, 2 Kolom di Tablet, 4 Kolom di Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 text-sm">
          
          {/* Kolom 1: Alamat / Sekretariat */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-white text-lg md:text-[21px] mb-3">
              Sekretariat
            </h3>
            <p className="leading-relaxed text-[14px] sm:text-[15px] text-justify md:text-left text-slate-400">
              {info.alamat}
            </p>
          </div>

          {/* Kolom 2: Kontak (WA & Email) */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-white text-lg md:text-[21px] mb-3">
              Contact Person
            </h3>
            <div className="space-y-2 text-[14px] sm:text-[15px]">
              <p className="text-slate-400">
                Telepon:{" "}
                <a
                  href={`https://wa.me/${formatWAUrl(info.telepon)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-slate-300 hover:text-[#F2BB44] transition-colors break-all"
                >
                  {info.telepon}
                </a>
              </p>
              <p className="text-slate-400">
                Email:{" "}
                <a
                  href={`mailto:${info.email}`}
                  className="underline text-slate-300 hover:text-[#F2BB44] transition-colors break-all"
                >
                  {info.email}
                </a>
              </p>
            </div>
          </div>

          {/* Kolom 3: Sosial Media */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-white text-lg md:text-[21px] mb-3">
              Follow Us
            </h3>
            <div className="flex items-center gap-3 mt-1">
              {/* Instagram */}
              <a
                href={buildSocialUrl("https://www.instagram.com", info.instagram)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 bg-slate-800 hover:bg-[#E1306C] text-slate-300 hover:text-white rounded-xl flex items-center justify-center transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href={buildSocialUrl("https://www.tiktok.com", info.tiktok, "@")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 bg-slate-800 hover:bg-black text-slate-300 hover:text-white rounded-xl flex items-center justify-center transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href={info.youtube.startsWith("http") ? info.youtube : "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 bg-slate-800 hover:bg-[#FF0000] text-slate-300 hover:text-white rounded-xl flex items-center justify-center transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
                  <polygon points="10 15 15 12 10 9 10 15" />
                </svg>
              </a>
            </div>
          </div>

          {/* Kolom 4: Copyright */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-white text-lg md:text-[21px] mb-3">
              Copyright
            </h3>
            <p className="leading-relaxed text-[13px] sm:text-[14px] text-slate-400">
              &copy; TeamPatavin Project &copy; PPMUHN {new Date().getFullYear()} All Rights Reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
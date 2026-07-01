import { useEffect, useState } from "react";
import { API } from "../lib/axios"; // 👈 Sesuaikan dengan path Axios instance Anda

interface Informasi {
  alamat: string;
  whatsapp: string;
  email: string;
  instagram: string;
  tiktok: string;
  youtube: string;
}

export function Footer() {
  // Data fallback (cadangan) jika database kosong / gagal dimuat
  const [info, setInfo] = useState<Informasi>({
    alamat: "Jl. Perumahan Mutiara Vantavin No.1, Pacul Kulon, Pacul, Kec. Talang, Kab. Tegal, Jawa Tengah 52193",
    whatsapp: "+62 877-2211-2002",
    email: "syukhoir@gmail.com",
    instagram: "#",
    tiktok: "#",
    youtube: "#",
  });

  useEffect(() => {
    const fetchFooterInfo = async () => {
      try {
        const res = await API.get("/informasi"); // 👈 Sesuaikan dengan endpoint Anda
        const result = res.data;
        const data = result.data || result;

        // Jika response berupa array, ambil index pertama
        const finalData = Array.isArray(data) ? data[0] : data;

        if (finalData) {
          setInfo({
            alamat: finalData.alamat || info.alamat,
            whatsapp: finalData.whatsapp || info.whatsapp,
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
  }, []);

  // Membersihkan nomor WhatsApp agar aman saat di-redirect ke https://wa.me/
  const formatWAUrl = (num: string) => {
    const cleanNum = num.replace(/[^0-9]/g, "");
    if (cleanNum.startsWith("0")) {
      return `62${cleanNum.slice(1)}`;
    }
    return cleanNum;
  };

  return (
    <footer className="bg-[#0f172a] text-slate-300 py-10 px-6 md:px-12 border-t-4 border-yellow-500/20">
      <div className="max-w-7xl mx-auto">
        
        <h2 className="text-white text-lg font-bold mb-6 tracking-wide">
          OUR INFORMATION
        </h2>

        {/* Grid 4 Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          
          {/* Kolom 1: Alamat / Sekretariat */}
          <div>
            <h3 className="font-semibold text-white text-[21px] mb-2">
              Sekretariat
            </h3>
            <p className="leading-relaxed text-[15px]">
              {info.alamat}
            </p>
          </div>

          {/* Kolom 2: Kontak (WA & Email) */}
          <div>
            <h3 className="font-semibold text-white text-[21px] mb-2">
              Contact Person
            </h3>
            <p className="flex items-center gap-1">
              WhatsApp:{" "}
              <a 
                href={`https://wa.me/${formatWAUrl(info.whatsapp)}`} 
                target="_blank" 
                rel="noreferrer"
                className="underline hover:text-white transition-colors"
              >
                {info.whatsapp}
              </a>
            </p>
            <p className="flex items-center gap-1 mt-2">
              Email:{" "}
              <a 
                href={`mailto:${info.email}`}
                className="underline hover:text-white transition-colors"
              >
                {info.email}
              </a>
            </p>
          </div>

          {/* Kolom 3: Sosial Media (Instagram, TikTok, YouTube) */}
          <div>
            <h3 className="font-semibold text-white text-[21px] mb-2">
              Follow Us
            </h3>
            <div className="flex items-center gap-3">
              
              {/* Instagram */}
              <a 
                href={info.instagram} 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Instagram" 
                className="w-8 h-8 bg-slate-800 hover:bg-[#E1306C] text-slate-300 hover:text-white rounded-lg flex items-center justify-center transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>

              {/* TikTok */}
              <a 
                href={info.tiktok} 
                target="_blank" 
                rel="noreferrer" 
                aria-label="TikTok" 
                className="w-8 h-8 bg-slate-800 hover:bg-black text-slate-300 hover:text-white rounded-lg flex items-center justify-center transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                </svg>
              </a>

              {/* YouTube */}
              <a 
                href={info.youtube} 
                target="_blank" 
                rel="noreferrer" 
                aria-label="YouTube" 
                className="w-8 h-8 bg-slate-800 hover:bg-[#FF0000] text-slate-300 hover:text-white rounded-lg flex items-center justify-center transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/>
                  <polygon points="10 15 15 12 10 9 10 15"/>
                </svg>
              </a>

            </div>
          </div>

          {/* Kolom 4: Copyright */}
          <div>
            <h3 className="font-semibold text-white text-[21px] mb-2">
              Copyright
            </h3>
            <p className="leading-relaxed text-slate-400">
              ©TeamPatavin Project ©PPMUHN {new Date().getFullYear()} All Rights Reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
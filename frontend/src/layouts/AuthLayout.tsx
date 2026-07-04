import { Outlet } from "react-router-dom";
import BgImage from "../assets/bgdashboard.png";

export default function AuthLayout() {
  return (
    <div className="min-h-screen w-full">
      {/* TAMPILAN MOBILE & TABLET */}
      <div
        className="lg:hidden min-h-screen bg-cover bg-center flex items-center justify-center p-4 relative"
        // SESUDAHNYA
        style={{ backgroundImage: `url(${BgImage})` }}
      >
        {/* Overlay gelap tipis */}
        <div className="absolute inset-0 bg-black/50 z-0" />

        {/* CARD UTAMA (PUTIH BERSIH) */}
        <div className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
          <Outlet />
        </div>
      </div>

      {/* TAMPILAN DESKTOP / PC (>= lg) */}
      <div className="hidden lg:grid grid-cols-2 min-h-screen bg-white">
        {/* Kolom Kiri: Gambar Full Screen */}
        <div className="bg-gray-50 h-screen flex flex-col items-center justify-center overflow-hidden">
          <img
            src={BgImage}
            alt="Syubbanul Khoir Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Kolom Kanan: Area Form Login Bersih */}
        <div className="flex items-center justify-center h-full p-8">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

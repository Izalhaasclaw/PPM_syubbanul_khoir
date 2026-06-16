import { Link, NavLink, Navigate, Outlet } from "react-router-dom";
import { authStore } from "../store/AuthStore";
import logo from "../assets/logo_syubbanul.png";

export default function DashboardLayout() {
  const logout = authStore((state) => state.logout);
  const isAuthenticated = authStore((state) => state.isAuthenticated);

  // Jika tidak terautentikasi, redirect ke login
  if (!isAuthenticated) {
    return <Navigate to="/login-form" replace />;
  }

  // Daftar menu berdasarkan gambar referensi
  const menus = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "User", path: "/user" },
    { name: "Artikel", path: "/artikel" },
    { name: "Jadwal", path: "/jadwal" },
    { name: "Kontak", path: "/kontak" },
  ];

  return (
    // Latar belakang halaman abu-abu muda
    <div className="flex w-full min-h-screen bg-[#E5E7EB]">
      <div className="bg-[#0F172A] w-80 flex flex-col justify-between p-8 shadow-2xl">
        <div className="flex flex-col gap-10">
          {/* Area Profil Sidebar (Vertikal & Rata Tengah) */}

          <div className="flex flex-col items-center text-center mt-4">
            {/* Bingkai Logo */}
            <Link to="/dashboard">
              <div className="w-30 h-30 flex items-center justify-center mb-4">
                <img
                  src={logo}
                  alt="Logo Syubbanul Khoir"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>

            {/* Area Teks (Nama Instansi & Username) */}
            <div className="flex flex-col gap-1">
              <p className="text-1l text-white font-normal tracking-wide">
                Syubbanul Khoir
              </p>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Username
              </h2>
            </div>
          </div>

          <div className="mt-auto">
            {/* Menu Navigasi - Ukuran Diperkecil Sedikit */}
            <nav>
              <ul className="flex flex-col gap-4 text-center">
                {menus.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `block w-full py-2 px-4 text-center text-lg font-medium rounded-xl transition-all shadow-md ${
                          // Perubahan ukuran: py-3->py-2, px-6->px-4, text-xl->text-lg, rounded-2xl->rounded-xl
                          isActive
                            ? "bg-[#35A2FD] text-white hover:bg-[#1D8DF5]" // Menu Aktif (Biru)
                            : "bg-white text-gray-900 hover:bg-gray-100" // Menu Tidak Aktif (Putih)
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Tombol Logout - Disesuaikan agar serasi dengan tombol navigasi */}
        <div className="mt-auto">
          <button
            type="button"
            className="w-full py-2 text-center text-lg font-bold bg-[#F2BB44] text-white rounded-xl shadow-lg hover:bg-[#E0A829] transition-colors cursor-pointer"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="bg-white min-h-full p-8 shadow-sm">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

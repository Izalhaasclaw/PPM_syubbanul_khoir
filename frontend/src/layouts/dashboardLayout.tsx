import { useState } from "react"; // 1. Import useState untuk mendeteksi status menu mobile
import { Link, NavLink, Navigate, Outlet } from "react-router-dom";
import { authStore } from "../store/AuthStore";
import logo from "../assets/logo_syubbanul.png";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State untuk buka/tutup burger menu
  const logout = authStore((state) => state.logout);
  const isAuthenticated = authStore((state) => state.isAuthenticated);

  // Ambil data user dari authStore
  const user = authStore((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/login-form" replace />;
  }

  const menus = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "User", path: "/user" },
    { name: "Artikel", path: "/artikel-index" },
    { name: "Jadwal", path: "/jadwal-index" },
    { name: "Info", path: "/info" },
  ];

  return (
    // Mengubah flex menjadi flex-col di mobile dan flex-row di desktop (lg:)
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-[#E5E7EB]">
      {/* HEADER MOBILE (BURGER BAR) */}
      <div className="lg:hidden bg-[#0F172A] text-white flex items-center justify-between p-4 shadow-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
          <span className="font-semibold text-sm tracking-wide">
            Syubbanul Khoir
          </span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg hover:bg-slate-800 transition-colors focus:outline-none"
          aria-label="Toggle Menu"
        >
          {/* Icon Burger */}
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* BACKDROP OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR AREA */}
      {/* SESUDAH (Ganti -translate-x-full menjadi translate-x-full) */}
      <div
        className={`bg-[#0F172A] w-80 flex flex-col justify-between p-8 shadow-2xl fixed inset-y-0 right-0 z-50 transform lg:static lg:translate-x-0 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Tombol Close (X) mobile */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-4 right-4 lg:hidden text-gray-400 hover:text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex flex-col gap-10">
          {}
          <div className="flex flex-col items-center text-center mt-4">
            <Link to="/dashboard" onClick={() => setIsSidebarOpen(false)}>
              {/* Bingkai Foto/Logo otomatis menyesuaikan ukurannya */}
              <div
                className={`w-28 h-28 flex items-center justify-center mb-4 overflow-hidden ${
                  user?.foto ? "rounded-full border-2 border-[#35A2FD]" : ""
                }`}
              >
                <img
                  src={user?.foto || logo}
                  alt={
                    user?.username
                      ? `Foto ${user.username}`
                      : "Logo Syubbanul Khoir"
                  }
                  className={`w-full h-full ${
                    user?.foto ? "object-cover" : "object-contain"
                  }`}
                />
              </div>
            </Link>

            {}
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-400 font-normal tracking-wide">
                Syubbanul Khoir
              </p>
              {/* Menampilkan nama user yang sedang login */}
              <h2 className="text-2xl font-bold text-white tracking-wide max-w-60 wrap-break-word">
                {user?.username || "Username"}
              </h2>
            </div>
          </div>

          <div className="mt-auto">
            <nav>
              <ul className="flex flex-col gap-4 text-center">
                {menus.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={() => setIsSidebarOpen(false)} // Otomatis tutup sidebar setelah link diklik di mobile
                      className={({ isActive }) =>
                        `block w-full py-2 px-4 text-center text-lg font-medium rounded-xl transition-all shadow-md ${
                          isActive
                            ? "bg-[#35A2FD] text-white hover:bg-[#1D8DF5]"
                            : "bg-transparent text-white hover:bg-slate-800"
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

        {}
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

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 overflow-y-auto w-full">
        <div className="bg-white min-h-full p-8 shadow-smM rounded-xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

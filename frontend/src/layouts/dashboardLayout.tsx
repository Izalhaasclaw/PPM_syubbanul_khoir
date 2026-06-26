import { Link, NavLink, Navigate, Outlet } from "react-router-dom";
import { authStore } from "../store/AuthStore";
import logo from "../assets/logo_syubbanul.png";

export default function DashboardLayout() {
  const logout = authStore((state) => state.logout);
  const isAuthenticated = authStore((state) => state.isAuthenticated);
  
  
  const user = authStore((state) => state.user); 

  
  if (!isAuthenticated) {
    return <Navigate to="/login-form" replace />;
  }

  const menus = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "User", path: "/user" },
    { name: "Artikel", path: "/artikel" },
    { name: "Jadwal", path: "/jadwal" },
    { name: "Info", path: "/info" },
  ];

  return (
    <div className="flex w-full min-h-screen bg-[#E5E7EB]">
      <div className="bg-[#0F172A] w-80 flex flex-col justify-between p-8 shadow-2xl">
        <div className="flex flex-col gap-10">
          
          {}
          <div className="flex flex-col items-center text-center mt-4">
            <Link to="/dashboard">
              {}
              <div className={`w-28 h-28 flex items-center justify-center mb-4 overflow-hidden ${
                user?.foto ? "rounded-full border-2 border-[#35A2FD]" : ""
              }`}>
                <img
                  src={user?.foto || logo} 
                  alt={user?.username ? `Foto ${user.username}` : "Logo Syubbanul Khoir"}
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
              {}
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

      {}
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="bg-white min-h-full p-8 shadow-smM rounded-xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
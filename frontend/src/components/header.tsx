import { useState } from "react";
import logoSyubbanul from "../assets/logo_syubbanul.png";
import { NavLink } from "react-router-dom";

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeStyle = "text-[#F2BB44] bg-white/5 md:bg-transparent md:text-[#F2BB44]";
  const defaultStyle = "text-white hover:text-[#F2BB44] hover:bg-white/5 md:hover:bg-transparent";

  const menuItems = [
    {
      label: "Beranda",
      href: "/",
      icon: (
        <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 19.0459V6.34864L8.33333 0L16.6667 6.34864V19.0459H10.4167V11.6392H6.25V19.0459H0Z" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: "Tentang",
      href: "/Tentang",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M9.58332 0C14.8761 0 19.1667 4.35829 19.1667 9.73457C19.1667 15.1108 14.8761 19.4692 9.58332 19.4692C4.29062 19.4692 0 15.1108 0 9.73457C0 4.35829 4.29062 0 9.58332 0ZM10.5437 8.76112H8.62711V14.6019H10.5437V8.76112ZM9.59307 4.62391C8.89435 4.62391 8.3875 5.13589 8.3875 5.82724C8.3875 6.54657 8.88101 7.05759 9.59307 7.05759C10.2775 7.05759 10.7834 6.54652 10.7834 5.84075C10.7834 5.13593 10.2775 4.62391 9.59307 4.62391Z" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: "Artikel",
      href: "/Artikel", 
      icon: (
        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 18.2841C1.45 18.2841 0.979333 18.0853 0.588 17.6878C0.196667 17.2903 0.000666667 16.8119 0 16.2525V2.03156C0 1.47288 0.196 0.99479 0.588 0.59728C0.98 0.199771 1.45067 0.000677188 2 0H16C16.55 0 17.021 0.199093 17.413 0.59728C17.805 0.995467 18.0007 1.47356 18 2.03156V16.2525C18 16.8112 17.8043 17.2896 17.413 17.6878C17.0217 18.086 16.5507 18.2848 16 18.2841H2ZM4 14.221H11V12.1894H4V14.221ZM4 10.1578H14V8.12626H4V10.1578ZM4 6.09469H14V4.06313H4V6.09469Z" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: "Jadwal",
      href: "/Jadwal", // Diubah ke huruf kecil agar konsisten dengan halaman sebelumnya
      icon: (
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 0V2H1C0.734784 2 0.48043 2.10536 0.292893 2.29289C0.105357 2.48043 0 2.73478 0 3V19C0 19.2652 0.105357 19.5196 0.292893 19.7071C0.48043 19.8946 0.734784 20 1 20H8.755C7.52418 18.4627 6.90363 16.5255 7.01215 14.5592C7.12066 12.5928 7.95063 10.7356 9.34314 9.34314C10.7356 7.95063 12.5928 7.12066 14.5592 7.01215C16.5255 6.90363 18.4627 7.52418 20 8.755V3C20 2.73478 19.8946 2.48043 19.7071 2.29289C19.5196 2.10536 19.2652 2 19 2H15V0H13V2H7V0H5ZM21 15C21 15.7879 20.8448 16.5681 20.5433 17.2961C20.2417 18.0241 19.7998 18.6855 19.2426 19.2426C18.6855 19.7998 18.0241 20.2417 17.2961 20.5433C16.5681 20.8448 15.7879 21 15 21C14.2121 21 13.4319 20.8448 12.7039 20.5433C11.9759 20.2417 11.3145 19.7998 10.7574 19.2426C10.2002 18.6855 9.75825 18.0241 9.45672 17.2961C9.1552 16.5681 9 15.7879 9 15C9 13.4087 9.63214 11.8826 10.7574 10.7574C11.8826 9.63214 13.4087 9 15 9C16.5913 9 18.1174 9.63214 19.2426 10.7574C20.3679 11.8826 21 13.4087 21 15ZM14 11V15.414L16.293 17.707L17.707 16.293L16 14.586V11H14Z" fill="currentColor" />
        </svg>
      ),
    },
  ];

  return (
    <header className="bg-[#0f172a] shadow-md px-4 sm:px-6 py-3 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO AREA */}
        <div className="logo flex items-center gap-2.5">
          <img src={logoSyubbanul} alt="logo" className="h-10 sm:h-12 w-auto object-contain" />
          <h1 className="text-white text-base sm:text-lg font-bold tracking-wide">Syubbanul Khoir</h1>
        </div>

        {/* HAMBURGER BUTTON (Mobile Only) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-white hover:text-[#F2BB44] focus:outline-none md:hidden z-50"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* NAVIGATION LINKS */}
        <nav
          className={`
            fixed md:static inset-x-0 top-16 md:top-auto bg-[#0f172a] md:bg-transparent
            flex flex-col md:flex-row gap-1 md:gap-2 p-4 md:p-0 border-t border-gray-800 md:border-0
            transition-all duration-300 ease-in-out z-40
            ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible md:opacity-100 md:visible"}
          `}
        >
          {menuItems.map((item) => (
            <NavLink
              key={item.href} // Menambahkan key wajib di React looping
              to={item.href}
              onClick={() => setIsMenuOpen(false)} // Otomatis tutup menu di mobile saat link diklik
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 md:py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive ? activeStyle : defaultStyle
                }`
              }
            >
              {item.icon && <span className="w-5 h-5 flex items-center justify-center opacity-90">{item.icon}</span>}
              <span className="text-sm sm:text-base">{item.label}</span>
            </NavLink>
          ))}
        </nav>

      </div>
    </header>
  );
};

export default Header;
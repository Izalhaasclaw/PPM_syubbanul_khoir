import GoogleMaps from "../../components/GoogleMaps"; 
import latar from "../../assets/1.png"; 
import LogoSyubbanul from "../../assets/logo_syubbanul.png"; 

export default function Tentang() {
  return (
    <div className="w-full min-h-screen bg-white">
      
      {/* ================= HERO SECTION ================= */}
      <section 
        className="relative w-full h-[85vh] md:h-screen bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${latar})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center pt-12 md:pt-0">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-white leading-tight">
              Tentang <br className="hidden sm:inline" /> Syubbanul Khoir
            </h1>
          </div>
          <div>
            <p className="text-gray-200 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-justify opacity-90">
              Syubbanul Khoir hadir sebagai grup hadroh yang menggabungkan seni, dakwah, dan kebersamaan dalam setiap penampilannya. Dengan lantunan sholawat yang merdu dan penuh kekhidmatan, kami siap mengiringi berbagai acara seperti pernikahan, tasyakuran, pengajian, maulid, hingga kegiatan keagamaan lainnya sebagai wujud syiar Islam yang membawa ketenangan dan keberkahan.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SEJARAH, VISI, MISI (GRID) ================= */}
      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3">
          
          {/* --- BARIS 1 --- */}
          <div className="bg-white flex items-center justify-center p-8 sm:p-12 md:p-16 border-b md:border-b-0 border-gray-100">
            <img 
              src={LogoSyubbanul} 
              alt="Logo Syubbanul Khoir" 
              className="w-36 sm:w-44 md:w-56 h-auto object-contain"
            />
          </div>
          <div className="bg-[#0f172a] text-white p-6 sm:p-10 md:p-16 md:col-span-2 flex flex-col justify-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6">Sejarah Syubbanul Khoir</h2>
            <div className="space-y-4 text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed text-justify">
              <p>
                Syubbanul Khoir, yang memiliki arti "Pemuda yang Baik", resmi berdiri pada tahun 2017 sebagai wadah bagi para pemuda untuk melestarikan seni islami dan mempererat ukhuwah. Kelompok hadroh ini lahir dari semangat luhur untuk menebarkan nilai-nilai kebaikan sekaligus menyebarkan syiar Islam melalui indahnya lantunan sholawat.
              </p>
              <p>
                Berawal dari latihan sederhana di lingkungan sekitar, Syubbanul Khoir kini berkembang pesat dan aktif mengisi berbagai acara keagamaan seperti maulid, pernikahan, hingga tasyakuran. Dengan mengutamakan kekompakan dan kedisiplinan, grup ini terus berkomitmen menjaga tradisi islami yang menyejukkan dan memberikan manfaat nyata bagi masyarakat luas.
              </p>
            </div>
          </div>

          {/* --- BARIS 2 --- */}
          {/* Visi (1 Kolom) */}
          <div className="bg-[#F2BB44] p-6 sm:p-10 md:p-16 text-gray-900 flex flex-col justify-center">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 md:mb-4 flex items-center gap-2">
              <svg width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-8.75 md:h-8.75">
                <ellipse cx="25.0003" cy="25" rx="14.5833" ry="14.5833" stroke="#0F172A" strokeWidth="2"/>
                <ellipse cx="24.9997" cy="25" rx="4.16667" ry="4.16667" fill="#0F172A" stroke="#0F172A" strokeWidth="5"/>
                <path d="M14.6876 14.688L8.33301 8.33392M35.3115 14.688L41.6663 8.33392M41.6663 41.6672L35.3115 35.3119M8.33301 41.6672L14.6876 35.3119" stroke="#0F172A" strokeWidth="5" strokeLinecap="round"/>
              </svg>
              Visi
            </h3>
            <p className="text-xs sm:text-sm md:text-base leading-relaxed text-justify font-medium">
              Menjadi kelompok hadroh yang unggul, kreatif, dan istiqamah dalam melestarikan seni islami sebagai sarana dakwah serta mempererat ukhuwah Islamiyah di tengah masyarakat.
            </p>
          </div>

          {/* Misi (1 Kolom) */}
          <div className="bg-[#F2BB44] p-6 sm:p-10 md:p-16 text-gray-900 flex flex-col justify-center border-t md:border-t-0 border-yellow-600/30 md:border-l">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 md:mb-4 flex items-center gap-2">
              <svg width="22" height="30" viewBox="0 0 25 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-6 md:w-6.25 md:h-8.75">
                <path fillRule="evenodd" clipRule="evenodd" d="M25 12.5C24.9998 5.59659 19.4035 0 12.5 0C5.59655 0 0.000176007 5.59659 0 12.5C0 16.8242 2.1963 20.6348 5.53365 22.8792C5.80423 23.0611 5.93951 23.1521 6.03006 23.2598C6.1206 23.3674 6.17669 23.4931 6.28888 23.7445C6.63809 24.527 6.94389 25.3269 7.20524 26.1404C10.6631 27.1326 14.3361 27.1327 17.794 26.1406C18.0552 25.327 18.3609 24.5271 18.7101 23.7446C18.8223 23.4932 18.8784 23.3675 18.969 23.2598C19.0595 23.1521 19.1948 23.0611 19.4655 22.8792C22.8032 20.6349 25 16.8244 25 12.5ZM17.1994 28.358C14.107 29.0608 10.8925 29.0607 7.80006 28.3576C8.06614 29.586 8.23404 30.8368 8.30048 32.0982C8.33351 32.7252 8.35002 33.0387 8.49796 33.2645C8.6459 33.4904 8.91022 33.6225 9.43888 33.8867L10.7109 34.5225C11.837 35.0855 13.163 35.0855 14.2891 34.5225L15.5611 33.8867C16.0898 33.6225 16.3541 33.4904 16.5021 33.2645C16.65 33.0387 16.6665 32.7252 16.6995 32.0982C16.7659 30.8369 16.9336 29.5863 17.1994 28.358Z" fill="#0F172A"/>
              </svg>
              Misi
            </h3>
            <p className="text-xs sm:text-sm md:text-base leading-relaxed text-justify font-medium">
              Misi kami adalah menyebarkan syiar Islam dan melestarikan seni hadroh dengan menjaga kekompakan, aktif berkontribusi dalam masyarakat, serta terus meningkatkan kualitas penampilan.         
            </p>
          </div>

          {/* Kolom Kosong (1 Kolom di Kanan) */}
          <div className="hidden md:block bg-[#F2BB44] border-l border-yellow-600/30">
             {/* Kotak dibiarkan kosong untuk menyeimbangkan susunan layout grid 3-kolom */}
          </div>

        </div>
      </section>

      {/* ================= GOOGLE MAPS SECTION ================= */}
      <section className="w-full bg-white">
        <GoogleMaps />
      </section>

    </div>
  );
}
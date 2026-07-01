export default function GoogleMaps() {
  // Ganti pencarian ke nama bangunan spesifik yang terdaftar di Maps
  const namaTempat = "Masjid Sahari, Pacul, Tegal";
  
  // URL untuk Embed Iframe
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(namaTempat)}&t=&z=17&ie=UTF8&iwloc=&output=embed`;

  // URL untuk mengarahkan pengguna langsung ke aplikasi Google Maps (Mobile Friendly)
  const directMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(namaTempat)}`;

  return (
    <div className="w-full bg-white">
      {/* Container Peta: Tinggi adaptif h-72 (288px) di mobile dan h-[500px] di desktop */}
      <div className="w-full h-72 sm:h-96 md:h-125 bg-gray-100 relative">
        <iframe
          title="Lokasi Masjid Sahari - Syubbanul Khoir"
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 grayscale-29 contrast-90" 
        ></iframe>
      </div>

      {/* Tombol Aksi Tambahan Khusus Pengguna Mobile */}
      <div className="w-full px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-center md:hidden">
        <a
          href={directMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-sm text-center bg-[#35A2FD] hover:bg-[#2582ca] text-white font-medium text-sm py-2.5 px-4 rounded-xl shadow-xs transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {/* Ikon Kompas / Penanda Lokasi Sederhana */}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Buka di Google Maps
        </a>
      </div>
    </div>
  );
}
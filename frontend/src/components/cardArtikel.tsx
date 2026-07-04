import { Link } from "react-router-dom";

interface CardArtikelProps {
  title: string;
  imageUrl: string;
  link: string;
  category?: string; // Diaktifkan agar bisa digunakan di visual komponen
}

export default function CardArtikel({ title, imageUrl, link, category }: CardArtikelProps) {
  return (
    <Link 
      to={link} 
      className="relative block w-full aspect-4/3 sm:aspect-video md:aspect-4/3 lg:aspect-video group overflow-hidden rounded-2xl shadow-xs bg-slate-900"
    >
      {/* 1. Background Image */}
      <img
        src={imageUrl}
        alt={title}
        loading="lazy" // Optimasi performa pemuatan gambar
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />

      {/* 2. Gradient Overlay (Mendukung Tailwind v3 & v4 secara aman) */}
      <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/50 to-transparent z-10"></div>

      {/* 3. Badge Kategori (Opsional - Muncul jika data dikirim dari parent) */}
      {category && (
        <span className="absolute top-4 left-4 bg-[#F2BB44] text-slate-900 text-xs font-bold px-2.5 py-1 rounded-md z-20 shadow-xs uppercase tracking-wider">
          {category}
        </span>
      )}

      {/* 4. Konten Teks di Dalam Gambar */}
      <div className="absolute bottom-0 inset-x-0 p-5 md:p-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 z-20">
        
        {/* Judul Artikel (Sisi Kiri) */}
        <div className="max-w-xl">
          <h3 className="text-white font-bold text-base md:text-lg lg:text-xl leading-snug line-clamp-2 group-hover:text-[#F2BB44] transition-colors duration-200">
            {title}
          </h3>
        </div>

        {/* Link Jelajahi (Sisi Kanan) */}
        <div className="flex items-center text-white/80 text-xs md:text-sm font-semibold whitespace-nowrap shrink-0 group-hover:text-white transition-colors gap-1 sm:self-end">
          <span>Jelajahi</span>
          <svg 
            className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
        
      </div>
    </Link>
  );
}



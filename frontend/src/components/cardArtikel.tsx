import { Link } from "react-router-dom";

interface CardArtikelProps {
  title: string;
  imageUrl: string;
  link: string;
  category?: string;
}

export default function CardArtikel({ title, imageUrl, link }: CardArtikelProps) {
  return (
    <Link to={link} className="relative block w-full h-full group overflow-hidden rounded-2xl">
      {/* 1. Background Image */}
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* 2. Gradient Overlay (Membuat teks putih terbaca jelas di atas gambar) */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent"></div>

      {/* 3. Konten Teks di Dalam Gambar */}
      <div className="absolute bottom-0 inset-x-0 p-4 md:p-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        
        {/* Judul Artikel (Sisi Kiri) */}
        <h3 className="text-white font-bold text-sm sm:text-base md:text-xl leading-snug max-w-xl line-clamp-2">
          {title}
        </h3>

        {/* Link Jelajahi (Sisi Kanan) */}
        <span className="text-white/80 text-xs md:text-sm font-medium whitespace-nowrap shrink-0 group-hover:text-white transition-colors">
          → Jelajahi lebih lanjut
        </span>
        
      </div>
    </Link>
  );
}
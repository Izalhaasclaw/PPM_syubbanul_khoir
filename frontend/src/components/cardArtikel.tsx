interface CardArtikelProps {
  title: string;
  imageUrl: string;
  link: string;
  category?: string;
}

export default function CardArtikel({
  title,
  imageUrl,
  link,
  category,
}: CardArtikelProps) {
  return (
    // Tambahkan w-full dan h-full di sini agar menyesuaikan tinggi Grid
    <article className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md w-full h-full">
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-3 left-3 bg-[#35A2FD]/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-sm shadow-2xl z-10 border border-white/10">
        {category}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

      <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end h-full z-10">
        <h3 className="text-white text-sm md:text-base font-semibold leading-snug mb-3 max-w-[90%] line-clamp-3">
          {title}
        </h3>

        <a
          href={link}
          className="text-gray-300 text-[10px] md:text-xs flex items-center self-end hover:text-white transition-colors"
        >
          Jelajahi lebih lanjut{" "}
          <span className="ml-1 group-hover:translate-x-1 transition-transform">
            →
          </span>
        </a>
      </div>
    </article>
  );
}

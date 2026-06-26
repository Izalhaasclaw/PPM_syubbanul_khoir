// --- Komponen Ikon Sosial Media Sederhana ---
// Kamu bisa mengganti path SVG-nya dengan icon library pilihanmu (seperti react-icons)
const SocialIcon = ({ bgColor, path }: { bgColor: string, path: string }) => (
  <button className={`w-8 h-8 ${bgColor} text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity`}>
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d={path} />
    </svg>
  </button>
);

export default function DetailArtikel() {
  // Data Artikel Dummy (Sesuai gambar Figma)
  const article = {
    title: "Angkat Isu Pemerataan Layanan Kesehatan, Mahasiswa Harkat Negeri Juarai Kompetisi Esai Nasional",
    date: "21 Mei 2026 11:30:50 WIB",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    tags: ["#Acara", "#Liburan Bersama"],
    content: [
      "Tim mahasiswa yang terdiri dari Sahilatul Mubarokah, Zakki Faturrahman, Nabilah Rahmawati, dan Ayu Amalia dari Program Studi D3 Farmasi berhasil membawa nama Universitas Harkat Negeri dalam kompetisi tingkat nasional melalui karya esai berjudul \"Analisis Aksesibilitas dan Pemerataan Pelayanan Kesehatan bagi Masyarakat Kecamatan Bojong dalam Mewujudkan Keadilan Sosial dan Pembangunan Berkelanjutan Berbasis Partisipasi Generasi Z.\"",
      "Esai tersebut membahas persoalan akses layanan kesehatan masyarakat dengan pendekatan survei dan partisipasi generasi muda sebagai bagian dari solusi pembangunan berkelanjutan. Melalui gagasan tersebut, tim berupaya menghadirkan perspektif inovatif terkait pemerataan pelayanan kesehatan di masyarakat.",
      "Sahilatul Mubarokah mengungkapkan bahwa keikutsertaannya dalam kompetisi ini menjadi pengalaman yang sangat berharga sekaligus membuka wawasan baru dalam dunia akademik dan inovasi.",
      "\"Kompetisi ini memberikan pengalaman luar biasa karena kami bisa bertemu dan bertukar ide dengan mahasiswa dari berbagai daerah di Indonesia. Saat pengumuman hasil, kami merasa sangat bersyukur karena semua proses dan kerja keras yang dilakukan dapat membuahkan hasil. Prestasi ini menjadi awal untuk terus berkembang dan mengikuti kompetisi lainnya,\" ujarnya.",
      "Ketua Program Studi D3 Farmasi Universitas Harkat Negeri, Rizki Febriyanti, turut memberikan apresiasi atas capaian mahasiswanya. Menurutnya, prestasi tersebut menjadi bukti bahwa mahasiswa D3 Farmasi tidak hanya berkembang dalam kompetensi akademik, tetapi juga memiliki kemampuan berpikir kritis dan kepedulian terhadap isu sosial di masyarakat.",
      "Presiden Direktur PT Tamaris Hidro, Mohammad Syahrial, membubuhkan perspektif lapangan. Perusahaannya bekerja di wilayah-wilayah yang jauh dari pusat kota. Di sana ditemukan bahwa aspek pelayanan kesehatan hampir selalu jadi kebutuhan yang terakhir terpenuhi.",
      "\"Investasi terbaik yang bisa dilakukan oleh sektor swasta bukan hanya membangun infrastruktur fisik, tapi lebih-lebih adalah infrastruktur manusia, termasuk sistem kesehatan yang menjangkau mereka-mereka yang paling membutuhkan,\" ujar Syahrial.",
      "Di penghujung pidato, Sudirman berpesan kepada para mahasiswa dan peneliti muda, setiap pertanyaan riset yang kalian ajukan, setiap data yang kalian kumpulkan dari komunitas, dan setiap rekomendasi yang kalian susun, adalah batu-bata yang membangun sistem kesehatan Indonesia secara lebih adil dan setara. Jangan pernah meremehkan kekuatan ilmu yang berpihak pada rakyat."
    ]
  };

  // Path SVG Ikon Sosial Media
  const icons = {
    whatsapp: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
    twitter: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
    linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    telegram: "M12 0a12 12 0 110 24 12 12 0 010-24zm5.72 7.72c-.22-.05-.46-.02-.69.06l-10.46 4c-.58.22-.61.85-.06 1.1l2.87 1.03 1.25 3.86c.09.28.4.4.66.25l1.63-1.02 3.31 2.45c.34.25.82.07.9-.34l2.05-9.65c.08-.38-.2-.71-.56-.74h-.9zM9.82 13.43l3.77-3.4c.16-.14-.04-.37-.24-.23l-4.74 3-1.14-.4c-.38-.13-.39-.53 0-.67l2.35-.9z",
    link: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" // Ikon link sederhana
  };

  return (
    <div className="w-full min-h-screen bg-white py-25 px-6">
      {/* max-w-4xl menahan lebar konten agar ideal untuk dibaca */}
      <article className="max-w-4xl mx-auto">
        
        {/* --- Judul Artikel --- */}
        <h1 className="text-3xl md:text-[40px] font-bold text-gray-900 mb-6 leading-[1.3]">
          {article.title}
        </h1>

        {/* --- Baris Meta (Tanggal & Sosial Media Atas) --- */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-8">
          <span className="text-sm md:text-base font-medium text-gray-500">
            {article.date}
          </span>
          
          <div className="flex items-center gap-2">
            <SocialIcon bgColor="bg-[#25D366]" path={icons.whatsapp} />
            <SocialIcon bgColor="bg-[#1DA1F2]" path={icons.twitter} />
            <SocialIcon bgColor="bg-[#0A66C2]" path={icons.linkedin} />
            <SocialIcon bgColor="bg-[#0088cc]" path={icons.telegram} />
            <SocialIcon bgColor="bg-gray-400" path={icons.link} />
          </div>
        </div>

        {/* --- Gambar Utama Artikel --- */}
        <div className="w-full mb-10 overflow-hidden rounded-2xl shadow-sm">
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-auto max-h-[500px] object-cover"
          />
        </div>

        {/* --- Isi Artikel (Konten) --- */}
        {/* space-y-6 memberikan jarak antar paragraf secara otomatis */}
        <div className="text-base md:text-lg text-gray-700 leading-relaxed space-y-6 text-justify">
          {article.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* --- Tag/Kategori --- */}
        <div className="flex flex-wrap gap-3 mt-12 mb-8">
          {article.tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-[#E6F3FF] text-[#35A2FD] hover:bg-[#35A2FD] hover:text-white transition-colors cursor-pointer px-4 py-1.5 rounded-full text-sm font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* --- Bagikan Berita Ini (Sosial Media Bawah) --- */}
        <div className="flex flex-wrap items-center gap-4 pt-6 mt-6 border-t border-gray-100">
          <span className="text-sm font-bold text-gray-800">Bagikan Berita ini:</span>
          <div className="flex items-center gap-2">
            <SocialIcon bgColor="bg-[#25D366]" path={icons.whatsapp} />
            <SocialIcon bgColor="bg-[#1DA1F2]" path={icons.twitter} />
            <SocialIcon bgColor="bg-[#0A66C2]" path={icons.linkedin} />
            <SocialIcon bgColor="bg-[#0088cc]" path={icons.telegram} />
            <SocialIcon bgColor="bg-gray-400" path={icons.link} />
          </div>
        </div>

      </article>
    </div>
  );
}
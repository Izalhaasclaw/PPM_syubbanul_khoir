// Sesuaikan interface dengan field dari Prisma schema
export interface JadwalProps {
  id?: number;
  acara: string; // Sesuai Prisma
  lokasi: string; // Sesuai Prisma
  tanggal: string; // Tipe dari API biasanya turun sebagai string ISO "2026-06-09T00:00:00.000Z"
  waktu: string; // Sesuai Prisma
}

export default function CardJadwal({
  acara,
  lokasi,
  tanggal,
  waktu,
}: JadwalProps) {
  
  // Validasi dan konversi tanggal yang aman dari potensi kegagalan parse data API
  const parseDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
  };

  const validDate = parseDate(tanggal);

  // Fungsi untuk mengambil nama Hari dari DateTime Prisma (Contoh: "Selasa")
  const namaHari = validDate
    ? validDate.toLocaleDateString("id-ID", { weekday: "long" })
    : "Hari -";

  // Fungsi untuk mengambil format Tanggal (Contoh: "9 Juni 2026")
  const formatTanggal = validDate
    ? validDate.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Tanggal tidak valid";

  return (
    <div className="w-full bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
      <div>
        {/* Bagian Atas (Biru Gelap) */}
        <div className="bg-[#0f172a] text-white p-6">
          <h3 className="text-2xl font-bold mb-1 tracking-wide">{namaHari}</h3>
          <p className="text-slate-300 font-medium text-sm">{formatTanggal}</p>
        </div>

        {/* Bagian Bawah (Putih) */}
        <div className="p-6">
          <h4 className="font-bold text-gray-900 text-lg mb-4 leading-snug line-clamp-2" title={acara}>
            {acara}
          </h4>

          <div className="space-y-3">
            {/* Ikon Waktu */}
            <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-slate-500 shrink-0"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="truncate">{waktu} WIB</span>
            </div>

            {/* Ikon Lokasi (Kode SVG dibersihkan dari tumpukan path ganda) */}
            <div className="flex items-start gap-3 text-sm text-gray-600 font-medium">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-slate-500 shrink-0 mt-0.5"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="leading-tight text-gray-700">{lokasi}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
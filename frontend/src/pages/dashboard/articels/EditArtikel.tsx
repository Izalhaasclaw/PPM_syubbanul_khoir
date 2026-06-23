import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, ImageIcon, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { API } from "../../../lib/axios"; // 👈 Hubungkan ke instance Axios kamu

interface ArtikelForm {
  judul: string;
  isi: string;
  foto: string;
}

export default function EditArtikel() {
  const { id } = useParams<{ id: string }>(); // 👈 Mengambil ID dari parameter URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true); // Loading saat memuat data awal artikel
  const [waktuPembuatan, setWaktuPembuatan] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ArtikelForm>();

  // Memantau input form secara real-time untuk komponen Live Preview
  const judulPreview = watch("judul");
  const fotoPreview = watch("foto");
  const isiPreview = watch("isi");

  // 👈 Fetch data artikel lama berdasarkan ID
  useEffect(() => {
    const fetchDetailArtikel = async () => {
      try {
        setFetching(true);
        const res = await API.get(`/artikel/${id}`);
        const responseData = res.data;
        const artikel = responseData.data || responseData.artikel || responseData;

        if (artikel) {
          // Isi data ke dalam form react-hook-form
          reset({
            judul: artikel.judul,
            isi: artikel.isi,
            foto: artikel.foto,
          });

          // Simpan tanggal pembuatan asli untuk ditampilkan di preview
          if (artikel.created_at) {
            const dateParsed = new Date(artikel.created_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }) + ` ${new Date(artikel.created_at).toLocaleTimeString("id-ID")} WIB`;
            setWaktuPembuatan(dateParsed);
          }
        }
      } catch (error) {
        console.error(error);
        alert("Gagal memuat detail data artikel.");
        navigate("/artikel");
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchDetailArtikel();
  }, [id, reset, navigate]);

  // 👈 Kirim pembaruan menggunakan API.put
  const onSubmit = async (data: ArtikelForm) => {
    try {
      setLoading(true);
      const payload = {
        ...data,
        updated_at: new Date().toISOString(),
      };

      await API.put(`/artikel/${id}`, payload);

      alert("Artikel berhasil diperbarui!");
      navigate("/artikel");
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Gagal memperbarui artikel";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center py-40 text-gray-400">
        <Loader2 className="animate-spin mb-2" size={40} />
        <p>Memuat data artikel lama...</p>
      </div>
    );
  }

  return (
    <div className="p-2">
      <div className="border-b border-gray-100 p-2">
        <h1 className="text-3xl font-bold text-gray-900">Edit Artikel</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6"
      >
        {/* KOLOM KIRI: INPUT FORM (40% Lebar pada Layar Besar) */}
        <div className="lg:col-span-5 space-y-5">
          {/* JUDUL ARTIKEL */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Judul Artikel
            </label>
            <input
              type="text"
              placeholder="Masukkan judul artikel"
              {...register("judul", { required: "Judul artikel wajib diisi" })}
              className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 text-sm ${
                errors.judul
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:ring-blue-500"
              }`}
            />
            {errors.judul && (
              <p className="text-sm text-red-500">{errors.judul.message}</p>
            )}
          </div>

          {/* URL FOTO UTAMA */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              URL Foto Cover
            </label>
            <input
              type="text"
              placeholder="https://example.com/foto-berita.jpg"
              {...register("foto", { required: "Foto cover wajib diisi" })}
              className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 text-sm ${
                errors.foto
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:ring-blue-500"
              }`}
            />
            {errors.foto && (
              <p className="text-sm text-red-500">{errors.foto.message}</p>
            )}
          </div>

          {/* ISI KONTEN */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Isi Konten Artikel
            </label>
            <textarea
              rows={12}
              placeholder="Tuliskan isi berita atau materi artikel lengkap di sini... (Gunakan enter untuk paragraf baru)"
              {...register("isi", {
                required: "Isi artikel tidak boleh kosong",
                minLength: { value: 20, message: "Konten terlalu pendek" },
              })}
              className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 text-sm resize-none ${
                errors.isi
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:ring-blue-500"
              }`}
            />
            {errors.isi && (
              <p className="text-sm text-red-500">{errors.isi.message}</p>
            )}
          </div>
        </div>

        {/* KOLOM KANAN: LIVE SCROLLABLE PREVIEW (70% Lebar pada Layar Besar) */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700">
              Live Preview Tampilan Artikel
            </label>
          </div>

          {/* Jendela Browser Mockup dengan Fitur Scroll Otomatis */}
          <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm h-140 overflow-y-auto custom-scrollbar">
            {/* Isi Konten Halaman Artikel */}
            <div className="p-6 lg:p-8 space-y-5">
              {/* 1. Komponen Judul Utama */}
              <h1
                className={`font-bold text-gray-900 text-2xl lg:text-3xl tracking-tight leading-tight wrap-break-word ${
                  !judulPreview && "text-gray-300 italic font-medium"
                }`}
              >
                {judulPreview || "Lorem Ipsum Dolor sit Amet"}
              </h1>

              {/* 2. Metadata: Tanggal asli pembuatan artikel */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4 text-xs text-gray-400 font-medium">
                <div>{waktuPembuatan || "Memuat tanggal..."}</div>
              </div>

              {/* 3. Komponen Foto Cover Utama */}
              <div className="w-full aspect-video rounded-xl overflow-hidden bg-gray-50 border flex items-center justify-center group relative">
                {fotoPreview ? (
                  <img
                    src={fotoPreview}
                    alt="Article Cover Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/800x500?text=Format+Tautan+Gambar+Salah";
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400 p-4 text-center">
                    <ImageIcon size={45} className="stroke-1" />
                    <span className="text-xs mt-1">
                      Belum ada foto cover utama
                    </span>
                  </div>
                )}
              </div>

              {/* 4. Komponen Isi Berita dengan Dukungan Paragraf Luas */}
              <div
                className={`text-gray-700 text-sm md:text-base leading-relaxed wrap-break-word whitespace-pre-line ${
                  !isiPreview && "italic text-gray-300 select-none"
                }`}
              >
                {isiPreview || `lorem ipsum dolor sit amet, lieur venza`}
              </div>
            </div>
          </div>
        </div>

        {/* BARIS BUTTON AKSI */}
        <div className="lg:col-span-12 flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate("/artikel")}
            className="px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#35A2FD] hover:bg-[#1D8DF5] text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Menyimpan...
              </>
            ) : (
              <>
                <FileText size={18} />
                Simpan Perubahan
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
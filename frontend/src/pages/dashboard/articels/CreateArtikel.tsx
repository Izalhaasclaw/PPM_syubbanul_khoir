import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Loader2, ImageIcon, FileText } from "lucide-react";
import { useState } from "react";
import { API } from "../../../lib/axios"; 

interface ArtikelForm {
  judul: string;
  isi: string;
  foto: FileList; // 👈 1. Diubah dari string menjadi FileList untuk menangani file asli
}

export default function CreateArtikel() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ArtikelForm>();

  // Memantau input form secara real-time
  const judulPreview = watch("judul");
  const fotoWatch = watch("foto"); // 👈 2. Pantau properti file foto
  const isiPreview = watch("isi");

  // Logika konversi file gambar lokal untuk kebutuhan Live Preview
  const handleImagePreview = () => {
    if (fotoWatch && fotoWatch.length > 0) {
      return URL.createObjectURL(fotoWatch[0]); // Membuat string URL temporary dari file lokal
    }
    return null;
  };

  // 👈 3. Mengubah pengiriman JSON biasa menjadi FormData
  const onSubmit = async (data: ArtikelForm) => {
    try {
      setLoading(true);
      
      const formData = new FormData();
      formData.append("judul", data.judul);
      formData.append("isi", data.isi);
      
      // Ambil file pertama dari elemen input file mading jika tersedia
      if (data.foto && data.foto.length > 0) {
        formData.append("foto", data.foto[0]); // Key "foto" harus sinkron dengan upload.single("foto") di backend
      }

      // Mengirim multipart/form-data menggunakan instance Axios
      await API.post("/artikel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Artikel berhasil diterbitkan!");
      navigate("/artikel");
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Gagal menerbitkan artikel";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Format tanggal + waktu presisi untuk simulasi mading/berita nasional
  const waktuSekarang =
    new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }) + ` ${new Date().toLocaleTimeString("id-ID")} WIB`;

  return (
    <div className="p-2">
      <div className="border-b border-gray-100 p-2">
        <h1 className="text-3xl font-bold text-gray-900">Create Artikel</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6"
      >
        {/* KOLOM KIRI: INPUT FORM */}
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

          {/* UNGGAH FILE FOTO COVÈR */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              File Foto Cover
            </label>
            <input
              type="file" // 👈 4. Mengubah tipe teks (link) menjadi input file asli
              accept="image/*" // Membatasi agar pengguna hanya bisa memilih file gambar
              {...register("foto", { required: "Foto cover mading wajib diunggah" })}
              className={`w-full border rounded-xl px-4 py-2.5 text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
                errors.foto ? "border-red-500" : "border-gray-200"
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
              placeholder="Tuliskan isi berita atau materi artikel lengkap di sini..."
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

        {/* KOLOM KANAN: LIVE SCROLLABLE PREVIEW */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700">
              Live Preview Tampilan Artikel
            </label>
          </div>

          <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm h-140 overflow-y-auto custom-scrollbar">
            <div className="p-6 lg:p-8 space-y-5">
              {/* 1. Komponen Judul Utama */}
              <h1
                className={`font-bold text-gray-900 text-2xl lg:text-3xl tracking-tight leading-tight wrap-break-word ${
                  !judulPreview && "text-gray-300 italic font-medium"
                }`}
              >
                {judulPreview || "Lorem Ipsum Dolor sit Amet"}
              </h1>

              {/* 2. Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4 text-xs text-gray-400 font-medium">
                <div>{waktuSekarang}</div>
              </div>

              {/* 3. Komponen Foto Cover Utama (Live Object Preview) */}
              <div className="w-full aspect-video rounded-xl overflow-hidden bg-gray-50 border flex items-center justify-center group relative">
                {fotoWatch && fotoWatch.length > 0 ? (
                  <img
                    src={handleImagePreview() || ""} // 👈 5. Menggunakan URL blob lokal hasil upload file
                    alt="Article Cover Preview"
                    className="w-full h-full object-cover"
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

              {/* 4. Komponen Isi Berita */}
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
                Terbitkan Artikel
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
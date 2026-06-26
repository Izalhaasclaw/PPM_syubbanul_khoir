import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, ImageIcon, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { API } from "../../../lib/axios"; 

interface ArtikelForm {
  judul: string;
  isi: string;
  foto: FileList; 
}

export default function EditArtikel() {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true); 
  const [waktuPembuatan, setWaktuPembuatan] = useState("");
  const [currentFotoUrl, setCurrentFotoUrl] = useState<string | null>(null); 

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ArtikelForm>();

  
  const judulPreview = watch("judul");
  const fotoWatch = watch("foto"); 
  const isiPreview = watch("isi");

  
  const handleImagePreview = () => {
    if (fotoWatch && fotoWatch.length > 0) {
      return URL.createObjectURL(fotoWatch[0]);
    }
    return currentFotoUrl; 
  };

  
  useEffect(() => {
    const fetchDetailArtikel = async () => {
      try {
        setFetching(true);
        const res = await API.get(`/artikel-index/${id}`);
        const responseData = res.data;
        const artikel = responseData.data || responseData.artikel || responseData;

        if (artikel) {
          
          reset({
            judul: artikel.judul,
            isi: artikel.isi,
          });

          
          setCurrentFotoUrl(artikel.foto || null);

          
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
        navigate("/artikel-index");
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchDetailArtikel();
  }, [id, reset, navigate]);

  
  const onSubmit = async (data: ArtikelForm) => {
    try {
      setLoading(true);
      
      const formData = new FormData();
      formData.append("judul", data.judul);
      formData.append("isi", data.isi);

      
      if (data.foto && data.foto.length > 0) {
        formData.append("foto", data.foto[0]);
      }

      
      await API.put(`/artikel-index/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Artikel berhasil diperbarui!");
      navigate("/artikel-index");
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
        {}
        <div className="lg:col-span-5 space-y-5">
          {}
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

          {}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Ganti Foto Cover (Opsional)
            </label>
            <input
              type="file" 
              accept="image/*"
              {...register("foto")} 
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="text-xs text-gray-400 mt-1">
              Kosongkan jika tidak ingin mengubah foto cover mading saat ini.
            </p>
          </div>

          {}
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

        {}
        <div className="lg:col-span-7 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700">
              Live Preview Tampilan Artikel
            </label>
          </div>

          <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm h-140 overflow-y-auto custom-scrollbar">
            <div className="p-6 lg:p-8 space-y-5">
              {}
              <h1
                className={`font-bold text-gray-900 text-2xl lg:text-3xl tracking-tight leading-tight wrap-break-word ${
                  !judulPreview && "text-gray-300 italic font-medium"
                }`}
              >
                {judulPreview || "Lorem Ipsum Dolor sit Amet"}
              </h1>

              {}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4 text-xs text-gray-400 font-medium">
                <div>{waktuPembuatan || "Memuat tanggal..."}</div>
              </div>

              {}
              <div className="w-full aspect-video rounded-xl overflow-hidden bg-gray-50 border flex items-center justify-center group relative">
                {handleImagePreview() ? ( 
                  <img
                    src={handleImagePreview()!}
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

              {}
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

        {}
        <div className="lg:col-span-12 flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate("/artikel-index")}
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
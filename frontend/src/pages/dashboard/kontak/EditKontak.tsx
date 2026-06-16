import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface KontakForm {
  no_telepon: string;
  alamat: string;
  instagram: string;
  tiktok: string;
  youtube: string;
}

const API_URL = "http://localhost:3000/kontak";

export default function EditKontak() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<KontakForm>();

  // Memuat data lama berdasarkan ID saat halaman dibuka
  useEffect(() => {
    const fetchCurrentKontak = async () => {
      try {
        setFetching(true);
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error("Gagal mengambil data detail kontak");
        
        const responseData = await res.json();
        const data = responseData.data || responseData;
        
        // Memasukkan data lama ke dalam kolom form input
        reset({
          no_telepon: data.no_telepon || "",
          alamat: data.alamat || "",
          instagram: data.instagram || "",
          tiktok: data.tiktok || "",
          youtube: data.youtube || "",
        });
      } catch (error) {
        console.error(error);
        alert("Gagal memuat data kontak terkini.");
        navigate("/kontak");
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchCurrentKontak();
  }, [id, reset, navigate]);

  const onSubmit = async (data: KontakForm) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT", // Atau PATCH, sesuaikan dengan backend Anda
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Gagal memperbarui data kontak");

      alert("Data kontak berhasil diperbarui!");
      navigate("/kontak");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-gray-400">
        <Loader2 className="animate-spin mb-2" size={40} />
        <p>Memuat formulir konfigurasi...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        {/* HEADER FORM */}
        <div className="border-b border-gray-100 px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Edit Data Kontak</h1>
          <p className="text-gray-500 mt-1">Perbarui nomor hubungi kami dan akun media sosial resmi mading digital.</p>
        </div>

        {/* INPUT GRID FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* NO TELEPON */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Nomor Telepon / WhatsApp</label>
              <input
                type="text"
                placeholder="Contoh: 08123456789"
                {...register("no_telepon", { required: "Nomor telepon wajib diisi" })}
                className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 text-sm ${
                  errors.no_telepon ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-blue-500"
                }`}
              />
              {errors.no_telepon && <p className="text-sm text-red-500">{errors.no_telepon.message}</p>}
            </div>

            {/* INSTAGRAM */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Username Instagram</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400 text-sm select-none">@</span>
                <input
                  type="text"
                  placeholder="username_mading"
                  {...register("instagram")}
                  className="w-full border border-gray-200 rounded-xl pl-8 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            {/* TIKTOK */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Username TikTok</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400 text-sm select-none">@</span>
                <input
                  type="text"
                  placeholder="tiktok_mading"
                  {...register("tiktok")}
                  className="w-full border border-gray-200 rounded-xl pl-8 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            {/* YOUTUBE */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Nama Channel YouTube</label>
              <input
                type="text"
                placeholder="Contoh: Official Channel Mading"
                {...register("youtube")}
                className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          {/* ALAMAT (LEBAR PENUH / FULL WIDTH) */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Alamat Kantor / Instansi</label>
            <textarea
              rows={4}
              placeholder="Tuliskan nama jalan, gedung, nomor, RT/RW, kecamatan, kota, dan provinsi secara lengkap..."
              {...register("alamat", { required: "Alamat lengkap wajib diisi" })}
              className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 text-sm resize-none ${
                errors.alamat ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-blue-500"
              }`}
            />
            {errors.alamat && <p className="text-sm text-red-500">{errors.alamat.message}</p>}
          </div>

          {/* TOMBOL AKSI */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button 
              type="button" 
              onClick={() => navigate("/kontak")} 
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button 
              type="submit" 
              disabled={loading} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <><Loader2 size={18} className="animate-spin" /> Menyimpan...</>
              ) : (
                "Simpan Perubahan"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
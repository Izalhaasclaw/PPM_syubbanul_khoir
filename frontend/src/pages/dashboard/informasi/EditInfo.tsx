import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, Save } from "lucide-react";
import { API } from "../../../lib/axios";

interface InfoForm {
  telepon: string;
  email: string;
  alamat: string;
  instagram: string;
  tiktok: string;
  youtube: string;
}

export default function EditInfo() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InfoForm>();

  useEffect(() => {
    const fetchCurrentInfo = async () => {
      try {
        setFetching(true);

        const res = await API.get(`/informasi/${id}`);
        const responseData = res.data;
        const data = responseData.data || responseData;

        reset({
          telepon: data.telepon || "",
          email: data.email || "",
          alamat: data.alamat || "",
          instagram: data.instagram || "",
          tiktok: data.tiktok || "",
          youtube: data.youtube || "",
        });
      } catch (error) {
        console.error(error);
        alert("Gagal memuat data Info terkini.");
        navigate("/info");
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchCurrentInfo();
  }, [id, reset, navigate]);

  const onSubmit = async (data: InfoForm) => {
    try {
      setLoading(true);

      await API.put(`/informasi/${id}`, data);

      alert("Data Info berhasil diperbarui!");
      navigate("/info");
    } catch (error: any) {
      console.error(error);

      const errorMessage =
        error.response?.data?.message || "Gagal memperbarui data Info";
      alert(errorMessage);
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
    <div className="p-2">
      {}
      <div className="border-b border-gray-100 p-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Data Info</h1>
        <p className="text-gray-500 mt-1">
          Perbarui nomor hubungi kami dan akun media sosial resmi mading
          digital.
        </p>
      </div>

      {}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Nomor Telepon / WhatsApp
            </label>
            <input
              type="text"
              placeholder="Contoh: 08123456789"
              {...register("telepon", {
                required: "Nomor telepon wajib diisi",
              })}
              className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 text-sm ${
                errors.telepon
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:ring-blue-500"
              }`}
            />
            {errors.telepon && (
              <p className="text-sm text-red-500">
                {errors.telepon.message}
              </p>
            )}
          </div>

          {}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="text"
              placeholder="Contoh: admin@gmail.com"
              {...register("email", {
                required: "Eamail wajib diisi",
              })}
              className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 text-sm ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:ring-blue-500"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          {}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Username Instagram
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-400 text-sm select-none">
                @
              </span>
              <input
                type="text"
                placeholder="username_mading"
                {...register("instagram")}
                className="w-full border border-gray-200 rounded-xl pl-8 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          {}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Username TikTok
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-400 text-sm select-none">
                @
              </span>
              <input
                type="text"
                placeholder="tiktok_mading"
                {...register("tiktok")}
                className="w-full border border-gray-200 rounded-xl pl-8 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          {}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Nama Channel YouTube
            </label>
            <input
              type="text"
              placeholder="Contoh: Official Channel Mading"
              {...register("youtube")}
              className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

        {}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">
            Alamat Kantor / Instansi
          </label>
          <textarea
            rows={4}
            placeholder="Tuliskan nama jalan, gedung, nomor, RT/RW, kecamatan, kota, dan provinsi secara lengkap..."
            {...register("alamat", { required: "Alamat lengkap wajib diisi" })}
            className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 text-sm resize-none ${
              errors.alamat
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:ring-blue-500"
            }`}
          />
          {errors.alamat && (
            <p className="text-sm text-red-500">{errors.alamat.message}</p>
          )}
        </div>

        {}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate("/info")}
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
                <Save size={18} />
                Simpan Perubahan
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

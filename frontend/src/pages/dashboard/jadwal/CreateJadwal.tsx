import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Loader2, PlusCircle } from "lucide-react";
import { API } from "../../../lib/axios";

interface JadwalForm {
  acara: string;
  lokasi: string;
  tanggal: string;
  waktu: string;
}

export default function CreateJadwal() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JadwalForm>();

  const onSubmit = async (data: JadwalForm) => {
    try {
      setLoading(true);

      await API.post("/jadwal-index", data);

      alert("Jadwal baru berhasil ditambahkan!");
      navigate("/jadwal-index");
    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "Gagal membuat jadwal baru";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2">
      {}
      <div className="border-b border-gray-100 p-6">
        <h1 className="text-3xl font-bold text-gray-900">Tambah Jadwal Baru</h1>
        <p className="text-gray-500 mt-1">
          Buat agenda kegiatan atau acara mendatang untuk diinformasikan di
          mading.
        </p>
      </div>

      {}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">
              Nama Acara / Kegiatan
            </label>
            <input
              type="text"
              placeholder="Contoh: Rapat Koordinasi Anggota Mading"
              {...register("acara", { required: "Nama acara wajib diisi" })}
              className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 text-sm ${
                errors.acara
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:ring-blue-500"
              }`}
            />
            {errors.acara && (
              <p className="text-sm text-red-500">{errors.acara.message}</p>
            )}
          </div>

          {}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">
              Lokasi Pelaksanaan
            </label>
            <input
              type="text"
              placeholder="Contoh: Ruang Meeting Gedung A / Zoom Meeting"
              {...register("lokasi", { required: "Lokasi wajib diisi" })}
              className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 text-sm ${
                errors.lokasi
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:ring-blue-500"
              }`}
            />
            {errors.lokasi && (
              <p className="text-sm text-red-500">{errors.lokasi.message}</p>
            )}
          </div>

          {}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Tanggal Acara
            </label>
            <input
              type="date"
              {...register("tanggal", { required: "Tanggal wajib diisi" })}
              className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 text-sm ${
                errors.tanggal
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:ring-blue-500"
              }`}
            />
            {errors.tanggal && (
              <p className="text-sm text-red-500">{errors.tanggal.message}</p>
            )}
          </div>

          {}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Waktu Pelaksanaan (Jam)
            </label>
            <input
              type="text"
              placeholder="Contoh: 09:00 - selesai atau 13:00 - 15:00"
              {...register("waktu", {
                required: "Waktu pelaksanaan wajib diisi",
              })}
              className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 text-sm ${
                errors.waktu
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:ring-blue-500"
              }`}
            />
            {errors.waktu && (
              <p className="text-sm text-red-500">{errors.waktu.message}</p>
            )}
          </div>
        </div>

        {}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate("/jadwal-index")}
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
                <PlusCircle size={18} />
                Tambah Jadwal
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

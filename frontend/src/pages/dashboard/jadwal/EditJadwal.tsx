import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, Save } from "lucide-react";
import { API } from "../../../lib/axios";

interface JadwalForm {
  acara: string;
  lokasi: string;
  tanggal: string;
  waktu: string;
}

export default function EditJadwal() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<JadwalForm>();

  useEffect(() => {
    const fetchCurrentJadwal = async () => {
      try {
        setFetching(true);
        // Response showJadwalById langsung mengembalikan objek jadwal raw
        const res = await API.get(`/jadwal/${id}`);
        const data = res.data;

        // Memformat ISO Date dari backend ke format string input date standar (YYYY-MM-DD)
        const formattedDate = data.tanggal ? new Date(data.tanggal).toISOString().split("T")[0] : "";

        reset({
          acara: data.acara || "",
          lokasi: data.lokasi || "",
          tanggal: formattedDate,
          waktu: data.waktu || "",
        });
      } catch (error) {
        console.error(error);
        alert("Jadwal tidak ditemukan atau gagal memuat data.");
        navigate("/jadwal");
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchCurrentJadwal();
  }, [id, reset, navigate]);

  const onSubmit = async (data: JadwalForm) => {
    try {
      setLoading(true);
      
      // Mengirimkan pembaruan ke route PUT /jadwal/:id
      await API.put(`/jadwal/${id}`, data);

      alert("Jadwal berhasil diperbarui!");
      navigate("/jadwal");
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Gagal memperbarui data jadwal";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-gray-400">
        <Loader2 className="animate-spin mb-2" size={40} />
        <p>Memuat formulir konfigurasi jadwal...</p>
      </div>
    );
  }

  return (
    <div className="p-2">
      {/* HEADER FORM */}
      <div className="border-b border-gray-100 p-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Data Jadwal</h1>
        <p className="text-gray-500 mt-1">Perbarui detail acara, pergeseran waktu, atau pemindahan lokasi agenda kegiatan.</p>
      </div>

      {/* GRID INPUT FORM */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* NAMA ACARA */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">Nama Acara / Kegiatan</label>
            <input
              type="text"
              placeholder="Contoh: Rapat Koordinasi Anggota Mading"
              {...register("acara", { required: "Nama acara wajib diisi" })}
              className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 text-sm ${
                errors.acara ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-blue-500"
              }`}
            />
            {errors.acara && <p className="text-sm text-red-500">{errors.acara.message}</p>}
          </div>

          {/* LOKASI */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">Lokasi Pelaksanaan</label>
            <input
              type="text"
              placeholder="Contoh: Ruang Meeting Gedung A / Zoom Meeting"
              {...register("lokasi", { required: "Lokasi wajib diisi" })}
              className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 text-sm ${
                errors.lokasi ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-blue-500"
              }`}
            />
            {errors.lokasi && <p className="text-sm text-red-500">{errors.lokasi.message}</p>}
          </div>

          {/* TANGGAL */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Tanggal Acara</label>
            <input
              type="date"
              {...register("tanggal", { required: "Tanggal wajib diisi" })}
              className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 text-sm ${
                errors.tanggal ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-blue-500"
              }`}
            />
            {errors.tanggal && <p className="text-sm text-red-500">{errors.tanggal.message}</p>}
          </div>

          {/* WAKTU */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Waktu Pelaksanaan (Jam)</label>
            <input
              type="text"
              placeholder="Contoh: 09:00 - selesai"
              {...register("waktu", { required: "Waktu pelaksanaan wajib diisi" })}
              className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 text-sm ${
                errors.waktu ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-blue-500"
              }`}
            />
            {errors.waktu && <p className="text-sm text-red-500">{errors.waktu.message}</p>}
          </div>
        </div>

        {/* TOMBOL AKSI */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button 
            type="button" 
            onClick={() => navigate("/jadwal")} 
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
              <><Loader2 size={18} className="animate-spin" /> Menyimpan...</>
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
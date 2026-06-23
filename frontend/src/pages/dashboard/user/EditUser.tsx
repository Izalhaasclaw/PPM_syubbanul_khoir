import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { API } from "../../../lib/axios"; 
import { authStore } from "../../../store/AuthStore"; // 👈 1. Impor authStore untuk cek user login
import { Loader2, ImageIcon, Eye, EyeOff } from "lucide-react";

interface UserForm {
  name: string;
  username: string;
  password?: string;
  foto: string;
}

export default function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserForm>();

  const fotoPreview = watch("foto");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setFetchLoading(true);
        const res = await API.get(`/users/${id}`);
        const result = res.data;
        const data = result.data || result.user || result;

        reset({
          name: data.name || "",
          username: data.username || "",
          password: "", // 👈 2. Biarkan password kosong secara default saat muat data
          foto: data.foto || "",
        });
      } catch (error) {
        console.error(error);
        alert("Data user tidak ditemukan");
        navigate("/user");
      } finally {
        setFetchLoading(false);
      }
    };
    if (id) fetchUser();
  }, [id, reset, navigate]);

  const onSubmit = async (data: UserForm) => {
    try {
      setLoading(true);

      // 👈 3. Buat objek payload baru tanpa menyertakan password kosong
      const updateData: any = {
        name: data.name,
        username: data.username,
        foto: data.foto,
      };

      // Hanya kirim password ke backend jika diisi oleh user
      if (data.password && data.password.trim() !== "") {
        updateData.password = data.password;
      }

      // Kirim data hasil filter ke API
      await API.put(`/users/${id}`, updateData);

      alert("User berhasil diupdate!");

      // 👈 4. Cek apakah user yang diedit adalah akun yang sedang digunakan login
      const loggedInUser = authStore.getState().user; // Kesesuaian properti (misal: .user atau .currentUser) bisa disesuaikan dengan isi AuthStore Anda
      
      if (loggedInUser && String(loggedInUser.id) === String(id)) {
        alert("Profil Anda telah diperbarui. Silakan login kembali dengan data baru.");
        authStore.getState().logout(); // Logout otomatis
        navigate("/login"); // Arahkan ke halaman login
      } else {
        navigate("/user"); // Jika mengedit user lain, kembali ke daftar user
      }
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Gagal update user";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-gray-400">
        <Loader2 className="animate-spin mb-3" size={45} />
        <p>Memuat data user...</p>
      </div>
    );
  }

  return (
    <div className="p-2">
      <div className="border-b border-gray-100 p-2">
        <h1 className="text-3xl font-bold text-gray-900">Edit User</h1>
        <p className="text-gray-500 mt-1">Perbarui informasi profil pengguna</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6"
      >
        <div className="space-y-5">
          {/* NAMA */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Nama Lengkap
            </label>
            <input
              type="text"
              {...register("name", { required: "Nama wajib diisi" })}
              className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:ring-blue-500"
              }`}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* USERNAME */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Username
            </label>
            <input
              type="text"
              {...register("username", { required: "Username wajib diisi" })}
              className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.username
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:ring-blue-500"
              }`}
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Ubah password jika diperlukan (Kosongkan jika tidak ingin diubah)"
                {...register("password", {
                  // 👈 5. Gunakan custom validate agar minimal 6 karakter hanya dicek jika ada inputan
                  validate: (value) => 
                    !value || value.length >= 6 || "Password minimal 6 karakter"
                })}
                className={`w-full border rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-200 focus:ring-blue-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* URL FOTO */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              URL Foto
            </label>
            <input
              type="text"
              {...register("foto", { required: "URL Foto wajib diisi" })}
              className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.foto
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:ring-blue-500"
              }`}
            />
            {errors.foto && (
              <p className="text-sm text-red-500">{errors.foto.message}</p>
            )}
          </div>
        </div>

        {/* PREVIEW FOTO */}
        <div className="flex flex-col items-center">
          <label className="text-sm font-semibold text-gray-700 mb-2">
            Preview Image
          </label>
          <div className="w-4/5 aspect-square border border-dashed border-gray-300 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center">
            {fotoPreview ? (
              <img
                src={fotoPreview}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => { 
                  (e.target as HTMLImageElement).src = "https://placehold.co/400?text=Foto+Tidak+Ditemukan"; 
                }}
              />
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <ImageIcon size={50} />
                <p className="mt-3 text-sm">
                  Preview image akan muncul di sini
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="lg:col-span-2 flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate("/user")}
            className="px-5 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Updating...
              </>
            ) : (
              "Update User"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
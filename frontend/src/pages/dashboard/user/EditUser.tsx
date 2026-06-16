import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Loader2, ImageIcon, Eye, EyeOff } from "lucide-react";

interface UserForm {
  name: string;
  email: string;
  password: string; // Tambah field password
  image: string;
}

const API_URL = "http://localhost:3000/users";

export default function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false); // Toggle Sembunyikan/Tampilkan

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserForm>();
  const imagePreview = watch("image");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setFetchLoading(true);
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error("Gagal mengambil data user");

        const result = await res.json();
        const data = result.data || result.user || result;

        reset({
          name: data.name || "",
          email: data.email || "",
          password: data.password || "", // Set value awal password dari API
          image: data.image || "",
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
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Gagal update user");

      alert("User berhasil diupdate!");
      navigate("/user");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
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
    <div className="p-4">
      <div className="max-w-5xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-100 px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Edit User</h1>
          <p className="text-gray-500 mt-1">
            Perbarui informasi profil pengguna
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8"
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

            {/* EMAIL */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Alamat Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email wajib diisi",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Format email tidak valid",
                  },
                })}
                className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-200 focus:ring-blue-500"
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
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
                  placeholder="Ubah password jika diperlukan"
                  {...register("password", {
                    required: "Password wajib diisi",
                    minLength: {
                      value: 6,
                      message: "Password minimal 6 karakter",
                    },
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
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* AVATAR URL */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Avatar URL
              </label>
              <input
                type="text"
                {...register("image", { required: "URL Foto wajib diisi" })}
                className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${
                  errors.image
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-200 focus:ring-blue-500"
                }`}
              />
              {errors.image && (
                <p className="text-sm text-red-500">{errors.image.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">
              Preview Image
            </label>

            <div className="w-full aspect-square border border-dashed border-gray-300 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
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
    </div>
  );
}

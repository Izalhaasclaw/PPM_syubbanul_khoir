import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API } from "../../../lib/axios"; // 👈 Hubungkan ke instance Axios kamu
import { Loader2, ImageIcon, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface UserForm {
  name: string;
  username: string; 
  password: string;
  foto: string;     
}

export default function CreateUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<UserForm>();
  
  const fotoPreview = watch("foto");

  // 👈 Menggunakan API.post("/users", data)
  const onSubmit = async (data: UserForm) => {
    try {
      setLoading(true);
      await API.post("/users", data);

      alert("User berhasil dibuat!");
      navigate("/user");
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Gagal membuat user";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2">
      <div className="border-b border-gray-100 p-2">
        <h1 className="text-3xl font-bold text-gray-900">Create User</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
        <div className="space-y-5">
          {/* NAMA LENGKAP */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Nama Lengkap</label>
            <input
              type="text"
              placeholder="Masukkan nama lengkap"
              {...register("name", { required: "Nama wajib diisi" })}
              className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-blue-500"
              }`}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          {/* USERNAME */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Username</label>
            <input
              type="text"
              placeholder="Masukkan username"
              {...register("username", { 
                required: "Username wajib diisi",
                minLength: { value: 4, message: "Username minimal 4 karakter" }
              })}
              className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.username ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-blue-500"
              }`}
            />
            {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password akun"
                {...register("password", { 
                  required: "Password wajib diisi",
                  minLength: { value: 6, message: "Password minimal 6 karakter" }
                })}
                className={`w-full border rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 ${
                  errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-blue-500"
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
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          {/* URL FOTO */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">URL Foto</label>
            <input
              type="text"
              placeholder="https://example.com/foto.jpg"
              {...register("foto", { required: "URL Foto wajib diisi" })}
              className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${
                errors.foto ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-blue-500"
              }`}
            />
            {errors.foto && <p className="text-sm text-red-500">{errors.foto.message}</p>}
          </div>
        </div>

        {/* PREVIEW FOTO */}
        <div className="flex flex-col items-center">
          <label className="text-sm font-semibold text-gray-700 mb-2">Preview Foto</label>
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
                <p className="mt-3 text-sm">Preview foto akan muncul di sini</p>
              </div>
            )}
          </div>
        </div>

        {/* ACTION BUTTONS */}
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
            className="bg-[#35A2FD] hover:bg-[#1D8DF5] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? (
              <><Loader2 size={18} className="animate-spin" /> Loading...</>
            ) : (
              "Create User"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}


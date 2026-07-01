import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { API } from "../../../lib/axios"; 
import { authStore } from "../../../store/AuthStore"; 
import { Loader2, ImageIcon, Eye, EyeOff } from "lucide-react";

interface UserForm {
  name: string;
  username: string;
  password?: string;
  foto: FileList; 
}

export default function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [currentFotoUrl, setCurrentFotoUrl] = useState<string | null>(null); 

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserForm>();

  const fotoWatch = watch("foto"); 

  
  const handleImagePreview = () => {
    if (fotoWatch && fotoWatch.length > 0) {
      return URL.createObjectURL(fotoWatch[0]);
    }
    return currentFotoUrl; 
  };

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
          password: "", 
        });

        
        setCurrentFotoUrl(data.foto || null);
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

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("username", data.username);

      
      if (data.password && data.password.trim() !== "") {
        formData.append("password", data.password);
      }

      
      if (data.foto && data.foto.length > 0) {
        formData.append("foto", data.foto[0]);
      }

      
      await API.put(`/users/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("User berhasil diupdate!");

      
      const loggedInUser = authStore.getState().user; 
      
      if (loggedInUser && String(loggedInUser.id) === String(id)) {
        alert("Profil Anda telah diperbarui. Silakan login kembali dengan data baru.");
        authStore.getState().logout(); 
        navigate("/login"); 
      } else {
        navigate("/user"); 
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
          {}
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

          {}
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

          {}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Ubah password jika diperlukan (Kosongkan jika tidak ingin diubah)"
                {...register("password", {
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

          {}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Ganti Foto Profil (Opsional)
            </label>
            <input
              type="file" 
              accept="image/*"
              {...register("foto")} 
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="text-xs text-gray-400 mt-1">
              Kosongkan jika tidak ingin mengubah foto profil saat ini.
            </p>
          </div>
        </div>

        {}
        <div className="flex flex-col items-center">
          <label className="text-sm font-semibold text-gray-700 mb-2">
            Preview Image
          </label>
          <div className="w-4/5 aspect-square border border-dashed border-gray-300 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center">
            {handleImagePreview() ? ( 
              <img
                src={handleImagePreview()!}
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

        {}
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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../../lib/axios"; 
import {
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";

interface User {
  id: number;
  name: string;
  username: string; 
  password?: string;
  foto: string; 
}

const ITEMS_PER_PAGE = 6;

export default function UserIndex() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [visiblePasswords, setVisiblePasswords] = useState<Record<number, boolean>>({});

  const togglePasswordVisibility = (id: number) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/users");
      
      const responseData = res.data;
      const result = responseData.data || responseData.users || responseData;

      if (Array.isArray(result)) {
        setUsers(result);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error(error);
      alert("Gagal memuat data user.");
    } finally {
      setLoading(false);
    }
  };

  
  const handleDelete = async (id: number, name: string) => {
    const confirmDelete = window.confirm(
      `Apakah kamu yakin ingin menghapus user "${name}"?`,
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/users/${id}`);
      alert("User berhasil dihapus!");
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Gagal menghapus user.";
      alert(errorMessage);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-6 p-2">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900">Data User</h1>
          <p className="text-gray-500">Manajemen data hak akses pengguna.</p>
        </div>
        <Link to="/user/create-user">
          <button className="bg-[#35A2FD] hover:bg-[#1D8DF5] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all shadow-sm">
            <Plus size={20} />
            Tambah User
          </button>
        </Link>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 className="animate-spin mb-2" size={40} />
            <p>Memuat data...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#0F172A] border-b border-[#0F172A] ">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-white uppercase text-center w-20">ID</th>
                    <th className="px-6 py-4 text-sm font-semibold text-white uppercase">Foto</th>
                    <th className="px-6 py-4 text-sm font-semibold text-white uppercase">Nama</th>
                    <th className="px-6 py-4 text-sm font-semibold text-white uppercase">Username</th>
                    <th className="px-6 py-4 text-sm font-semibold text-white uppercase">Password</th>
                    <th className="px-6 py-4 text-sm font-semibold text-white uppercase text-center w-32">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                  {currentUsers.length > 0 ? (
                    currentUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 text-center font-semibold text-gray-500">#{user.id}</td>
                        <td className="px-6 py-4">
                          <img
                            src={user.foto || "https://placehold.co/150"}
                            alt={user.name}
                            className="w-12 h-12 rounded-full object-cover border"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://placehold.co/150";
                            }}
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-800">{user.name}</td>
                        <td className="px-6 py-4 text-gray-600">{user.username}</td>
                        <td className="px-6 py-4 text-gray-600 font-mono text-sm">
                          <div className="flex items-center gap-2">
                            <span>
                              {visiblePasswords[user.id] ? user.password || "-" : "••••••••"}
                            </span>
                            {user.password && (
                              <button
                                onClick={() => togglePasswordVisibility(user.id)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                              >
                                {visiblePasswords[user.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <Link
                              to={`/user/edit-user/${user.id}`}
                              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg"
                              title="Edit User"
                            >
                              <Edit size={18} />
                            </Link>
                            <button
                              onClick={() => handleDelete(user.id, user.name)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                              title="Hapus User"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-20 text-gray-400">
                        Data user tidak ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="bg-white px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500">
                Menampilkan <span className="font-medium">{indexOfFirstItem + 1}</span> sampai{" "}
                <span className="font-medium">{Math.min(indexOfLastItem, users.length)}</span> dari{" "}
                <span className="font-medium">{users.length}</span> data
              </div>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="p-2 border rounded-lg disabled:opacity-50"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage((p) => p + 1)} 
                  className="p-2 border rounded-lg disabled:opacity-50"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../../components/ui/InputText";
import { InputPassword } from "../../components/ui/InputPassword";
import { Button } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { authStore } from "../../store/AuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoginRequest, LoginResponse } from "../../types/Auth";
import { API } from "../../lib/axios";
import type { AxiosError } from "axios";


type FormData = {
  username: string;
  password: string;
};

const schema = z.object({
  username: z.string().min(2, "Username tidak valid"),
  password: z.string().min(6, "Password harus minimal 6 karakter"),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const login = authStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const LoginMutation = useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const response = await API.post<LoginResponse>("/auth", credentials);
      return response.data;
    },
    onSuccess: (data) => {
      login({
        user: data.user,
        token: data.token,
      });
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard");
    },
    onError: (error: AxiosError) => {
      const message = error.message || "Kesalahan Berpikir Wok";
      alert("Login Gagal: " + message);
    },
  });

  const onSubmit = (data: FormData) => {
    LoginMutation.mutate(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-7 "
      >
        <div className="mb-2">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Selamat Datang
          </h1>
          <p className="text-gray-500 mt-1">Silakan masuk ke akun Anda</p>
        </div>
        <Input
          label="Username"
          register={register}
          name="username"
          error={errors.username?.message}
        />
        <InputPassword
          label="Password"
          register={register}
          name="password"
          error={errors.password?.message}
        />
        <Button type="submit" label="Login" variant="primary" />
      </form>
    </div>
  );
}

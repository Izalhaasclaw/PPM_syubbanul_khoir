import { Outlet } from "react-router-dom";
export default function AuthLayout() {
  return (
    <div className="grid grid-cols-2 items-center min-h-screen">
      <div className="bg-gray-50 h-screen flex flex-col items-center justify-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWipLyc4xy0_uUx0rjBydHjGVwVJo7QElbiagr0sA-e7ZZoRFx6jzeBQ0i&s=10"
          alt=""
          className="h-full object-cover"
        />
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}

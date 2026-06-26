import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardLayout from "./layouts/dashboardLayout";
import DashboardIndex from "./pages/dashboard/dashboardIndex";
import UserIndex from "./pages/dashboard/user/UserIndex";
import CreateUser from "./pages/dashboard/user/CreateUser";
import ArtikelIndex from "./pages/dashboard/articels/ArtikelIndex";
import CreateArtikel from "./pages/dashboard/articels/CreateArtikel";
import InfoIndex from "./pages/dashboard/informasi/InfoIndex";
import EditInfo from "./pages/dashboard/informasi/EditInfo";
import RouteGuard from "./routes/RouteGuard";
import LoginForm from "./pages/LoginForm";
import AuthLayout from "./layouts/AuthLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EditUser from "./pages/dashboard/user/EditUser";
import EditArtikel from "./pages/dashboard/articels/EditArtikel";
import JadwalIndex from "./pages/dashboard/jadwal/JadwalIndex";
import CreateJadwal from "./pages/dashboard/jadwal/CreateJadwal";
import EditJadwal from "./pages/dashboard/jadwal/EditJadwal";

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login-form" element={<LoginForm />} />
        </Route>

        <Route element={<RouteGuard />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardIndex />} />
            <Route path="/user" element={<UserIndex />} />
            <Route path="/user/create-user" element={<CreateUser />} />
            <Route path="/user/edit-user/:id" element={<EditUser />} />
            
            <Route path="/artikel" element={<ArtikelIndex />} />
            <Route path="/artikel/create-artikel" element={<CreateArtikel />} />
            <Route path="/artikel/edit-artikel/:id" element={<EditArtikel />} />

            <Route path="/jadwal" element={<JadwalIndex />} />
            <Route path="/jadwal/create-jadwal" element={<CreateJadwal />} />
            <Route path="/jadwal/edit-jadwal/:id" element={<EditJadwal />} />
            
            <Route path="/info" element={<InfoIndex />} />
            <Route path="/info/edit-info/:id" element={<EditInfo />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

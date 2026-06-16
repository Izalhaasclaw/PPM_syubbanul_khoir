import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardLayout from "./layouts/dashboardLayout";
import DashboardIndex from "./pages/dashboard/dashboardIndex";
import UserIndex from "./pages/dashboard/user/UserIndex";
import CreateUser from "./pages/dashboard/user/CreateUser";
import ArtikelIndex from "./pages/dashboard/articels/ArtikelIndex";
import CreateArtikel from "./pages/dashboard/articels/CreateArtikel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<RouteGuard />}> */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardIndex />} />
          <Route path="/user" element={<UserIndex />} />
          <Route path="/user/create-user" element={<CreateUser/>}/>
          <Route path="/artikel" element={<ArtikelIndex />} />
          <Route path="/artikel/create-artikel" element={<CreateArtikel/>}/>

        </Route>
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

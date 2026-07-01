import { Outlet } from "react-router-dom";
import Footer from "../components/footer.tsx";
import Header from "../components/header.tsx";

export default function MainLayout() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50 ">
        <Header />
      </div>

      <main className="grow w-full flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

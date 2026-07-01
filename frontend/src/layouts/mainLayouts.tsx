import { Outlet } from "react-router-dom";
import Footer from "../components/footer.tsx";
import Header from "../components/header.tsx";

export default function MainLayout() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50">

      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <main className="grow w-full max-w-7xl mx-auto pt-17 pb-8 px-3 sm:px-4 md:px-6 flex flex-col">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
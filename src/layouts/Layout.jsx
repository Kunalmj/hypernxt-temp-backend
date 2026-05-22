
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer"

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={`flex flex-col bg-[#f8fafc] ${pathname === "/ai-helper" ? "h-screen overflow-hidden" : "min-h-screen"}`}>
      
      <Navbar />

      <main className="grow">
        <Outlet />
      </main>

      {pathname !== "/ai-helper" && <Footer />}

    </div>
  );
};

export default Layout;
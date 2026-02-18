import { useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header";

const Layout = ({ children }) => {
  const location = useLocation();
  const pathname = location?.pathname || "";
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");

  return (
    <div>
      <Header variant={isAuthPage ? "auth" : "default"} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;

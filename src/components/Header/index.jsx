import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import SearchBar from "./SearchBar";
import AuthLinks from "./AuthLinks";
import CartIcon from "./CartIcon";
import MainNav from "./MainNav";
import Button from "../Button/Button";
import { useAuth } from "../../hooks/useAuth";
import menuIcon from "../../assets/icons/bx-menu.webp";

const Header = ({ variant = "default" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  if (variant === "auth") {
    return (
      <header className="w-full bg-white">
        <div className="max-w-[1440px] mx-auto px-[16px] min-[641px]:px-[24px] min-[1025px]:px-[100px] pt-[20px] min-[641px]:pt-[32px]">
          <div className="flex items-center justify-center min-[641px]:justify-start">
            <Logo />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full bg-white relative z-[60]">
      <div className="max-w-[1440px] mx-auto px-[16px] min-[641px]:px-[24px] min-[1025px]:px-[100px] pt-[20px] min-[641px]:pt-[32px]">
        <div className="flex items-center justify-between gap-[16px]">
          <div className="flex items-center gap-[12px]">
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="w-[32px] h-[32px] flex items-center justify-center min-[641px]:hidden"
              aria-label="Abrir menu"
            >
              <img
                src={menuIcon}
                alt="Menu"
                className="w-[24px] h-[24px] object-contain"
              />
            </button>
            <Logo />
          </div>
          <div className="hidden min-[641px]:flex flex-1 justify-center">
            <SearchBar className="max-w-[560px]" />
          </div>
          <div className="flex items-center gap-[12px]">
            <div className="hidden min-[641px]:flex items-center gap-[12px]">
              {currentUser ? (
                <>
                  <span className="text-[14px] text-neutral-darkGray2">
                    Olá, <span className="font-bold">{currentUser.name.split(" ")[0]}</span>
                  </span>
                  <Button
                    size="lg"
                    variant="primary"
                    className="px-[40px] text-[16px]"
                    onClick={logout}
                  >
                    Sair
                  </Button>
                </>
              ) : (
                <AuthLinks />
              )}
            </div>
            <CartIcon />
          </div>
        </div>

        <div className="mt-[16px] hidden min-[641px]:block">
          <MainNav />
        </div>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black z-[40] min-[641px]:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-[75%] max-w-[280px] bg-white border-r border-neutral-lightGray2 z-[50] p-[24px] flex flex-col gap-[16px] min-[641px]:hidden overflow-y-auto">
            <nav className="flex flex-col gap-[10px] mt-[40px]">
              {[
                { to: "/", label: "Home" },
                { to: "/produtos", label: "Produtos" },
                { to: "/categorias", label: "Categorias" },
                { to: "/pedidos", label: "Meus Pedidos" }
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-[16px] py-[10px] rounded-[12px] text-[16px] font-semibold no-underline underline-offset-[4px] transition ${
                      isActive
                        ? "bg-neutral-lightGray3 text-[#C92071]"
                        : "text-[#111111] hover:bg-neutral-lightGray3"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-auto pt-[16px] border-t border-neutral-lightGray2 flex flex-col gap-[8px]">
              {currentUser ? (
                <Button
                  size="lg"
                  variant="primary"
                  className="w-full text-[14px]"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                >
                  Sair
                </Button>
              ) : (
                <>
                  <Link to="/login" className="no-underline" onClick={() => setIsOpen(false)}>
                    <Button
                      size="lg"
                      variant="primary"
                      className="w-full text-[14px]"
                    >
                      Entrar
                    </Button>
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="text-[14px] text-[#4A90E2] font-semibold underline text-center"
                  >
                    Cadastrar-se
                  </Link>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;

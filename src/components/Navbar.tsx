import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
// import logo from "../assets/Logo-H.png";
import LanguageSelector from "./LanguageSelector";
import { Menu } from "lucide-react";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { getThemeColors } from "../utils";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();
  const logoSrc = localStorage.getItem("logo");
  const theme = getThemeColors();

  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  // Handle Mouse Click outside
  const closeMenu = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeMenu);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, []);

  return (
    <nav
      style={{
        backgroundColor: theme.primary,
        color: "white",
      }}
      className="p-4 px-6 flex items-center justify-between z-50 w-full"
    >
      <Link to="/" className="flex items-center">
        {logoSrc ? (
          <div className="px-3 py-1 rounded shadow flex items-center justify-center bg-white">
            <img src={logoSrc} alt="Logo" className="h-10 max-w-[150px] object-contain" />
          </div>
        ) : (
          <h1 className="text-xl font-bold truncate max-w-[200px]">
            {localStorage.getItem("restaurantName")}
          </h1>
        )}
      </Link>
      <div className="flex items-center gap-4">
        <LanguageSelector />
        <div className="relative">
          <button onClick={toggleMenu} className="focus:outline-none p-2 hover:bg-opacity-20 hover:bg-white rounded-full transition-colors">
            {isOpen ? (
              <IoClose className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {isOpen && (
            <div
              ref={menuRef}
              className={`absolute top-full ${
                i18n.language === "ar" ? "right-0" : "left-0"
              } mt-2 w-48 rounded-md shadow-lg font-montserrat overflow-hidden`}
              style={{
                backgroundColor: "white",
                color: theme.primary,
              }}
            >
              {["Home", "Menu", "Survey"].map((item) => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="block px-4 py-3 hover:bg-gray-100 transition-colors"
                  style={{
                    color: "var(--color-gray-800)",
                  }}
                  onClick={toggleMenu}
                >
                  {t(item)}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

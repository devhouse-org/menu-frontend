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
      className="p-4 px-6 flex items-center justify-between fixed z-50 w-screen"
    >
      <Link to="/">
        {logoSrc ? (
          <div className="w-36 p-1 rounded shadow  bg-white">
            <img src={logoSrc} alt="Logo" className="h-12" />
          </div>
        ) : (
          <h1 className="text-lg font-bold">
            {localStorage.getItem("restaurantName")}
          </h1>
        )}
      </Link>
      <div className="flex items-center gap-5  ">
        <LanguageSelector />
        <div className="relative flex">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? (
              <IoClose className="h-8 w-8" />
            ) : (
              <Menu className="h-8 w-8" />
            )}
          </button>

          {isOpen && (
            <div
              ref={menuRef}
              className={`absolute top-12 ${
                i18n.language === "ar" ? "-right-28" : "-left-20"
              } mt-1 w-max rounded-md shadow-lg font-montserrat`}
              style={{
                backgroundColor: "white",
                color: theme.primary,
              }}
            >
              <Link
                to="/"
                className="block px-4 py-2 rounded-md hover:"
                style={{
                  color: "var(--color-gray-800)",
                }}
                onClick={toggleMenu}
              >
                {t("Home")}
              </Link>

              <Link
                to="/menu"
                className="block px-4 py-2 rounded-md"
                style={{
                  color: "var(--color-gray-800)",
                }}
                onClick={toggleMenu}
              >
                {t("Menu")}
              </Link>
              <Link
                to="/survey"
                className="block px-4 py-2 rounded-md"
                style={{
                  color: "var(--color-gray-800)",
                }}
                onClick={toggleMenu}
              >
                {t("Survey")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

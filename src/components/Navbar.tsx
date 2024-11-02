import React from "react";
import { Link, NavLink } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import { Menu, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getThemeColors } from "../utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const logoSrc = localStorage.getItem("logo");
  const theme = getThemeColors();

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
        <NavLink 
          to="/survey" 
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 text-sm font-medium text-white rounded-md transition-colors group ${
              isActive ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-20'
            }`
          }
        >
          <Star className="h-4 w-4 group-hover:fill-current" />
          {t("Survey")}
        </NavLink>
        <LanguageSelector />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="focus:outline-none p-2 hover:bg-opacity-20 hover:bg-white rounded-full transition-colors">
              <Menu className="h-6 w-6" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align={i18n.language === "ar" ? "end" : "start"}
            className="w-48"
            style={{
              backgroundColor: "white",
              color: theme.primary,
            }}
          >
            {["Home", "Menu", "Survey"].map((item) => (
              <DropdownMenuItem key={item} asChild>
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="w-full px-4 py-3 hover:bg-gray-100 transition-colors"
                  style={{
                    color: "var(--color-gray-800)",
                  }}
                >
                  {t(item)}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;

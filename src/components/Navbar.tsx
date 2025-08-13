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
    <nav className="sticky top-0 z-50 py-3 w-full">
      <div
        className="relative overflow-hidden mx-auto max-w-6xl flex items-center justify-between rounded-[24px] bg-white/80 backdrop-blur ring-1 ring-black/5 shadow-md px-4 py-2"
        style={{
          background: `linear-gradient(135deg, ${theme.primary}12 0%, rgba(255,255,255,0.95) 100%)`,
        }}
      >
        <div
          className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none"
          style={{ background: theme.primary, opacity: 0.08, filter: "blur(12px)" }}
        />
        <Link to="/" className="flex items-center">
          {logoSrc ? (
            <div className="flex justify-center items-center px-3 py-1 bg-white rounded-xl ring-1 shadow-sm ring-black/5">
              <img src={logoSrc} alt="Logo" className="h-10 max-w-[150px] object-contain" />
            </div>
          ) : (
            <h1 className="text-xl font-bold truncate max-w-[200px]">
              {localStorage.getItem("restaurantName")}
            </h1>
          )}
        </Link>
        <div className="flex gap-3 items-center">
          <NavLink
            to="/survey"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-colors ring-1 ${
                isActive
                  ? 'bg-primary text-primary-foreground ring-primary/40'
                  : 'bg-white/80 text-primary ring-black/5 hover:bg-white'
              }`
            }
          >
            <Star className="w-4 h-4" />
            {t('Survey')}
          </NavLink>
          <LanguageSelector />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-full ring-1 bg-white/70 ring-black/5 hover:bg-white focus:outline-none">
                <Menu className="w-6 h-6" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align={i18n.language === 'ar' ? 'end' : 'start'}
              className="w-48"
              style={{ color: theme.primary, backgroundColor: 'white' }}
            >
              {['Home', 'Menu', 'Survey'].map((item) => (
                <DropdownMenuItem key={item} asChild>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="px-4 py-3 w-full transition-colors hover:bg-gray-100"
                    style={{ color: 'var(--color-gray-800)' }}
                  >
                    {t(item)}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// import BG from "../assets/BG.png";
import React from "react";
import { getThemeColors } from "../utils";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface props {
  handleLogout: () => void;
}

const WelcomePage: React.FC<props> = ({ handleLogout }) => {
  const theme = getThemeColors();
  const { t } = useTranslation();
  return (
    <div
      className="flex relative flex-col justify-center items-center p-6 w-screen min-h-screen font-montserrat"
      style={{
        // color: "white",
        backgroundColor: theme.background,
      }}
    >
      {/* Background Pattern */}
      {/* <div
				className='absolute z-0 w-full h-full backdrop-blur-sm bg-primary'
				style={{
					backgroundImage: `url(${BG})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			></div> */}
      <div className="flex z-20 flex-col gap-6 justify-center items-center p-6 w-9/12">
        {/* Text */}
        <h1 className="text-4xl">
          {t("Welcome")},
          <span className="pl-3" style={{ color: theme.primary }}>
            {t(localStorage.getItem("restaurantName") as string)}
          </span>
        </h1>
        {/* Links */}

        <Link
          to="/menu"
          className="px-4 py-4 mt-4 w-full text-xl font-semibold text-center text-white rounded-md"
          style={{
            color: "white",
            backgroundColor: theme.primary,
          }}
        >
          {t("Menu")}
        </Link>
        <Link
          to="/survey"
          className="px-4 py-4 mt-4 w-full text-xl font-semibold text-center text-white rounded-md"
          style={{
            color: "white",
            backgroundColor: theme.primary,
          }}
        >
          {t("Survey")}
        </Link>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="px-4 py-4 mt-4 w-full text-xl font-semibold text-white rounded-md"
          style={{
            color: "white",
            backgroundColor: theme.primary,
          }}
        >
          {t("Log Out")}
        </button>
      </div>
    </div>
    );
};

export default WelcomePage;

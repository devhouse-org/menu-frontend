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
      className="relative w-screen min-h-screen flex flex-col justify-center items-center font-montserrat p-6"
      style={{
        // color: "white",
        backgroundColor: theme.background,
      }}
    >
      {/* Background Pattern */}
      {/* <div
				className='absolute bg-primary w-full h-full z-0 backdrop-blur-sm'
				style={{
					backgroundImage: `url(${BG})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			></div> */}
      <div className="flex flex-col justify-center items-center w-9/12 gap-6 p-6 z-20">
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
          className="mt-4 w-full text-xl text-center text-white font-semibold py-4 px-4 rounded-md"
          style={{
            color: "white",
            backgroundColor: theme.primary,
          }}
        >
          {t("Menu")}
        </Link>
        <Link
          to="/survey"
          className="mt-4 w-full text-xl text-white  text-center  font-semibold py-4 px-4 rounded-md "
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
          className="mt-4 w-full text-white text-xl font-semibold py-4 px-4 rounded-md"
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

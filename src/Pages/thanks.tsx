import { useTranslation } from "react-i18next";
import { getThemeColors } from "../utils";

const ThankYouPage = () => {
    const {t} = useTranslation()
    const theme = getThemeColors();
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <div className="bg-white p-10 border rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">{t("Thank You!")}</h1>
          <p className="text-gray-600 mb-6">
            {t("Your submission has been received. We appreciate your feedback.")}
          </p>
          <button
          style={{
            background:theme.primary,
            color:"white"
          }}
            className=" text-white px-4 py-2 rounded-lg transition duration-200"
            onClick={() => window.location.href = '/menu'}
          >
            {t("Back to Menu")}
          </button>
        </div>
      </div>
    );
  };
  
  export default ThankYouPage;
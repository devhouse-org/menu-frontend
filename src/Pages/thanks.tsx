import { useTranslation } from "react-i18next";
import { getThemeColors } from "../utils";

const ThankYouPage = () => {
    const {t} = useTranslation()
    const theme = getThemeColors();
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="p-10 text-center bg-white rounded-lg border shadow-lg">
          <h1 className="mb-4 text-3xl font-semibold text-gray-800">{t("Thank You!")}</h1>
          <p className="mb-6 text-gray-600">
            {t("Your submission has been received. We appreciate your feedback.")}
          </p>
          <button
          style={{
            background:theme.primary,
            color:"white"
          }}
            className="px-4 py-2 text-white rounded-lg transition duration-200"
            onClick={() => window.location.href = '/menu'}
          >
            {t("Back to Menu")}
          </button>
        </div>
      </div>
    );
  };
  
  export default ThankYouPage;
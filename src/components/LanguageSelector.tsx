import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getThemeColors } from "../utils";

function LanguageSelector() {
  const { i18n } = useTranslation();
  const theme = getThemeColors();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
    document.body.dir = language === "ar" ? "rtl" : "ltr";
  };
  return (
    <button
      onClick={() => changeLanguage(i18n.language === "ar" ? "en" : "ar")}
      style={{
        color: theme.primary,
        backgroundColor: "white",
      }}
      className="flex items-center text-xs cursor-pointer shadow-lg gap-1 p-1 px-2 relative rounded-lg"
    >
      {i18n.language === "ar" ? "اللغة العربية" : "English"}
      <Globe size={16} style={{ color: theme.secondary }} />
    </button>
  );
}

export default LanguageSelector;

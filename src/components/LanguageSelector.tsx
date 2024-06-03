import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function LanguageSelector() {
    const { i18n } = useTranslation();

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
        localStorage.setItem('language', language);
        document.body.dir = language === 'ar' ? 'rtl' : 'ltr'
    };
    return (
			<button
				onClick={() =>
					changeLanguage(
						i18n.language === "ar" ? "en" : "ar"
					)
				}
				style={{
					color: "var(--color-primary)",
					backgroundColor: "white",
				}}
				className='flex items-center text-xs cursor-pointer shadow-lg gap-1 p-1 px-2 relative rounded-lg'
			>
				{i18n.language === "ar"
					? "English"
					: "اللغة العربية"}
				<Globe
					size={16}
					style={{ color: "var(--color-secondary)" }}
				/>
			</button>
		);
}

export default LanguageSelector;

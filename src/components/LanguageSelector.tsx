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
        <button onClick={() => changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')} className='flex items-center text-xs cursor-pointer shadow-lg gap-1 p-1 px-2 relative rounded-lg text-Yale-Blue-900 bg-white'>
            {i18n.language === 'ar' ? 'English' : 'اللغة العربية' }
            <Globe size={16} className={`text-coral-600 `} />
        </button>
    );
}

export default LanguageSelector;

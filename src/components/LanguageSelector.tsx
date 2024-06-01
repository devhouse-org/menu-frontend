import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function LanguageSelector() {
    const { i18n } = useTranslation();

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
        localStorage.setItem('language', language);

        // Set document direction based on selected language
        document.body.dir = language === 'ar' ? 'rtl' : 'ltr';
    };

    return (
        <div className='flex items-center gap-1 p-1 relative rounded-lg bg-white'>
            <Globe className={`text-black absolute `} />
            <select className={`text-black  ${i18n.language === 'ar' ? 'pr-10' : 'pl-10'}`} onChange={(e) => changeLanguage(e.target.value)} value={i18n.language}>
                <option value="en">English</option>
                <option value="ar">Arabic</option>
            </select>
        </div>
    );
}

export default LanguageSelector;

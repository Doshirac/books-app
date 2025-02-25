import { useTranslation } from "react-i18next";

export const LanguageChange = () => {
    const { i18n } = useTranslation();

    const handleLanguageChange = (event) => {
        const selectedLang = event.target.value;
        i18n.changeLanguage(selectedLang);
    }

    return (
        <div>
            <select
                value={i18n.language}
                onChange={handleLanguageChange}
                className=""
            >
                <option value="en">English</option>
                <option value="de">Deutsch</option>
                <option value="pl">Polish</option>
            </select>
        </div>
    )
}
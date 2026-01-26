import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

const languages = [
    {
        id: 1,
        code: 'uz',
        short: 'Uzb',
        lang: 'O’zbek',
        flag: '/images/flags/uz.svg'
    },
    {
        id: 2,
        code: 'en',
        short: 'Eng',
        lang: 'English',
        flag: '/images/flags/en.svg'
    },
    {
        id: 3,
        code: 'ru',
        short: 'Рус',
        lang: 'Русский',
        flag: '/images/flags/ru.svg'
    }
]

const language = languages.find(l => l.code == localStorage.getItem('language'))?.code || languages[0].code
const langs = languages.map(l => l.code)

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: language,
        fallbackLng: languages[0].code,
        detection: {
            lookupLocalStorage: 'language'
        },
        interpolation: {
            escapeValue: false
        },
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json' // Til fayllari joylashuvi
        },
        supportedLngs: langs
    })

export {languages, language}
export default i18n

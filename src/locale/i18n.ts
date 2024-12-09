import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./langs/en/index.json"; // Import translations for each language

const languages = ["en", "vi", "zh-CN"];
const resources: any = {};

languages.forEach((language) => {
  resources[language] = {
    translation: {
      Account: require(`./langs/${language}/account.json`),
      ...require(`./langs/${language}/index.json`),
      ...require(`./langs/${language}/index2.json`),
    },
  };
});

i18n.use(initReactI18next).init({
  resources: resources,
  lng: "vi",
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

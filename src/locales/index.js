
//import en from './en.json';
import fr from './fr.json';

let actualLocale = 'fr';

const data = [
    { language: "French", code: "fr" },

]

function setLanguage(language) {
    let d = data.find((el) => el.language == language);
    setLocale(d ? d.code : 'fr');
    return actualLocale;
}

function getLanguages() {
    return data;
}

function setLocale(code) {
    actualLocale = code;
}

function getLocale(code = actualLocale) {
   // return DatePickerLang.find((el) => el.code === code);
}

export default {
    setLocale,
    getLocale,
    setLanguage,
    getLanguages,
    //     en,
    fr,
};
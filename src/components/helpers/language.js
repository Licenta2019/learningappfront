import messages_ro from '../../lang/ro.json';
import messages_en from '../../lang/en.json';

import { addLocaleData } from "react-intl";
import locale_en from 'react-intl/locale-data/en';
import locale_ro from 'react-intl/locale-data/ro';

export const ENGLISH = 'en';
export const ROMANIAN = 'ro';

export const LANGUAGE = 'LANGUAGE';

addLocaleData([...locale_en, ...locale_ro]); // add languages

export let i18config = {
    locale: ENGLISH,
    messages: messages_en,
    default: ENGLISH
}

export const changeLanguage = (lang) => {
    i18config = {
        locale: lang.value,
        messages: lang.value === ENGLISH ? messages_en : messages_ro,
        default: i18config.default
    }
}

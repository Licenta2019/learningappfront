import { addLocaleData } from 'react-intl';
import locale_en from 'react-intl/locale-data/en';
import locale_ro from 'react-intl/locale-data/ro';

import messages_ro from '../lang/ro.json';
import messages_en from '../lang/en.json';
addLocaleData([...locale_en, ...locale_ro]);

export const SET_LANGUAGE = 'Set language';

export const ENGLISH = {
    language: 'en',
    messages: messages_en
};

export const ROMANIAN = {
    language: 'ro',
    messages: messages_ro
};

export function setLanguage(lang) {
    return {
        type: SET_LANGUAGE,
        payload: {
            language: lang.language,
            messages: lang.messages
        }
    }
}

import { ENGLISH, SET_LANGUAGE } from "../actions/i18n";

const initialState = ENGLISH;

export function languageReducer(state = initialState, action) {

    switch (action.type) {
        case SET_LANGUAGE:

            return {
                // ...state,
                locale: action.payload.language,
                messages: action.payload.messages
            }

        default:
            return state;
    }


}

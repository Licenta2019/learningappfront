export const AUTHENTICATED = 'Authenticated';
export const UNAUTHENTICATED = 'Unauthenticated';

const initialState = {
    user: null,
    isAuthenticated: false
}

export function authenticationReducer(state = initialState, action) {
    switch (action.type) {
        case AUTHENTICATED:
            return {
                user: action.payload,
                isAuthenticated: true
            }
        case UNAUTHENTICATED:
            return {
                user: null,
                isAuthenticated: false
            }
        default:
            return state
    }
}

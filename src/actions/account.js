import { UNAUTHENTICATED } from "../reducers/account";
import { AUTHENTICATED } from "../reducers/account";

export function authenticate(account) {
    console.log(account);
    
    localStorage.setItem(AUTHENTICATED, account.jwtToken);

    return {
        type: AUTHENTICATED,
        payload: account
    }
}

export function unauthenticate() {
    localStorage.removeItem(AUTHENTICATED);

    return {
        type: UNAUTHENTICATED,
        payload: "Hope you come back soon!"
    }
}

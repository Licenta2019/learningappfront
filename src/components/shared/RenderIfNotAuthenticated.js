import { AUTHENTICATED_USER } from "../constants/user";

export const RenderIfNotAuthenticated = ({ account, children }) => {

    if (!localStorage.getItem(AUTHENTICATED_USER)) {
        console.log("not authenticated");
        console.log("mda" + localStorage.getItem(AUTHENTICATED_USER));
        return children;
    } else {
        return null;
    }
}

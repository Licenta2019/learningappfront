import { AUTHENTICATED_USER } from "../constants/user";

export const RenderIfShouldNotify = ({ account, children }) => {

    if (localStorage.getItem(AUTHENTICATED_USER).notificationsEnabled === true) {
        return children;
    } else {
        return null;
    }
}

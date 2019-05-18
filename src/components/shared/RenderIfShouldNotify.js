import { AUTHENTICATED_USER } from "../constants/user";

export const RenderIfShouldNotify = ({ account, children }) => {

    if (!localStorage.getItem(AUTHENTICATED_USER).notificationEnabled === true) {
        return children;
    } else {
        return null;
    }
}

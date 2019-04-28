import { setAuthorizationToken } from "./login";
import routePaths from "../../routes/routePaths";

export const logoutHandler = (history) => {
    //TODO(Paul) - use this handler at logout after burger menu is refactored
    setAuthorizationToken(null);
    history.replace(routePaths.login);
}

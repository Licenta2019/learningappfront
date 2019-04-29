import { setAuthorizationToken } from "./login";
import { unauthenticateUser } from "../../localStorage";

export const handleLogout = (history) => {
    setAuthorizationToken(null);
    unauthenticateUser();
}

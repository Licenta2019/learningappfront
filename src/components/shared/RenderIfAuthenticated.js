import { AUTHENTICATED_USER } from "../constants/user";

export const RenderIfAuthenticated = ({ account, children }) => {
  
  if (localStorage.getItem(AUTHENTICATED_USER)) {
    console.log("authenticated");
    
    console.log(localStorage.getItem(AUTHENTICATED_USER));

    return children;
  } else {
    return null;
  }
}

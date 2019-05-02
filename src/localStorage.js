import { throwSubmissionError } from "./components/helpers/errors";
import { AUTHENTICATED_USER } from "./components/constants/user";

const LOCAL_STORAGE_KEY = 'reduxState';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);

    localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
  } catch (err) {
    // Failed to save state to localStorage
  }
};

export const authenticateUser = (user) => {
  try {
    const serializedUser = JSON.stringify(user);

    localStorage.setItem(AUTHENTICATED_USER, serializedUser);
  }
  catch (err) {
    throwSubmissionError("Failed to authenticate user, reason:" + err);
  }
};

export const unauthenticateUser = () => {
  localStorage.setItem(AUTHENTICATED_USER, null);
}

export const getUser = () => {
  try {
    const serializedState = localStorage.getItem(AUTHENTICATED_USER);

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

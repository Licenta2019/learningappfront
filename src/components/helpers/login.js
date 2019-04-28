import axiosClient from './../../axios/axiosClient';

export const setAuthorizationToken = (token) => {
    axiosClient.defaults.headers.common['Authorization'] = "Bearer " + token;
};

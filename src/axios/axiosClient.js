import axios from 'axios';
import { getUser } from '../localStorage';

function getAxiosClient() {

    let axiosClient = axios.create({
        baseURL: 'http://localhost:8080'
    });

    const token = getUser().jwtToken;
    
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    
    return axiosClient;
}

const axiosClient = getAxiosClient();

export default axiosClient;

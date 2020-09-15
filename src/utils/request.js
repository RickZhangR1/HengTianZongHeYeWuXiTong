import axios from 'axios';

const request = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout:5000
});

request.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
}
);

request.interceptors.response.use(respone => {
    return respone
}, error => {
    return Promise.reject(error)
}
);


export default  request
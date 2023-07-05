import axioss from 'axios';
// export const API_URL = 'http://localhost:3000/api/v1/';
// export const API_URL = 'http://18.224.88.112/api/v1/'; // Live
export const API_URL = 'http://localhost:8080/api/v1/'; // Sohaib
// export const API_URL = 'http://192.168.3.108:3000/api/v1/'; //Dawood
// export const API_URL = 'http://192.168.3.41:3000/api/v1/'; // Abdullah
const axios = axioss.create({
    baseURL: API_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

axios.interceptors.response.use(
    function (response) {
        // Do something with response data

        return response;
    }
    // , function (error, response) {
    //   if(error.response.status === 401){
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('role');
    //     window.location = '/'
    //     }
    // }
);

export default axios;

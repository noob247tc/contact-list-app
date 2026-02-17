import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

api.interceptors.request.use((config)=>{
    console.log('Making request to', config.url);
    return config;
},
(error)=>{
    return Promise.reject(error);
});

api.interceptors.response.use((response) =>{
    return response;
},
(error) =>{
    if(error.response){
        console.error('API Error:', error.response.date)
    }else if (error.request){
        console.error('No response from server. Is json-server running?');
    }else{
        console.error('Error', error.message);
    }
    return Promise.reject(error);
}
);

export default api;
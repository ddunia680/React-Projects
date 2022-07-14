import axios from "axios";

const instance = axios.create({
    baseURL: 'https://buffet-app-back-default-rtdb.firebaseio.com/'
});

export default instance;
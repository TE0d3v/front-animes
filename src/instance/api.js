import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4888'
})

export default instance;
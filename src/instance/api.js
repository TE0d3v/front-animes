import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4888'
})

instance.interceptors.request.use( (config) => {
    const token = localStorage.getItem('token')

    if (token){
        config.headers.Authorization = token
    }

    return config;
// Este interceptor é executado antes de cada requisição feita pelo 'instance'.
// Ele busca o token de autenticação salvo no localStorage.
// Se o token existir, adiciona o token no cabeçalho Authorization da requisição.
// Isso garante que todas as requisições autenticadas enviem o token automaticamente.
} )

export default instance;
import axios from 'axios'
import {language} from '../i18n'

const API = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_API || ''}/api/${language}`
})

API.interceptors.request.use(
    config => {
        const token = localStorage.getItem('access-token')

        if (token) {
            config.headers.Authorization = token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
export default API

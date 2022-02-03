import axios from 'axios'

import { getLocalAccessToken, getLocalRefreshToken } from '../services/authentication'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        "Content-Type": "application/json",
    }
})

function refreshToken() {
    return api.post('/auth/refresh-tokens', {
        refreshToken: getLocalRefreshToken(),
    });
}

api.interceptors.request.use(
    (config) => {
        const token = getLocalAccessToken();
        if (token) {
            config.headers["Authorization"] = token;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (err.response) {
            const authErrorsStatusCodes = [419, 401];
            // Access Token was expired
            if (authErrorsStatusCodes.includes(err.response.status) && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const rs = await refreshToken();
                    const { accessToken } = rs.data;
                    sessionStorage.setItem('accessToken', accessToken);
                    api.defaults.headers.common["Authorization"] = accessToken;
        
                    return api(originalConfig);
                } catch (_error) {
                    if (_error.response && _error.response.data) {
                        return Promise.reject(_error.response.data);
                    }
        
                    return Promise.reject(_error);
                }
            }

            if (err.response.status === 403 && err.response.data) {
                return Promise.reject(err.response.data);
            }
        }

        return Promise.reject(err);
    }
);

export const insertMovie = payload => api.post(`/movie`, payload)
export const getAllMovies = () => api.get(`/movies`)
export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
export const deleteMovieById = id => api.delete(`/movie/${id}`)
export const getMovieById = id => api.get(`/movie/${id}`)

export const resetPassword = payload => api.post(`/auth/reset-password`, payload)
export const confirmNewPassword = payload => api.post(`/auth/confirm-new-password`, payload)

export const confirmRegistration = payload => api.post(`/auth/confirm-registration`, payload)

export const addedUser = payload => api.post(`/auth/registration`, payload)
export const loginUser = payload => api.post(`/auth/login`, payload)

const apis = {
    insertMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById,
    resetPassword,
    confirmNewPassword,
    confirmRegistration,
    addedUser,
    loginUser,

}

export default apis

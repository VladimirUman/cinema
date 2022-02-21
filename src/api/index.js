import axios from 'axios'

import { authenticationService } from '../services/authentication'

export const BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
})

api.interceptors.request.use(
    async (config) => {
        const token = await authenticationService.getLocalAccessToken();
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
            // Access Token was expired
            if (err.response.status === 419 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const rs = await axios.post(BASE_URL + '/auth/refresh-tokens', { refreshToken: authenticationService.getLocalRefreshToken() });
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

            if (err.response.status === 401) {
                authenticationService.deleteLocalTokens();
            }

            if (err.response.data) {
                return Promise.reject(err.response.data);
            }
        }

        return Promise.reject(err);
    }
);

export const insertMovie = payload => api.post(`/movies`, payload)
export const getAllMovies = () => api.get(`/movies`)
export const updateMovieById = (id, payload) => api.put(`/movies/${id}`, payload)
export const deleteMovieById = id => api.delete(`/movies/${id}`)
export const getMovieById = id => api.get(`/movies/${id}`)

export const resetPassword = payload => api.post(`/auth/reset-password`, payload)
export const confirmNewPassword = payload => api.post(`/auth/confirm-new-password`, payload)
export const refreshTokens = payload => api.post(`/auth/refresh-tokens`, payload)

export const confirmRegistration = payload => api.post(`/auth/confirm-registration`, payload)

export const addedUser = payload => api.post(`/auth/registration`, payload)
export const loginUser = payload => api.post(`/auth/login`, payload)
export const logout = payload => api.post('/auth/logout', payload)
export const getUsers = () => api.get(`/users`)
export const updateAccount = (payload) => api.put(`/account`, payload)
export const getAccount = () => api.get(`/account`)

export const changePassword = payload => api.put('/account/change-password', payload)
export const getUserById = id => api.get(`/users/${id}`)
export const updateUser = (id, payload) => api.put(`/users/${id}`, payload)
export const deleteUser = id => api.delete(`/users/${id}`)

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
    refreshTokens,
    logout,
    getUsers,
    updateAccount,
    getAccount,
    changePassword,
    getUserById,
    updateUser,
    deleteUser
}

export default apis
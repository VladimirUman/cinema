import axios from 'axios'

import { authenticationService } from '../services/authentication'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        "Content-Type": "application/json",
    }
})

api.interceptors.request.use(
    (config) => {
        const token = authenticationService.getLocalAccessToken();
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
                    const rs = await apis.refreshTokens({ refreshToken: authenticationService.getLocalRefreshToken() });
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
    logout
}

export default apis

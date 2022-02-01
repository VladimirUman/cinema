import axios from 'axios'

import setAuthHeader from '../services/authentication'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertMovie = payload => api.post(`/movie`, payload, { headers: setAuthHeader() })
export const getAllMovies = () => api.get(`/movies`, { headers: setAuthHeader() })
export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload, { headers: setAuthHeader() })
export const deleteMovieById = id => api.delete(`/movie/${id}`, { headers: setAuthHeader() })
export const getMovieById = id => api.get(`/movie/${id}`, { headers: setAuthHeader() })

const apis = {
    insertMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById,
}

export default apis

import { BehaviorSubject } from 'rxjs';
import axios from "axios";

import api, { BASE_URL } from '../api';

const accessTokenSubject = new BehaviorSubject(sessionStorage.getItem('accessToken'));

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

async function getLocalAccessToken() {
    let accessToken = sessionStorage.getItem('accessToken');

    if (!accessToken) {
        accessTokenSubject.next(null);

        return null;
    }

    const tokenData = parseJwt(accessToken);

    if (!tokenData) {
        accessTokenSubject.next(null);

        return null;
    }

    if (Date.now() > tokenData.exp * 1000) {
        try {
            const response = await axios.post(BASE_URL + '/auth/refresh-tokens', {
                refreshToken: getLocalRefreshToken(),
            });

            accessToken = response.data.accessToken;
            sessionStorage.setItem('accessToken', accessToken);
        } catch (_) {
            accessTokenSubject.next(null);

            return null;
        }
    }

    accessTokenSubject.next(accessToken);

    return accessToken;
}

function getLocalRefreshToken() {
    const refreshToken = sessionStorage.getItem('refreshToken');
    return refreshToken;
}

function deleteLocalTokens() {
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('accessToken');

    accessTokenSubject.next(null);
}

async function logout() {
    api.logout({ refreshToken: getLocalRefreshToken() });

    deleteLocalTokens();
}

export const authenticationService = {
    getLocalAccessToken,
    getLocalRefreshToken,
    observableToken: accessTokenSubject.asObservable(),
    logout,
    deleteLocalTokens
}

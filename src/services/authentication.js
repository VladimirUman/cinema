import { BehaviorSubject } from 'rxjs';

import api from '../api'

const accessTokenSubject = new BehaviorSubject(sessionStorage.getItem('accessToken'));

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

function getLocalAccessToken() {
    let accessToken = sessionStorage.getItem('accessToken');

    if (!accessToken) {
        return null;
    }

    const tokenData = parseJwt(accessToken);

    if (!tokenData) {
        return null;
    }

    if (Date.now() > tokenData.exp * 1000) {
        try {
            const response = api.refreshTokens({
                refreshToken: getLocalRefreshToken(),
            });

            accessToken = response.data.accessToken;
            sessionStorage.setItem('accessToken', accessToken);
        } catch (_) {
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

async function logout() {
    api.logout({ refreshToken: getLocalRefreshToken() });

    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('accessToken');

    accessTokenSubject.next(null);
}

export const authenticationService = {
    getLocalAccessToken,
    getLocalRefreshToken,
    isLogedIn: accessTokenSubject.asObservable(),
    logout
}

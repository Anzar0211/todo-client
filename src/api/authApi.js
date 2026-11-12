import { httpClient as defaultHttp } from './httpClient.js';

export function createAuthApi(http = defaultHttp) {
  return {
    register: (payload) => http.request('/auth/register', { method: 'POST', body: payload, auth: false }),
    login: (payload) => http.request('/auth/login', { method: 'POST', body: payload, auth: false }),
    me: () => http.request('/auth/me'),
  };
}

export const authApi = createAuthApi();

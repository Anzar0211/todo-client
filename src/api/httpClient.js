import { tokenStorage as defaultTokenStorage } from './tokenStorage.js';

export function createHttpClient({
  baseUrl = import.meta.env.VITE_API_URL || '/api',
  tokens = defaultTokenStorage,
} = {}) {
  return {
    async request(path, { method = 'GET', body, auth = true } = {}) {
      const headers = { 'Content-Type': 'application/json' };
      if (auth) {
        const token = tokens.get();
        if (token) headers.Authorization = `Bearer ${token}`;
      }

      let res;
      try {
        res = await fetch(`${baseUrl}${path}`, {
          method,
          headers,
          body: body && JSON.stringify(body),
        });
      } catch {
        throw new Error('Cannot reach the server. Check that the API is running.');
      }

      const data = res.status === 204 ? null : await res.json().catch(() => null);
      if (!res.ok) {
        const err = new Error(data?.message || 'Something went wrong');
        err.status = res.status;
        throw err;
      }
      return data;
    },
  };
}

export const httpClient = createHttpClient();

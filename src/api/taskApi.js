import { httpClient as defaultHttp } from './httpClient.js';

export function createTaskApi(http = defaultHttp) {
  return {
    list: () => http.request('/tasks'),
    create: (task) => http.request('/tasks', { method: 'POST', body: task }),
    update: (id, changes) => http.request(`/tasks/${id}`, { method: 'PUT', body: changes }),
    remove: (id) => http.request(`/tasks/${id}`, { method: 'DELETE' }),
  };
}

export const taskApi = createTaskApi();

import axios from 'axios';

const api = axios.create({
    baseURL: '/api', 
    withCredentials: true, 
    headers: {
        'Content-Type': 'application/json',
    },
});

export const eventsApi = {
    getAll: () => api.get('/events').then((res) => res.data),
    getOne: (id: string) => api.get(`/events/${id}`).then((res) => res.data),
    create: (data: any) => api.post('/events', data).then((res) => res.data),
    update: (id: string, data: any) => api.put(`/events/${id}`, data).then((res) => res.data),
    delete: (id: string) => api.delete(`/events/${id}`).then((res) => res.data),
};

export const channelsApi = {
    getAll: (eventId: string) => api.get(`/events/${eventId}/channels`).then((res) => res.data),
    create: (eventId: string, data: any) => api.post(`/events/${eventId}/channels`, data).then((res) => res.data),
};

export const tasksApi = {
    getAll: (eventId: string) => api.get(`/events/${eventId}/tasks`).then((res) => res.data),
    create: (eventId: string, data: any) => api.post(`/events/${eventId}/tasks`, data).then((res) => res.data),
    update: (id: string, data: any) => api.put(`/events/tasks/${id}`, data).then((res) => res.data),
};

export const expensesApi = {
    getAll: (eventId: string) => api.get(`/events/${eventId}/expenses`).then((res) => res.data),
    create: (eventId: string, data: any) => api.post(`/events/${eventId}/expenses`, data).then((res) => res.data),
};

export default api;

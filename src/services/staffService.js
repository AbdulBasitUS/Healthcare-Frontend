import API from './api';

export const addStaff = (data) => API.post('/staff', data);
export const getStaff = () => API.get('/staff');

import API from './api';

export const createShift = (data) => API.post('/shift', data);
export const getShifts = () => API.get('/shift');
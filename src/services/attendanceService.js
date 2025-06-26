import API from './api';

export const markAttendance = (data) => API.post('/attendance', data);
export const getAttendanceByShift = (shiftId) => API.get(`/attendance/${shiftId}`);
export const getAttendanceByStaff = (staffId) => API.get(`/attendance/staff/${staffId}`);
export const getAttendanceByDate = (date) => API.get(`/attendance/date/${date}`);


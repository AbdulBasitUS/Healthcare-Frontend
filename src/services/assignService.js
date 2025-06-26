import API from './api';

export const assignStaff = (shiftId, staffId) =>
  API.post(`/shift/${shiftId}/assign`, { staffId });

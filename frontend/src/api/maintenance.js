import axios from '../axiosConfig.jsx';
export const listRequests   = (p={})   => axios.get('/maintenance', { params: p }).then(r=>r.data);
export const createRequest  = (data)   => axios.post('/maintenance', data).then(r=>r.data);
export const updateRequest  = (id,d)   => axios.patch(`/maintenance/${id}`, d).then(r=>r.data);
export const deleteRequest  = (id)     => axios.delete(`/maintenance/${id}`).then(r=>r.data);

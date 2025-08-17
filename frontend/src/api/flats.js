import axios from '../axiosConfig.jsx';
export const listFlats  = (p={})     => axios.get('/flats', { params: p }).then(r=>r.data);
export const createFlat = (data)     => axios.post('/flats', data).then(r=>r.data);
export const updateFlat = (id,data)  => axios.patch(`/flats/${id}`, data).then(r=>r.data);
export const deleteFlat = (id)       => axios.delete(`/flats/${id}`).then(r=>r.data);

import axios from '../axiosConfig.jsx';
export const listTenants  = () => axios.get('/tenants').then(r=>r.data);
export const createTenant = (data) => axios.post('/tenants', data).then(r=>r.data);
export const updateTenant = (id,d) => axios.patch(`/tenants/${id}`, d).then(r=>r.data);
export const deleteTenant = (id)   => axios.delete(`/tenants/${id}`).then(r=>r.data);

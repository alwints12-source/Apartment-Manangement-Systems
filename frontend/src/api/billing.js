import axios from '../axiosConfig.jsx';
export const listInvoices   = (p={})   => axios.get('/billing', { params: p }).then(r=>r.data);
export const createInvoice  = (data)   => axios.post('/billing', data).then(r=>r.data);
export const addPayment     = (id,d)   => axios.post(`/billing/${id}/payments`, d).then(r=>r.data);
export const updateInvoice  = (id,d)   => axios.patch(`/billing/${id}`, d).then(r=>r.data);
export const deleteInvoice  = (id)     => axios.delete(`/billing/${id}`).then(r=>r.data);

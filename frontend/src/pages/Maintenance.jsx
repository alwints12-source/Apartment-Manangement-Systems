import { useEffect, useState } from 'react';
import { listRequests, createRequest, deleteRequest } from '../api/maintenance';
import { listFlats } from '../api/flats';

export default function Maintenance(){
  const [items, setItems] = useState([]);
  const [flats, setFlats] = useState([]);
  const [form, setForm] = useState({ flat:'', title:'', description:'', priority:'low', dueDate:'' });

  const load = async () => {
    const [m,f] = await Promise.all([listRequests(), listFlats()]);
    setItems(m); setFlats(f);
  };
  useEffect(()=>{ load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try { await createRequest(form); setForm({ flat:'', title:'', description:'', priority:'low', dueDate:'' }); await load(); }
    catch (e) { alert(e.response?.data?.message || 'Failed'); }
  };

  return (
    <div style={{padding:24}}>
      <h2>Maintenance</h2>
      <form onSubmit={submit} style={{display:'grid', gap:8, maxWidth:500}}>
        <select value={form.flat} onChange={e=>setForm({...form, flat:e.target.value})}>
          <option value="">Select Flat</option>
          {flats.map(f=> <option key={f._id} value={f._id}>{f.block}-{f.unit}</option>)}
        </select>
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})}/>
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})}/>
        <select value={form.priority} onChange={e=>setForm({...form, priority:e.target.value})}>
          <option>low</option><option>medium</option><option>high</option>
        </select>
        <input type="date" value={form.dueDate} onChange={e=>setForm({...form, dueDate:e.target.value})}/>
        <button style={{background:'#1d4ed8', color:'#fff', border:'none', padding:'8px 12px'}}>Create Request</button>
      </form>

      <table style={{width:'100%', marginTop:16}}>
        <thead><tr><th>Flat</th><th>Title</th><th>Priority</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {items.map(m=>(
            <tr key={m._id}>
              <td>{m.flat?.block}-{m.flat?.unit}</td>
              <td>{m.title}</td>
              <td>{m.priority}</td>
              <td>{m.status}</td>
              <td><button onClick={async()=>{ await deleteRequest(m._id); await load(); }} style={{color:'#b91c1c'}}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

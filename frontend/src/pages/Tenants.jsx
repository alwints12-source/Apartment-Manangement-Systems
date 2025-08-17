import { useEffect, useState } from 'react';
import { listTenants, createTenant, deleteTenant } from '../api/tenants';
import { listFlats } from '../api/flats';

export default function Tenants(){
  const [items, setItems] = useState([]);
  const [flats, setFlats] = useState([]);
  const [form, setForm] = useState({ name:'', email:'', phone:'', flat:'', leaseStart:'', leaseEnd:'' });

  const load = async () => {
    const [t, f] = await Promise.all([listTenants(), listFlats()]);
    setItems(t); setFlats(f);
  };
  useEffect(()=>{ load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await createTenant(form);
      setForm({ name:'', email:'', phone:'', flat:'', leaseStart:'', leaseEnd:'' });
      await load();
      alert('Tenant added');
    } catch (e) { alert(e.response?.data?.message || 'Failed'); }
  };

  return (
    <div style={{padding:24}}>
      <h2>Tenants</h2>
      <form onSubmit={submit} style={{display:'grid', gap:8, maxWidth:500}}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
        <input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}/>
        <select value={form.flat} onChange={e=>setForm({...form, flat:e.target.value})}>
          <option value="">Select Flat</option>
          {flats.map(f=> <option key={f._id} value={f._id}>{f.block}-{f.unit}</option>)}
        </select>
        <input type="date" value={form.leaseStart} onChange={e=>setForm({...form, leaseStart:e.target.value})}/>
        <input type="date" value={form.leaseEnd} onChange={e=>setForm({...form, leaseEnd:e.target.value})}/>
        <button style={{background:'#1d4ed8', color:'#fff', border:'none', padding:'8px 12px'}}>Add Tenant</button>
      </form>

      <table style={{width:'100%', marginTop:16}}>
        <thead><tr><th>Name</th><th>Email</th><th>Flat</th><th>Lease</th><th></th></tr></thead>
        <tbody>
          {items.map(t=>(
            <tr key={t._id}>
              <td>{t.name}</td>
              <td>{t.email}</td>
              <td>{t.flat?.block}-{t.flat?.unit}</td>
              <td>{new Date(t.leaseStart).toLocaleDateString()} → {new Date(t.leaseEnd).toLocaleDateString()}</td>
              <td><button onClick={async()=>{ await deleteTenant(t._id); await load(); }} style={{color:'#b91c1c'}}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

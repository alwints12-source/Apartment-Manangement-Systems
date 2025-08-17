import { useEffect, useState } from 'react';
import { listFlats, createFlat, deleteFlat } from '../api/flats';

export default function Flats(){
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ block:'', unit:'', bedrooms:2, areaSqft:800, status:'vacant' });

  //const load = async () => setItems(await listFlats());
  //useEffect(()=>{ load(); }, []);
  const load = async () => {
    try {
      const data = await listFlats();
      setItems(data);
    } catch (e) {
      // 401 on first mount is okay; ProtectedRoute will keep users out if not logged
      if (e?.response?.status !== 401) {
        console.error('Flats load failed:', e);
      }
    }
  };
  useEffect(()=>{ load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await createFlat(form);
      setForm({ block:'', unit:'', bedrooms:2, areaSqft:800, status:'vacant' });
      await load();
      alert('Flat created');
    } catch (e) { alert(e.response?.data?.message || 'Failed'); }
  };

  return (
    <div style={{padding:24}}>
      <h2>Flats</h2>
      <form onSubmit={submit} style={{display:'grid', gap:8, maxWidth:500}}>
        <input placeholder="Block" value={form.block} onChange={e=>setForm({...form, block:e.target.value})}/>
        <input placeholder="Unit" value={form.unit} onChange={e=>setForm({...form, unit:e.target.value})}/>
        <input type="number" placeholder="Bedrooms" value={form.bedrooms} onChange={e=>setForm({...form, bedrooms:e.target.value})}/>
        <input type="number" placeholder="Area Sqft" value={form.areaSqft} onChange={e=>setForm({...form, areaSqft:e.target.value})}/>
        <select value={form.status} onChange={e=>setForm({...form, status:e.target.value})}>
          <option value="vacant">vacant</option>
          <option value="occupied">occupied</option>
          <option value="maintenance">maintenance</option>
        </select>
        <button style={{background:'#1d4ed8', color:'#fff', border:'none', padding:'8px 12px'}}>Create</button>
      </form>

      <table style={{width:'100%', marginTop:16}}>
        <thead><tr><th>Block</th><th>Unit</th><th>Bed</th><th>Area</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {items.map(f=>(
            <tr key={f._id}>
              <td>{f.block}</td>
              <td>{f.unit}</td>
              <td>{f.bedrooms}</td>
              <td>{f.areaSqft}</td>
              <td>{f.status}</td>
              <td><button onClick={async()=>{ await deleteFlat(f._id); await load(); }} style={{color:'#b91c1c'}}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

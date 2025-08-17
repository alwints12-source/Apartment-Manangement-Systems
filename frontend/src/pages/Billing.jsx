import { useEffect, useState } from 'react';
import { listInvoices, createInvoice, addPayment } from '../api/billing';
import { listFlats } from '../api/flats';
import { listTenants } from '../api/tenants';

export default function Billing(){
  const [items, setItems] = useState([]);
  const [flats, setFlats] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [form, setForm] = useState({ flat:'', tenant:'', month:'', items:[{label:'Rent',amount:1000}], total:0 });

  const calcTotal = (itms) => itms.reduce((s, it)=> s + Number(it.amount || 0), 0);

  const load = async () => {
    const [i,f,t] = await Promise.all([listInvoices(), listFlats(), listTenants()]);
    setItems(i); setFlats(f); setTenants(t);
  };
  useEffect(()=>{ load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, total: calcTotal(form.items) };
      await createInvoice(payload);
      setForm({ flat:'', tenant:'', month:'', items:[{label:'Rent',amount:1000}], total:0 });
      await load();
      alert('Invoice created');
    } catch (e) { alert(e.response?.data?.message || 'Failed'); }
  };

  const pay = async (invId) => {
    const amount = Number(prompt('Payment amount?') || 0);
    if (!amount) return;
    await addPayment(invId, { amount, method: 'online' });
    await load();
  };

  return (
    <div style={{padding:24}}>
      <h2>Billing</h2>
      <form onSubmit={submit} style={{display:'grid', gap:8, maxWidth:600}}>
        <select value={form.flat} onChange={e=>setForm({...form, flat:e.target.value})}>
          <option value="">Select Flat</option>
          {flats.map(f=> <option key={f._id} value={f._id}>{f.block}-{f.unit}</option>)}
        </select>
        <select value={form.tenant} onChange={e=>setForm({...form, tenant:e.target.value})}>
          <option value="">Select Tenant (optional)</option>
          {tenants.map(t=> <option key={t._id} value={t._id}>{t.name} ({t.flat?.block}-{t.flat?.unit})</option>)}
        </select>
        <input placeholder="Month (YYYY-MM)" value={form.month} onChange={e=>setForm({...form, month:e.target.value})}/>
        <div>
          {form.items.map((it,idx)=>(
            <div key={idx} style={{display:'flex', gap:8, marginBottom:6}}>
              <input placeholder="Label" value={it.label} onChange={e=>{
                const items=[...form.items]; items[idx].label=e.target.value; setForm({...form, items});
              }}/>
              <input type="number" placeholder="Amount" value={it.amount} onChange={e=>{
                const items=[...form.items]; items[idx].amount=e.target.value; setForm({...form, items});
              }}/>
            </div>
          ))}
          <button type="button" onClick={()=>setForm({...form, items:[...form.items, {label:'Fee',amount:0}]})} style={{color:'#1d4ed8'}}>+ Add item</button>
        </div>
        <button style={{background:'#1d4ed8', color:'#fff', border:'none', padding:'8px 12px'}}>Create Invoice</button>
      </form>

      <table style={{width:'100%', marginTop:16}}>
        <thead><tr><th>Month</th><th>Flat</th><th>Tenant</th><th>Total</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {items.map(i=>(
            <tr key={i._id}>
              <td>{i.month}</td>
              <td>{i.flat?.block}-{i.flat?.unit}</td>
              <td>{i.tenant?.name || '-'}</td>
              <td>{i.total}</td>
              <td>{i.status}</td>
              <td><button onClick={()=>pay(i._id)} style={{color:'#16a34a'}}>Add Payment</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

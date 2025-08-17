import { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', { name, email, password });
      alert('Registered! Please login.');
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      alert(msg);
    }
  };

  return (
    <div style={{padding:24}}>
      <h2>Register</h2>
      <form onSubmit={onSubmit} style={{maxWidth:380}}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} style={{display:'block',margin:'8px 0', padding:8, width:'100%'}}/>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{display:'block',margin:'8px 0', padding:8, width:'100%'}}/>
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{display:'block',margin:'8px 0', padding:8, width:'100%'}}/>
        <button style={{background:'#16a34a', color:'#fff', border:'none', padding:'8px 12px'}}>Register</button>
      </form>
    </div>
  );
}

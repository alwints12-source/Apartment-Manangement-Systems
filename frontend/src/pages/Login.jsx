import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', { email, password });
      const { token, id, name } = res.data;
      login({ id, name, email }, token);
      navigate('/flats');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      alert(msg);
    }
  };

  return (
    <div style={{padding:24}}>
      <h2>Login</h2>
      <form onSubmit={onSubmit} style={{maxWidth:380}}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{display:'block',margin:'8px 0', padding:8, width:'100%'}}/>
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{display:'block',margin:'8px 0', padding:8, width:'100%'}}/>
        <button style={{background:'#16a34a', color:'#fff', border:'none', padding:'8px 12px'}}>Login</button>
      </form>
    </div>
  );
}

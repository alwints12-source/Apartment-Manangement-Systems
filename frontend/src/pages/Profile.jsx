import { useAuth } from '../context/AuthContext';

export default function Profile(){
  const { user } = useAuth();
  return (
    <div style={{padding:24}}>
      <h2>Profile</h2>
      {user ? (
        <ul>
          <li><b>Name:</b> {user.name}</li>
          <li><b>Email:</b> {user.email}</li>
          <li><b>ID:</b> {user.id}</li>
        </ul>
      ) : <p>Not logged in.</p>}
    </div>
  );
}

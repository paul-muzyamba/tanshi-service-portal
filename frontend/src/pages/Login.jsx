import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.username, form.password);
      navigate('/services');
    } catch {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Tanshi Digital Solutions</h2>
        <p style={styles.subtitle}>Sign in to your account</p>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            placeholder="Username"
            value={form.username}
            onChange={e => setForm({...form, username: e.target.value})}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})}
          />
          <button style={styles.button} type="submit">Login</button>
        </form>
        <p style={styles.link}>
          No account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { display:'flex', justifyContent:'center', alignItems:'center', minHeight:'100vh', background:'#0f172a' },
  card: { background:'#1e293b', padding:'40px', borderRadius:'12px', width:'360px', boxShadow:'0 4px 24px rgba(0,0,0,0.4)' },
  title: { color:'#f97316', margin:0, fontSize:'24px', fontWeight:'bold' },
  subtitle: { color:'#94a3b8', marginTop:'4px', marginBottom:'24px' },
  input: { width:'100%', padding:'12px', marginBottom:'12px', borderRadius:'8px', border:'1px solid #334155', background:'#0f172a', color:'#f1f5f9', fontSize:'14px', boxSizing:'border-box' },
  button: { width:'100%', padding:'12px', background:'#f97316', color:'white', border:'none', borderRadius:'8px', fontSize:'16px', fontWeight:'bold', cursor:'pointer' },
  error: { color:'#ef4444', marginBottom:'12px' },
  link: { color:'#94a3b8', textAlign:'center', marginTop:'16px' }
};

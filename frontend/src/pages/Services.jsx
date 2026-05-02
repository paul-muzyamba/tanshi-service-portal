import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Services() {
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/services/').then(res => setServices(res.data));
  }, []);

  const book = async (service) => {
    try {
      await api.post('/bookings/', {
        service: service.id,
        booking_date: new Date().toISOString(),
        notes: `Booking for ${service.name}`,
        total_price: service.price
      });
      setMessage(`Booking confirmed for ${service.name}`);
      setTimeout(() => setMessage(''), 3000);
    } catch {
      setMessage('Please log in to book a service.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Tanshi Digital Solutions</h1>
        <div>
          <button style={styles.navBtn} onClick={() => navigate('/bookings')}>My Bookings</button>
          <button style={{...styles.navBtn, background:'#ef4444'}} onClick={() => { logout(); navigate('/login'); }}>Logout</button>
        </div>
      </div>
      {message && <div style={styles.toast}>{message}</div>}
      <h2 style={styles.subtitle}>Our Services</h2>
      <div style={styles.grid}>
        {services.map(service => (
          <div key={service.id} style={styles.card}>
            <h3 style={styles.serviceName}>{service.name}</h3>
            <p style={styles.desc}>{service.description}</p>
            <div style={styles.cardFooter}>
              <span style={styles.price}>ZMW {service.price}</span>
              <span style={styles.duration}>{service.duration_minutes} mins</span>
            </div>
            <button style={styles.button} onClick={() => book(service)}>Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight:'100vh', background:'#0f172a', padding:'24px', fontFamily:'sans-serif' },
  header: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'32px' },
  title: { color:'#f97316', margin:0, fontSize:'28px' },
  subtitle: { color:'#f1f5f9', marginBottom:'24px' },
  grid: { display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'20px' },
  card: { background:'#1e293b', borderRadius:'12px', padding:'24px', boxShadow:'0 2px 12px rgba(0,0,0,0.3)' },
  serviceName: { color:'#f1f5f9', margin:'0 0 8px 0', fontSize:'18px' },
  desc: { color:'#94a3b8', fontSize:'14px', marginBottom:'16px' },
  cardFooter: { display:'flex', justifyContent:'space-between', marginBottom:'16px' },
  price: { color:'#f97316', fontWeight:'bold', fontSize:'16px' },
  duration: { color:'#64748b', fontSize:'14px' },
  button: { width:'100%', padding:'10px', background:'#f97316', color:'white', border:'none', borderRadius:'8px', fontWeight:'bold', cursor:'pointer' },
  navBtn: { padding:'8px 16px', background:'#334155', color:'white', border:'none', borderRadius:'8px', cursor:'pointer', marginLeft:'8px' },
  toast: { background:'#22c55e', color:'white', padding:'12px 20px', borderRadius:'8px', marginBottom:'20px', fontWeight:'bold' }
};

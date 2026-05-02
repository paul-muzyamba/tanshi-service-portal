import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/bookings/').then(res => setBookings(res.data)).catch(() => navigate('/login'));
  }, []);

  const statusColor = (status) => {
    const colors = { pending:'#f59e0b', confirmed:'#22c55e', completed:'#3b82f6', cancelled:'#ef4444' };
    return colors[status] || '#94a3b8';
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>My Bookings</h1>
        <button style={styles.backBtn} onClick={() => navigate('/services')}>← Back to Services</button>
      </div>
      {bookings.length === 0 ? (
        <p style={styles.empty}>No bookings yet. Go book a service!</p>
      ) : (
        bookings.map(booking => (
          <div key={booking.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.serviceName}>{booking.service_detail?.name || 'Service'}</h3>
              <span style={{...styles.status, background: statusColor(booking.status)}}>{booking.status}</span>
            </div>
            <p style={styles.detail}>Date: {new Date(booking.booking_date).toLocaleDateString()}</p>
            <p style={styles.detail}>Total: ZMW {booking.total_price}</p>
            {booking.notes && <p style={styles.detail}>Notes: {booking.notes}</p>}
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: { minHeight:'100vh', background:'#0f172a', padding:'24px', fontFamily:'sans-serif' },
  header: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'32px' },
  title: { color:'#f97316', margin:0 },
  backBtn: { padding:'8px 16px', background:'#334155', color:'white', border:'none', borderRadius:'8px', cursor:'pointer' },
  card: { background:'#1e293b', borderRadius:'12px', padding:'24px', marginBottom:'16px' },
  cardHeader: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px' },
  serviceName: { color:'#f1f5f9', margin:0 },
  status: { padding:'4px 12px', borderRadius:'20px', color:'white', fontSize:'12px', fontWeight:'bold', textTransform:'uppercase' },
  detail: { color:'#94a3b8', margin:'4px 0', fontSize:'14px' },
  empty: { color:'#64748b', textAlign:'center', marginTop:'60px', fontSize:'18px' }
};

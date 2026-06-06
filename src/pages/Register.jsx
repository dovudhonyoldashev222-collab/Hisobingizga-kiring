import { useState } from 'react';
import { User, Mail, Lock, Wallet } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const Register = ({ onRegister }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Parollar mos kelmadi!");
      return;
    }
    const result = api.register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });
    if (result.success) {
      alert("Ro'yxatdan o'tdingiz! Endi login orqali kiring.");
      navigate('/login');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <Wallet size={32} />
        </div>
        <div className="auth-header">
          <h2>Hisob yaratish</h2>
          <p>Ma'lumotlaringizni kiriting</p>
        </div>
        {error && <div style={{ color: 'var(--danger)', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Ism</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input
                type="text"
                placeholder="Ismingiz"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                placeholder="email@example.com"
                className="form-input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Parol</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                placeholder="••••••••"
                className="form-input"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Parolni tasdiqlang</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                placeholder="••••••••"
                className="form-input"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>
          </div>
          <button type="submit" className="auth-button">Ro'yxatdan o'tish</button>
        </form>
        <div className="auth-footer">
          Hisobingiz bormi? <Link to="/login" className="auth-link">Kirish</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

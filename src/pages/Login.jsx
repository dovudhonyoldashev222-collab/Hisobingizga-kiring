import { useState } from 'react';
import { Mail, Lock, Wallet } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = api.login(formData.email, formData.password);
    if (result.success) {
      onLogin();
      navigate('/');
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
          <h2>Xush kelibsiz</h2>
          <p>Hisobingizga kiring</p>
        </div>
        {error && <div style={{ color: 'var(--danger)', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="form-input" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required 
              />
            </div>
          </div>
          <button type="submit" className="auth-button">Kirish</button>
        </form>
        <div className="auth-footer">
          Hisobingiz yo'qmi? <Link to="/register" className="auth-link">Ro'yxatdan o'tish</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

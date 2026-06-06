import { useState, useEffect } from 'react';
import {
  User, Mail, Phone, MapPin, Shield, Lock, Bell, Moon,
  LogOut, ChevronRight, Camera, CreditCard, Eye, Smartphone,
  TrendingUp, TrendingDown
} from 'lucide-react';
import { api } from '../services/api';

const Profile = ({ onLogout }) => {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState(true);
  const [emailNotif, setEmailNotif] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    const theme = newMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  // Profile form state
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '+998 90 123 45 67',
    address: "Toshkent, O'zbekiston"
  });

  // Password state
  const [passwords, setPasswords] = useState({
    old: '',
    new: ''
  });

  useEffect(() => {
    const userData = api.getUser();
    setUser(userData);
    if (userData) {
      setProfileData({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '+998 90 123 45 67',
        address: userData.address || "Toshkent, O'zbekiston"
      });
      // Load saved image from localStorage
      const savedImage = localStorage.getItem('profile_image');
      if (savedImage) setProfileImage(savedImage);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem('profile_image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updatedUser = api.updateUser({
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
      address: profileData.address
    });
    setUser(updatedUser);
    alert("Profil ma'lumotlari saqlandi!");
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (!passwords.old || !passwords.new) {
      alert("Iltimos, parollarni kiriting!");
      return;
    }
    alert("Parol muvaffaqiyatli yangilandi!");
    setPasswords({ old: '', new: '' });
  };

  if (!user) return null;

  return (
    <div className="main-content">
      <header className="header">
        <div className="header-title">
          <h2>Profil</h2>
          <p>Shaxsiy ma'lumotlar va sozlamalar</p>
        </div>
      </header>

      <div className="profile-grid">
        <div className="profile-main">
          <form className="settings-section" onSubmit={handleSaveProfile}>
            <div className="settings-header">
              <User size={20} />
              <span>Shaxsiy ma'lumotlar</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <User size={40} color="#64748b" />
                  )}
                </div>
                <input
                  type="file"
                  id="profile-upload"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <button
                  type="button"
                  style={{ position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: '50%', backgroundColor: 'white', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  onClick={() => document.getElementById('profile-upload').click()}
                >
                  <Camera size={14} />
                </button>
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '700' }}>{user.name}</h3>
                <p style={{ color: '#64748b', fontSize: '14px' }}>{user.email}</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label className="form-label">Ism</label>
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="form-input"
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
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Telefon</label>
                <div className="input-wrapper">
                  <Phone size={18} className="input-icon" />
                  <input
                    type="text"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Manzil</label>
                <div className="input-wrapper">
                  <MapPin size={18} className="input-icon" />
                  <input
                    type="text"
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn-primary" style={{ marginTop: '12px', width: '100%' }}>O'zgarishlarni saqlash</button>
          </form>

          <div className="settings-section">
            <div className="settings-header">
              <Shield size={20} />
              <span>Xavfsizlik sozlamalari</span>
            </div>
            <form className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }} onSubmit={handleUpdatePassword}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: 40, height: 40, borderRadius: '10px', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Lock size={18} color="#64748b" />
                </div>
                <div>
                  <div style={{ fontWeight: '600' }}>Parolni o'zgartirish</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Oxirgi o'zgarish: 30 kun oldin</div>
                </div>
              </div>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="input-wrapper">
                  <input
                    type="password"
                    placeholder="Eski parol"
                    className="form-input"
                    style={{ paddingLeft: '16px' }}
                    value={passwords.old}
                    onChange={(e) => setPasswords({ ...passwords, old: e.target.value })}
                  />
                  <Eye size={18} className="input-icon" style={{ right: '12px', left: 'auto' }} />
                </div>
                <div className="input-wrapper">
                  <input
                    type="password"
                    placeholder="Yangi parol"
                    className="form-input"
                    style={{ paddingLeft: '16px' }}
                    value={passwords.new}
                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  />
                  <Eye size={18} className="input-icon" style={{ right: '12px', left: 'auto' }} />
                </div>
                <button type="submit" className="btn-secondary" style={{ width: '100%', padding: '10px' }}>Parolni yangilash</button>
              </div>
            </form>
            <div className="setting-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Smartphone size={20} color="#64748b" />
                <div>
                  <div style={{ fontWeight: '600' }}>Ikki bosqichli autentifikatsiya</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Qo'shimcha xavfsizlik qatlami</div>
                </div>
              </div>
              <button className="btn-secondary" style={{ width: 'auto', padding: '6px 16px' }}>Yoqish</button>
            </div>
          </div>

          <div className="settings-section">
            <div className="settings-header">
              <span style={{ fontSize: '18px' }}>🌐 Sozlamalar</span>
            </div>
            <div className="setting-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Bell size={20} color="#64748b" />
                <div>
                  <div style={{ fontWeight: '600' }}>Push bildirishnomalar</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Yangi xarajatlar haqida xabarnoma</div>
                </div>
              </div>
              <button
                className={`toggle-switch ${notifications ? 'active' : ''}`}
                onClick={() => setNotifications(!notifications)}
              >
                <div className="toggle-knob"></div>
              </button>
            </div>
            <div className="setting-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Mail size={20} color="#64748b" />
                <div>
                  <div style={{ fontWeight: '600' }}>Email xabarnomalar</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Haftalik hisobotlar</div>
                </div>
              </div>
              <button
                className={`toggle-switch ${emailNotif ? 'active' : ''}`}
                onClick={() => setEmailNotif(!emailNotif)}
              >
                <div className="toggle-knob"></div>
              </button>
            </div>
            <div className="setting-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Moon size={20} color="#64748b" />
                <div>
                  <div style={{ fontWeight: '600' }}>Tungi rejim</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Qorong'i interfeys</div>
                </div>
              </div>
              <button
                className={`toggle-switch ${darkMode ? 'active' : ''}`}
                onClick={toggleDarkMode}
              >
                <div className="toggle-knob"></div>
              </button>
            </div>
          </div>
        </div>

        <div className="profile-sidebar">
          <div className="card" style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: 40, height: 40, borderRadius: '10px', backgroundColor: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingDown size={20} color="#ef4444" />
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Jami xarajat</div>
                <div style={{ fontWeight: '700' }}>12,450,000 {user.currency}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: 40, height: 40, borderRadius: '10px', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingUp size={20} color="#10b981" />
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Jami daromad</div>
                <div style={{ fontWeight: '700' }}>24,000,000 {user.currency}</div>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: '24px' }}>
            <h3 className="card-title" style={{ fontSize: '16px', marginBottom: '16px' }}>Hisob harakatlari</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button className="btn-secondary" style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <MapPin size={18} /> Manzilni yangilash
                </div>
                <ChevronRight size={16} />
              </button>
              <button className="btn-secondary" style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CreditCard size={18} /> To'lov usullarini boshqarish
                </div>
                <ChevronRight size={16} />
              </button>
              <button className="btn-secondary" style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Shield size={18} /> Maxfiylik sozlamalari
                </div>
                <ChevronRight size={16} />
              </button>
              <button className="btn-secondary" style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#ef4444', borderColor: '#fee2e2' }} 
                onClick={() => {
                  api.logout();
                  onLogout();
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <LogOut size={18} /> Hisobdan chiqish
                </div>
              </button>
            </div>
          </div>

          <div className="card">
            <h3 className="card-title" style={{ fontSize: '16px', marginBottom: '16px' }}>So'nggi faoliyat</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10b981', marginTop: '6px' }}></div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600' }}>Parol yangilandi</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>2 soat oldin</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#3b82f6', marginTop: '6px' }}></div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600' }}>Profil tahrirlandi</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>1 kun oldin</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#8b5cf6', marginTop: '6px' }}></div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600' }}>Yangi qurilma</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>3 kun oldin</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

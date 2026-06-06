import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, LayoutGrid, BarChart3, User, Wallet } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo-container">
        <div className="logo-icon">
          <Wallet size={24} />
        </div>
        <div className="logo-text">
          <h1>Xarajatlar</h1>
          <p>Boshqaruv tizimi</p>
        </div>
      </div>
      
      <nav className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/transactions" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <ArrowLeftRight size={20} />
          <span>Tranzaksiyalar</span>
        </NavLink>
        <NavLink to="/categories" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <LayoutGrid size={20} />
          <span>Kategoriyalar</span>
        </NavLink>
        <NavLink to="/stats" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <BarChart3 size={20} />
          <span>Statistika</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <User size={20} />
          <span>Profil</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;

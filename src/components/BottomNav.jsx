import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, LayoutGrid, BarChart3, User } from 'lucide-react';

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => isActive ? 'bottom-nav-link active' : 'bottom-nav-link'}>
        <LayoutDashboard size={20} />
        <span>Dashboard</span>
      </NavLink>
      <NavLink to="/transactions" className={({ isActive }) => isActive ? 'bottom-nav-link active' : 'bottom-nav-link'}>
        <ArrowLeftRight size={20} />
        <span>Amallar</span>
      </NavLink>
      <NavLink to="/categories" className={({ isActive }) => isActive ? 'bottom-nav-link active' : 'bottom-nav-link'}>
        <LayoutGrid size={20} />
        <span>Kategoriya</span>
      </NavLink>
      <NavLink to="/stats" className={({ isActive }) => isActive ? 'bottom-nav-link active' : 'bottom-nav-link'}>
        <BarChart3 size={20} />
        <span>Statistika</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => isActive ? 'bottom-nav-link active' : 'bottom-nav-link'}>
        <User size={20} />
        <span>Profil</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;

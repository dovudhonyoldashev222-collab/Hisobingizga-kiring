import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

const Layout = ({ children, onLogout }) => {
  return (
    <div className="main-wrapper">
      <Sidebar onLogout={onLogout} />
      <main className="content-container">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;

import Sidebar from './Sidebar';

const Layout = ({ children, onLogout }) => {
  return (
    <div className="main-wrapper">
      <Sidebar onLogout={onLogout} />
      <main className="content-container">
        {children}
      </main>
    </div>
  );
};

export default Layout;

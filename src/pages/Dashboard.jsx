import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownLeft, Eye, Calendar, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import AddTransactionModal from '../components/AddTransactionModal';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = () => {
    setUser(api.getUser());
    setTransactions(api.getTransactions().slice(0, 5));
    setCategories(api.getCategories().slice(0, 4));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    fetchData();
  };

  if (!user) return null;

  const totalIncome = api.getTransactions()
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = Math.abs(api.getTransactions()
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0));

  return (
    <div className="main-content">
      <header className="header">
        <div className="header-title">
          <h2>Dashboard</h2>
          <p>Xarajatlaringizni boshqaring</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary" onClick={() => setIsModalOpen(true)} style={{ padding: '8px 20px', borderRadius: '10px' }}>
            <Plus size={18} />
            <span>Yangi tranzaksiya</span>
          </button>
          <div className="date-display">
            <Calendar size={16} />
            <span>May 2026</span>
          </div>
        </div>
      </header>

      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAdd} 
      />

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Balans</span>
            <Wallet size={16} color="#64748b" />
          </div>
          <div className="stat-value">{user.balance.toLocaleString()} {user.currency}</div>
          <div className="stat-subtext">Umumiy balans</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Daromad</span>
            <TrendingUp size={16} color="#10b981" />
          </div>
          <div className="stat-value" style={{ color: '#10b981' }}>{totalIncome.toLocaleString()} {user.currency}</div>
          <div className="stat-subtext">Ushbu oy</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Xarajat</span>
            <TrendingDown size={16} color="#ef4444" />
          </div>
          <div className="stat-value" style={{ color: '#ef4444' }}>{totalExpense.toLocaleString()} {user.currency}</div>
          <div className="stat-subtext">Ushbu oy</div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">So'nggi tranzaksiyalar</h3>
            <Link to="/transactions" className="view-all">
              <Eye size={16} />
              <span>Barchasini ko'rish</span>
            </Link>
          </div>
          <div className="transaction-list">
            {transactions.map(t => (
              <div key={t.id} className="transaction-item">
                <div className="icon-box" style={{
                  backgroundColor: t.type === 'income' ? '#dcfce7' : '#fee2e2',
                  color: t.type === 'income' ? '#10b981' : '#ef4444'
                }}>
                  {t.type === 'income' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                </div>
                <div className="transaction-info">
                  <div className="transaction-name">{t.title}</div>
                  <div className="transaction-cat">{t.category}</div>
                </div>
                <div className="transaction-amount-group">
                  <div className="transaction-amount" style={{
                    color: t.type === 'income' ? '#10b981' : '#ef4444'
                  }}>
                    {t.type === 'income' ? '+' : ''}{t.amount.toLocaleString()} {user.currency}
                  </div>
                  <div className="transaction-date">{t.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Kategoriyalar bo'yicha</h3>
          </div>
          <div className="category-bars">
            {categories.map(cat => (
              <div key={cat.id} className="category-bar-item">
                <div className="category-bar-header">
                  <span className="category-bar-name">{cat.name}</span>
                  <span className="category-bar-value">{cat.amount.toLocaleString()} {user.currency}</span>
                </div>
                <div className="progress-bg">
                  <div className="progress-fill" style={{
                    width: `${cat.percentage}%`,
                    backgroundColor: cat.color
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

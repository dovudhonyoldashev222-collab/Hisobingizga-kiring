import { useState, useEffect } from 'react';
import { Search, Plus, ArrowUpRight, ArrowDownLeft, Pencil, Trash2 } from 'lucide-react';
import { api } from '../services/api';
import AddTransactionModal from '../components/AddTransactionModal';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState('Barchasi');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    setTransactions(api.getTransactions());
    setUser(api.getUser());
  }, []);

  const handleDelete = (id) => {
    api.deleteTransaction(id);
    setTransactions(api.getTransactions());
  };

  const handleAddOrUpdate = () => {
    setTransactions(api.getTransactions());
    setEditingTransaction(null);
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const filteredTransactions = transactions.filter(t => {
    if (filter === 'Barchasi') return true;
    if (filter === 'Daromad') return t.type === 'income';
    if (filter === 'Xarajat') return t.type === 'expense';
    return true;
  });

  if (!user) return null;

  return (
    <div className="main-content">
      <header className="header">
        <div className="header-title">
          <h2>Tranzaksiyalar</h2>
          <p>Barcha xarajat va daromadlar</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)} style={{ padding: '8px 20px', borderRadius: '10px' }}>
          <Plus size={18} />
          <span>Yangi tranzaksiya</span>
        </button>
      </header>

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddOrUpdate}
        editData={editingTransaction}
      />

      <div className="card">
        <div className="search-bar">
          <div className="search-input-wrapper">
            <Search size={18} className="input-icon" />
            <input type="text" placeholder="Qidirish..." className="form-input" />
          </div>
          <div className="filter-group">
            {['Barchasi', 'Daromad', 'Xarajat'].map(f => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="transaction-list">
          {filteredTransactions.map(t => (
            <div key={t.id} className="transaction-item" style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
              <div className="icon-box" style={{
                backgroundColor: t.type === 'income' ? '#dcfce7' : '#fee2e2',
                color: t.type === 'income' ? '#10b981' : '#ef4444'
              }}>
                {t.type === 'income' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
              </div>
              <div className="transaction-info">
                <div className="transaction-name">{t.title}</div>
                <div className="transaction-cat">{t.category} • {t.date}</div>
              </div>
              <div className="transaction-amount-group" style={{ marginRight: '24px' }}>
                <div className="transaction-amount" style={{
                  color: t.type === 'income' ? '#10b981' : '#ef4444'
                }}>
                  {t.type === 'income' ? '+' : ''}{t.amount.toLocaleString()} {user.currency}
                </div>
              </div>
              <div className="actions-btn">
                <button className="icon-btn" onClick={() => handleEdit(t)}>
                  <Pencil size={18} />
                </button>
                <button className="icon-btn btn-danger" onClick={() => handleDelete(t.id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;

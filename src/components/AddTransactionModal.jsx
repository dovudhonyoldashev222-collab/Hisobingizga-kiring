import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const AddTransactionModal = ({ isOpen, onClose, onAdd, editData }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    type: 'expense'
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setCategories(api.getCategories());
      if (editData) {
        setFormData({
          ...editData,
          amount: Math.abs(editData.amount)
        });
      } else {
        setFormData({
          title: '',
          amount: '',
          category: '',
          date: new Date().toISOString().split('T')[0],
          type: 'expense'
        });
      }
    }
  }, [isOpen, editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || !formData.category) return;

    const amount = formData.type === 'expense' ? -Math.abs(Number(formData.amount)) : Math.abs(Number(formData.amount));

    if (editData) {
      const updated = api.updateTransaction({
        ...formData,
        id: editData.id,
        amount
      });
      onAdd(updated);
    } else {
      const newTransaction = api.addTransaction({
        ...formData,
        amount
      });
      onAdd(newTransaction);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>{editData ? 'Tranzaksiyani tahrirlash' : 'Yangi tranzaksiya'}</h3>
          <button className="icon-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Nomi</label>
            <input
              type="text"
              placeholder="Masalan: Supermarket"
              className="form-input"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Summa (so'm)</label>
            <input
              type="number"
              placeholder="0"
              className="form-input"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Kategoriya</label>
            <select
              className="form-input"
              style={{ paddingLeft: '12px' }}
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            >
              <option value="">Kategoriyani tanlang</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Sana</label>
            <input
              type="date"
              className="form-input"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Turi</label>
            <div className="type-toggle">
              <button
                type="button"
                className={`type-btn ${formData.type === 'expense' ? 'active expense' : ''}`}
                onClick={() => setFormData({ ...formData, type: 'expense' })}
              >
                <ArrowUpRight size={18} />
                Xarajat
              </button>
              <button
                type="button"
                className={`type-btn ${formData.type === 'income' ? 'active income' : ''}`}
                onClick={() => setFormData({ ...formData, type: 'income' })}
              >
                <ArrowDownLeft size={18} />
                Daromad
              </button>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Bekor qilish</button>
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>Qo'shish</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;

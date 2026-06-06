import { useState } from 'react';
import { api } from '../services/api';
import { Utensils, Car, Home, Gamepad2, Coffee, Heart, Briefcase, Gift, Smartphone, Monitor, Shirt, ShoppingBag } from 'lucide-react';

const icons = [
  { name: 'Utensils', Icon: Utensils },
  { name: 'Car', Icon: Car },
  { name: 'Home', Icon: Home },
  { name: 'Gamepad2', Icon: Gamepad2 },
  { name: 'Coffee', Icon: Coffee },
  { name: 'Heart', Icon: Heart },
  { name: 'Briefcase', Icon: Briefcase },
  { name: 'Gift', Icon: Gift },
  { name: 'Smartphone', Icon: Smartphone },
  { name: 'Monitor', Icon: Monitor },
  { name: 'Shirt', Icon: Shirt },
  { name: 'ShoppingBag', Icon: ShoppingBag },
];

const colors = [
  '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', 
  '#ef4444', '#6366f1', '#facc15', '#06b6d4', '#14b8a6'
];

const AddCategoryModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    icon: 'Utensils',
    color: '#3b82f6'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    
    const newCategory = api.addCategory(formData);
    onAdd(newCategory);
    onClose();
    setFormData({ name: '', icon: 'Utensils', color: '#3b82f6' });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Yangi kategoriya</h3>
          <button className="icon-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Kategoriya nomi</label>
            <input 
              type="text" 
              placeholder="Masalan: Ovqat" 
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Icon tanlang</label>
            <div className="icon-grid">
              {icons.map(({ name, Icon }) => (
                <button
                  key={name}
                  type="button"
                  className={`icon-select-btn ${formData.icon === name ? 'active' : ''}`}
                  onClick={() => setFormData({...formData, icon: name})}
                >
                  <Icon size={20} />
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Rang tanlang</label>
            <div className="color-grid">
              {colors.map(color => (
                <button
                  key={color}
                  type="button"
                  className={`color-select-btn ${formData.color === color ? 'active' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setFormData({...formData, color})}
                />
              ))}
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

export default AddCategoryModal;

import { useState, useEffect } from 'react';
import { Plus, Utensils, Car, Home, Gamepad2, Coffee, Heart, Briefcase, Gift, Smartphone, Monitor, Shirt, ShoppingBag, LayoutGrid } from 'lucide-react';
import { api } from '../services/api';
import AddCategoryModal from '../components/AddCategoryModal';

const iconMap = {
  Utensils, Car, Home, Gamepad2, Coffee, Heart, Briefcase, Gift,
  Smartphone, Monitor, Shirt, ShoppingBag
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setCategories(api.getCategories());
    setUser(api.getUser());
  }, []);

  const handleAdd = () => {
    setCategories(api.getCategories());
  };

  if (!user) return null;

  return (
    <div className="main-content">
      <header className="header">
        <div className="header-title">
          <h2>Kategoriyalar</h2>
          <p>Xarajatlaringizni kategoriyalar bo'yicha boshqaring</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)} style={{ padding: '8px 20px', borderRadius: '10px' }}>
          <Plus size={18} />
          <span>Yangi kategoriya</span>
        </button>
      </header>

      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAdd}
      />

      <div className="category-grid">
        {categories.map(cat => {
          const IconComponent = iconMap[cat.icon] || LayoutGrid;
          return (
            <div key={cat.id} className="category-card">
              <div className="cat-header">
                <div className="cat-icon" style={{ backgroundColor: cat.color }}>
                  <IconComponent size={24} />
                </div>
                <div className="cat-percent">{cat.percentage}%</div>
              </div>
              <div className="cat-name">{cat.name}</div>
              <div className="cat-count">{cat.count} ta tranzaksiya</div>
              <div className="cat-amount">{cat.amount.toLocaleString()} {user.currency}</div>
              <div className="cat-progress">
                <div className="progress-fill" style={{
                  width: `${cat.percentage}%`,
                  backgroundColor: cat.color
                }}></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Umumiy xarajatlar</h3>
        </div>
        <div className="category-bars">
          {categories.map(cat => (
            <div key={cat.id} className="category-bar-item">
              <div className="category-bar-header" style={{ alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: cat.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    {(() => {
                      const Icon = iconMap[cat.icon] || Home;
                      return <Icon size={18} />;
                    })()}
                  </div>
                  <span className="category-bar-name">{cat.name}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="category-bar-value">{cat.amount.toLocaleString()} {user.currency}</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>{cat.percentage}%</div>
                </div>
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
  );
};

export default Categories;

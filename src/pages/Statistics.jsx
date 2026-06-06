import { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import { Calendar, TrendingDown, TrendingUp, Wallet, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

const Statistics = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setTransactions(api.getTransactions());
    setCategories(api.getCategories());
    setUser(api.getUser());
  }, []);

  if (!user) return null;

  // Data for Line Chart (Trends)
  const lineData = [
    { name: 'Yan', daromad: 4500000, xarajat: 4000000 },
    { name: 'Fev', daromad: 4800000, xarajat: 4200000 },
    { name: 'Mar', daromad: 5200000, xarajat: 4500000 },
    { name: 'Apr', daromad: 5000000, xarajat: 4400000 },
    { name: 'May', daromad: 5100000, xarajat: 4600000 },
  ];

  // Data for Pie Chart (Categories)
  const pieData = categories
    .filter(cat => cat.amount > 0)
    .map(cat => ({
      name: cat.name,
      value: cat.amount,
      color: cat.color
    }))
    .sort((a, b) => b.value - a.value);

  // Data for Bar Chart (Weekly)
  const barData = [
    { name: 'Dush', amount: 85000 },
    { name: 'Sesh', amount: 120000 },
    { name: 'Chor', amount: 95000 },
    { name: 'Pay', amount: 110000 },
    { name: 'Juma', amount: 150000 },
    { name: 'Shan', amount: 180000 },
    { name: 'Yak', amount: 140000 },
  ];

  // Calculate total for Pie Chart based on category amounts
  const totalCategoryAmount = pieData.reduce((sum, item) => sum + item.value, 0);
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name, fill }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 25;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={fill}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="500"
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="main-content">
      <header className="header">
        <div className="header-title">
          <h2>Statistika</h2>
          <p>Xarajatlaringiz bo'yicha tahlil</p>
        </div>
        <div className="date-display">
          <Calendar size={16} />
          <span>2026 yil</span>
        </div>
      </header>

      <div className="stats-chart-card">
        <h3 className="card-title" style={{ marginBottom: '24px' }}>Daromad va xarajatlar tendensiyasi</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Line type="monotone" dataKey="daromad" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="xarajat" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, fill: '#ef4444' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#10b981' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10b981' }}></div> Daromad
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#ef4444' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#ef4444' }}></div> Xarajat
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h3 className="card-title">Kategoriyalar bo'yicha taqsimot</h3>
          <div style={{ width: '100%', height: 320, marginTop: '10px' }}>
            <ResponsiveContainer>
              <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  paddingAngle={0}
                  dataKey="value"
                  label={renderCustomizedLabel}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `${value.toLocaleString()} so'm`}
                  contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'x: 32px, y: 12px', marginTop: '10px', maxHeight: '140px', overflowY: 'auto', padding: '10px' }}>
            {pieData.map(item => (
              <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', padding: '4px 0', borderBottom: '1px solid #f8fafc' }}>
                <div style={{ width: 10, height: 10, borderRadius: '3px', backgroundColor: item.color, flexShrink: 0 }}></div>
                <span style={{ color: '#475569', fontWeight: '500' }}>{item.name}</span>
                <span style={{ fontWeight: '700', marginLeft: 'auto', color: '#1e293b' }}>
                  {totalCategoryAmount > 0 ? ((item.value / totalCategoryAmount) * 100).toFixed(0) : 0}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">Haftalik xarajatlar</h3>
          <div style={{ width: '100%', height: 260, marginTop: '20px' }}>
            <ResponsiveContainer>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="stats-summary-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">O'rtacha kunlik xarajat</span>
            <TrendingDown size={16} color="#64748b" />
          </div>
          <div className="stat-value">74,000 {user.currency}</div>
          <div className="stat-subtext">Oxirgi 30 kun</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Eng ko'p xarajat</span>
            <Wallet size={16} color="#64748b" />
          </div>
          <div className="stat-value">Ovqat</div>
          <div className="stat-subtext">850,000 {user.currency}</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Tejash nisbati</span>
            <TrendingUp size={16} color="#64748b" />
          </div>
          <div className="stat-value">55%</div>
          <div className="stat-subtext">Daromaddan</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Jami tranzaksiyalar</span>
            <ArrowRight size={16} color="#64748b" />
          </div>
          <div className="stat-value">{transactions.length}</div>
          <div className="stat-subtext">Ushbu oy</div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;

import initialData from '../../data.json';

const DB_KEY = 'xarajatlar_app_v2'; // Version update to avoid conflicts

const emptyDataTemplate = {
  transactions: [],
  categories: [
    { id: 1, name: "Ovqat", icon: "Utensils", color: "#3b82f6", amount: 0, percentage: 0, count: 0 },
    { id: 2, name: "Transport", icon: "Car", color: "#10b981", amount: 0, percentage: 0, count: 0 },
    { id: 3, name: "To'lovlar", icon: "Home", color: "#f59e0b", amount: 0, percentage: 0, count: 0 },
    { id: 4, name: "O'yin-kulgi", icon: "Gamepad2", color: "#8b5cf6", amount: 0, percentage: 0, count: 0 }
  ]
};

const getStorage = () => {
  const data = localStorage.getItem(DB_KEY);
  return data ? JSON.parse(data) : { users: [], currentUser: null };
};

const saveStorage = (data) => {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
};

export const api = {
  // Auth logic
  register: (userData) => {
    const storage = getStorage();
    if (storage.users.find(u => u.email === userData.email)) {
      return { error: "Bu email bilan foydalanuvchi mavjud!" };
    }
    const newUser = {
      ...userData,
      balance: 0,
      currency: "so'm",
      data: JSON.parse(JSON.stringify(emptyDataTemplate))
    };
    storage.users.push(newUser);
    saveStorage(storage);
    return { success: true };
  },

  login: (email, password) => {
    const storage = getStorage();
    const user = storage.users.find(u => u.email === email && u.password === password);
    if (user) {
      storage.currentUser = email;
      saveStorage(storage);
      return { success: true, user };
    }
    // Check if it's the initial user with specific credentials
    if (email === 'dovudhonyoldashev222@gmail.com' && password === '1111') {
      const newUser = {
        ...initialData.user,
        email: 'dovudhonyoldashev222@gmail.com',
        password: '1111',
        data: {
          transactions: initialData.transactions,
          categories: initialData.categories
        }
      };
      storage.users.push(newUser);
      storage.currentUser = email;
      saveStorage(storage);
      return { success: true, user: newUser };
    }
    return { error: "Email yoki parol xato!" };
  },

  logout: () => {
    const storage = getStorage();
    storage.currentUser = null;
    saveStorage(storage);
  },

  getCurrentUser: () => {
    const storage = getStorage();
    return storage.users.find(u => u.email === storage.currentUser);
  },

  // Data logic (specific to current user)
  getUser: () => {
    const user = api.getCurrentUser();
    return user ? {
      name: user.name,
      email: user.email,
      balance: user.balance,
      currency: user.currency,
      phone: user.phone,
      address: user.address
    } : null;
  },

  getTransactions: () => {
    const user = api.getCurrentUser();
    return user ? user.data.transactions : [];
  },

  getCategories: () => {
    const user = api.getCurrentUser();
    return user ? user.data.categories : [];
  },

  addTransaction: (transaction) => {
    const storage = getStorage();
    const userIndex = storage.users.findIndex(u => u.email === storage.currentUser);
    if (userIndex === -1) return;

    const user = storage.users[userIndex];
    const newTransaction = {
      ...transaction,
      id: Date.now(),
      amount: Number(transaction.amount)
    };

    user.data.transactions.unshift(newTransaction);

    if (newTransaction.type === 'income') {
      user.balance += newTransaction.amount;
    } else {
      user.balance -= Math.abs(newTransaction.amount);
    }

    const category = user.data.categories.find(c => c.name === newTransaction.category);
    if (category) {
      category.count += 1;
      category.amount += Math.abs(newTransaction.amount);
      const totalExpense = user.data.categories.reduce((sum, c) => sum + c.amount, 0);
      user.data.categories.forEach(c => {
        c.percentage = totalExpense > 0 ? Number(((c.amount / totalExpense) * 100).toFixed(1)) : 0;
      });
    }

    saveStorage(storage);
    return newTransaction;
  },

  updateTransaction: (updatedTransaction) => {
    const storage = getStorage();
    const userIndex = storage.users.findIndex(u => u.email === storage.currentUser);
    if (userIndex === -1) return;

    const user = storage.users[userIndex];
    const index = user.data.transactions.findIndex(t => t.id === updatedTransaction.id);

    if (index !== -1) {
      const oldTransaction = user.data.transactions[index];

      if (oldTransaction.type === 'income') user.balance -= oldTransaction.amount;
      else user.balance += Math.abs(oldTransaction.amount);

      const oldCategory = user.data.categories.find(c => c.name === oldTransaction.category);
      if (oldCategory) {
        oldCategory.count = Math.max(0, oldCategory.count - 1);
        oldCategory.amount = Math.max(0, oldCategory.amount - Math.abs(oldTransaction.amount));
      }

      const amount = Number(updatedTransaction.amount);
      if (updatedTransaction.type === 'income') user.balance += amount;
      else user.balance -= Math.abs(amount);

      const newCategory = user.data.categories.find(c => c.name === updatedTransaction.category);
      if (newCategory) {
        newCategory.count += 1;
        newCategory.amount += Math.abs(amount);
      }

      const totalExpense = user.data.categories.reduce((sum, c) => sum + c.amount, 0);
      user.data.categories.forEach(c => {
        c.percentage = totalExpense > 0 ? Number(((c.amount / totalExpense) * 100).toFixed(1)) : 0;
      });

      user.data.transactions[index] = { ...updatedTransaction, amount };
      saveStorage(storage);
      return user.data.transactions[index];
    }
  },

  deleteTransaction: (id) => {
    const storage = getStorage();
    const userIndex = storage.users.findIndex(u => u.email === storage.currentUser);
    if (userIndex === -1) return;

    const user = storage.users[userIndex];
    const transaction = user.data.transactions.find(t => t.id === id);

    if (transaction) {
      if (transaction.type === 'income') user.balance -= transaction.amount;
      else user.balance += Math.abs(transaction.amount);

      const category = user.data.categories.find(c => c.name === transaction.category);
      if (category) {
        category.count = Math.max(0, category.count - 1);
        category.amount = Math.max(0, category.amount - Math.abs(transaction.amount));
        const totalExpense = user.data.categories.reduce((sum, c) => sum + c.amount, 0);
        user.data.categories.forEach(c => {
          c.percentage = totalExpense > 0 ? Number(((c.amount / totalExpense) * 100).toFixed(1)) : 0;
        });
      }

      user.data.transactions = user.data.transactions.filter(t => t.id !== id);
      saveStorage(storage);
    }
  },

  addCategory: (category) => {
    const storage = getStorage();
    const userIndex = storage.users.findIndex(u => u.email === storage.currentUser);
    if (userIndex === -1) return;

    const user = storage.users[userIndex];
    const newCategory = { ...category, id: Date.now(), amount: 0, percentage: 0, count: 0 };
    user.data.categories.push(newCategory);
    saveStorage(storage);
    return newCategory;
  },

  updateUser: (userData) => {
    const storage = getStorage();
    const userIndex = storage.users.findIndex(u => u.email === storage.currentUser);
    if (userIndex === -1) return;

    storage.users[userIndex] = { ...storage.users[userIndex], ...userData };
    saveStorage(storage);
    return storage.users[userIndex];
  }
};

const STORAGE_KEYS = {
  USERS: 'mf_users',
  VEHICLES: 'mf_vehicles',
  DRIVERS: 'mf_drivers',
  MAINTENANCE: 'mf_maintenance',
  EXPENSES: 'mf_expenses',
  TRIPS: 'mf_trips',
  BOOKINGS: 'mf_bookings',
  AUTH: 'mf_auth_session',
};

export const storageService = {
  get: (key: string, initialData: any) => {
    const data = localStorage.getItem(key);
    if (!data) {
      localStorage.setItem(key, JSON.stringify(initialData));
      return initialData;
    }
    return JSON.parse(data);
  },

  set: (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  },

  // Generic CRUD
  addItem: (key: string, item: any) => {
    const data = storageService.get(key, []);
    const newItem = { ...item, id: Date.now().toString() };
    const updatedData = [...data, newItem];
    storageService.set(key, updatedData);
    return newItem;
  },

  updateItem: (key: string, id: string, updatedItem: any) => {
    const data = storageService.get(key, []);
    const updatedData = data.map((item: any) => (item.id === id ? { ...item, ...updatedItem } : item));
    storageService.set(key, updatedData);
    return updatedItem;
  },

  deleteItem: (key: string, id: string) => {
    const data = storageService.get(key, []);
    const updatedData = data.filter((item: any) => item.id !== id);
    storageService.set(key, updatedData);
  },
};

export { STORAGE_KEYS };

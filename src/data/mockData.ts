export const initialUsers = [
  { id: '1', name: 'Admin User', email: 'admin@mountainfleet.com', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Operations Manager', email: 'manager@mountainfleet.com', role: 'Fleet Manager', status: 'Active' },
  { id: '3', name: 'Alex Driver', email: 'driver@mountainfleet.com', role: 'Driver', status: 'Active' },
  { id: '4', name: 'Sarah Customer', email: 'customer@mountainfleet.com', role: 'Customer', status: 'Active' },
];

export const initialVehicles = [
  { id: '1', name: 'Volvo FH16', type: 'Heavy Truck', plate: 'MF-7721', status: 'Active', fuel: '85%', health: 'Good' },
  { id: '2', name: 'Mercedes Sprinter', type: 'Delivery Van', plate: 'MF-4432', status: 'Maintenance', fuel: '40%', health: 'Check' },
  { id: '3', name: 'Scania R500', type: 'Heavy Truck', plate: 'MF-9901', status: 'Active', fuel: '92%', health: 'Excellent' },
];

export const initialDrivers = [
  { id: '1', name: 'Alex Morgan', license: 'DL-78821', status: 'On Trip', performance: 4.8 },
  { id: '2', name: 'Sarah Bell', license: 'DL-99102', status: 'Available', performance: 4.9 },
  { id: '3', name: 'Raj Patel', license: 'DL-33410', status: 'Off Duty', performance: 4.5 },
];

export const initialTrips = [
  { id: '1', vehicle: 'Volvo FH16', driver: 'Alex Morgan', route: 'New York ➔ SF', status: 'In Transit', progress: 65 },
  { id: '2', vehicle: 'Scania R500', driver: 'Sarah Bell', route: 'London ➔ Berlin', status: 'Pending', progress: 0 },
];

export const initialBookings = [
  { id: 'BK-9921', service: 'Full Fleet Lease', date: '2024-05-20', status: 'Confirmed', amount: 4500, pickup: 'Central Warehouse, NY', destination: 'West Coast Hub, CA' },
  { id: 'BK-1102', service: 'Expedited Delivery', date: '2024-05-22', status: 'Pending', amount: 850, pickup: 'Local Depot, NJ', destination: 'Retail Center, PA' },
  { id: 'BK-4452', service: 'Standard Cargo', date: '2024-05-18', status: 'Completed', amount: 320, pickup: 'Express Port, FL', destination: 'Storage B, GA' },
];

export const initialExpenses = [
  { id: '1', type: 'Fuel', amount: 450, date: '2024-05-12', status: 'Approved', driver: 'Alex Morgan' },
  { id: '2', type: 'Maintenance', amount: 1200, date: '2024-05-10', status: 'Pending', driver: 'Admin' },
];

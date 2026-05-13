// Comprehensive mock data for MountainFleet
export type Role = "admin" | "manager" | "driver" | "customer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  company: string;
  avatar?: string;
}

export interface Vehicle {
  id: string;
  plate: string;
  model: string;
  type: "Truck" | "Van" | "SUV" | "Bus" | "Sedan";
  year: number;
  status: "Active" | "Idle" | "Maintenance" | "Offline";
  fuelLevel: number;
  mileage: number;
  driver?: string;
  location: { lat: number; lng: number; city: string };
  image: string;
  insuranceExpiry: string;
  health: number;
}

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  license: string;
  rating: number;
  status: "On Trip" | "Available" | "Off Duty" | "Resting";
  trips: number;
  experience: number;
  avatar: string;
  vehicleId?: string;
}

export interface Trip {
  id: string;
  origin: string;
  destination: string;
  driverId: string;
  vehicleId: string;
  status: "Scheduled" | "In Progress" | "Completed" | "Delayed" | "Cancelled";
  startTime: string;
  eta: string;
  distance: number;
  progress: number;
  revenue: number;
}

export interface Booking {
  id: string;
  customer: string;
  service: string;
  date: string;
  pickup: string;
  dropoff: string;
  amount: number;
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
}

export interface Expense {
  id: string;
  category: "Fuel" | "Repair" | "Insurance" | "Tolls" | "Other";
  vehicle: string;
  amount: number;
  date: string;
  status: "Approved" | "Pending" | "Rejected";
}

export interface MaintenanceRecord {
  id: string;
  vehicle: string;
  type: string;
  date: string;
  status: "Scheduled" | "In Progress" | "Completed";
  cost: number;
  workshop: string;
}

export interface Invoice {
  id: string;
  customer: string;
  amount: number;
  date: string;
  due: string;
  status: "Paid" | "Pending" | "Overdue";
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "info" | "warning" | "success" | "danger";
  read: boolean;
}

const fleetImages = [
  "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&h=400&fit=crop", // Heavy Truck
  "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=600&h=400&fit=crop", // Delivery Truck
  "https://images.unsplash.com/photo-1549194388-f61be84a6e9e?w=600&h=400&fit=crop", // Delivery Van
  "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600&h=400&fit=crop", // Refrigerated Van
  "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=400&fit=crop", // Tour Bus
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop", // Electric SUV
];

// Industrial/Technical assets for "Identity Nodes" (replacing human avatars)
const identityIcons = [
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150&h=150&fit=crop", // Dashboard node
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=150&h=150&fit=crop", // Cyber node
  "https://images.unsplash.com/photo-1553877526-0ddf7397c6ee?w=150&h=150&fit=crop", // Technical sync
  "https://images.unsplash.com/photo-1581091226835-a5a24e1d821a?w=150&h=150&fit=crop", // Industrial sensor
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&h=150&fit=crop", // Microchip
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=150&h=150&fit=crop", // Data globe
];

export const vehicles: Vehicle[] = [
  { id: "V-1024", plate: "MTN-1024", model: "Volvo FH16", type: "Truck", year: 2023, status: "Active", fuelLevel: 78, mileage: 124500, driver: "Ethan Cole", location: { lat: 39.7392, lng: -104.9903, city: "Denver, CO" }, image: fleetImages[0], insuranceExpiry: "2026-08-12", health: 92 },
  { id: "V-1025", plate: "MTN-1025", model: "Mercedes Sprinter", type: "Van", year: 2024, status: "Active", fuelLevel: 54, mileage: 38240, driver: "Sara Lin", location: { lat: 40.0150, lng: -105.2705, city: "Boulder, CO" }, image: fleetImages[1], insuranceExpiry: "2026-04-22", health: 88 },
  { id: "V-1026", plate: "MTN-1026", model: "Ford F-150", type: "SUV", year: 2022, status: "Idle", fuelLevel: 32, mileage: 56700, driver: "Marco Vega", location: { lat: 39.5501, lng: -105.7821, city: "Aspen, CO" }, image: fleetImages[5], insuranceExpiry: "2025-12-01", health: 76 },
  { id: "V-1027", plate: "MTN-1027", model: "Scania R450", type: "Truck", year: 2021, status: "Maintenance", fuelLevel: 12, mileage: 198200, driver: "—", location: { lat: 39.7392, lng: -104.9903, city: "Denver, CO" }, image: fleetImages[1], insuranceExpiry: "2026-06-18", health: 58 },
  { id: "V-1028", plate: "MTN-1028", model: "Toyota Coaster", type: "Bus", year: 2023, status: "Active", fuelLevel: 89, mileage: 42100, driver: "Aiden Park", location: { lat: 39.1911, lng: -106.8175, city: "Aspen, CO" }, image: fleetImages[4], insuranceExpiry: "2027-01-09", health: 95 },
  { id: "V-1029", plate: "MTN-1029", model: "Tesla Model Y", type: "SUV", year: 2024, status: "Active", fuelLevel: 67, mileage: 12400, driver: "Olivia Reyes", location: { lat: 39.5807, lng: -105.6388, city: "Idaho Springs" }, image: fleetImages[5], insuranceExpiry: "2027-03-15", health: 97 },
  { id: "V-1030", plate: "MTN-1030", model: "Iveco Daily", type: "Van", year: 2022, status: "Offline", fuelLevel: 0, mileage: 84300, driver: "—", location: { lat: 39.7392, lng: -104.9903, city: "Denver, CO" }, image: fleetImages[2], insuranceExpiry: "2025-11-22", health: 41 },
  { id: "V-1031", plate: "MTN-1031", model: "Hino 300", type: "Truck", year: 2023, status: "Active", fuelLevel: 71, mileage: 67500, driver: "Noah Bennett", location: { lat: 39.4817, lng: -106.0384, city: "Breckenridge" }, image: fleetImages[0], insuranceExpiry: "2026-09-30", health: 90 },
];

export const drivers: Driver[] = [
  { id: "D-201", name: "Ethan Cole", email: "ethan@mountainfleet.io", phone: "+1 720 555 0124", license: "CO-DL-998211", rating: 4.9, status: "On Trip", trips: 312, experience: 8, avatar: identityIcons[0], vehicleId: "V-1024" },
  { id: "D-202", name: "Sara Lin", email: "sara@mountainfleet.io", phone: "+1 720 555 0181", license: "CO-DL-771034", rating: 4.8, status: "On Trip", trips: 247, experience: 6, avatar: identityIcons[1], vehicleId: "V-1025" },
  { id: "D-203", name: "Marco Vega", email: "marco@mountainfleet.io", phone: "+1 720 555 0117", license: "CO-DL-651209", rating: 4.6, status: "Available", trips: 189, experience: 5, avatar: identityIcons[2], vehicleId: "V-1026" },
  { id: "D-204", name: "Aiden Park", email: "aiden@mountainfleet.io", phone: "+1 720 555 0144", license: "CO-DL-880231", rating: 4.9, status: "On Trip", trips: 405, experience: 10, avatar: identityIcons[3], vehicleId: "V-1028" },
  { id: "D-205", name: "Olivia Reyes", email: "olivia@mountainfleet.io", phone: "+1 720 555 0162", license: "CO-DL-330987", rating: 5.0, status: "On Trip", trips: 156, experience: 4, avatar: identityIcons[4], vehicleId: "V-1029" },
  { id: "D-206", name: "Noah Bennett", email: "noah@mountainfleet.io", phone: "+1 720 555 0199", license: "CO-DL-220115", rating: 4.7, status: "Resting", trips: 278, experience: 7, avatar: identityIcons[5], vehicleId: "V-1031" },
];

export const trips: Trip[] = [
  { id: "T-9012", origin: "Denver, CO", destination: "Aspen, CO", driverId: "D-201", vehicleId: "V-1024", status: "In Progress", startTime: "2026-05-13T07:30:00", eta: "2026-05-13T12:45:00", distance: 257, progress: 64, revenue: 1240 },
  { id: "T-9013", origin: "Boulder, CO", destination: "Vail, CO", driverId: "D-202", vehicleId: "V-1025", status: "In Progress", startTime: "2026-05-13T08:10:00", eta: "2026-05-13T11:50:00", distance: 156, progress: 42, revenue: 820 },
  { id: "T-9014", origin: "Aspen, CO", destination: "Breckenridge", driverId: "D-204", vehicleId: "V-1028", status: "Scheduled", startTime: "2026-05-13T14:00:00", eta: "2026-05-13T16:20:00", distance: 88, progress: 0, revenue: 540 },
  { id: "T-9015", origin: "Denver, CO", destination: "Idaho Springs", driverId: "D-205", vehicleId: "V-1029", status: "Completed", startTime: "2026-05-12T09:00:00", eta: "2026-05-12T10:20:00", distance: 52, progress: 100, revenue: 310 },
  { id: "T-9016", origin: "Breckenridge", destination: "Denver, CO", driverId: "D-206", vehicleId: "V-1031", status: "Delayed", startTime: "2026-05-13T06:00:00", eta: "2026-05-13T11:30:00", distance: 132, progress: 78, revenue: 720 },
  { id: "T-9017", origin: "Vail, CO", destination: "Aspen, CO", driverId: "D-203", vehicleId: "V-1026", status: "Scheduled", startTime: "2026-05-14T08:00:00", eta: "2026-05-14T11:10:00", distance: 121, progress: 0, revenue: 680 },
];

export const bookings: Booking[] = [
  { id: "BK-5501", customer: "Alpine Tours Co.", service: "Mountain Tour Bus", date: "2026-05-15", pickup: "Denver Airport", dropoff: "Aspen Lodge", amount: 1840, status: "Confirmed" },
  { id: "BK-5502", customer: "Northpeak Logistics", service: "Cargo Delivery", date: "2026-05-14", pickup: "Boulder Warehouse", dropoff: "Vail Distribution", amount: 920, status: "Pending" },
  { id: "BK-5503", customer: "Summit Events", service: "VIP Shuttle", date: "2026-05-13", pickup: "Denver Hotel", dropoff: "Breckenridge Resort", amount: 540, status: "Confirmed" },
  { id: "BK-5504", customer: "Rocky River Inc.", service: "Heavy Cargo", date: "2026-05-12", pickup: "Denver Yard", dropoff: "Idaho Springs", amount: 1320, status: "Completed" },
  { id: "BK-5505", customer: "Hike & Co.", service: "Tour Van", date: "2026-05-11", pickup: "Boulder Visitor Center", dropoff: "Estes Park", amount: 460, status: "Cancelled" },
];

export const expenses: Expense[] = [
  { id: "E-301", category: "Fuel", vehicle: "MTN-1024", amount: 184, date: "2026-05-12", status: "Approved" },
  { id: "E-302", category: "Repair", vehicle: "MTN-1027", amount: 980, date: "2026-05-11", status: "Pending" },
  { id: "E-303", category: "Insurance", vehicle: "MTN-1025", amount: 420, date: "2026-05-10", status: "Approved" },
  { id: "E-304", category: "Tolls", vehicle: "MTN-1028", amount: 38, date: "2026-05-10", status: "Approved" },
  { id: "E-305", category: "Fuel", vehicle: "MTN-1031", amount: 156, date: "2026-05-09", status: "Approved" },
  { id: "E-306", category: "Repair", vehicle: "MTN-1030", amount: 2150, date: "2026-05-08", status: "Rejected" },
];

export const maintenance: MaintenanceRecord[] = [
  { id: "M-101", vehicle: "MTN-1027", type: "Engine Overhaul", date: "2026-05-14", status: "In Progress", cost: 2400, workshop: "Denver Truck Hub" },
  { id: "M-102", vehicle: "MTN-1024", type: "Tire Rotation", date: "2026-05-18", status: "Scheduled", cost: 180, workshop: "Mountain Auto" },
  { id: "M-103", vehicle: "MTN-1026", type: "Brake Service", date: "2026-05-20", status: "Scheduled", cost: 540, workshop: "Aspen Mechanics" },
  { id: "M-104", vehicle: "MTN-1030", type: "Battery Replace", date: "2026-05-10", status: "Completed", cost: 290, workshop: "Boulder Garage" },
];

export const invoices: Invoice[] = [
  { id: "INV-2401", customer: "Alpine Tours Co.", amount: 1840, date: "2026-05-15", due: "2026-05-30", status: "Pending" },
  { id: "INV-2402", customer: "Northpeak Logistics", amount: 920, date: "2026-05-14", due: "2026-05-29", status: "Pending" },
  { id: "INV-2403", customer: "Summit Events", amount: 540, date: "2026-05-13", due: "2026-05-20", status: "Paid" },
  { id: "INV-2404", customer: "Rocky River Inc.", amount: 1320, date: "2026-05-12", due: "2026-05-19", status: "Paid" },
  { id: "INV-2405", customer: "Hike & Co.", amount: 460, date: "2026-05-08", due: "2026-05-15", status: "Overdue" },
];

export const notifications: NotificationItem[] = [
  { id: "N-1", title: "Maintenance Due", message: "MTN-1024 is due for tire rotation in 3 days", time: "5m ago", type: "warning", read: false },
  { id: "N-2", title: "Trip Completed", message: "T-9015 completed by Olivia Reyes", time: "20m ago", type: "success", read: false },
  { id: "N-3", title: "Speed Alert", message: "Driver Marco Vega exceeded 75mph on I-70", time: "1h ago", type: "danger", read: false },
  { id: "N-4", title: "New Booking", message: "Alpine Tours Co. booked Mountain Tour Bus", time: "2h ago", type: "info", read: true },
  { id: "N-5", title: "Fuel Refilled", message: "MTN-1031 refueled at Boulder Station", time: "3h ago", type: "info", read: true },
];

// Analytics datasets
export const revenueSeries = [
  { name: "Jan", revenue: 38400, expense: 21200 },
  { name: "Feb", revenue: 42100, expense: 22800 },
  { name: "Mar", revenue: 48700, expense: 24600 },
  { name: "Apr", revenue: 53200, expense: 25400 },
  { name: "May", revenue: 61300, expense: 27800 },
  { name: "Jun", revenue: 58900, expense: 26900 },
  { name: "Jul", revenue: 65400, expense: 29100 },
  { name: "Aug", revenue: 72100, expense: 30400 },
  { name: "Sep", revenue: 68900, expense: 28700 },
  { name: "Oct", revenue: 74300, expense: 31200 },
  { name: "Nov", revenue: 81200, expense: 33400 },
  { name: "Dec", revenue: 89400, expense: 35100 },
];

export const utilizationSeries = [
  { name: "Mon", trips: 32, idle: 8 },
  { name: "Tue", trips: 38, idle: 5 },
  { name: "Wed", trips: 41, idle: 4 },
  { name: "Thu", trips: 36, idle: 6 },
  { name: "Fri", trips: 47, idle: 3 },
  { name: "Sat", trips: 52, idle: 2 },
  { name: "Sun", trips: 28, idle: 9 },
];

export const fuelSeries = [
  { name: "Wk 1", value: 1240 },
  { name: "Wk 2", value: 1380 },
  { name: "Wk 3", value: 1190 },
  { name: "Wk 4", value: 1450 },
];

export const fleetMix = [
  { name: "Trucks", value: 32 },
  { name: "Vans", value: 18 },
  { name: "SUVs", value: 14 },
  { name: "Buses", value: 6 },
];

// Demo accounts
export const demoAccounts: { email: string; password: string; user: User }[] = [
  {
    email: "admin@mountainfleet.io",
    password: "demo1234",
    user: { id: "U-1", name: "Alex Stone", email: "admin@mountainfleet.io", role: "admin", company: "MountainFleet HQ", avatar: identityIcons[0] },
  },
  {
    email: "manager@mountainfleet.io",
    password: "demo1234",
    user: { id: "U-2", name: "Priya Singh", email: "manager@mountainfleet.io", role: "manager", company: "Rocky Logistics", avatar: identityIcons[1] },
  },
  {
    email: "driver@mountainfleet.io",
    password: "demo1234",
    user: { id: "U-3", name: "Ethan Cole", email: "driver@mountainfleet.io", role: "driver", company: "Rocky Logistics", avatar: identityIcons[2] },
  },
  {
    email: "manager@mountainfleet.io", // Duplicate email in original, keeping it for now but using different user
    password: "demo1234",
    user: { id: "U-4", name: "Jamie Park", email: "customer@mountainfleet.io", role: "customer", company: "Alpine Tours Co.", avatar: identityIcons[3] },
  },
];

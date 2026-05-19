import { STORAGE_KEYS } from "@/services/storageService";
import {
  bookings as defaultBookings,
  drivers as defaultDrivers,
  expenses as defaultExpenses,
  fleetMix,
  fuelSeries,
  invoices as defaultInvoices,
  maintenance as defaultMaintenance,
  notifications as defaultNotifications,
  revenueSeries,
  trips as defaultTrips,
  utilizationSeries,
  vehicles as defaultVehicles,
  type Booking,
  type Driver,
  type Expense,
  type Invoice,
  type MaintenanceRecord,
  type NotificationItem,
  type Trip,
  type Vehicle,
} from "@/lib/mockData";

type DatasetValidator<T> = (items: unknown[]) => items is T[];

function readSeededDataset<T>(
  key: string,
  fallback: T[],
  validator: DatasetValidator<T>,
): T[] {
  if (typeof window === "undefined") {
    return fallback;
  }

  const raw = window.localStorage.getItem(key);
  if (!raw) {
    window.localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && validator(parsed)) {
      return parsed;
    }
  } catch {
    // Reset invalid persisted data to the current platform baseline.
  }

  window.localStorage.setItem(key, JSON.stringify(fallback));
  return fallback;
}

const isVehicleArray: DatasetValidator<Vehicle> = (items): items is Vehicle[] =>
  items.every(
    (item) =>
      typeof item === "object" &&
      item !== null &&
      "model" in item &&
      "plate" in item &&
      "status" in item &&
      "health" in item &&
      "location" in item,
  );

const isDriverArray: DatasetValidator<Driver> = (items): items is Driver[] =>
  items.every(
    (item) =>
      typeof item === "object" &&
      item !== null &&
      "name" in item &&
      "rating" in item &&
      "status" in item &&
      "experience" in item,
  );

const isTripArray: DatasetValidator<Trip> = (items): items is Trip[] =>
  items.every(
    (item) =>
      typeof item === "object" &&
      item !== null &&
      "origin" in item &&
      "destination" in item &&
      "status" in item &&
      "revenue" in item &&
      "progress" in item,
  );

const isBookingArray: DatasetValidator<Booking> = (items): items is Booking[] =>
  items.every(
    (item) =>
      typeof item === "object" &&
      item !== null &&
      "customer" in item &&
      "pickup" in item &&
      "dropoff" in item &&
      "amount" in item,
  );

const isExpenseArray: DatasetValidator<Expense> = (items): items is Expense[] =>
  items.every(
    (item) =>
      typeof item === "object" &&
      item !== null &&
      "category" in item &&
      "vehicle" in item &&
      "status" in item &&
      "amount" in item,
  );

const isMaintenanceArray: DatasetValidator<MaintenanceRecord> = (
  items,
): items is MaintenanceRecord[] =>
  items.every(
    (item) =>
      typeof item === "object" &&
      item !== null &&
      "vehicle" in item &&
      "type" in item &&
      "status" in item &&
      "workshop" in item,
  );

const isNotificationArray: DatasetValidator<NotificationItem> = (
  items,
): items is NotificationItem[] =>
  items.every(
    (item) =>
      typeof item === "object" &&
      item !== null &&
      "title" in item &&
      "message" in item &&
      "type" in item &&
      "read" in item,
  );

export function getVehicles(): Vehicle[] {
  return readSeededDataset(STORAGE_KEYS.VEHICLES, defaultVehicles, isVehicleArray);
}

export function getDrivers(): Driver[] {
  return readSeededDataset(STORAGE_KEYS.DRIVERS, defaultDrivers, isDriverArray);
}

export function getTrips(): Trip[] {
  return readSeededDataset(STORAGE_KEYS.TRIPS, defaultTrips, isTripArray);
}

export function getBookings(): Booking[] {
  return readSeededDataset(STORAGE_KEYS.BOOKINGS, defaultBookings, isBookingArray);
}

export function getExpenses(): Expense[] {
  return readSeededDataset(STORAGE_KEYS.EXPENSES, defaultExpenses, isExpenseArray);
}

export function getMaintenanceRecords(): MaintenanceRecord[] {
  return readSeededDataset(
    STORAGE_KEYS.MAINTENANCE,
    defaultMaintenance,
    isMaintenanceArray,
  );
}

export function getNotifications(): NotificationItem[] {
  return readSeededDataset(
    STORAGE_KEYS.NOTIFICATIONS,
    defaultNotifications,
    isNotificationArray,
  );
}

export function getInvoices(): Invoice[] {
  return defaultInvoices;
}

export function getPlatformSnapshot() {
  const vehicles = getVehicles();
  const drivers = getDrivers();
  const trips = getTrips();
  const bookings = getBookings();
  const expenses = getExpenses();
  const maintenance = getMaintenanceRecords();
  const notifications = getNotifications();
  const invoices = getInvoices();

  const activeVehicles = vehicles.filter((item) => item.status === "Active");
  const inProgressTrips = trips.filter((item) => item.status === "In Progress");
  const completedTrips = trips.filter((item) => item.status === "Completed");
  const delayedTrips = trips.filter((item) => item.status === "Delayed");
  const availableDrivers = drivers.filter((item) => item.status === "Available");
  const utilizationRate = Math.round((activeVehicles.length / vehicles.length) * 100);
  const totalRevenue = trips.reduce((sum, item) => sum + item.revenue, 0);
  const bookingRevenue = bookings.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
  const avgHealth = Math.round(
    vehicles.reduce((sum, item) => sum + item.health, 0) / vehicles.length,
  );
  const completionRate = Math.round((completedTrips.length / trips.length) * 100);
  const unreadNotifications = notifications.filter((item) => !item.read).length;
  const pendingMaintenance = maintenance.filter(
    (item) => item.status !== "Completed",
  ).length;
  const overdueInvoices = invoices.filter((item) => item.status === "Overdue").length;

  return {
    vehicles,
    drivers,
    trips,
    bookings,
    expenses,
    maintenance,
    notifications,
    invoices,
    metrics: {
      activeVehicles: activeVehicles.length,
      inProgressTrips: inProgressTrips.length,
      delayedTrips: delayedTrips.length,
      availableDrivers: availableDrivers.length,
      totalRevenue,
      bookingRevenue,
      totalExpense,
      utilizationRate,
      avgHealth,
      completionRate,
      unreadNotifications,
      pendingMaintenance,
      overdueInvoices,
    },
    chartSeries: {
      revenueSeries,
      fuelSeries,
      utilizationSeries,
      fleetMix,
    },
  };
}

export function getVehicleStatusTone(status: Vehicle["status"]) {
  switch (status) {
    case "Active":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    case "Idle":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
    case "Maintenance":
      return "bg-rose-500/10 text-rose-600 dark:text-rose-400";
    default:
      return "bg-slate-500/10 text-slate-600 dark:text-slate-400";
  }
}

export function getTripStatusTone(status: Trip["status"]) {
  switch (status) {
    case "Completed":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    case "In Progress":
      return "bg-sky-500/10 text-sky-600 dark:text-sky-400";
    case "Delayed":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
    case "Cancelled":
      return "bg-rose-500/10 text-rose-600 dark:text-rose-400";
    default:
      return "bg-slate-500/10 text-slate-600 dark:text-slate-400";
  }
}

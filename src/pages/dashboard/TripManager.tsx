import React from 'react';
import GenericCRUD from '../../components/dashboard/GenericCRUD';
import { STORAGE_KEYS } from '../../services/storageService';
import { initialTrips } from '../../data/mockData';
import { Navigation } from 'lucide-react';

const TripManager: React.FC = () => {
  const columns: any[] = [
    { key: 'route', label: 'Route', type: 'text' },
    { key: 'vehicle', label: 'Vehicle', type: 'text' },
    { key: 'driver', label: 'Driver', type: 'text' },
    { key: 'progress', label: 'Progress (%)', type: 'number' },
    { key: 'status', label: 'Status', type: 'status', options: ['Pending', 'In Transit', 'Completed', 'Delayed'] },
  ];

  return (
    <GenericCRUD
      title="Trip Management"
      description="Create, assign, and track trips across your fleet."
      storageKey={STORAGE_KEYS.TRIPS}
      initialData={initialTrips}
      columns={columns}
      icon={Navigation}
    />
  );
};

export default TripManager;

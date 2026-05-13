import React from 'react';
import GenericCRUD from '../../components/dashboard/GenericCRUD';
import { STORAGE_KEYS } from '../../services/storageService';
import { initialTrips } from '../../data/mockData';
import { Navigation } from 'lucide-react';

const TripManager: React.FC = () => {
  const columns: any[] = [
    { key: 'route', label: 'Route Path', type: 'text' },
    { key: 'vehicle', label: 'Assigned Unit', type: 'text' },
    { key: 'driver', label: 'Lead Operator', type: 'text' },
    { key: 'progress', label: 'Completion %', type: 'number' },
    { key: 'status', label: 'Dispatch Status', type: 'status', options: ['Pending', 'In Transit', 'Completed', 'Delayed'] },
  ];

  return (
    <GenericCRUD
      title="Dispatch Orchestration"
      description="Initialize, coordinate, and synchronize logistical payloads across the network."
      storageKey={STORAGE_KEYS.TRIPS}
      initialData={initialTrips}
      columns={columns}
      icon={Navigation}
    />
  );
};

export default TripManager;

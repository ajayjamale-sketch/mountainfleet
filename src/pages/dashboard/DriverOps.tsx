import React from 'react';
import GenericCRUD from '../../components/dashboard/GenericCRUD';
import { STORAGE_KEYS } from '../../services/storageService';
import { initialDrivers } from '../../data/mockData';
import { Users } from 'lucide-react';

const DriverOps: React.FC = () => {
  const columns: any[] = [
    { key: 'name', label: 'Operator Name', type: 'text' },
    { key: 'license', label: 'Auth License', type: 'text' },
    { key: 'performance', label: 'Efficiency Rating', type: 'number' },
    { key: 'status', label: 'System Status', type: 'status', options: ['Available', 'On Trip', 'Off Duty'] },
  ];

  return (
    <GenericCRUD
      title="Personnel Hub"
      description="Monitor operator performance and identity synchronization."
      storageKey={STORAGE_KEYS.DRIVERS}
      initialData={initialDrivers}
      columns={columns}
      icon={Users}
    />
  );
};

export default DriverOps;

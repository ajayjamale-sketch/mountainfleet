import React from 'react';
import GenericCRUD from '../../components/dashboard/GenericCRUD';
import { STORAGE_KEYS } from '../../services/storageService';
import { initialDrivers } from '../../data/mockData';
import { Users } from 'lucide-react';

const DriverOps: React.FC = () => {
  const columns: any[] = [
    { key: 'name', label: 'Driver Name', type: 'text' },
    { key: 'license', label: 'License Number', type: 'text' },
    { key: 'performance', label: 'Rating', type: 'number' },
    { key: 'status', label: 'Status', type: 'status', options: ['Available', 'On Trip', 'Off Duty'] },
  ];

  return (
    <GenericCRUD
      title="Driver Operations"
      description="Monitor driver performance and availability."
      storageKey={STORAGE_KEYS.DRIVERS}
      initialData={initialDrivers}
      columns={columns}
      icon={Users}
    />
  );
};

export default DriverOps;

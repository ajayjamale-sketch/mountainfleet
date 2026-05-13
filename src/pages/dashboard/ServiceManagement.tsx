import React from 'react';
import GenericCRUD from '../../components/dashboard/GenericCRUD';
import { STORAGE_KEYS } from '../../services/storageService';
import { initialServices } from '../../data/mockData';
import { Map } from 'lucide-react';

const ServiceManagement: React.FC = () => {
  const columns: any[] = [
    { key: 'name', label: 'Module Name', type: 'text' },
    { key: 'description', label: 'Protocol Specs', type: 'text' },
    { key: 'price', label: 'Subscription Fee ($)', type: 'number' },
  ];

  return (
    <GenericCRUD
      title="Operational Modules"
      description="Configure and synchronize digital service protocols across the network."
      storageKey={STORAGE_KEYS.SERVICES}
      initialData={initialServices}
      columns={columns}
      icon={Map}
    />
  );
};

export default ServiceManagement;

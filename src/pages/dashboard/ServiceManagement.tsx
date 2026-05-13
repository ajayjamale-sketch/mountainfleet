import React from 'react';
import GenericCRUD from '../../components/dashboard/GenericCRUD';
import { STORAGE_KEYS } from '../../services/storageService';
import { initialServices } from '../../data/mockData';
import { Map } from 'lucide-react';

const ServiceManagement: React.FC = () => {
  const columns: any[] = [
    { key: 'name', label: 'Service Name', type: 'text' },
    { key: 'description', label: 'Description', type: 'text' },
    { key: 'price', label: 'Monthly Fee ($)', type: 'number' },
  ];

  return (
    <GenericCRUD
      title="Services"
      description="Configure and manage your digital service offerings."
      storageKey={STORAGE_KEYS.SERVICES}
      initialData={initialServices}
      columns={columns}
      icon={Map}
    />
  );
};

export default ServiceManagement;

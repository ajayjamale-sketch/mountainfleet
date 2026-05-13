import React from 'react';
import GenericCRUD from '../../components/dashboard/GenericCRUD';
import { STORAGE_KEYS } from '../../services/storageService';
import { initialVehicles } from '../../data/mockData';
import { Truck } from 'lucide-react';

const FleetControl: React.FC = () => {
  const columns: any[] = [
    { key: 'name', label: 'Vehicle Name', type: 'text' },
    { key: 'type', label: 'Type', type: 'select', options: ['Heavy Truck', 'Delivery Van', 'Light Van', 'Refrigerated'] },
    { key: 'plate', label: 'Plate Number', type: 'text' },
    { key: 'fuel', label: 'Fuel Level', type: 'text' },
    { key: 'health', label: 'Engine Health', type: 'select', options: ['Excellent', 'Good', 'Check', 'Critical'] },
    { key: 'status', label: 'Status', type: 'status' },
  ];

  return (
    <GenericCRUD
      title="Fleet Control"
      description="Manage all vehicles in your logistics network."
      storageKey={STORAGE_KEYS.VEHICLES}
      initialData={initialVehicles}
      columns={columns}
      icon={Truck}
    />
  );
};

export default FleetControl;

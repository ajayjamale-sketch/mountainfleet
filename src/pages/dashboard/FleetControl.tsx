import React from 'react';
import GenericCRUD from '../../components/dashboard/GenericCRUD';
import { STORAGE_KEYS } from '../../services/storageService';
import { initialVehicles } from '../../data/mockData';
import { Truck } from 'lucide-react';

const FleetControl: React.FC = () => {
  const columns: any[] = [
    { key: 'name', label: 'Unit Designation', type: 'text' },
    { key: 'type', label: 'Class', type: 'select', options: ['Heavy Truck', 'Delivery Van', 'Light Van', 'Refrigerated'] },
    { key: 'plate', label: 'ID Plate', type: 'text' },
    { key: 'fuel', label: 'Energy Level', type: 'text' },
    { key: 'health', label: 'System Health', type: 'select', options: ['Excellent', 'Good', 'Check', 'Critical'] },
    { key: 'status', label: 'Registry Status', type: 'status' },
  ];

  return (
    <GenericCRUD
      title="Fleet Registry"
      description="Orchestrate and monitor all active units in your logistics network."
      storageKey={STORAGE_KEYS.VEHICLES}
      initialData={initialVehicles}
      columns={columns}
      icon={Truck}
    />
  );
};

export default FleetControl;

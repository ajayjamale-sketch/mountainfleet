import React from 'react';
import GenericCRUD from '../../components/dashboard/GenericCRUD';
import { STORAGE_KEYS } from '../../services/storageService';
import { Wrench } from 'lucide-react';

const MaintenancePage: React.FC = () => {
  const initialMaintenance = [
    { id: '1', vehicle: 'Volvo FH16', task: 'Propulsion Calibration', date: '2024-05-25', cost: 150, status: 'Scheduled' },
    { id: '2', vehicle: 'Mercedes Sprinter', task: 'Brake Integrity Check', date: '2024-05-22', cost: 450, status: 'In Progress' },
  ];

  const columns: any[] = [
    { key: 'vehicle', label: 'Fleet Unit', type: 'text' },
    { key: 'task', label: 'Calibration Task', type: 'text' },
    { key: 'date', label: 'Protocol Date', type: 'text' },
    { key: 'cost', label: 'Resource Cost ($)', type: 'number' },
    { key: 'status', label: 'System Status', type: 'status', options: ['Scheduled', 'In Progress', 'Completed', 'Overdue'] },
  ];

  return (
    <GenericCRUD
      title="Calibration Hub"
      description="Schedule and track unit health and system repair protocols."
      storageKey={STORAGE_KEYS.MAINTENANCE}
      initialData={initialMaintenance}
      columns={columns}
      icon={Wrench}
    />
  );
};

export default MaintenancePage;

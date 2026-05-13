import React from 'react';
import GenericCRUD from '../../components/dashboard/GenericCRUD';
import { STORAGE_KEYS } from '../../services/storageService';
import { Wrench } from 'lucide-react';

const MaintenancePage: React.FC = () => {
  const initialMaintenance = [
    { id: '1', vehicle: 'Volvo FH16', task: 'Oil Change', date: '2024-05-25', cost: 150, status: 'Scheduled' },
    { id: '2', vehicle: 'Mercedes Sprinter', task: 'Brake Check', date: '2024-05-22', cost: 450, status: 'In Progress' },
  ];

  const columns: any[] = [
    { key: 'vehicle', label: 'Vehicle', type: 'text' },
    { key: 'task', label: 'Maintenance Task', type: 'text' },
    { key: 'date', label: 'Scheduled Date', type: 'text' },
    { key: 'cost', label: 'Est. Cost ($)', type: 'number' },
    { key: 'status', label: 'Status', type: 'status', options: ['Scheduled', 'In Progress', 'Completed', 'Overdue'] },
  ];

  return (
    <GenericCRUD
      title="Fleet Maintenance"
      description="Schedule and track vehicle health and repair logs."
      storageKey={STORAGE_KEYS.MAINTENANCE}
      initialData={initialMaintenance}
      columns={columns}
      icon={Wrench}
    />
  );
};

export default MaintenancePage;

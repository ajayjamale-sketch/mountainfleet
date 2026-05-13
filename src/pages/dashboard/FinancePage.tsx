import React from 'react';
import GenericCRUD from '../../components/dashboard/GenericCRUD';
import { STORAGE_KEYS } from '../../services/storageService';
import { CreditCard } from 'lucide-react';
import { initialExpenses } from '../../data/mockData';

const FinancePage: React.FC = () => {
  const columns: any[] = [
    { key: 'type', label: 'Fiscal Category', type: 'select', options: ['Fuel', 'Maintenance', 'Insurance', 'Toll', 'Salary'] },
    { key: 'amount', label: 'Resource Amount ($)', type: 'number' },
    { key: 'date', label: 'Protocol Date', type: 'text' },
    { key: 'driver', label: 'Identity Node', type: 'text' },
    { key: 'status', label: 'Audit Status', type: 'status', options: ['Approved', 'Pending', 'Rejected'] },
  ];

  return (
    <GenericCRUD
      title="Revenue Hub"
      description="Orchestrate platform resource allocation, revenue manifests, and fiscal logs."
      storageKey={STORAGE_KEYS.EXPENSES}
      initialData={initialExpenses}
      columns={columns}
      icon={CreditCard}
    />
  );
};

export default FinancePage;

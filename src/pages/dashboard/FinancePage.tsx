import React from 'react';
import GenericCRUD from '../../components/dashboard/GenericCRUD';
import { STORAGE_KEYS } from '../../services/storageService';
import { CreditCard } from 'lucide-react';
import { initialExpenses } from '../../data/mockData';

const FinancePage: React.FC = () => {
  const columns: any[] = [
    { key: 'type', label: 'Expense Type', type: 'select', options: ['Fuel', 'Maintenance', 'Insurance', 'Toll', 'Salary'] },
    { key: 'amount', label: 'Amount ($)', type: 'number' },
    { key: 'date', label: 'Date', type: 'text' },
    { key: 'driver', label: 'Associated Party', type: 'text' },
    { key: 'status', label: 'Status', type: 'status', options: ['Approved', 'Pending', 'Rejected'] },
  ];

  return (
    <GenericCRUD
      title="Financial Overview"
      description="Track platform expenses, revenue, and payroll logs."
      storageKey={STORAGE_KEYS.EXPENSES}
      initialData={initialExpenses}
      columns={columns}
      icon={CreditCard}
    />
  );
};

export default FinancePage;

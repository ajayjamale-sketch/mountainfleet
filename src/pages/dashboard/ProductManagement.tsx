import React from 'react';
import GenericCRUD from '../../components/dashboard/GenericCRUD';
import { STORAGE_KEYS } from '../../services/storageService';
import { initialProducts } from '../../data/mockData';
import { Package } from 'lucide-react';

const ProductManagement: React.FC = () => {
  const columns: any[] = [
    { key: 'name', label: 'Unit Identifier', type: 'text' },
    { key: 'category', label: 'Operational Class', type: 'select', options: ['Fleet', 'Logistics', 'Last Mile', 'Software'] },
    { key: 'price', label: 'Unit Cost ($)', type: 'number' },
    { key: 'stock', label: 'Inventory Node', type: 'number' },
  ];

  return (
    <GenericCRUD
      title="Hardware Registry"
      description="Orchestrate and monitor fleet hardware and equipment inventory levels."
      storageKey={STORAGE_KEYS.PRODUCTS}
      initialData={initialProducts}
      columns={columns}
      icon={Package}
    />
  );
};

export default ProductManagement;

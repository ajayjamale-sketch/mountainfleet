import React from 'react';
import GenericCRUD from '../../components/dashboard/GenericCRUD';
import { STORAGE_KEYS } from '../../services/storageService';
import { initialProducts } from '../../data/mockData';
import { Package } from 'lucide-react';

const ProductManagement: React.FC = () => {
  const columns: any[] = [
    { key: 'name', label: 'Product Name', type: 'text' },
    { key: 'category', label: 'Category', type: 'select', options: ['Fleet', 'Logistics', 'Last Mile', 'Software'] },
    { key: 'price', label: 'Price ($)', type: 'number' },
    { key: 'stock', label: 'Stock', type: 'number' },
  ];

  return (
    <GenericCRUD
      title="Products"
      description="Manage your fleet hardware and equipment inventory."
      storageKey={STORAGE_KEYS.PRODUCTS}
      initialData={initialProducts}
      columns={columns}
      icon={Package}
    />
  );
};

export default ProductManagement;

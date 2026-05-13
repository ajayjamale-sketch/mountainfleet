import React from 'react';
import GenericCRUD from '../../components/dashboard/GenericCRUD';
import { STORAGE_KEYS } from '../../services/storageService';
import { initialBlogs } from '../../data/mockData';
import { FileText } from 'lucide-react';

const BlogManagement: React.FC = () => {
  const columns: any[] = [
    { key: 'title', label: 'Blog Title', type: 'text' },
    { key: 'author', label: 'Author', type: 'text' },
    { key: 'date', label: 'Publish Date', type: 'text' },
    { key: 'excerpt', label: 'Excerpt', type: 'text' },
  ];

  return (
    <GenericCRUD
      title="Blogs"
      description="Manage news and industry insights for your platform."
      storageKey={STORAGE_KEYS.BLOGS}
      initialData={initialBlogs}
      columns={columns}
      icon={FileText}
    />
  );
};

export default BlogManagement;

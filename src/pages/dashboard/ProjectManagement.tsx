import React from 'react';
import GenericCRUD from '../../components/dashboard/GenericCRUD';
import { STORAGE_KEYS } from '../../services/storageService';
import { initialProjects } from '../../data/mockData';
import { Briefcase } from 'lucide-react';

const ProjectManagement: React.FC = () => {
  const columns: any[] = [
    { key: 'name', label: 'Project Name', type: 'text' },
    { key: 'client', label: 'Client', type: 'text' },
    { key: 'budget', label: 'Budget ($)', type: 'number' },
    { key: 'status', label: 'Status', type: 'status' },
  ];

  return (
    <GenericCRUD
      title="Projects"
      description="Track and manage active logistics projects and contracts."
      storageKey={STORAGE_KEYS.PROJECTS}
      initialData={initialProjects}
      columns={columns}
      icon={Briefcase}
    />
  );
};

export default ProjectManagement;

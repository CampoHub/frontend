import { useContext } from 'react';
import { ResourcesContext } from '../ResourcesContext';

export const useResources = () => {
  const context = useContext(ResourcesContext);
  if (!context) {
    throw new Error('useResources debe ser usado dentro de un ResourcesProvider');
  }
  return context;
};
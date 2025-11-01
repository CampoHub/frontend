import { useContext } from 'react';
import { AssignmentsContext } from '../AssignmentsContext';

export const useAssignments = () => {
  const context = useContext(AssignmentsContext);
  if (!context) {
    throw new Error('useAssignments debe usarse dentro de un AssignmentsProvider');
  }
  return context;
};
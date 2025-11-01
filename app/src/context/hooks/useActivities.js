import { useContext } from 'react';
import { ActivitiesContext } from '../ActivitiesContext';

export const useActivities = () => {
  const context = useContext(ActivitiesContext);
  if (!context) {
    throw new Error("useActivities debe ser usado dentro de un ActivitiesProvider");
  }
  return context;
};
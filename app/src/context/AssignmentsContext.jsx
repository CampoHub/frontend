import React, { createContext, useState, useCallback, useMemo } from 'react';
import assignmentService from "../services/assignments";

import { useAuth } from './AuthContext';

export const AssignmentsContext = createContext();

export const AssignmentsProvider = ({ children }) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ activity: '', status: '' });
  const { user } = useAuth();

  const getAssignments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await assignmentService.getAllAssignments();
      const data = response.data;
      setAssignments(data);
      return data;
    } catch (err) {
      setError(err.message || 'Error al cargar las asignaciones');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getActivityAssignments = useCallback(async (activityId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await assignmentService.getAssignments(activityId);
      const data = response.data;
      setAssignments(prev => [...prev, ...data.assignments]);
      return data.assignments;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createAssignment = useCallback(async (assignmentData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await assignmentService.createAssignment(assignmentData);
      const data = response.data;
      setAssignments(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAssignment = useCallback(async (id, assignmentData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await assignmentService.updateAssignment(id, assignmentData);
      const data = response.data;
      setAssignments(prev => prev.map(a => a.id === id ? data : a));
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);



  const unassignWorker = useCallback(async (assignmentId, date = new Date()) => {
    try {
      setLoading(true);
      setError(null);
      const response = await assignmentService.unassignWorker(assignmentId, { unassigned_at: date });
      const updated = response.data;
      setAssignments(prev => 
        prev.map(a => a.id === assignmentId ? updated : a)
      );
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAssignment = useCallback(async (assignmentId) => {
    try {
      setLoading(true);
      setError(null);
      await assignmentService.deleteAssignment(assignmentId);
      setAssignments(prev => prev.filter(a => a.id !== assignmentId));
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateFilters = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  // Filtrar asignaciones basado en los filtros actuales
  const filteredAssignments = useMemo(() => {
    return assignments.filter(assignment => {
      // Para debugging
      if (filters.activity) {
        console.log('Filtro actividad:', filters.activity);
        console.log('Actividad asignación:', assignment.activity?.tipo);
      }

      const matchesActivity = !filters.activity || 
        (assignment.activity && assignment.activity.tipo === filters.activity);
      const matchesStatus = !filters.status || assignment.status === filters.status;
      return matchesActivity && matchesStatus;
    });
  }, [assignments, filters]);

  const value = React.useMemo(() => ({
    assignments: filteredAssignments,
    loading,
    error,
    filters,
    getAssignments,
    getActivityAssignments,
    unassignWorker,
    deleteAssignment,
    createAssignment,
    updateAssignment,
    updateFilters
  }), [
    assignments,
    loading,
    error,
    filters,
    getAssignments,
    getActivityAssignments,
    unassignWorker,
    deleteAssignment,
    createAssignment,
    updateAssignment,
    updateFilters
  ]);

  return (
    <AssignmentsContext.Provider value={value}>
      {children}
    </AssignmentsContext.Provider>
  );
};
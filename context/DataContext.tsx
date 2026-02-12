'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Event, Task, TaskStatus, TaskPriority, DashboardStats } from '@/types';

interface DataContextType {
  events: Event[];
  tasks: Task[];
  selectedEventId: string | null;
  addEvent: (event: Omit<Event, 'id' | 'createdAt'>) => void;
  deleteEvent: (eventId: string) => void;
  selectEvent: (eventId: string | null) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskDone: (id: string) => void;
  importTasks: (tasks: Omit<Task, 'id' | 'createdAt'>[], eventId: string) => void;
  getEventTasks: (eventId: string) => Task[];
  getDashboardStats: () => DashboardStats;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      name: 'TechNexus Monthly Meetup',
      date: '2025-03-15',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Q1 Planning Session',
      date: '2025-03-01',
      createdAt: new Date().toISOString(),
    },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      eventId: '1',
      title: 'Setup venue',
      description: 'Book the conference room for the meetup',
      assignedTo: 'John Doe',
      phone: '+1234567890',
      deadline: '2025-02-28T14:00:00',
      status: 'pending',
      priority: 'high',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      eventId: '1',
      title: 'Send invitations',
      description: 'Send email invites to all members',
      assignedTo: 'Jane Smith',
      phone: '+1987654321',
      deadline: '2025-02-25T10:00:00',
      status: 'done',
      priority: 'high',
      createdAt: new Date().toISOString(),
    },
  ]);

  const [selectedEventId, setSelectedEventId] = useState<string | null>('1');

  const addEvent = useCallback(
    (event: Omit<Event, 'id' | 'createdAt'>) => {
      const newEvent: Event = {
        ...event,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      setEvents((prev) => [newEvent, ...prev]);
    },
    []
  );

  const deleteEvent = useCallback((eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
    setTasks((prev) => prev.filter((t) => t.eventId !== eventId));
    if (selectedEventId === eventId) {
      setSelectedEventId(null);
    }
  }, [selectedEventId]);

  const selectEvent = useCallback((eventId: string | null) => {
    setSelectedEventId(eventId);
  }, []);

  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      status: task.status || 'pending',
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          return { ...task, ...updates };
        }
        return task;
      })
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleTaskDone = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          return { ...task, status: task.status === 'done' ? 'pending' : 'done' };
        }
        return task;
      })
    );
  }, []);

  const importTasks = useCallback(
    (tasks: Omit<Task, 'id' | 'createdAt'>[], eventId: string) => {
      const newTasks = tasks.map((task) => ({
        ...task,
        status: task.status ?? 'pending',
        eventId,
        id: Date.now().toString() + Math.random(),
        createdAt: new Date().toISOString(),
      }));
      setTasks((prev) => [...newTasks, ...prev]);
    },
    []
  );

  const getEventTasks = useCallback(
    (eventId: string) => {
      return tasks.filter((t) => t.eventId === eventId);
    },
    [tasks]
  );

  const getDashboardStats = useCallback((): DashboardStats => {
    const now = new Date();
    const total = tasks.length;
    const done = tasks.filter((t) => (t.status ?? 'pending') === 'done').length;
    const overdue = tasks.filter(
      (t) => (t.status ?? 'pending') !== 'done' && new Date(t.deadline) < now
    ).length;
    const pending = total - done - overdue;

    return {
      totalTasks: total,
      completedTasks: done,
      pendingTasks: pending,
      overdueTasks: overdue,
      productivityPercentage: total > 0 ? Math.round((done / total) * 100) : 0,
    };
  }, [tasks]);

  return (
    <DataContext.Provider
      value={{
        events,
        tasks,
        selectedEventId,
        addEvent,
        deleteEvent,
        selectEvent,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskDone,
        importTasks,
        getEventTasks,
        getDashboardStats,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}

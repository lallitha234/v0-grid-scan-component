'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Plus, Upload } from 'lucide-react';
import { DataProvider, useData } from '@/context/DataContext';
import GridScan from '@/components/GridScan';
import { TaskStats } from '@/components/TaskStats';
import { EventsList } from '@/components/EventsList';
import { TaskTable } from '@/components/TaskTable';
import { EventModal } from '@/components/EventModal';
import { TaskFormModal } from '@/components/TaskFormModal';
import { ImportTasksModal } from '@/components/ImportTasksModal';
import { Button } from '@/components/ui/button';
import { Task } from '@/types';

function DashboardContent() {
  const {
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
  } = useData();

  const [showEventModal, setShowEventModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const eventTasks = selectedEventId ? getEventTasks(selectedEventId) : [];
  const stats = getDashboardStats();

  if (!mounted) return null;

  const handleAddEvent = (name: string, date: string) => {
    addEvent({ name, date });
  };

  const handleAddTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    addTask(task);
    setEditingTask(null);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleUpdateTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    if (editingTask) {
      updateTask(editingTask.id, task);
      setEditingTask(null);
    }
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
  };

  const handleImport = (importedTasks: Omit<Task, 'id' | 'createdAt' | 'status'>[]) => {
    if (selectedEventId) {
      const tasksWithStatus = importedTasks.map((task) => ({
        ...task,
        status: 'pending' as const,
      }));
      importTasks(tasksWithStatus, selectedEventId);
    }
  };

  return (
    <main className="relative w-full min-h-screen bg-background text-foreground overflow-hidden">
      {/* Grid Scan Background */}
      <div className="fixed inset-0 pointer-events-none">
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#392e4e"
          gridScale={0.1}
          scanColor="#FF9FFC"
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        {/* Header */}
        <header className="border-b border-border/50 backdrop-blur-md bg-background/30 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/20 border border-accent/30">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-balance">TaskPing</h1>
                  <p className="text-sm text-muted-foreground">Smart task management for smart teams</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Stats Section */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-4">Dashboard</h2>
            <TaskStats {...stats} />
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Events */}
            <div className="lg:col-span-1">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">Events</h2>
                  <Button
                    onClick={() => setShowEventModal(true)}
                    size="sm"
                    className="bg-accent hover:bg-accent/90"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <EventsList
                  events={events}
                  selectedEventId={selectedEventId}
                  onSelect={selectEvent}
                  onDelete={deleteEvent}
                />
              </div>
            </div>

            {/* Right Content - Tasks */}
            <div className="lg:col-span-3">
              {selectedEventId ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold">
                      Tasks ({eventTasks.length})
                    </h2>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          setEditingTask(null);
                          setShowTaskModal(true);
                        }}
                        size="sm"
                        className="bg-accent hover:bg-accent/90"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Task
                      </Button>
                      <Button
                        onClick={() => setShowImportModal(true)}
                        variant="outline"
                        size="sm"
                      >
                        <Upload className="w-4 h-4 mr-1" />
                        Import
                      </Button>
                    </div>
                  </div>

                  {eventTasks.length > 0 ? (
                    <TaskTable
                      tasks={eventTasks}
                      onToggle={toggleTaskDone}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                    />
                  ) : (
                    <div className="text-center py-12 border border-border rounded-lg">
                      <Sparkles className="w-12 h-12 text-accent/30 mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">No tasks yet. Create your first task!</p>
                      <Button
                        onClick={() => {
                          setEditingTask(null);
                          setShowTaskModal(true);
                        }}
                        className="bg-accent hover:bg-accent/90"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Create Task
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-16 border border-border rounded-lg">
                  <Sparkles className="w-12 h-12 text-accent/30 mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg mb-4">Select an event or create a new one</p>
                  <Button
                    onClick={() => setShowEventModal(true)}
                    className="bg-accent hover:bg-accent/90"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Create Event
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EventModal isOpen={showEventModal} onClose={() => setShowEventModal(false)} onSubmit={handleAddEvent} />

      <TaskFormModal
        isOpen={showTaskModal}
        onClose={() => {
          setShowTaskModal(false);
          setEditingTask(null);
        }}
        onSubmit={editingTask ? handleUpdateTask : handleAddTask}
        initialData={editingTask || undefined}
        eventId={selectedEventId || ''}
      />

      <ImportTasksModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onSubmit={handleImport}
        eventId={selectedEventId || ''}
      />
    </main>
  );
}

export default function Home() {
  return (
    <DataProvider>
      <DashboardContent />
    </DataProvider>
  );
}

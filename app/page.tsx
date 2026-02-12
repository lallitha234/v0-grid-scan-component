'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Settings } from 'lucide-react';
import GridScan from '@/components/GridScan';
import { TaskCard } from '@/components/TaskCard';
import { AddTaskForm } from '@/components/AddTaskForm';
import { TaskStats } from '@/components/TaskStats';
import { TaskFilter } from '@/components/TaskFilter';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  completed: boolean;
}

type FilterType = 'all' | 'active' | 'completed' | 'high';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Design UI Components',
      description: 'Create a comprehensive component library for the TaskPing dashboard',
      priority: 'high',
      dueDate: '2025-02-28',
      completed: false,
    },
    {
      id: '2',
      title: 'Implement Real-time Sync',
      description: 'Add real-time synchronization using WebSocket for collaborative tasks',
      priority: 'high',
      dueDate: '2025-03-15',
      completed: false,
    },
    {
      id: '3',
      title: 'Write Documentation',
      description: 'Complete API documentation and user guide',
      priority: 'medium',
      dueDate: '2025-03-10',
      completed: false,
    },
    {
      id: '4',
      title: 'Code Review',
      description: 'Review pull requests from team members',
      priority: 'medium',
      dueDate: '2025-02-25',
      completed: true,
    },
    {
      id: '5',
      title: 'Deploy to Production',
      description: 'Deploy latest changes to production environment',
      priority: 'high',
      dueDate: '2025-03-01',
      completed: false,
    },
  ]);

  const [filter, setFilter] = useState<FilterType>('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddTask = (newTask: Omit<Task, 'id' | 'completed'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      completed: false,
    };
    setTasks([task, ...tasks]);
  };

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case 'active':
        return !task.completed;
      case 'completed':
        return task.completed;
      case 'high':
        return task.priority === 'high';
      default:
        return true;
    }
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    highPriority: tasks.filter((t) => t.priority === 'high').length,
  };

  if (!mounted) return null;

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
                  <p className="text-sm text-muted-foreground">Cosmic task management redefined</p>
                </div>
              </div>
              <button className="p-2 rounded-lg border border-border hover:bg-card transition-colors">
                <Settings className="w-6 h-6 text-muted-foreground hover:text-foreground" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Stats Section */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-4">Your Progress</h2>
            <TaskStats total={stats.total} completed={stats.completed} highPriority={stats.highPriority} />
          </div>

          {/* Add Task Section */}
          <div className="mb-12">
            <AddTaskForm onAdd={handleAddTask} />
          </div>

          {/* Filter Section */}
          <div className="mb-8">
            <TaskFilter activeFilter={filter} onFilterChange={setFilter} />
          </div>

          {/* Tasks Grid */}
          <div>
            {filteredTasks.length === 0 ? (
              <div className="text-center py-16">
                <Sparkles className="w-12 h-12 text-accent/30 mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">No tasks found. Create one to get started!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    {...task}
                    onToggle={handleToggleTask}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

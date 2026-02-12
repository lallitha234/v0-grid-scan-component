'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddTaskFormProps {
  onAdd: (task: { title: string; description: string; priority: 'low' | 'medium' | 'high'; dueDate: string }) => void;
}

export function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: dueDate || 'No date',
    });

    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setIsOpen(false);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(255,159,252,0.3)] transition-all duration-300 hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Add Task
        </button>
      )}

      {isOpen && (
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-lg border border-accent/30 bg-card shadow-[0_0_30px_rgba(255,159,252,0.1)]"
        >
          <h3 className="text-xl font-bold text-card-foreground mb-4">Create New Task</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-1">Task Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What do you need to do?"
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-card-foreground mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add more details..."
                rows={3}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-1">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-md font-semibold hover:shadow-[0_0_15px_rgba(255,159,252,0.2)] transition-all"
            >
              Create Task
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 px-4 py-2 border border-border rounded-md font-semibold hover:bg-secondary/50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
}

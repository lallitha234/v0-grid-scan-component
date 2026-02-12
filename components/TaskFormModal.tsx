'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task, TaskPriority } from '@/types';
import { validatePhone } from '@/lib/taskUtils';

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'status'>) => void;
  initialData?: Partial<Task>;
  eventId: string;
}

export function TaskFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  eventId,
}: TaskFormModalProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    assignedTo: initialData?.assignedTo || '',
    phone: initialData?.phone || '',
    deadline: initialData?.deadline ? new Date(initialData.deadline).toISOString().split('T')[0] : '',
    priority: (initialData?.priority as TaskPriority) || ('medium' as TaskPriority),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.assignedTo.trim()) newErrors.assignedTo = 'Assigned person is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!validatePhone(formData.phone)) newErrors.phone = 'Invalid phone number';
    if (!formData.deadline) newErrors.deadline = 'Deadline is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        eventId,
        title: formData.title,
        description: formData.description,
        assignedTo: formData.assignedTo,
        phone: formData.phone,
        deadline: new Date(formData.deadline).toISOString(),
        priority: formData.priority,
      });
      setFormData({
        title: '',
        description: '',
        assignedTo: '',
        phone: '',
        deadline: '',
        priority: 'medium',
      });
      setErrors({});
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
          <h2 className="text-xl font-bold">
            {initialData?.id ? 'Edit Task' : 'Create Task'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-secondary rounded-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="task-title">Task Title *</Label>
              <Input
                id="task-title"
                placeholder="e.g., Setup venue"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && <p className="text-xs text-red-400">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="task-priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) =>
                setFormData({ ...formData, priority: value as TaskPriority })
              }>
                <SelectTrigger id="task-priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="task-assigned">Assigned To *</Label>
              <Input
                id="task-assigned"
                placeholder="e.g., John Doe"
                value={formData.assignedTo}
                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                className={errors.assignedTo ? 'border-red-500' : ''}
              />
              {errors.assignedTo && <p className="text-xs text-red-400">{errors.assignedTo}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="task-phone">Phone *</Label>
              <Input
                id="task-phone"
                placeholder="e.g., +1234567890"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && <p className="text-xs text-red-400">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="task-deadline">Deadline *</Label>
              <Input
                id="task-deadline"
                type="datetime-local"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className={errors.deadline ? 'border-red-500' : ''}
              />
              {errors.deadline && <p className="text-xs text-red-400">{errors.deadline}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="task-description">Description</Label>
            <Textarea
              id="task-description"
              placeholder="Add task details..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="resize-none"
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-accent hover:bg-accent/90">
              {initialData?.id ? 'Update' : 'Create'} Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

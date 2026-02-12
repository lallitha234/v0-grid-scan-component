import { Task, TaskStatus } from '@/types';

export function getTaskStatus(task: Task): TaskStatus {
  if (task.status === 'done') {
    return 'done';
  }
  
  const deadline = new Date(task.deadline);
  const now = new Date();
  
  if (deadline < now && task.status !== 'done') {
    return 'overdue';
  }
  
  return 'pending';
}

export function getStatusColor(status: TaskStatus): string {
  switch (status) {
    case 'done':
      return 'bg-green-500/10 text-green-400 border-green-500/20';
    case 'overdue':
      return 'bg-red-500/10 text-red-400 border-red-500/20';
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function isPriority(str: string): str is 'low' | 'medium' | 'high' {
  return ['low', 'medium', 'high'].includes(str.toLowerCase());
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'high':
      return 'bg-red-500/10 text-red-400 border-red-500/20';
    case 'medium':
      return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    case 'low':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    default:
      return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  }
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone: string): boolean {
  return /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/.test(phone);
}

export function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}

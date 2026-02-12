export type TaskStatus = 'pending' | 'done' | 'overdue';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Event {
  id: string;
  name: string;
  date: string;
  createdAt: string;
}

export interface Task {
  id: string;
  eventId: string;
  title: string;
  description: string;
  assignedTo: string;
  phone: string;
  deadline: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
}

export interface ImportedTask {
  title: string;
  description: string;
  assignedTo: string;
  phone: string;
  deadline: string;
  priority: TaskPriority;
}

export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  productivityPercentage: number;
}

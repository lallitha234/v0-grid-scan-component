'use client';

import { useState, useMemo } from 'react';
import { ChevronDown, Trash2, Edit2, Check, X, Search } from 'lucide-react';
import { Task, TaskStatus } from '@/types';
import { formatDateTime, getStatusColor, getPriorityColor } from '@/lib/taskUtils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TaskTableProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

type SortField = 'deadline' | 'priority' | 'status';
type SortOrder = 'asc' | 'desc';

export function TaskTable({ tasks, onToggle, onEdit, onDelete }: TaskTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'all'>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('deadline');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const filteredAndSorted = useMemo(() => {
    let filtered = tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());

      const taskStatus = task.status ?? 'pending';
      const matchesStatus = filterStatus === 'all' || taskStatus === filterStatus;
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;

      return matchesSearch && matchesStatus && matchesPriority;
    });

    filtered.sort((a, b) => {
      let compareValue = 0;

      switch (sortField) {
        case 'deadline':
          compareValue = new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
          break;
        case 'priority':
          const priorityOrder = { high: 2, medium: 1, low: 0 };
          compareValue =
            priorityOrder[a.priority as keyof typeof priorityOrder] -
            priorityOrder[b.priority as keyof typeof priorityOrder];
          break;
        case 'status':
          const statusOrder = { pending: 0, overdue: 1, done: 2 };
          const aStatus = a.status ?? 'pending';
          const bStatus = b.status ?? 'pending';
          compareValue =
            statusOrder[aStatus as keyof typeof statusOrder] -
            statusOrder[bStatus as keyof typeof statusOrder];
          break;
      }

      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

    return filtered;
  }, [tasks, searchTerm, filterStatus, filterPriority, sortField, sortOrder]);

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No tasks in this event</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search by task or person..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as TaskStatus | 'all')}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="done">Done</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-border rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Task</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Assigned To</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Phone</th>
              <th
                className="px-4 py-3 text-left font-semibold text-foreground cursor-pointer hover:text-accent transition-colors"
                onClick={() => {
                  if (sortField === 'deadline') {
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortField('deadline');
                    setSortOrder('asc');
                  }
                }}
              >
                Deadline {sortField === 'deadline' && <ChevronDown className="w-4 h-4 inline ml-1" />}
              </th>
              <th
                className="px-4 py-3 text-left font-semibold text-foreground cursor-pointer hover:text-accent transition-colors"
                onClick={() => {
                  if (sortField === 'priority') {
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortField('priority');
                    setSortOrder('asc');
                  }
                }}
              >
                Priority {sortField === 'priority' && <ChevronDown className="w-4 h-4 inline ml-1" />}
              </th>
              <th
                className="px-4 py-3 text-left font-semibold text-foreground cursor-pointer hover:text-accent transition-colors"
                onClick={() => {
                  if (sortField === 'status') {
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortField('status');
                    setSortOrder('asc');
                  }
                }}
              >
                Status {sortField === 'status' && <ChevronDown className="w-4 h-4 inline ml-1" />}
              </th>
              <th className="px-4 py-3 text-right font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredAndSorted.map((task) => (
              <tr key={task.id} className="hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="max-w-xs">
                    <p className="font-semibold text-foreground truncate">{task.title}</p>
                    {task.description && (
                      <p className="text-xs text-muted-foreground truncate">{task.description}</p>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-foreground">{task.assignedTo}</td>
                <td className="px-4 py-3 text-muted-foreground text-sm">{task.phone}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {formatDateTime(task.deadline)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                      task.status || 'pending'
                    )}`}
                  >
                    {(task.status || 'pending').charAt(0).toUpperCase() + (task.status || 'pending').slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onToggle(task.id)}
                      className="p-2 hover:bg-green-500/20 rounded-md transition-colors"
                      title={(task.status || 'pending') === 'done' ? 'Mark as pending' : 'Mark as done'}
                    >
                      {(task.status || 'pending') === 'done' ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground hover:text-green-400" />
                      )}
                    </button>
                    <button
                      onClick={() => onEdit(task)}
                      className="p-2 hover:bg-blue-500/20 rounded-md transition-colors"
                      title="Edit task"
                    >
                      <Edit2 className="w-4 h-4 text-muted-foreground hover:text-blue-400" />
                    </button>
                    <button
                      onClick={() => onDelete(task.id)}
                      className="p-2 hover:bg-red-500/20 rounded-md transition-colors"
                      title="Delete task"
                    >
                      <Trash2 className="w-4 h-4 text-muted-foreground hover:text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSorted.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No tasks match your filters</p>
        </div>
      )}
    </div>
  );
}

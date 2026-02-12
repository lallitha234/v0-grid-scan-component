'use client';

import { useState } from 'react';
import { Trash2, CheckCircle, Circle, AlertCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({
  id,
  title,
  description,
  priority,
  dueDate,
  completed,
  onToggle,
  onDelete,
}: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const priorityColors = {
    low: 'text-emerald-400',
    medium: 'text-yellow-400',
    high: 'text-red-400',
  };

  const priorityBgColors = {
    low: 'bg-emerald-500/10',
    medium: 'bg-yellow-500/10',
    high: 'bg-red-500/10',
  };

  return (
    <div
      className={cn(
        'group relative rounded-lg border border-accent/30 bg-card p-6 transition-all duration-300',
        'hover:border-accent/60 hover:shadow-[0_0_20px_rgba(255,159,252,0.15)]',
        completed && 'opacity-60'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Priority Badge */}
      <div className={cn('mb-3 inline-block px-3 py-1 rounded-full text-xs font-semibold', priorityBgColors[priority], priorityColors[priority])}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </div>

      {/* Task Title */}
      <h3
        className={cn(
          'text-lg font-bold text-card-foreground mb-2 transition-colors',
          completed && 'line-through text-muted-foreground'
        )}
      >
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>

      {/* Footer with date and actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{dueDate}</span>
        </div>

        <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onToggle(id)}
            className="p-1.5 hover:bg-accent/20 rounded-md transition-colors"
            aria-label={completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {completed ? (
              <CheckCircle className="w-5 h-5 text-accent" />
            ) : (
              <Circle className="w-5 h-5 text-muted-foreground hover:text-accent" />
            )}
          </button>
          <button
            onClick={() => onDelete(id)}
            className="p-1.5 hover:bg-red-500/20 rounded-md transition-colors"
            aria-label="Delete task"
          >
            <Trash2 className="w-5 h-5 text-muted-foreground hover:text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

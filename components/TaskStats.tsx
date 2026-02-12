'use client';

import { CheckCircle, Circle, AlertCircle, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskStatsProps {
  total: number;
  completed: number;
  highPriority: number;
}

export function TaskStats({ total, completed, highPriority }: TaskStatsProps) {
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="group p-6 rounded-lg border border-accent/20 bg-card hover:border-accent/50 hover:shadow-[0_0_20px_rgba(255,159,252,0.1)] transition-all">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Tasks</p>
            <p className="text-3xl font-bold text-card-foreground">{total}</p>
          </div>
          <Circle className="w-6 h-6 text-accent/50 group-hover:text-accent transition-colors" />
        </div>
      </div>

      <div className="group p-6 rounded-lg border border-accent/20 bg-card hover:border-accent/50 hover:shadow-[0_0_20px_rgba(255,159,252,0.1)] transition-all">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Completed</p>
            <p className="text-3xl font-bold text-accent">{completed}</p>
            <p className="text-xs text-muted-foreground mt-1">{completionRate}% done</p>
          </div>
          <CheckCircle className="w-6 h-6 text-accent transition-colors" />
        </div>
      </div>

      <div className="group p-6 rounded-lg border border-accent/20 bg-card hover:border-accent/50 hover:shadow-[0_0_20px_rgba(255,159,252,0.1)] transition-all">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">High Priority</p>
            <p className="text-3xl font-bold text-red-400">{highPriority}</p>
          </div>
          <AlertCircle className="w-6 h-6 text-red-400/50 group-hover:text-red-400 transition-colors" />
        </div>
      </div>

      <div className="group p-6 rounded-lg border border-accent/20 bg-card hover:border-accent/50 hover:shadow-[0_0_20px_rgba(255,159,252,0.1)] transition-all">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Productivity Score</p>
            <p className="text-3xl font-bold text-cyan-400">{completionRate}%</p>
            <p className="text-xs text-muted-foreground mt-1">Keep it up!</p>
          </div>
          <TrendingUp className="w-6 h-6 text-cyan-400/50 group-hover:text-cyan-400 transition-colors" />
        </div>
      </div>
    </div>
  );
}

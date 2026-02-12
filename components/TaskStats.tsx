'use client';

import { CheckCircle, Circle, AlertCircle, TrendingUp, Clock } from 'lucide-react';
import { DashboardStats } from '@/types';

interface TaskStatsProps extends DashboardStats {}

export function TaskStats({
  totalTasks,
  completedTasks,
  pendingTasks,
  overdueTasks,
  productivityPercentage,
}: TaskStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <div className="group p-6 rounded-lg border border-accent/20 bg-card hover:border-accent/50 hover:shadow-[0_0_20px_rgba(255,159,252,0.1)] transition-all">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Tasks</p>
            <p className="text-3xl font-bold text-card-foreground">{totalTasks}</p>
          </div>
          <Circle className="w-6 h-6 text-accent/50 group-hover:text-accent transition-colors" />
        </div>
      </div>

      <div className="group p-6 rounded-lg border border-accent/20 bg-card hover:border-accent/50 hover:shadow-[0_0_20px_rgba(255,159,252,0.1)] transition-all">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Completed</p>
            <p className="text-3xl font-bold text-green-400">{completedTasks}</p>
          </div>
          <CheckCircle className="w-6 h-6 text-green-400/50 group-hover:text-green-400 transition-colors" />
        </div>
      </div>

      <div className="group p-6 rounded-lg border border-accent/20 bg-card hover:border-accent/50 hover:shadow-[0_0_20px_rgba(255,159,252,0.1)] transition-all">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Pending</p>
            <p className="text-3xl font-bold text-yellow-400">{pendingTasks}</p>
          </div>
          <AlertCircle className="w-6 h-6 text-yellow-400/50 group-hover:text-yellow-400 transition-colors" />
        </div>
      </div>

      <div className="group p-6 rounded-lg border border-accent/20 bg-card hover:border-accent/50 hover:shadow-[0_0_20px_rgba(255,159,252,0.1)] transition-all">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Overdue</p>
            <p className="text-3xl font-bold text-red-400">{overdueTasks}</p>
          </div>
          <Clock className="w-6 h-6 text-red-400/50 group-hover:text-red-400 transition-colors" />
        </div>
      </div>

      <div className="group p-6 rounded-lg border border-accent/20 bg-card hover:border-accent/50 hover:shadow-[0_0_20px_rgba(255,159,252,0.1)] transition-all">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Productivity</p>
            <p className="text-3xl font-bold text-cyan-400">{productivityPercentage}%</p>
          </div>
          <TrendingUp className="w-6 h-6 text-cyan-400/50 group-hover:text-cyan-400 transition-colors" />
        </div>
      </div>
    </div>
  );
}

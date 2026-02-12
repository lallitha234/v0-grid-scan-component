'use client';

import { Calendar, Trash2, ChevronRight } from 'lucide-react';
import { Event } from '@/types';
import { formatDate } from '@/lib/taskUtils';

interface EventsListProps {
  events: Event[];
  selectedEventId: string | null;
  onSelect: (eventId: string) => void;
  onDelete: (eventId: string) => void;
}

export function EventsList({
  events,
  selectedEventId,
  onSelect,
  onDelete,
}: EventsListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
        <p className="text-muted-foreground">No events created yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <div
          key={event.id}
          className={`group flex items-center gap-4 p-4 rounded-lg border transition-all cursor-pointer
            ${
              selectedEventId === event.id
                ? 'border-accent/60 bg-accent/10 shadow-[0_0_20px_rgba(255,159,252,0.15)]'
                : 'border-border/50 hover:border-border hover:bg-card/50'
            }
          `}
          onClick={() => onSelect(event.id)}
        >
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{event.name}</h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(event.date)}</span>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(event.id);
            }}
            className="p-2 opacity-0 group-hover:opacity-100 hover:bg-red-500/20 rounded-md transition-all"
            aria-label="Delete event"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>

          <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${
            selectedEventId === event.id ? 'text-accent' : ''
          }`} />
        </div>
      ))}
    </div>
  );
}

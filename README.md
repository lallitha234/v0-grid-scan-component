# TaskPing - Smart Task Management for Communities

TaskPing is a fully functional, production-ready task management dashboard built with Next.js and React. It's designed for communities and teams to manage events, assign tasks, track progress, and collaborate efficiently.

## Core Features

### Event Management
- Create and delete events
- View event-specific tasks  
- Switch between events seamlessly
- Track tasks by event

### Task Management (Full CRUD)
- **Create**: Add tasks with title, description, assignee, phone, deadline, priority
- **Read**: View all tasks with full details and metadata
- **Update**: Edit task information at any time
- **Delete**: Remove tasks permanently
- **Toggle Status**: Mark tasks as complete with one click

### Automatic Status Logic
- **Pending**: Active tasks not yet completed
- **Done**: Completed tasks (shown in green)
- **Overdue**: Tasks past deadline that aren't completed (shown in red)
- Status automatically calculated based on deadline and completion state

### CSV Import
- Import multiple tasks from CSV files
- Data validation and preview before importing
- Support for custom date formats and priority levels
- Error handling with detailed feedback messages
- Bulk task creation in seconds

### Real Dashboard
Live calculated statistics that update in real-time:
- **Total Tasks**: Complete count of all tasks
- **Completed Tasks**: Number of finished tasks
- **Pending Tasks**: Count of active tasks
- **Overdue Tasks**: Tasks past deadline
- **Productivity %**: Completion rate percentage

### Advanced Task Table
- **Search**: Find tasks by title or assignee name
- **Filter**: By status (pending, done, overdue) and priority (low, medium, high)
- **Sort**: By deadline, priority, or status with visual indicators
- **Quick Actions**: Mark done, edit, or delete from the table
- **Responsive**: Works perfectly on mobile and desktop

## Architecture

### Data Flow
```
App.tsx → DataProvider (Context API) → useData Hook → Components
```

### State Management
- React Context API for global state
- Custom hooks for clean component integration
- Mock in-memory data store (ready for backend API integration)
- TypeScript for type safety

### Component Structure
```
├── DataContext: Central state management
├── EventModal: Create new events
├── EventsList: Display and select events
├── TaskFormModal: Create/edit tasks
├── TaskTable: Display with search, filter, sort
├── ImportTasksModal: CSV import interface
└── TaskStats: Dashboard statistics
```

### Data Models

**Event**
- id: string
- name: string
- date: string (ISO format)
- createdAt: string (timestamp)

**Task**
- id: string
- eventId: string (links to event)
- title: string
- description: string (optional)
- assignedTo: string (person name)
- phone: string (contact number)
- deadline: string (ISO datetime)
- status: 'pending' | 'done' | 'overdue'
- priority: 'low' | 'medium' | 'high'
- createdAt: string (timestamp)

## Getting Started

### Installation
```bash
pnpm install
pnpm dev
```

Open http://localhost:3000

### First Steps
1. Create an event (click + in Events sidebar)
2. Select the event
3. Add tasks manually or import from CSV
4. View dashboard stats in real-time
5. Manage tasks using the table

## CSV Import Guide

### Expected Format
```csv
title,description,assignedTo,phone,deadline,priority
Setup venue,Book conference room,John Doe,+1234567890,2025-02-28,high
Send invites,Email members,Jane Smith,+1987654321,2025-02-25,medium
```

### Required Columns
- title: Task name
- assignedTo: Person assigned
- phone: Contact number
- deadline: Date (YYYY-MM-DD or ISO format)

### Optional Columns
- description: Task details
- priority: low, medium, or high (defaults to medium)

### Validation
- Empty rows are skipped
- Invalid dates are rejected
- Missing phone numbers cause row rejection
- All errors are clearly reported before import

## Usage Examples

### Creating an Event
```typescript
addEvent({ 
  name: 'TechNexus Monthly Meetup', 
  date: '2025-03-15' 
})
```

### Adding a Task
```typescript
addTask({
  eventId: '1',
  title: 'Setup Venue',
  description: 'Book the conference room',
  assignedTo: 'John Doe',
  phone: '+1234567890',
  deadline: '2025-02-28T14:00:00',
  priority: 'high',
})
```

### Toggling Task Completion
```typescript
toggleTaskDone('task-id')
```

### Updating a Task
```typescript
updateTask('task-id', { 
  status: 'done',
  priority: 'medium' 
})
```

## Tech Stack

### Frontend
- Next.js 16 (React 19)
- TypeScript
- Tailwind CSS
- Shadcn/UI Components

### State Management
- React Context API
- Custom hooks (useData)

### Utilities
- CSV parsing and validation
- Phone number validation
- Date formatting and manipulation
- Task status calculation

### Styling
- Tailwind CSS with custom theme
- Dark mode with cosmic aesthetic
- Neon pink (#FF9FFC) accent color
- Responsive grid layouts

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main app
│   └── globals.css         # Global styles
├── components/
│   ├── EventModal.tsx
│   ├── EventsList.tsx
│   ├── TaskFormModal.tsx
│   ├── TaskTable.tsx
│   ├── ImportTasksModal.tsx
│   ├── TaskStats.tsx
│   ├── GridScan.tsx
│   └── ui/                 # Shadcn components
├── context/
│   └── DataContext.tsx
├── types/
│   └── index.ts
├── lib/
│   ├── taskUtils.ts
│   ├── csvParser.ts
│   └── utils.ts
└── package.json
```

## Development

### Adding Features
1. Define types in `types/index.ts`
2. Update `DataContext.tsx` if state changes needed
3. Create or update components
4. Add utility functions in `lib/`

### Code Organization
- Components are self-contained with internal state when needed
- Context provides global state for events and tasks
- Utils handle business logic (status, validation, formatting)
- Types ensure type safety throughout

## Future Enhancements

### Backend Integration
- Replace in-memory state with API calls
- Add database persistence (PostgreSQL, MongoDB)
- User authentication and authorization
- Data synchronization

### WhatsApp Integration
- Send task notifications via WhatsApp
- Update status through WhatsApp messages
- Automated reminders before deadlines
- Two-way communication

### Advanced Features
- Recurring and recurring patterns
- Team collaboration and permissions
- Real-time sync with WebSocket
- Task templates and automation
- Advanced analytics and reporting
- Task dependencies and workflow

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance

- Client-side rendering optimized for speed
- Efficient re-renders with React Context
- Memoized components for stability
- Debounced search and filters
- Responsive table with virtual scrolling ready

## Styling

The app uses a custom dark theme with these colors:
- Background: Deep cosmic (#0d1117)
- Accent: Neon Pink (#FF9FFC)
- Primary Text: Light gray (#e0e0e0)
- Secondary: Dark gray tones

All colors are defined in `globals.css` and Tailwind configuration for easy theming.

## Contributing

Contributions welcome! Please ensure:
- Types are properly defined
- Components are modular
- Code follows existing patterns
- Features are documented

## License

Open-source community project by TechNexus

## Support

For issues, questions, or feature requests, please open an issue in the repository.

---

**TaskPing: Smart Task Reminders for Smart Teams**

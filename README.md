# TaskPing - Cosmic Task Management

A modern, visually stunning task management dashboard featuring a mesmerizing cosmic grid background and intuitive task organization system.

## Features

### ✨ Cosmic Interface
- **GridScan Background**: Animated grid scanning effect with bloom and chromatic aberration post-processing
- **Dark Theme**: Sleek cosmic aesthetic with neon pink/purple accents
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### 📋 Task Management
- **Create Tasks**: Add new tasks with title, description, priority level, and due date
- **Organize Tasks**: Filter tasks by status (All, Active, Completed, High Priority)
- **Track Progress**: Real-time stats showing total tasks, completion rate, and high-priority count
- **Quick Actions**: Mark tasks complete or delete them with hover-accessible buttons

### 📊 Dashboard Stats
- **Total Tasks**: See your complete task count
- **Completion Rate**: Track your productivity percentage
- **High Priority Count**: Stay aware of urgent tasks
- **Productivity Score**: Visual indicator of your progress

### 🎨 Design Elements
- Smooth animations and transitions
- Glow effects on interactive elements
- Glass morphism header with backdrop blur
- Color-coded priority badges
- Intuitive filtering system

## Tech Stack

- **Frontend**: React 19 + Next.js 16 with App Router
- **Styling**: Tailwind CSS with custom theme tokens
- **3D Effects**: Three.js for grid scanning visualization
- **Post-Processing**: Bloom and chromatic aberration effects
- **Icons**: Lucide React
- **State Management**: React hooks (useState, useEffect)

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone and setup dependencies:**
   ```bash
   pnpm install
   ```

2. **Run the development server:**
   ```bash
   pnpm dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## Project Structure

```
├── app/
│   ├── page.tsx              # Main application page
│   ├── layout.tsx            # Root layout with metadata
│   └── globals.css           # Global styles and theme tokens
├── components/
│   ├── GridScan.tsx          # Cosmic background component
│   ├── Effects.tsx           # Three.js effects utilities
│   ├── TaskCard.tsx          # Individual task component
│   ├── TaskStats.tsx         # Dashboard statistics
│   ├── AddTaskForm.tsx       # Task creation form
│   ├── TaskFilter.tsx        # Task filtering controls
│   └── ui/                   # shadcn/ui components
└── public/                   # Static assets
```

## Component Documentation

### TaskCard
Displays individual tasks with priority badges, descriptions, and action buttons.
- Shows completion status
- Color-coded priority levels (Low, Medium, High)
- Hover-activated action buttons
- Due date display

### AddTaskForm
Modal form for creating new tasks.
- Expandable form interface
- Title and description input
- Priority selection (Low, Medium, High)
- Optional due date picker

### TaskStats
Dashboard statistics widget displaying:
- Total task count
- Completion metrics
- High priority task count
- Productivity score percentage

### TaskFilter
Filter controls for viewing specific task subsets:
- All Tasks
- Active Tasks
- Completed Tasks
- High Priority Tasks

## Customization

### Theme Colors
Edit design tokens in `/app/globals.css` to customize colors:
- `--primary`: Main brand color (Neon Pink #FF9FFC)
- `--background`: Dark cosmic background
- `--accent`: Highlight color for interactions
- `--card`: Card backgrounds

### Grid Scan Settings
Adjust the background effect in `/app/page.tsx`:
```tsx
<GridScan
  sensitivity={0.55}        // Adjust scan sensitivity
  lineThickness={1}         // Grid line thickness
  linesColor="#392e4e"      // Grid color
  gridScale={0.1}           // Grid size
  scanColor="#FF9FFC"       // Scan line color
  scanOpacity={0.4}         // Effect opacity
  bloomIntensity={0.6}      // Glow intensity
  chromaticAberration={0.002} // Color distortion
/>
```

## Features Roadmap

- [ ] Task categories and tags
- [ ] Recurring tasks
- [ ] Task dependencies
- [ ] Time tracking integration
- [ ] Team collaboration features
- [ ] Dark/Light theme toggle
- [ ] Export tasks to PDF
- [ ] Keyboard shortcuts
- [ ] Undo/Redo functionality

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Fast page load with streaming SSR
- Optimized Three.js rendering
- CSS animations for smooth interactions
- Efficient state management with React hooks

## License

MIT License - feel free to use this project as a template or base for your own applications.

## Support

For issues or feature requests, please create an issue in the repository.

---

**Built with ✨ cosmic vibes and modern web technology**

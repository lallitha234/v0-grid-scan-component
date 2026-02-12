# TaskPing User Guide

## Getting Started

TaskPing is designed to help you manage events and tasks for your community. Here's how to use it.

## Main Interface

The TaskPing dashboard is divided into two sections:

- **Left Sidebar**: Events management
- **Right Panel**: Tasks for the selected event
- **Top**: Dashboard statistics showing overall progress

## Creating Your First Event

1. Click the **+ button** next to "Events" in the left sidebar
2. A modal will appear asking for:
   - **Event Name**: E.g., "TechNexus Monthly Meetup"
   - **Date**: Select the date when the event occurs
3. Click **Create** to add the event

## Working with Events

### Selecting an Event
Click on any event in the left sidebar to view its tasks.

### Deleting an Event
Hover over an event and click the trash icon that appears. All tasks for that event will also be deleted.

## Managing Tasks

### Creating a Task Manually

1. Select an event from the left sidebar
2. Click the **+ Add Task** button
3. Fill in the task details:
   - **Task Title** (required): What needs to be done
   - **Priority**: Low, Medium, or High
   - **Assigned To** (required): Person's name
   - **Phone** (required): Contact number (e.g., +1234567890)
   - **Deadline** (required): Date and time
   - **Description** (optional): Additional details

4. Click **Create Task**

### Editing a Task

1. Find the task in the table
2. Click the **edit icon** (pencil) on the right side
3. Modify any fields
4. Click **Update Task**

### Completing a Task

1. In the task table, click the **checkmark icon** to mark the task as done
2. The task status will change to "Done" (green badge)
3. Click again to mark it back as pending

### Deleting a Task

1. Find the task in the table
2. Click the **trash icon** on the right side
3. The task is removed immediately

## Importing Tasks from CSV

### CSV Format Requirements

Create a CSV file with these columns:
```
title,description,assignedTo,phone,deadline,priority
Setup venue,Book room,John Doe,+1234567890,2025-02-28,high
Send invites,Email list,Jane Smith,+1987654321,2025-02-25,medium
```

**Required columns:**
- title: Task name
- assignedTo: Person assigned to the task
- phone: Phone number
- deadline: Date in YYYY-MM-DD format

**Optional columns:**
- description: Additional task details
- priority: low, medium, or high (defaults to medium if missing)

### Importing Steps

1. Select an event
2. Click the **Import** button
3. Click in the upload area or drag a CSV file
4. The system will validate the data and show:
   - Number of tasks to import
   - Any errors that need fixing
   - Any warnings about the data
5. Click **Import Tasks** to add them to the event

## Searching and Filtering Tasks

### Search
Type in the search box at the top of the task table to find tasks by:
- Task title
- Assigned person's name

### Filter by Status
Select from the dropdown:
- **All Status**: Show all tasks
- **Pending**: Tasks not yet completed
- **Done**: Completed tasks
- **Overdue**: Tasks past their deadline

### Filter by Priority
Select from the dropdown:
- **All Priority**: Show all priorities
- **Low**: Less urgent tasks
- **Medium**: Normal priority
- **High**: Urgent tasks

### Sorting
Click on table column headers to sort:
- **Deadline**: Click to sort by date
- **Priority**: Click to sort by importance
- **Status**: Click to sort by completion state

## Understanding Task Status

TaskPing automatically determines task status:

- **Pending** (yellow): Active task not yet completed
- **Done** (green): Completed task
- **Overdue** (red): Past deadline but not completed

Status is calculated automatically based on the current date and task deadline.

## Dashboard Statistics

The top of the page shows real-time statistics:

- **Total Tasks**: All tasks across all selected event
- **Completed**: Number of finished tasks
- **Pending**: Active incomplete tasks
- **Overdue**: Tasks past deadline
- **Productivity**: Percentage of completed tasks

Stats update automatically as you add, complete, or delete tasks.

## Tips and Tricks

### Phone Number Format
Accept various formats:
- +1234567890
- (123) 456-7890
- 123-456-7890
- 1234567890

### Deadline Format
Use the date/time picker or enter:
- YYYY-MM-DD HH:MM format
- The system stores times in ISO format

### Bulk Import
Import 50+ tasks at once using CSV. Perfect for pre-planning events.

### Multiple Events
Create separate events for different occasions:
- Monthly meetups
- Quarterly planning sessions
- Special workshops
- Team projects

## Keyboard Shortcuts

- **Esc**: Close any modal (event, task, or import)
- **Click column headers**: Sort tasks
- **Type in search**: Filter by task name or person

## Troubleshooting

### CSV Import Fails
- Check that required columns exist: title, assignedTo, phone, deadline
- Verify phone numbers are valid
- Ensure dates are in correct format
- Check that no required fields are empty

### Event Not Showing Tasks
- Make sure the event is selected (highlighted in the sidebar)
- Confirm tasks were added to this event
- Use search/filter to find specific tasks

### Can't Delete Event
- The event must not have any tasks (though it will delete them)
- Try refreshing the page

## Common Tasks

### Plan an Event
1. Create event with event name and date
2. Add tasks for setup, invitations, scheduling
3. Assign each task to a team member with their phone
4. Set priorities based on urgency
5. Monitor progress via dashboard stats

### Delegate Responsibilities
1. Create an event
2. Add tasks with clear descriptions
3. Assign to specific team members
4. Set realistic deadlines
5. Check completion status

### Track Progress
1. Dashboard shows completion percentage
2. Filter by status to see pending/overdue tasks
3. Sort by deadline to prioritize work
4. Review statistics before and after event

## Getting Help

- Hover over buttons to see tooltips
- Use modal titles to understand what each form does
- Check the app title for current context

## Best Practices

1. **Be Specific**: Use clear task titles and descriptions
2. **Realistic Deadlines**: Set achievable completion dates
3. **Assign Early**: Give team members time to prepare
4. **Regular Reviews**: Check dashboard stats weekly
5. **Clean Up**: Delete completed events to reduce clutter
6. **Use Priorities**: Mark truly urgent tasks as High
7. **Import in Bulk**: For many tasks, use CSV import

---

Need more help? TaskPing is built to be intuitive. Most actions have visual feedback and clear confirmations.

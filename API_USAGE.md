# Supabase API Usage Guide

This guide explains how to use the authenticated API requests to Supabase from your Next.js frontend.

## Setup

The API utility functions are located in `src/lib/supabaseApi.ts` and provide both fetch and axios-based methods for making authenticated requests to Supabase.

## Available Functions

### Task Operations

#### 1. Get All Tasks
```typescript
import { taskApi } from "@/lib/supabaseApi";

// Get all tasks for the current user
const tasks = await taskApi.getTasks();
```

#### 2. Create a Task
```typescript
import { taskApi } from "@/lib/supabaseApi";

const newTask = await taskApi.createTask({
  title: "Complete project documentation",
  start_date: "2024-01-15",
  due_date: "2024-01-20",
  project_id: "your-project-id",
  status: "pending" // optional, defaults to "pending"
});
```

#### 3. Update a Task
```typescript
import { taskApi } from "@/lib/supabaseApi";

const updatedTask = await taskApi.updateTask("task-id", {
  title: "Updated task title",
  status: "completed"
});
```

#### 4. Delete a Task
```typescript
import { taskApi } from "@/lib/supabaseApi";

await taskApi.deleteTask("task-id");
```

#### 5. Get Tasks by Status
```typescript
import { taskApi } from "@/lib/supabaseApi";

const completedTasks = await taskApi.getTasksByStatus("completed");
const pendingTasks = await taskApi.getTasksByStatus("pending");
```

#### 6. Get Overdue Tasks
```typescript
import { taskApi } from "@/lib/supabaseApi";

const overdueTasks = await taskApi.getOverdueTasks();
```

### Project Operations

#### 1. Get All Projects
```typescript
import { projectApi } from "@/lib/supabaseApi";

const projects = await projectApi.getProjects();
```

#### 2. Create a Project
```typescript
import { projectApi } from "@/lib/supabaseApi";

const newProject = await projectApi.createProject({
  name: "New Project"
});
```

## Direct API Access

If you need more control, you can use the direct API functions:

### Fetch API
```typescript
import { fetchApi } from "@/lib/supabaseApi";

// GET request
const tasks = await fetchApi.get('/tasks', {
  user_id: 'eq.current-user-id',
  select: '*,projects(name)'
});

// POST request
const newTask = await fetchApi.post('/tasks', {
  title: "New task",
  user_id: "user-id",
  project_id: "project-id"
});

// PATCH request
const updatedTask = await fetchApi.patch('/tasks?id=eq.task-id', {
  status: "completed"
});

// DELETE request
await fetchApi.delete('/tasks?id=eq.task-id');
```

### Axios API
```typescript
import { axiosApi } from "@/lib/supabaseApi";

// GET request
const tasks = await axiosApi.get('/tasks', {
  user_id: 'eq.current-user-id'
});

// POST request
const newTask = await axiosApi.post('/tasks', taskData);

// PATCH request
const updatedTask = await axiosApi.patch('/tasks?id=eq.task-id', updates);

// DELETE request
await axiosApi.delete('/tasks?id=eq.task-id');
```

## Priority Highlighting

The dashboard automatically highlights task priorities based on due dates:

- **Overdue**: Red background (`bg-red-200 text-red-800`)
- **Due Today**: Yellow background (`bg-yellow-200 text-yellow-800`)
- **Due Soon (1-3 days)**: Orange background (`bg-orange-200 text-orange-800`)
- **On Track**: Green background (`bg-green-200 text-green-800`)

## Error Handling

All API functions include proper error handling:

```typescript
try {
  const tasks = await taskApi.getTasks();
  // Handle success
} catch (error) {
  console.error("Error fetching tasks:", error);
  // Handle error (show user message, etc.)
}
```

## Authentication

The API functions automatically handle authentication by:

1. Getting the current user session from Supabase
2. Including the access token in request headers
3. Handling authentication errors gracefully

## Example Usage in Components

```typescript
"use client";
import { useState, useEffect } from "react";
import { taskApi } from "@/lib/supabaseApi";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await taskApi.getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleAddTask = async (taskData) => {
    try {
      await taskApi.createTask(taskData);
      // Refresh the task list
      const updatedTasks = await taskApi.getTasks();
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {tasks.map(task => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
}
```

## Environment Variables

Make sure your `.env.local` file contains:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Notes

- All API functions are automatically authenticated using the current user's session
- The functions handle both success and error cases
- Data is automatically refreshed when tasks are added/updated
- Priority highlighting is calculated based on the current date and task due dates
- The API supports both individual operations and batch operations 
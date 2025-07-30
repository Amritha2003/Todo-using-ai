// Supabase API utility functions using fetch
import { supabase } from './supabaseClient';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Fetch API wrapper functions
export const fetchApi = {
  // GET request
  get: async (endpoint: string, params?: Record<string, any>) => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    
    const url = new URL(`${SUPABASE_URL}/rest/v1${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      headers: {
        'apikey': SUPABASE_ANON_KEY!,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    return response.json();
  },

  // POST request
  post: async (endpoint: string, data: any) => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    
    const response = await fetch(`${SUPABASE_URL}/rest/v1${endpoint}`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY!,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    return response.json();
  },

  // PATCH request
  patch: async (endpoint: string, data: any) => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    
    const response = await fetch(`${SUPABASE_URL}/rest/v1${endpoint}`, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_ANON_KEY!,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    return response.json();
  },

  // DELETE request
  delete: async (endpoint: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    
    const response = await fetch(`${SUPABASE_URL}/rest/v1${endpoint}`, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_ANON_KEY!,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    return response.json();
  },
};

// Task-specific API functions
export const taskApi = {
  // Get all tasks for current user
  getTasks: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    
    return fetchApi.get('/tasks', {
      user_id: `eq.${user.id}`,
      select: '*,projects(name)',
      order: 'created_at.desc'
    });
  },

  // Create a new task with duplicate check and date validation
  createTask: async (taskData: {
    title: string;
    start_date?: string;
    due_date?: string;
    project_id: string;
    status?: string;
  }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Server-side date validation
    if (taskData.start_date && isNaN(Date.parse(taskData.start_date))) {
      throw new Error('Start date is invalid.');
    }
    if (taskData.due_date && isNaN(Date.parse(taskData.due_date))) {
      throw new Error('Due date is invalid.');
    }
    if (
      taskData.start_date &&
      taskData.due_date &&
      new Date(taskData.due_date) < new Date(taskData.start_date)
    ) {
      throw new Error('Due date cannot be before start date.');
    }

    // Check for duplicate task (same title, project_id, and start_date)
    const duplicateParams: Record<string, string> = {
      user_id: `eq.${user.id}`,
      project_id: `eq.${taskData.project_id}`,
      title: `eq.${taskData.title}`,
    };
    if (taskData.start_date) {
      duplicateParams.start_date = `eq.${taskData.start_date}`;
    }
    const existing = await fetchApi.get('/tasks', duplicateParams);
    if (Array.isArray(existing) && existing.length > 0) {
      throw new Error('A task with the same title, project, and date already exists.');
    }

    return fetchApi.post('/tasks', {
      ...taskData,
      user_id: user.id,
      status: taskData.status || 'pending'
    });
  },

  // Update a task
  updateTask: async (taskId: string, updates: Partial<{
    title: string;
    start_date: string;
    due_date: string;
    project_id: string;
    status: string;
  }>) => {
    return fetchApi.patch(`/tasks?id=eq.${taskId}`, updates);
  },

  // Delete a task
  deleteTask: async (taskId: string) => {
    return fetchApi.delete(`/tasks?id=eq.${taskId}`);
  },

  // Get tasks by status
  getTasksByStatus: async (status: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    
    return fetchApi.get('/tasks', {
      user_id: `eq.${user.id}`,
      status: `eq.${status}`,
      select: '*,projects(name)',
      order: 'due_date.asc'
    });
  },

  // Get overdue tasks
  getOverdueTasks: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    
    const today = new Date().toISOString().split('T')[0];
    return fetchApi.get('/tasks', {
      user_id: `eq.${user.id}`,
      due_date: `lt.${today}`,
      select: '*,projects(name)',
      order: 'due_date.asc'
    });
  },
};

// Project-specific API functions
export const projectApi = {
  // Get all projects for current user
  getProjects: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    
    return fetchApi.get('/projects', {
      user_id: `eq.${user.id}`,
      select: 'id,name',
      order: 'name.asc'
    });
  },

  // Create a new project
  createProject: async (projectData: { name: string }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    
    return fetchApi.post('/projects', {
      ...projectData,
      user_id: user.id
    });
  },
};

export default {
  fetchApi,
  taskApi,
  projectApi,
}; 
// Supabase API utility functions using fetch
import { supabase } from './supabaseClient';

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

// Helper function to get authenticated user
const getAuthenticatedUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    throw new Error('User not authenticated');
  }
  return user;
};

// Generic fetch wrapper for authenticated requests
const authenticatedFetch = async <T>(
  url: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    const user = await getAuthenticatedUser();
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.id}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return { data: null, error: errorMessage };
  }
};

// Fetch API wrapper functions
const fetchApi = {
  // GET request
  get: async (endpoint: string, params?: Record<string, string>) => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    
    const url = new URL(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    
    const response = await fetch(url.toString(), {
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    return response.json();
  },

  // POST request
  post: async (endpoint: string, data: Record<string, unknown>) => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1${endpoint}`, {
      method: 'POST',
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    return response.json();
  },

  // PATCH request
  patch: async (endpoint: string, data: Record<string, unknown>) => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1${endpoint}`, {
      method: 'PATCH',
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(data)
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
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1${endpoint}`, {
      method: 'DELETE',
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
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
    const user = await getAuthenticatedUser();
    
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
    const user = await getAuthenticatedUser();

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
    const user = await getAuthenticatedUser();
    
    return fetchApi.get('/tasks', {
      user_id: `eq.${user.id}`,
      status: `eq.${status}`,
      select: '*,projects(name)',
      order: 'due_date.asc'
    });
  },

  // Get overdue tasks
  getOverdueTasks: async () => {
    const user = await getAuthenticatedUser();
    
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
    const user = await getAuthenticatedUser();
    
    return fetchApi.get('/projects', {
      user_id: `eq.${user.id}`,
      select: 'id,name',
      order: 'name.asc'
    });
  },

  // Create a new project
  createProject: async (projectData: { name: string }) => {
    const user = await getAuthenticatedUser();
    
    return fetchApi.post('/projects', {
      ...projectData,
      user_id: user.id
    });
  },
};

// Export the API functions
export const supabaseApi = {
  fetchApi,
  taskApi,
  projectApi,
}; 
"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRightSquare, Search } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface Task {
  id: string;
  title: string;
  start_date: string;
  due_date: string;
  project_id: string;
  user_id: string;
  status?: string;
  projects?: {
    name: string;
  } | null;
}

interface Project {
  id: string;
  name: string;
}

export default function TaskTable() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [projectId, setProjectId] = useState("");
  const [status, setStatus] = useState("pending");
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks with project details using Supabase client
  const fetchTasks = async () => {
    try {
      setLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      console.log("Fetching tasks for user:", user.id);

      const { data, error } = await supabase
        .from("tasks")
        .select(`
          id,
          title,
          start_date,
          due_date,
          project_id,
          user_id,
          status,
          projects (
            name
          )
        `)
        .eq("user_id", user.id)
        .order("id", { ascending: false });

      if (error) {
        console.error("Error fetching tasks:", error);
      } else {
        console.log("Tasks loaded successfully:", data);
        setTasks((data as unknown as Task[]) || []);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch projects for the dropdown using Supabase client
  const fetchProjects = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("projects")
        .select("id, name")
        .eq("user_id", user.id)
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching projects:", error);
      } else {
        console.log("Projects loaded:", data);
        setProjects(data || []);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchTasks();
  }, []);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return;
      }

      const taskData: {
        title: string;
        user_id: string;
        status: string;
        start_date?: string;
        due_date?: string;
        project_id?: string;
      } = {
        title: title.trim(),
        user_id: user.id,
        status: status
      };

      // Only add dates if they're provided
      if (startDate) taskData.start_date = startDate;
      if (dueDate) taskData.due_date = dueDate;
      if (projectId) taskData.project_id = projectId;

      console.log("Creating task with data:", taskData);

      const { error } = await supabase.from("tasks").insert([taskData]);

      if (error) {
        console.error("Error creating task:", error);
      } else {
        console.log("Task created successfully");
        setOpen(false);
        setTitle("");
        setStartDate("");
        setDueDate("");
        setProjectId("");
        setStatus("pending");
        // Refresh the task list
        fetchTasks();
      }
    } catch (error: unknown) {
      console.error("Error in handleAddTask:", error);
    }
  };

  // Function to get due date urgency status and styling
  const getDueDateStatus = (dueDate: string) => {
    if (!dueDate) {
      return {
        label: "No due date",
        className: "bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs font-medium"
      };
    }

    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return {
        label: `Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? 's' : ''}`,
        className: "bg-red-200 text-red-800 px-2 py-1 rounded-full text-xs font-medium"
      };
    } else if (diffDays === 0) {
      return {
        label: "Due today",
        className: "bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium"
      };
    } else if (diffDays <= 3) {
      return {
        label: `Due in ${diffDays} day${diffDays > 1 ? 's' : ''}`,
        className: "bg-orange-200 text-orange-800 px-2 py-1 rounded-full text-xs font-medium"
      };
    } else {
      return {
        label: "On track",
        className: "bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-medium"
      };
    }
  };

  // Function to get priority status styling
  const getPriorityStatus = (taskStatus: string) => {
    switch (taskStatus) {
      case 'pending':
        return {
          label: "Todo",
          className: "bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs font-medium"
        };
      case 'in_progress':
        return {
          label: "In Progress",
          className: "bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
        };
      case 'blocked':
        return {
          label: "Blocked",
          className: "bg-red-200 text-red-800 px-2 py-1 rounded-full text-xs font-medium"
        };
      default:
        return {
          label: "Todo",
          className: "bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs font-medium"
        };
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="relative">
      {/* Blur overlay when drawer is open */}
      <div className={open ? "blur-sm pointer-events-none select-none" : ""}>
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64">
            <Input className="pr-10" placeholder="Search" />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <Button
            className="flex items-center justify-center gap-2 font-bold"
            style={{ background: '#264FD6' }}
            onClick={() => setOpen(true)}
          >
            Add Task
            <ArrowRightSquare size={20} />
          </Button>
        </div>

        {/* Error message */}
        {/* Removed error message display */}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left font-light">Task</th>
                <th className="px-4 py-2 text-left font-light">Start Date</th>
                <th className="px-4 py-2 text-left font-light">Due Date</th>
                <th className="px-4 py-2 text-left font-light">Project</th>
                <th className="px-4 py-2 text-left font-light">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    Loading tasks...
                  </td>
                </tr>
              ) : tasks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    No tasks found. Create your first task!
                  </td>
                </tr>
              ) : (
                tasks.map((task) => {
                  const dueDateStatus = getDueDateStatus(task.due_date);
                  const priorityStatus = getPriorityStatus(task.status || 'todo');
                  return (
                    <tr key={task.id} className="border-t">
                      <td className="px-4 py-3">{task.title}</td>
                      <td className="px-4 py-3">{formatDate(task.start_date)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span>{formatDate(task.due_date)}</span>
                          <span className={dueDateStatus.className}>
                            {dueDateStatus.label}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">{task.projects?.name || "No project"}</td>
                      <td className="px-4 py-3">{priorityStatus.label}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Drawer for Add Task */}
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-xl border-l flex flex-col relative">
            <div className="flex flex-row items-center justify-between p-4 border-b">
              <span className="text-lg font-bold">Add Task</span>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-2xl ml-2 border-none focus:outline-none"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <form className="p-4 space-y-4 flex-1 overflow-y-auto pb-16" onSubmit={handleAddTask}>
              <div>
                <label className="block font-semibold mb-1">Task *</label>
                <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter your task" type="text" required />
              </div>
              <div>
                <label className="block font-semibold mb-1">Start Date</label>
                <Input value={startDate} onChange={e => setStartDate(e.target.value)} placeholder="Select a date" type="date" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Due Date</label>
                <Input value={dueDate} onChange={e => setDueDate(e.target.value)} placeholder="Select a date" type="date" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Project</label>
                <select value={projectId} onChange={e => setProjectId(e.target.value)} className="w-full border rounded px-3 py-2">
                  <option value="">No project (optional)</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>{project.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Priority</label>
                <select value={status} onChange={e => setStatus(e.target.value)} className="w-full border rounded px-3 py-2">
                  <option value="pending">Todo</option>
                  <option value="in_progress">In Progress</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>
              {/* Removed error message display */}
            </form>
            {/* Add Task button at the bottom right */}
            <div className="absolute bottom-4 right-4">
              <Button
                className="px-4 py-2 font-bold"
                style={{ background: '#264FD6' }}
                type="submit"
                form="make-task-form"
                onClick={handleAddTask}
              >
                Add Task
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
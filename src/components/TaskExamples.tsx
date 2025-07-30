"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { taskApi, projectApi } from "@/lib/supabaseApi";

export default function TaskExamples() {
  const [message, setMessage] = useState("");

  // Example: Create a task using fetch API
  const createTaskWithFetch = async () => {
    try {
      const result = await taskApi.createTask({
        title: "Example task created with fetch",
        start_date: "2024-01-15",
        due_date: "2024-01-20",
        project_id: "your-project-id", // Replace with actual project ID
        status: "pending"
      });
      setMessage("Task created successfully with fetch!");
      console.log("Created task:", result);
    } catch (error) {
      setMessage("Error creating task with fetch");
      console.error(error);
    }
  };

  // Example: Get tasks using fetch API
  const getTasksWithFetch = async () => {
    try {
      const tasks = await taskApi.getTasks();
      setMessage(`Found ${tasks.length} tasks with fetch`);
      console.log("Tasks:", tasks);
    } catch (error) {
      setMessage("Error fetching tasks with fetch");
      console.error(error);
    }
  };

  // Example: Get overdue tasks
  const getOverdueTasks = async () => {
    try {
      const tasks = await taskApi.getOverdueTasks();
      setMessage(`Found ${tasks.length} overdue tasks`);
      console.log("Overdue tasks:", tasks);
    } catch (error) {
      setMessage("Error fetching overdue tasks");
      console.error(error);
    }
  };

  // Example: Create a project
  const createProject = async () => {
    try {
      const result = await projectApi.createProject({
        name: "Example Project"
      });
      setMessage("Project created successfully!");
      console.log("Created project:", result);
    } catch (error) {
      setMessage("Error creating project");
      console.error(error);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-bold">API Examples</h2>
      
      <div className="space-y-2">
        <Button onClick={createTaskWithFetch} variant="outline">
          Create Task (Fetch API)
        </Button>
        
        <Button onClick={getTasksWithFetch} variant="outline">
          Get Tasks (Fetch API)
        </Button>
        
        <Button onClick={getOverdueTasks} variant="outline">
          Get Overdue Tasks
        </Button>
        
        <Button onClick={createProject} variant="outline">
          Create Project
        </Button>
      </div>
      
      {message && (
        <div className="p-2 bg-blue-100 text-blue-800 rounded">
          {message}
        </div>
      )}
    </div>
  );
} 
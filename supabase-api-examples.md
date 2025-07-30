# Supabase REST API Endpoints for Tasks

## Base Configuration
- **Project URL**: `https://rkjezcfjuhagnqwumubx.supabase.co`
- **API Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI`

## Headers
```
Content-Type: application/json
apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI
```

---

## 1. READ Operations

### Get All Tasks
```bash
curl -X GET "https://rkjezcfjuhagnqwumubx.supabase.co/rest/v1/tasks" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI"
```

### Get Tasks by User ID
```bash
curl -X GET "https://rkjezcfjuhagnqwumubx.supabase.co/rest/v1/tasks?user_id=eq.YOUR_USER_ID" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI"
```

### Get Single Task by ID
```bash
curl -X GET "https://rkjezcfjuhagnqwumubx.supabase.co/rest/v1/tasks?id=eq.TASK_ID" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI"
```

### Get Tasks with Project Details (Join)
```bash
curl -X GET "https://rkjezcfjuhagnqwumubx.supabase.co/rest/v1/tasks?select=*,projects(name)" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI"
```

---

## 2. CREATE Operations

### Create a New Task
```bash
curl -X POST "https://rkjezcfjuhagnqwumubx.supabase.co/rest/v1/tasks" \
  -H "Content-Type: application/json" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI" \
  -d '{
    "title": "Complete project documentation",
    "start_date": "2024-01-15",
    "due_date": "2024-01-20",
    "project_id": "PROJECT_ID_HERE",
    "user_id": "USER_ID_HERE",
    "status": "pending"
  }'
```

### Create Multiple Tasks
```bash
curl -X POST "https://rkjezcfjuhagnqwumubx.supabase.co/rest/v1/tasks" \
  -H "Content-Type: application/json" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI" \
  -d '[
    {
      "title": "Task 1",
      "start_date": "2024-01-15",
      "due_date": "2024-01-20",
      "project_id": "PROJECT_ID_1",
      "user_id": "USER_ID_HERE",
      "status": "pending"
    },
    {
      "title": "Task 2",
      "start_date": "2024-01-16",
      "due_date": "2024-01-22",
      "project_id": "PROJECT_ID_2",
      "user_id": "USER_ID_HERE",
      "status": "pending"
    }
  ]'
```

---

## 3. UPDATE Operations

### Update a Task
```bash
curl -X PATCH "https://rkjezcfjuhagnqwumubx.supabase.co/rest/v1/tasks?id=eq.TASK_ID" \
  -H "Content-Type: application/json" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI" \
  -d '{
    "title": "Updated task title",
    "status": "completed",
    "due_date": "2024-01-25"
  }'
```

### Update Task Status Only
```bash
curl -X PATCH "https://rkjezcfjuhagnqwumubx.supabase.co/rest/v1/tasks?id=eq.TASK_ID" \
  -H "Content-Type: application/json" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI" \
  -d '{
    "status": "in_progress"
  }'
```

---

## 4. DELETE Operations

### Delete a Single Task
```bash
curl -X DELETE "https://rkjezcfjuhagnqwumubx.supabase.co/rest/v1/tasks?id=eq.TASK_ID" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI"
```

### Delete Multiple Tasks by User
```bash
curl -X DELETE "https://rkjezcfjuhagnqwumubx.supabase.co/rest/v1/tasks?user_id=eq.USER_ID" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI"
```

---

## 5. Advanced Queries

### Filter Tasks by Status
```bash
curl -X GET "https://rkjezcfjuhagnqwumubx.supabase.co/rest/v1/tasks?status=eq.completed" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI"
```

### Get Tasks Due Today
```bash
curl -X GET "https://rkjezcfjuhagnqwumubx.supabase.co/rest/v1/tasks?due_date=eq.2024-01-15" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI"
```

### Order Tasks by Due Date
```bash
curl -X GET "https://rkjezcfjuhagnqwumubx.supabase.co/rest/v1/tasks?order=due_date.asc" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI"
```

### Limit Results
```bash
curl -X GET "https://rkjezcfjuhagnqwumubx.supabase.co/rest/v1/tasks?limit=10" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI"
```

---

## 6. JavaScript/TypeScript Examples

### Using Fetch API
```javascript
// Get all tasks
const getTasks = async () => {
  const response = await fetch('https://rkjezcfjuhagnqwumubx.supabase.co/rest/v1/tasks', {
    headers: {
      'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI'
    }
  });
  return await response.json();
};

// Create a task
const createTask = async (taskData) => {
  const response = await fetch('https://rkjezcfjuhagnqwumubx.supabase.co/rest/v1/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI'
    },
    body: JSON.stringify(taskData)
  });
  return await response.json();
};
```

### Using Axios
```javascript
import axios from 'axios';

const supabaseApi = axios.create({
  baseURL: 'https://rkjezcfjuhagnqwumubx.supabase.co/rest/v1',
  headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramV6Y2ZqdWhhZ25xd3VtdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgyNjMsImV4cCI6MjA2NDAxNDI2M30.14Iu0zM3amFaGiNVa_tQLAwXwRSMb2tJfE2xUPXI-PI'
  }
});

// Get tasks
const getTasks = () => supabaseApi.get('/tasks');

// Create task
const createTask = (taskData) => supabaseApi.post('/tasks', taskData);

// Update task
const updateTask = (id, updates) => supabaseApi.patch(`/tasks?id=eq.${id}`, updates);

// Delete task
const deleteTask = (id) => supabaseApi.delete(`/tasks?id=eq.${id}`);
```

---

## Notes:
- Replace `TASK_ID`, `USER_ID`, `PROJECT_ID` with actual values
- The API key shown is the anon/public key - for production, use service role key for admin operations
- RLS (Row Level Security) policies may affect which data you can access
- All dates should be in ISO format (YYYY-MM-DD)
- The `status` field can be: `pending`, `in_progress`, `completed`, etc. 
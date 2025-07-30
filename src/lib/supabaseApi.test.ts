import { taskApi } from './supabaseApi';

// Mock dependencies
global.fetch = jest.fn();
jest.mock('./supabaseClient', () => ({
  supabase: {
    auth: {
      getUser: jest.fn(),
      getSession: jest.fn(),
    },
  },
}));

const mockUser = { id: 'user-1' };
const mockTask = {
  title: 'Test Task',
  project_id: 'proj-1',
  start_date: '2024-06-01',
};

describe('taskApi.createTask', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a task successfully', async () => {
    require('./supabaseClient').supabase.auth.getUser.mockResolvedValue({ data: { user: mockUser } });
    // No duplicate found
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => [] }) // duplicate check
      .mockResolvedValueOnce({ ok: true, json: async () => ({ id: 'task-1', ...mockTask }) }); // create

    const result = await taskApi.createTask(mockTask);
    expect(result).toMatchObject({ id: 'task-1', ...mockTask });
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('throws error on duplicate task', async () => {
    require('./supabaseClient').supabase.auth.getUser.mockResolvedValue({ data: { user: mockUser } });
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => [{ id: 'existing-task' }] }); // duplicate found

    await expect(taskApi.createTask(mockTask)).rejects.toThrow('A task with the same title, project, and date already exists.');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('throws error if user not authenticated', async () => {
    require('./supabaseClient').supabase.auth.getUser.mockResolvedValue({ data: { user: null } });
    await expect(taskApi.createTask(mockTask)).rejects.toThrow('User not authenticated');
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('throws error on API failure (duplicate check)', async () => {
    require('./supabaseClient').supabase.auth.getUser.mockResolvedValue({ data: { user: mockUser } });
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: false, status: 500, text: async () => 'Internal Server Error' });
    await expect(taskApi.createTask(mockTask)).rejects.toThrow('HTTP error! status: 500, message: Internal Server Error');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('throws error on API failure (create)', async () => {
    require('./supabaseClient').supabase.auth.getUser.mockResolvedValue({ data: { user: mockUser } });
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => [] }) // duplicate check
      .mockResolvedValueOnce({ ok: false, status: 400, text: async () => 'Bad Request' }); // create
    await expect(taskApi.createTask(mockTask)).rejects.toThrow('HTTP error! status: 400, message: Bad Request');
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});

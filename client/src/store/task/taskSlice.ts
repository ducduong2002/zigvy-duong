import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Task } from "../../container/type";


interface TaskState {
  tasks: Task[];
  loading: boolean;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
};

export const fetchTaskByUserId = createAsyncThunk(
  'user/fetchTaskByUserId',
  async (userId: string) => {
    const response = await axios.get(`http://localhost:3002/task/${userId}`);
    return response.data;
  }
);

export const addTask = createAsyncThunk("tasks/addTask", async (task: Task) => {
  const response = await axios.post("http://localhost:3002/task", task);
  return response.data;
});


export const editTask = createAsyncThunk(
  "task/editTask",
  async ({ _id, updates }: { _id: string; updates: Partial<Task> }) => {
    const response = await axios.put(`http://localhost:3002/task/${_id}`, updates);
    return response.data;
  }
);

export const removeTask = createAsyncThunk("tasks/removeTask", async (_id: string) => {
  await axios.delete(`http://localhost:3002/task/${_id}`);
  return _id;  
});


const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaskByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTaskByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTaskByUserId.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task._id === action.payload._id);
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      });
      
  },
});

export default taskSlice.reducer;

  import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
  import axios from "axios";
  import { Tasks } from "../../container/type";


  interface TaskState {
    tasks: Tasks[];
    page: number;
    loading: boolean;
    limit: number;
    totalTasks: number;
    totalPages: number;
    keyword: string
    status: string;
    priority: string
  }

  const initialState: TaskState = {
    tasks: [],
    loading: false,
    page: 1,
    limit: 5,
    totalTasks: 0,
    totalPages: 0,
    keyword: '',
    status:"",
    priority:""
  };

  export const fetchTaskByUserId = createAsyncThunk(
    'user/fetchTaskByUserId',
    async (userId: string, { getState }) => {
      const { page, limit, keyword, status , priority } = (getState() as any).tasks;
      const response = await axios.get(
        `http://localhost:3002/task/${userId}`, 
        {
          params: {
            page,
            limit,
            keyword,
            status,
            priority
          },
        }
      );
      console.log(response.data);
      return response.data;
    }
  );
  export const addTask = createAsyncThunk("tasks/addTask", async (task: Tasks) => {
    const response = await axios.post("http://localhost:3002/task", task);
    return response.data;
  });


  export const editTask = createAsyncThunk(
    "task/editTask",  
    async ({ _id, updates }: { _id: string; updates: Partial<Tasks> }) => {
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
    reducers: {
      setPage(state, action) {
        state.page = action.payload;
      },
      setLimit(state, action) {
        state.limit = action.payload;
      },
      setKeyword: (state, action) => {
        state.keyword = action.payload;
      },
      resetTasks(state) {
        state.tasks = [];
        state.page = 1; 
      },
      setStatus: (state, action) => {
        state.status = action.payload; 
      },
      setPriority: (state, action) => {
        state.priority = action.payload; 
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchTaskByUserId.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchTaskByUserId.fulfilled, (state, action) => {
          const { tasks, totalTasks, totalPages, limit, page, status, priority} = action.payload;
          state.tasks = tasks;
          state.limit = limit;
          state.page = page;
          state.status = status;
          state.totalTasks = totalTasks;
          state.totalPages = totalPages;
          state.loading = false;
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
  export const { setPage, setLimit, setKeyword ,resetTasks , setPriority ,setStatus} = taskSlice.actions;
  export default taskSlice.reducer;

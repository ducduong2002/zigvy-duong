import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Projects } from "../../container/type";


interface ProjectState {
  projects: Projects[];
  page: number;
  loading: boolean;
  limit: number;
  totalProjects: number;
  totalPages: number;
  keyword: string
}

const initialState: ProjectState = {
  projects: [],
  loading: false,
  page: 1,
  limit: 3,
  totalProjects: 0,
  totalPages: 0,
  keyword: ''
};

export const fetchProjectByUserId = createAsyncThunk(
  'user/fetchProjectByUserId',
  async (userId: string, { getState }) => {
    
    const { page, limit, keyword } = (getState() as any).projects;
    const response = await axios.get(
      `http://localhost:3002/project/${userId}`, 
      {
        params: {
          page,
          limit,
          keyword,
        },
      }
    );
    return response.data;
  }
);
export const addProject = createAsyncThunk("projects/addProject", async (project: Projects) => {
  const response = await axios.post("http://localhost:3002/project", project);
  return response.data;
});


export const editProject = createAsyncThunk(
  "project/editProject",  
  async ({ _id, updates }: { _id: string; updates: Partial<Projects> }) => {
    const response = await axios.put(`http://localhost:3002/project/${_id}`, updates);
    return response.data;
  }
);

export const removeProject = createAsyncThunk("projects/removeProject", async (_id: string) => {
  await axios.delete(`http://localhost:3002/project/${_id}`);
  return _id;  
});


const projectSlice = createSlice({
  name: "projects",
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
    resetProjects(state) {
      state.projects = [];
      state.page = 1; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjectByUserId.fulfilled, (state, action) => {
        const { projects, totalProjects, totalPages, limit, page } = action.payload;
        state.projects = projects;
        state.limit = limit;
        state.page = page;
        state.totalProjects = totalProjects;
        state.totalPages = totalPages;
        state.loading = false;
      })
      .addCase(fetchProjectByUserId.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(editProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex((project) => project._id === action.payload._id);
        if (index !== -1) state.projects[index] = action.payload;
      })
      .addCase(removeProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((project) => project._id !== action.payload);
      });
      
  },
});
export const { setPage, setLimit, setKeyword ,resetProjects } = projectSlice.actions;
export default projectSlice.reducer;

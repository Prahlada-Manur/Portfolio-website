import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axios";
//----------------------------------------------------------------------------------------------------
export const fetchProject = createAsyncThunk(
  "Project/fetchProject",
  async (undefined, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/projects");
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      rejectWithValue(err.response.data.error);
    }
  }
);
//--------------------------------------------------------------------------------------------------------------
export const fetchProjectById = createAsyncThunk(
  "Project/fetchProjectById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/project/${id}`);
      return response.data;
    } catch (err) {
      console.log(err);
      rejectWithValue(err.response.data.error);
    }
  }
);
//-------------------------------------------------------------------------------------------------------------
export const deleteProject = createAsyncThunk(
  "Project/deleteProject",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/project/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      return response.data;
    } catch (err) {
      console.log(err);
      rejectWithValue(err.response.data.error);
    }
  }
);
//-----------------------------------------------------------------------------------------------------------------
export const createProject = createAsyncThunk(
  "Project/createProject",
  async (Data, { rejectWithValue }) => {
    try {
      const fd = new FormData();
      Object.keys(Data).forEach((ele) => {
        if (ele !== "projectThumbNail" && ele !== "techStack") {
          fd.append(ele, Data[ele]);
        }
      });
      fd.append("techStack", JSON.stringify(Data.techStack));
      if (Data.projectThumbNail) {
        fd.append("projectThumbNail", Data.projectThumbNail);
      }
      const response = await axios.post("/api/project", fd, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);

      return response.data.projectSave;
    } catch (err) {
      return rejectWithValue(err.response.data?.error);
    }
  }
);
//--------------------------------------------------------------------------------------------------------------------------
export const updateProject = createAsyncThunk(
  "Project/updateProject",
  async ({ id, Data }, { rejectWithValue }) => {
    try {
      const fd = new FormData();

      Object.keys(Data).forEach((ele) => {
        if (ele !== "projectThumbNail" && ele !== "techStack") {
          fd.append(ele, Data[ele]);
        }
      });
      fd.append("techStack", JSON.stringify(Data.techStack));
      if (Data.projectThumbNail) {
        fd.append("projectThumbNail", Data.projectThumbNail);
      }
      const response = await axios.put(`/api/project/${id}`, fd, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      return response.data.updatedData;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

const projectSlice = createSlice({
  name: "Project",
  initialState: {
    data: [],
    loading: null,
    errors: null,
    single: null,
  },
  reducers: {
    resetProject: (state) => {
      state.data = [];
      state.loading = null;
      state.errors = null;
      state.single = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProject.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.single = action.payload;
        state.loading = false;
        state.errors = null;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        const idx = state.data.findIndex((ele) => ele._id == action.payload._id);
        state.data.splice(idx, 1);
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.errors = null;
        state.loading = false;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.errors = action.payload;
        
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.single = action.payload;
        state.errors=null
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.errors = action.payload;
        
      });
  },
});
export default projectSlice.reducer;
export const { resetProject } = projectSlice.actions;

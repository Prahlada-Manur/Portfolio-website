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
export const FetchProjectById = createAsyncThunk(
  "Project/fetchProjectById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/project/${id}`);
      return response.data;
    } catch (err) {
      console.log(err);
      rejecWithValue(err.response.data.error);
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
        state.data = null;
        state.errors = action.payload;
      })
      .addCase(FetchProjectById.pending, (state) => {
        state.loading = true;
      })
      .addCase(FetchProjectById.fulfilled, (state, action) => {
        state.single = action.payload;
        state.loading = false;
        state.errors = null;
      });
  },
});
export default projectSlice.reducer;

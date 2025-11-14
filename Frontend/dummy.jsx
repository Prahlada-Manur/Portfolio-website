import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const fetchAbout = createAsyncThunk(
  "about/fetchAbout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/about");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateAbout = createAsyncThunk(
  "about/updateAbout",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.put("/api/about", payload);
      return res.data.updateAbout ?? res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const aboutSlice = createSlice({
  name: "about",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAbout.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAbout.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchAbout.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(updateAbout.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAbout.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(updateAbout.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default aboutSlice.reducer;

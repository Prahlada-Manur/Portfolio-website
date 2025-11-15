import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axios";
//------------------------------------------------------------------------------------export
export const fetchAbout = createAsyncThunk(
  "About/fetchAbout",
  async (undefined, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/about");
      return response.data;
    } catch (err) {
      console.log(err);
      rejectWithValue(err.message);
    }
  }
);
export const updateAbout = createAsyncThunk(
  "About/updateAbout",
  async (FormData, { rejectWithValue }) => {
    try {
      const response = await axios.put("/api/about", FormData, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      console.log(response.data.updateAbout);
      return response.data.updateAbout;
    } catch (err) {
      console.log(err);
      rejectWithValue(err.response.data.error);
    }
  }
);

//--------------------------------------------------------------------------------------
const aboutSlice = createSlice({
  name: "About",
  initialState: {
    data: [],
    errors: null,
    loading: null,
  },
  reducers: {
    resetAbout: (state) => {
      (state.data = []), (state.errors = null), (state.loading = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAbout.fulfilled, (state, action) => {
        (state.data = action.payload), (state.errors = null);
        state.loading = false;
      })
      .addCase(fetchAbout.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAbout.rejected, (state, action) => {
        state.errors = action.payload;
        state.loading = false;
      })
      .addCase(updateAbout.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(updateAbout.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(updateAbout.rejected, (state, action) => {
        state.errors = action.payload;
        state.loading = false;
      });
  },
});
export default aboutSlice.reducer;
export const { resetAbout } = aboutSlice.actions;

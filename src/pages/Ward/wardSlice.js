import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWards = createAsyncThunk("wards/fetchWards", async () => {
  const response = await axios.get(
    "https://fitness-api.imransiddiqui2.repl.co/api/v1/wards"
  );
  return response.data;
});

export const addWard = createAsyncThunk("wards/addWard", async (ward) => {
  const response = await axios.post(
    "https://fitness-api.imransiddiqui2.repl.co/api/v1/wards",
    ward
  );
  return response.data;
});
export const deleteWard = createAsyncThunk(
  "wards/deleteWard",
  async (wardId) => {
    const response = await axios.delete(
      `https://fitness-api.imransiddiqui2.repl.co/api/v1/wards/${wardId}`
    );
    response.data = wardId;
    return response.data;
  }
);
export const editWard = createAsyncThunk("wards/editWard", async (ward) => {
  const response = await axios.post(
    "https://fitness-api.imransiddiqui2.repl.co/api/v1/wards/update-ward",
    ward
  );
  return response.data;
});
const initialState = {
  wardList: [],
  status: "idle",
  error: false
};

const wardSlice = createSlice({
  name: "wards",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchWards.pending]: (state) => {
      state.status = "loading";
    },
    [fetchWards.fulfilled]: (state, action) => {
      state.status = "success";
      state.wardList = action.payload.data;
    },
    [fetchWards.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addWard.pending]: (state) => {
      state.status = "loading";
    },
    [addWard.fulfilled]: (state, action) => {
      state.status = "success";
      state.wardList = [...state.wardList, action.payload.data];
    },
    [addWard.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [editWard.pending]: (state) => {
      state.status = "loading";
    },
    [editWard.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedStudent = action.payload.data;
      const index = state.wardList.findIndex(
        (list) => list._id === updatedStudent._id
      );
      if (index !== -1) {
        state.wardList[index] = updatedStudent;
      }
    },
    [editWard.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteWard.pending]: (state) => {
      state.status = "loading";
    },
    [deleteWard.fulfilled]: (state, action) => {
      state.status = "success";
      state.wardList = state.wardList.filter(
        (teacher) => teacher._id !== action.payload
      );
    },
    [deleteWard.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }
  }
});

export default wardSlice.reducer;

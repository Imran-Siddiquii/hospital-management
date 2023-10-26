import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async () => {
    const response = await axios.get(
      "https://fitness-api.imransiddiqui2.repl.co/api/v1/patients"
    );
    return response.data;
  }
);

export const addPatient = createAsyncThunk(
  "patients/addPatient",
  async (patient) => {
    const response = await axios.post(
      "https://fitness-api.imransiddiqui2.repl.co/api/v1/patients",
      patient
    );
    return response.data;
  }
);
export const deletePatient = createAsyncThunk(
  "patients/deletePatient",
  async (patientId) => {
    const response = await axios.delete(
      `https://fitness-api.imransiddiqui2.repl.co/api/v1/patients/${patientId}`
    );
    response.data = patientId;
    return response.data;
  }
);
export const editPatient = createAsyncThunk(
  "patients/editPatient",
  async (patient) => {
    const response = await axios.post(
      "https://fitness-api.imransiddiqui2.repl.co/api/v1/patients/update-patient",
      patient
    );
    return response.data;
  }
);
const initialState = {
  patientList: [],
  status: "idle",
  error: false
};

const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPatients.pending]: (state) => {
      state.status = "loading";
    },
    [fetchPatients.fulfilled]: (state, action) => {
      state.status = "success";
      state.patientList = action.payload.data;
    },
    [fetchPatients.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addPatient.pending]: (state) => {
      state.status = "loading";
    },
    [addPatient.fulfilled]: (state, action) => {
      state.status = "success";
      state.patientList = [...state.patientList, action.payload.data];
    },
    [addPatient.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [editPatient.pending]: (state) => {
      state.status = "loading";
    },
    [editPatient.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedStudent = action.payload.data;
      const index = state.patientList.findIndex(
        (list) => list._id === updatedStudent._id
      );
      if (index !== -1) {
        state.patientList[index] = updatedStudent;
      }
    },
    [editPatient.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deletePatient.pending]: (state) => {
      state.status = "loading";
    },
    [deletePatient.fulfilled]: (state, action) => {
      state.status = "success";
      state.patientList = state.patientList.filter(
        (student) => student._id !== action.payload
      );
    },
    [deletePatient.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }
  }
});
export const { fetchStandard, sortedBy, filteredBy } = patientSlice.actions;
export default patientSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";

import patientSlice from "../pages/Patient/patientSlice";
import wardSlice from "../pages/Ward/wardSlice";

const store = configureStore({
  reducer: {
    patients: patientSlice,
    wards: wardSlice
  }
});

export default store;

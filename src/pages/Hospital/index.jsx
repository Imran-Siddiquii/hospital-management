import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import "../Patient/index.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../Patient/patientSlice";
import { fetchWards } from "../Ward/wardSlice";

const Hospital = () => {
  const dispatch = useDispatch();
  const { patientList, status } = useSelector((state) => state.patients);
  const { wardList } = useSelector((state) => state.wards);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPatients());
      dispatch(fetchWards());
    }
  }, [status, dispatch]);

  const totalPatients = patientList.length;
  const totalCapacity = wardList.reduce(
    (acc, curr) => (acc += curr.capacity),
    0
  );

  // Calculate the current occupancy rate
  const occupancyRate = (totalPatients / totalCapacity) * 100;

  // Calculate the top-performing ward
  const wardCounts = {};
  patientList?.forEach((patient) => {
    wardCounts[patient.ward] = (wardCounts[patient.ward] || 0) + 1;
  });

  const topWard = Object.keys(wardCounts)?.reduce(
    (a, b) => (wardCounts[a] > wardCounts[b] ? a : b),
    null
  );

  const averageLengthOfStay =
    wardList.reduce((total, curr) => total + curr.stay, 0) / totalPatients;
  return (
    <div className="exercise-container" sx={{ border: "1px solid gray" }}>
      <Typography
        variant="h4"
        mt={6}
        textAlign="center"
        color="#07c0b4"
        gutterBottom
      >
        Hospital
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          border: "1px solid #07c0b4",
          padding: "1rem",
          margin: "1rem",
          borderRadius: "5px"
        }}
      >
        <Grid item xs={12} sm={12}>
          <div>
            <h2 style={{ margin: "1rem" }}>Hospital-wide statistics</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Total Patients</TableCell>
                    <TableCell>The current occupancy rate</TableCell>
                    <TableCell>The average length of stay</TableCell>
                    <TableCell>Top-performing ward</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{patientList && patientList.length}</TableCell>
                    <TableCell> {occupancyRate.toFixed(2)}%</TableCell>
                    <TableCell>{averageLengthOfStay.toFixed(2)} days</TableCell>
                    <TableCell>{topWard}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Hospital;

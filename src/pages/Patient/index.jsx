import React, { useEffect, useState } from "react";
import {
  Button,
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
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "./patientSlice";

const Patient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { patientList, status, error } = useSelector((state) => state.patients);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPatients());
    }
  }, [status, dispatch]);

  return (
    <div className="exercise-container" sx={{ border: "1px solid gray" }}>
      <Typography
        variant="h4"
        mt={6}
        textAlign="center"
        color="#07c0b4"
        gutterBottom
      >
        Patients
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
        <Grid item xs={12} sm={8}>
          <Grid item container>
            <Grid sm={12} justifyContent="end">
              <Button
                variant="contained"
                onClick={() => navigate("/patient/add")}
                style={{
                  backgroundColor: "#07c0b4"
                }}
              >
                Add Patient
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12}>
          <div>
            <h2 style={{ margin: "1rem" }}>Patient Lists</h2>
            <TableContainer
              component={Paper}
              style={{ maxHeight: "500px", overflowY: "auto" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Serial Number</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Ward</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patientList?.map((patient, index) => (
                    <TableRow
                      style={{
                        cursor: "pointer"
                      }}
                      key={index}
                      onClick={() =>
                        navigate(`/patient/details/${patient._id}`)
                      }
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.ward}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Patient;

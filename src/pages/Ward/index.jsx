import React, { useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWards } from "./wardSlice";

const Wards = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wardList, status } = useSelector((state) => state.wards);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchWards());
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
        Wards
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
                style={{ backgroundColor: "#07c0b4" }}
                onClick={() => navigate("/ward/add")}
              >
                Add Ward
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12}>
          <div>
            <h2 style={{ margin: "1rem" }}>Ward Lists</h2>
            <TableContainer
              component={Paper}
              style={{ maxHeight: "500px", overflowY: "auto" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Serial Number</TableCell>
                    <TableCell>Ward Number</TableCell>
                    <TableCell>Capacity</TableCell>
                    <TableCell>Specializations</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {wardList.map((ward, index) => (
                    <TableRow
                      style={{
                        cursor: "pointer"
                      }}
                      key={index}
                      onClick={() => navigate(`/ward/details/${ward._id}`)}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{ward.ward_number}</TableCell>
                      <TableCell>{ward.capacity}</TableCell>
                      <TableCell>{ward.specializations}</TableCell>
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

export default Wards;

import { IconButton, Paper, Typography, Grid } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { deleteWard } from "./wardSlice";
import { useDispatch, useSelector } from "react-redux";
const WardDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { wardList } = useSelector((state) => state.wards);
  const { patientList } = useSelector((state) => state.patients);

  const wardDetail = wardList.find((ele) => ele._id == id);

  const handleRemoveWard = (id) => {
    dispatch(deleteWard(id));
  };

  const totalPatients = patientList.filter(
    (patient) => patient.ward == wardDetail.ward_number
  );

  const occupancyRate =
    (totalPatients?.length > 0 &&
      totalPatients?.length / wardDetail?.capacity) * 100;

  return (
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
      <Typography>{wardDetail && "Ward Details"}</Typography>
      {wardDetail ? (
        <Grid item xs={12} sm={12}>
          <Paper elevation={3} className="exercise-list-item">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px"
              }}
            >
              <div>
                <Typography variant="h6" color="#07c0b4">
                  Ward number : {wardDetail.ward_number}
                </Typography>
                <Typography variant="body1">
                  Capacity : {wardDetail.capacity}
                </Typography>
                <Typography variant="body2">
                  Specializations : {wardDetail.specializations}
                </Typography>
                <Typography variant="body2">
                  Stay : {wardDetail.stay}
                </Typography>
                <Typography variant="body2">
                  Occupancy : {occupancyRate.toFixed(2)}%
                </Typography>
              </div>
              <div>
                <IconButton aria-label="edit">
                  <Link to="/ward/add" state={wardDetail}>
                    <Edit style={{ color: "#07c0b4" }} />
                  </Link>
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleRemoveWard(wardDetail._id)}
                >
                  <Delete style={{ color: "#07c0b4" }} />
                </IconButton>
              </div>
            </div>
          </Paper>
        </Grid>
      ) : (
        "Ward not found"
      )}
    </Grid>
  );
};

export default WardDetails;

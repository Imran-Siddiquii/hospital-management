import { IconButton, Paper, Typography, Grid } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { deletePatient } from "./patientSlice";
import { useDispatch, useSelector } from "react-redux";
const PatientDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { patientList } = useSelector((state) => state.patients);
  const patientDetail = patientList.find((ele) => ele._id == id);

  const handleRemovePatient = (id) => {
    dispatch(deletePatient(id));
  };

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
      {patientDetail && <Typography>Patient Details</Typography>}
      {patientDetail ? (
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
                  Name : {patientDetail.name}
                </Typography>
                <Typography variant="body1">
                  Age : {patientDetail.age}
                </Typography>
                <Typography variant="body2">
                  Gender : {patientDetail.gender}
                </Typography>
                <Typography variant="body2">
                  Patient's History : {patientDetail.medical_history}
                </Typography>
                <Typography variant="body2">
                  Contact Info : {patientDetail.contact_info}
                </Typography>
                <Typography variant="body2">
                  Assigned Ward : {patientDetail.ward}
                </Typography>
              </div>
              <div>
                <IconButton aria-label="edit">
                  <Link to="/patient/add" state={patientDetail}>
                    <Edit style={{ color: "#07c0b4" }} />
                  </Link>
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleRemovePatient(patientDetail._id)}
                >
                  <Delete style={{ color: "#07c0b4" }} />
                </IconButton>
              </div>
            </div>
          </Paper>
        </Grid>
      ) : (
        <Typography>Patient not found</Typography>
      )}
    </Grid>
  );
};

export default PatientDetails;

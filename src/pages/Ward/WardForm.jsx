import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Grid
} from "@mui/material";
import { useState } from "react";
import { addWard, editWard } from "./wardSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
const WardForm = () => {
  const location = useLocation();
  const { state } = location;
  const ward = state ? state : null;
  const [ward_number, setWard_Number] = useState(ward ? ward.ward_number : "");
  const [capacity, setCapacity] = useState(ward ? ward.capacity : "");
  const [specializations, setSpecializations] = useState(
    ward ? ward.specializations : ""
  );
  const [stay, setStay] = useState(ward ? ward.stay : "");
  const [formError, setFormError] = useState(false);
  const dispatch = useDispatch();

  const handleAddTeacher = () => {
    if (
      ward_number.toString().trim() === "" ||
      capacity.toString().trim() === "" ||
      specializations.toString().trim() === "" ||
      stay.toString().trim() === ""
    ) {
      return setFormError(true);
    }
    const wardData = {
      ward_number,
      capacity,
      specializations,
      stay
    };
    if (ward) {
      dispatch(editWard({ _id: ward._id, ...wardData }));
    } else {
      dispatch(addWard(wardData));
    }
    setFormError(false);
    setWard_Number("");
    setCapacity("");
    setSpecializations("");
    setStay("");
  };
  return (
    <>
      <Grid
        className="exercise-container"
        sx={{
          border: "1px solid #07c0b4",
          padding: "1rem",
          margin: "1rem",
          borderRadius: "5px"
        }}
      >
        <Paper elevation={3} className="exercise-form">
          <Typography variant="h5" gutterBottom color="#07c0b4">
            {ward ? "Update Ward" : "Add Ward"}
          </Typography>
          <TextField
            label="Ward's number"
            fullWidth
            type="number"
            className="text-field-form"
            value={ward_number}
            onChange={(e) => setWard_Number(e.target.value)}
          />
          <TextField
            label="Capacity"
            fullWidth
            type="number"
            className="text-field-form"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
          <TextField
            label="Specializations"
            fullWidth
            className="text-field-form"
            value={specializations}
            onChange={(e) => setSpecializations(e.target.value)}
          />
          <TextField
            label="Stay Days"
            fullWidth
            type="number"
            className="text-field-form"
            value={stay}
            onChange={(e) => setStay(e.target.value)}
          />
          {formError ? (
            <p className="error-message">Please fill all this fields</p>
          ) : null}
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTeacher}
            style={{
              marginTop: "16px",
              backgroundColor: "#07c0b4",
              color: "white"
            }}
          >
            {ward ? "Update Ward" : "Add Ward"}
          </Button>
        </Paper>
      </Grid>
    </>
  );
};

export default WardForm;

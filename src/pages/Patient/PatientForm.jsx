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
import { addPatient, editPatient } from "./patientSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const PatientForm = () => {
  const location = useLocation();
  const { state } = location;
  const patient = state ? state : null;
  const [name, setName] = useState(patient ? patient.name : "");
  const [age, setAge] = useState(patient ? patient.age : "");
  const [gender, setGender] = useState(patient ? patient.gender : "");
  const [contact_info, setContact_Info] = useState(
    patient ? patient?.contact_info : ""
  );
  const [medical_history, setMedical_history] = useState(
    patient ? patient?.medical_history : ""
  );
  const [ward, setWard] = useState(patient ? patient.ward : "");
  const [formError, setFormError] = useState(false);
  const dispatch = useDispatch();
  const { wardList, status, error } = useSelector((state) => state.wards);

  const handleAddPatient = () => {
    if (
      name.trim() === "" ||
      age.toString().trim() === "" ||
      gender.trim() === "" ||
      contact_info.toString().trim() === "" ||
      medical_history.toString().trim() === "" ||
      ward.toString().trim() === ""
    ) {
      return setFormError(true);
    }
    const patientData = {
      name,
      age,
      gender,
      contact_info,
      medical_history,
      ward
    };
    if (patient) {
      dispatch(editPatient({ _id: patient._id, ...patientData }));
    } else {
      dispatch(addPatient(patientData));
    }
    setFormError(false);
    setName("");
    setAge("");
    setGender("");
    setMedical_history("");
    setContact_Info("");
    setWard("");
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
            {patient ? "Update Patient" : "Add Patient"}
          </Typography>
          <TextField
            label="Name"
            fullWidth
            className="text-field-form"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Age"
            type="number"
            fullWidth
            className="text-field-form"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <FormControl fullWidth className="text-field-form">
            <InputLabel sx={{ background: "white", padding: "0 5px" }}>
              Gender
            </InputLabel>
            <Select value={gender} onChange={(e) => setGender(e.target.value)}>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Medical History"
            fullWidth
            className="text-field-form"
            value={medical_history}
            onChange={(e) => setMedical_history(e.target.value)}
          />
          <TextField
            label="Contact Info"
            type="number"
            fullWidth
            className="text-field-form"
            value={contact_info}
            onChange={(e) => setContact_Info(e.target.value)}
          />
          <FormControl fullWidth className="text-field-form">
            <InputLabel sx={{ background: "white", padding: "0 5px" }}>
              Ward
            </InputLabel>
            <Select value={ward} onChange={(e) => setWard(e.target.value)}>
              {wardList.map((ward, index) => (
                <MenuItem key={index} value={ward?.ward_number}>
                  {ward?.ward_number}
                </MenuItem>
              ))}
              {wardList.length > 0 ? null : <MenuItem value="1">1</MenuItem>}
            </Select>
          </FormControl>
          {formError ? (
            <p className="error-message">Please fill all this fields</p>
          ) : null}
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddPatient}
            style={{
              marginTop: "16px",
              backgroundColor: "#07c0b4",
              color: "white"
            }}
          >
            {patient ? "Update Patient" : "Add Patient"}
          </Button>
        </Paper>
      </Grid>
    </>
  );
};

export default PatientForm;

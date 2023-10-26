// if server is not running , please run manually this is my replt link
//https://replit.com/@Imransiddiqui2/fitness-api#index.js

import Sidebar from "./components/Sidebar";
import Hospital from "./pages/Hospital";
import Patient from "./pages/Patient";
import PatientDetails from "./pages/Patient/PatientDetails";
import PatientForm from "./pages/Patient/PatientForm";
import Wards from "./pages/Ward";
import WardDetails from "./pages/Ward/WardDetails";
import WardForm from "./pages/Ward/WardForm";
import "./styles.css";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="page-container">
        <Routes>
          <Route exact path="/" element={<Patient />} />
          <Route exact path="/patient/add" element={<PatientForm />} />
          <Route
            exact
            path="/patient/details/:id"
            element={<PatientDetails />}
          />
          <Route exact path="/wards" element={<Wards />} />
          <Route exact path="/ward/add" element={<WardForm />} />
          <Route exact path="/ward/details/:id" element={<WardDetails />} />
          <Route exact path="/hospital" element={<Hospital />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

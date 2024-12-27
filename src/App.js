import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Dashboard from "./Pages/dashboard";
import LoginPage from "./Pages/login";
import Sidebar from "./Components/sidebar";
import Header from "./Components/header";
import CheckInCheckOut from "./Pages/check-in";
import ThankYou from "./Pages/thankyou";

function App() {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <Box sx={{ display: "flex" }}>
              <Sidebar open={open} />
              <Box sx={{ flexGrow: 1 }}>
                <Header onDrawerToggle={toggleDrawer} />
                <Box sx={{ padding: 3 }}>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/check_in" element={<CheckInCheckOut />} />
                    <Route path="/thank-you" element={<ThankYou />} />
                  </Routes>
                </Box>
              </Box>
            </Box>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
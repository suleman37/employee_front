import { useState, useEffect } from "react";
import { Box, Grid, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomModal from "../Components/confirmation";
import Cookies from "js-cookie";
import axios from "axios";

const CheckInCheckOut = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [lastCheckOutDate, setLastCheckOutDate] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
      setCurrentDate(now.toLocaleDateString());
      setCurrentDay(now.toLocaleDateString("en-US", { weekday: "long" }));

      if (lastCheckOutDate && lastCheckOutDate !== now.toLocaleDateString()) {
        setIsButtonDisabled(false);
      }
    };

    const fetchAttendance = async () => {
      try {
        const email = Cookies.get("userEmail");
        const response = await axios.get("http://localhost:5000/api/employees");
        const employee = response.data.find(emp => emp.email === email);
        if (employee) {
          const todayAttendance = employee.attendance.find(
            record => record.date === currentDate
          );
          if (todayAttendance) {
            setCheckInTime(todayAttendance.checkInTime);
            setCheckOutTime(todayAttendance.checkOutTime);
            setIsCheckedIn(!!todayAttendance.checkInTime && !todayAttendance.checkOutTime);
            setIsButtonDisabled(!!todayAttendance.checkOutTime);
          }
        }
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    updateDateTime();
    fetchAttendance();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, [lastCheckOutDate, currentDate]);

  const postCheckInOutTime = async (time, type) => {
    try {
      const email = Cookies.get("userEmail");
      const attendanceEntry = {
        email,
        date: currentDate,
        checkInTime: type === "check-in" ? time : null,
        checkOutTime: type === "check-out" ? time : null,
      };

      const token = Cookies.get("accessToken");

      await fetch("http://localhost:5000/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(attendanceEntry),
      });
    } catch (error) {
      console.error("Error posting check-in/out time:", error);
    }
  };

  const handleCheckInOut = () => {
    const now = new Date();
    if (isCheckedIn) {
      setModalOpen(true);
    } else {
      const checkIn = now.toLocaleTimeString();
      setCheckInTime(checkIn);
      setIsCheckedIn(true);
      setIsButtonDisabled(false);
      postCheckInOutTime(checkIn, "check-in");
    }
  };

  const handleConfirmCheckOut = () => {
    const now = new Date();
    const checkOut = now.toLocaleTimeString();
    setCheckOutTime(checkOut);
    setIsCheckedIn(false);
    setIsButtonDisabled(true);
    setLastCheckOutDate(now.toLocaleDateString());
    setModalOpen(false);
    postCheckInOutTime(checkOut, "check-out");
    navigate("/thank-you");
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: "auto",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Check-In/Check-Out
      </Typography>
      <Grid container spacing={3} justifyContent="center" sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="h6">Current Time</Typography>
            <Typography variant="h4">{currentTime}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="h6">Current Date</Typography>
            <Typography variant="h4">{currentDate}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="h6">Current Day</Typography>
            <Typography variant="h4">{currentDay}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="h6">Check-In Time</Typography>
            <Typography variant="h4">{checkInTime || "Not Checked In"}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="h6">Check-Out Time</Typography>
            <Typography variant="h4">{checkOutTime || "Not Checked Out"}</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3} justifyContent="center" sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            sx={{
              mb: 2,
              width: 'auto',
              mx: 'auto',
              display: 'block',
              fontSize: '1rem',
              padding: '8px 16px',
              bgcolor: isCheckedIn ? "#FF6B6B" : "primary.main",
              "&:hover": {
                bgcolor: isCheckedIn ? "#FF5252" : "primary.dark",
              },
            }}
            onClick={handleCheckInOut}
            disabled={isButtonDisabled}
          >
            {isCheckedIn ? "Check Out" : "Check In"}
          </Button>
        </Grid>
      </Grid>
      <CustomModal
        open={modalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmCheckOut}
      />
    </Box>
  );
};

export default CheckInCheckOut;
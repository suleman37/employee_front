import { useState, useEffect } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart, Bar } from "recharts";
import axios from "axios";

// Function to transform data for a specific employee
const transformDataForEmployee = (data, employeeId) => {
  const monthlyPerformance = {};
  const weeklyPerformance = {};

  data.forEach((employee) => {
    if (employee._id === employeeId) {
      employee.attendance.forEach((record) => {
        const date = new Date(record.date);
        const month = date.toLocaleString('default', { month: 'short' });
        const week = `Week ${Math.ceil(date.getDate() / 7)}`;

        if (!monthlyPerformance[month]) {
          monthlyPerformance[month] = { month, performance: 0 };
        }
        if (!weeklyPerformance[week]) {
          weeklyPerformance[week] = { week, performance: 0 };
        }

        monthlyPerformance[month].performance += 1;
        weeklyPerformance[week].performance += 1;
      });
    }
  });

  return {
    monthly: Object.values(monthlyPerformance),
    weekly: Object.values(weeklyPerformance),
  };
};

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [employeeMonthlyPerformanceData, setEmployeeMonthlyPerformanceData] = useState([]);
  const [employeeWeeklyPerformanceData, setEmployeeWeeklyPerformanceData] = useState([]);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
      setCurrentDate(now.toLocaleDateString());
      setCurrentDay(now.toLocaleDateString("en-US", { weekday: "long" }));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get("http://16.170.204.4:5000/api/employees");
        const employeeId = "676ea5d4042396131aecd9ca"; // Example employee ID
        const transformedData = transformDataForEmployee(response.data, employeeId);
        setEmployeeMonthlyPerformanceData(transformedData.monthly);
        setEmployeeWeeklyPerformanceData(transformedData.weekly);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "auto",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
      }}
    >
      <Typography variant="h4" gutterBottom align="left" sx={{ mb: 10 }}>
        <b>Employee Dashboard</b>
      </Typography>

      {/* Cards for Time, Date, and Day */}
      <Grid container spacing={3} justifyContent="center" sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
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
              alignItems: "center",
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
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Current Day</Typography>
            <Typography variant="h4">{currentDay}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Graphs */}
      <Grid container spacing={3} justifyContent="center">
        {/* Line Chart for Monthly Performance */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Performance
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={employeeMonthlyPerformanceData}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="performance" stroke="#1976d2" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Bar Chart for Weekly Performance */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Weekly Performance
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={employeeWeeklyPerformanceData}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="performance" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
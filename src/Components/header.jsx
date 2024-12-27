import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, useTheme, Menu, MenuItem } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

const Header = ({ onDrawerToggle }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: theme.palette.primary.main,
        transition: "all 0.3s ease-in-out",
        boxShadow: "0 8px 32px rgba(42, 63, 84, 0.15)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
        <IconButton
          color="inherit"
          edge="start"
          sx={{
            display: { xs: "block", sm: "none" },
            "&:hover": {
              transform: "rotate(180deg) scale(1.1)",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            },
          }}
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <MenuItem onClick={handleMenuClose} component="a" href="/dashboard">
            Dashboard
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component="a" href="/check_in">
            Check In
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component="a" href="/">
            Logout
          </MenuItem>
        </Menu>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "white",
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            letterSpacing: "0.5px",
            color: "#FFF",
          }}
        >
          My Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
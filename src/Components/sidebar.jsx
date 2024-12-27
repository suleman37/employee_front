import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Box,
  IconButton
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  AccessTime as AccessTimeIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CustomModal from "./confirmation";

const drawerWidth = 240;
const closedDrawerWidth = 65;

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => setOpen(!open);
  const handleLogoutClick = () => {
    setModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setModalOpen(false);
    navigate("/");
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Check In", icon: <AccessTimeIcon />, path: "/check_in" },
    { text: "Logout", icon: <LogoutIcon />, onClick: handleLogoutClick },
  ];
  
  return (
    <>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : closedDrawerWidth,
          transition: "width 0.4s ease-in-out",
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : closedDrawerWidth,
            boxSizing: "border-box",
            background: "#ffffff",
            color: "#000000",
            borderRight: "none",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            overflowX: "hidden",
            transition: "width 0.4s ease-in-out",
          },
          display: { xs: "none", sm: "block" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "20px",
            justifyContent: "space-between",
            background: "rgba(0,0,0,0.05)",
          }}
        >
          {open && (
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#000000",
                textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              CRM System
            </Typography>
          )}
          <IconButton
            onClick={toggleDrawer}
            sx={{
              color: "#000000",
              transform: open ? "none" : "rotate(180deg)",
              transition: "transform 0.4s ease",
              ml: open ? 0 : "auto",
              mr: open ? 0 : "auto",
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <Divider
          sx={{
            backgroundColor: "rgba(0,0,0,0.1)",
          }}
        />
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <ListItemButton
                onClick={item.onClick || (() => navigate(item.path))}
                sx={{
                  transition: "all 0.2s ease",
                  borderRadius: "10px",
                  margin: "4px 8px",
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  "&:hover": {
                    background: "rgba(0,0,0,0.05)",
                    transform: "translateX(5px)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "#000000",
                    opacity: hoveredItem === index ? 1 : 0.9,
                    transition: "opacity 0.2s ease",
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary={item.text}
                    sx={{
                      opacity: 1,
                      "& .MuiListItemText-primary": {
                        fontWeight: hoveredItem === index ? 500 : "normal",
                        opacity: hoveredItem === index ? 1 : 0.9,
                        transition: "all 0.2s ease",
                        color: "#000000",
                      },
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <CustomModal
        open={modalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
};

export default Sidebar;
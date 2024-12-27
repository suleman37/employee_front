import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const CustomModal = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "10px",
          background: "#ffffff",
          color: "#000000",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold" }}>Confirm Action</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: "#000000" }}>
          Are you sure you want to proceed with this action?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            color: "#000000",
            "&:hover": { background: "rgba(0,0,0,0.05)" },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            bgcolor: "#FF6B6B",
            "&:hover": { bgcolor: "#FF5252" },
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;
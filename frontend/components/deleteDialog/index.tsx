import { Avatar, Box, Collapse, Divider, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Fragment, useEffect, useState } from "react";
import styles from "./deleteDialog.module.css";

interface DeletePopupProps {
  open: boolean;
  ticketId: string;
  handleClose: () => void;
  handleDelete: (ticketId: string) => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DeletePopup = ({
  open,
  ticketId,
  handleClose,
  handleDelete,
}: DeletePopupProps) => {
  return (
    <Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className={styles.title}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Delete Ticket - {ticketId}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          className={styles.closeIcon}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent className={styles.content} dividers>
          <Typography className={styles.confirmationText} gutterBottom>
            Are you sure you want to delete the ticket ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => handleDelete(ticketId)}>
            Yes
          </Button>
          <Button autoFocus onClick={handleClose}>
            No
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Fragment>
  );
};

export default DeletePopup;

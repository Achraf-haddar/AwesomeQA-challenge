import { Avatar, Box, Collapse, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Fragment, useEffect, useState } from "react";
import { getMessageById } from "../../services/messages";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { MessageType, parseTimestamp, sortByTimestampASC } from "../../utils";
import styles from "./dialog.module.css";

type PopupProps = {
  open: boolean;
  handleClose: () => void;
  authorName: string;
  authorNickname: string;
  avatarUrl: string;
  content: string;
  status: string;
  timestamp: string;
  hasAttachment: boolean;
  ticketId: string;
  contextMessages: string[]; // Array of msg_id
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Popup = ({
  open,
  handleClose,
  authorName,
  authorNickname,
  avatarUrl,
  content,
  status,
  timestamp,
  hasAttachment,
  ticketId,
  contextMessages,
}: PopupProps) => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    if (open === true && messages.length === 0) {
      const fetchData = async (messageId: string) => {
        try {
          const apiData = await getMessageById(messageId);
          console.log(apiData);
          setMessages((prevMessages) => [...prevMessages, apiData]);
        } catch (error) {
          console.error("Error fetching tickets:", error);
        }
      };
      if (contextMessages) {
        for (const messageId of contextMessages) {
          fetchData(messageId);
        }
      }
    }
  }, [open]);

  const [expanded, setExpanded] = useState<number | null>(null);
  const handleExpandClick = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };
  return (
    <Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className={styles.title}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Ticket Details - {ticketId}
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
        <DialogContent dividers className={styles.scrollableContainer}>
          <Typography className={styles.contentTitles} gutterBottom>
            Author Name:
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                alt="Author"
                src={avatarUrl}
              />
              <Typography gutterBottom color="text.secondary">
                {authorName} ({authorNickname})
              </Typography>
            </Stack>
          </Typography>
          <Typography className={styles.contentTitles} gutterBottom>
            Ticket Content:
            <Typography gutterBottom color="text.secondary">
              {content}
            </Typography>
          </Typography>
          <Divider />
          <Typography gutterBottom className={styles.contentTitles}>
            Created at:{" "}
            <Typography sx={{ fontWeight: "normal", color: "text.secondary" }}>
              {parseTimestamp(timestamp)}
            </Typography>
          </Typography>
          <Divider />
          <Typography gutterBottom className={styles.contentTitles}>
            Has attachment:{" "}
            <Typography sx={{ fontWeight: "normal", color: "text.secondary" }}>
              {hasAttachment === false ? "No" : "Yes"}
            </Typography>
          </Typography>
          <Divider />
          <Typography gutterBottom className={styles.contentTitles}>
            Status:{" "}
            <Button
              className={styles.statusButton}
              variant="contained"
              size="small"
              color={status === "open" ? "success" : "error"}
            >
              {status}
            </Button>
          </Typography>
          <Divider />
          <Typography gutterBottom className={styles.contentTitles}>
            Context Messages:
          </Typography>
          <List className={styles.list} sx={{ bgcolor: "background.paper" }}>
            {messages.length !== 0
              ? messages.map((message, index) => (
                  <div key={`${message.id}-${index}`}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar alt="Author" src={message.author.avatar_url} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${message.author.name} (${
                          message.author.nickname
                        }) ${message.author.is_bot === true ? "- Bot" : ""}`}
                        secondary={message.timestamp}
                      />
                      <IconButton onClick={() => handleExpandClick(index)}>
                        {expanded === index ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </ListItem>
                    <Collapse
                      in={expanded === index}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Typography
                        variant="body1"
                        className={styles.contextMessage}
                        color="text.secondary"
                      >
                        {message.content}
                      </Typography>
                      <br />
                    </Collapse>
                    {index < messages.length - 1 && <Divider />}
                  </div>
                ))
              : "Loading context Messages"}
          </List>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Fragment>
  );
};

export default Popup;

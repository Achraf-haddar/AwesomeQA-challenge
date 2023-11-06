import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";
import { useEffect, useState } from "react";
import Popup from "../dialog";
import { getMessageById } from "../../services/messages";
import { MessageType, parseTimestamp } from "../../utils";
import DeletePopup from "../deleteDialog";
import styles from "./ticket.module.css";

interface TicketProps {
  id: string;
  msgId: string;
  status: string;
  timestamp: string;
  contextMessages: string[];
  handleDelete: (ticketId: string) => void;
}

const Ticket = ({
  id,
  msgId,
  status,
  timestamp,
  contextMessages,
  handleDelete,
}: TicketProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const [message, setMessage] = useState<MessageType>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getMessageById(msgId);
        console.log(apiData);
        setMessage(apiData);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Card className={styles.card}>
        <CardContent className={styles.cardContent}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
            alignItems="center"
          >
            <Typography
              className={styles.status}
              color="text.secondary"
              gutterBottom
            >
              Unresolved Ticket
            </Typography>
            <Button
              className={styles.redirectionButton}
              href={message && message.msg_url ? message.msg_url : undefined}
              target="_blank"
            >
              <LaunchOutlinedIcon />
            </Button>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              alt="Author"
              src={message ? message.author.avatar_url : undefined}
            />
            <Typography variant="h6" className={styles.authorName}>
              {message
                ? `${message.author.name} (${message.author.nickname}) ${
                    message.author.is_bot === true ? "- Bot" : ""
                  }`
                : "Loading Author Name"}
            </Typography>
          </Stack>
          <Typography
            className={styles.createdAt}
            sx={{ mb: 1.5, mt: 0.5 }}
            color="text.secondary"
          >
            Created at: {parseTimestamp(timestamp)}
          </Typography>
          <Typography variant="body2" className={styles.content}>
            Content:
            <Typography color="text.secondary">
              {message ? message.content : "Loading the message content"}
            </Typography>
          </Typography>
        </CardContent>
        <CardActions className={styles.cardActions}>
          <Button size="small" onClick={handleOpen}>
            Show More
          </Button>
          <Popup
            open={open}
            handleClose={handleClose}
            authorName={message ? message.author.name : null}
            authorNickname={message ? message.author.nickname : null}
            avatarUrl={message ? message.author.avatar_url : undefined}
            content={message ? message.content : null}
            status={status}
            timestamp={timestamp}
            hasAttachment={message ? message.has_attachment : undefined}
            ticketId={id}
            contextMessages={contextMessages}
          />
          <Button className={styles.deletionButton}>
            <DeleteOutlineOutlinedIcon onClick={handleOpenDelete} />
            <DeletePopup
              open={openDelete}
              ticketId={id}
              handleClose={handleCloseDelete}
              handleDelete={handleDelete}
            />
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Ticket;

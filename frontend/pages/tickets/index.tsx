import { NextPage } from "next";
import Box from "@mui/material/Box";
import { deleteTicketById, getTickets } from "../../services/tickets";
import { useEffect, useState } from "react";
import TicketPagination from "../../components/ticketPagination";
import { Button, TextField, Typography } from "@mui/material";
import {
  TicketType,
  sortByTimestampASC,
  sortByTimestampDESC,
} from "../../utils";
import styles from "./tickets.module.css";

const Tickets: NextPage = () => {
  const [tickets, setTickets] = useState<TicketType[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getTickets();
        console.log(apiData);
        setTickets(apiData);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleASCSortClick = () => {
    const sortedTickets = sortByTimestampASC(tickets);
    setTickets(sortedTickets);
  };
  const handleDESCSortClick = () => {
    const sortedTickets = sortByTimestampDESC(tickets);
    setTickets(sortedTickets);
  };

  const handleDeleteClick = async (ticketId: string) => {
    try {
      await deleteTicketById(ticketId);
      // Update the list of tickets
      const apiData = await getTickets();
      setTickets(apiData);
      // handleCloseDelete();
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!tickets) {
    return <div>Error fetching data</div>;
  }

  return (
    <>
      <div className={styles.menuContainer}>
        <Typography sx={{ mt: 4 }} variant="h2">
          Tickets
        </Typography>
        <div className={styles.buttonsContainer}>
          <Button
            className={styles.sortingButton}
            onClick={handleASCSortClick}
          >
            Sort by creation date ASC
          </Button>
          <Button
            className={styles.sortingButton}
            onClick={handleDESCSortClick}
          >
            Sort by creation date DESC
          </Button>
        </div>
      </div>
      <Box sx={{ flexGrow: 1, mt: 6, mb: 15 }}>
        <TicketPagination
          tickets={tickets}
          itemsPerPage={9}
          handleDelete={handleDeleteClick}
        />
      </Box>
    </>
  );
};

export default Tickets;

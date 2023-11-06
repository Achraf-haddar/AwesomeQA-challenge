import { Container, Grid, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import Ticket from "../ticket";
import styles from "./ticketPagination.module.css";
import { TicketType } from "../../utils";

interface TicketPaginationProps {
  tickets: TicketType[];
  itemsPerPage: number;
  handleDelete: (ticketId: string) => void;
}

const TicketPagination = ({
  tickets,
  itemsPerPage,
  handleDelete,
}: TicketPaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
  const currentItems: TicketType[] = tickets.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const pageCount: number = Math.ceil(tickets.length / itemsPerPage);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    handlePageChange(value);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className={styles.container}>
      <Grid container spacing={2}>
        {currentItems.map((ticket) => (
          <Grid item xs={12} md={6} lg={4} key={ticket.id}>
            <Ticket
              id={ticket.id}
              msgId={ticket.msg_id}
              status={ticket.status}
              timestamp={ticket.timestamp}
              contextMessages={ticket.context_messages}
              handleDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>

      <div className={styles.controls}>
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handleChange}
          shape="rounded"
          color="primary"
        />
      </div>
    </div>
  );
};

export default TicketPagination;

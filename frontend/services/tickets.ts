export const getTickets = async (): Promise<any | null> => {
  try {
    const apiUrl = "http://localhost:5001/tickets";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle error
    console.error("Error fetching data:", error);
    return null;
  }
};

export const deleteTicketById = async (
  ticketId: string
): Promise<any | null> => {
  try {
    const apiUrl = `http://localhost:5001/tickets/${ticketId}`;
    const response = await fetch(apiUrl, {
      method: "DELETE",
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else if (response.status === 404) {
      throw new Error("Ticket not found");
    } else {
      throw new Error("Network response was not ok.");
    }
  } catch (error) {
    // Handle error
    console.error("Error deleting ticket:", error);
    return null;
  }
};

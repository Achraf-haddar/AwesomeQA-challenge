import json
from typing import List, Optional

from app.models.Ticket import Ticket


class TicketRepository:
    def __init__(self, filepath: str):
        with open(filepath) as json_file:
            self.data = json.load(json_file)

    def update_tickets(self, updated_tickets) -> None:
        self.data["tickets"] = updated_tickets

    def get_tickets(self, limit: Optional[int] = None) -> List[Ticket]:
        return self.data["tickets"][:limit]

    def get_ticket_by_id(self, ticket_id: str) -> Optional[Ticket]:
        tickets = self.get_tickets()
        for ticket in tickets:
            if ticket["id"] == ticket_id:
                return ticket
        return None

    def delete_ticket_by_id(self, ticket_id: str) -> None:
        tickets = self.get_tickets()
        updated_tickets = [ticket for ticket in tickets if ticket["id"] != ticket_id]
        self.update_tickets(updated_tickets)

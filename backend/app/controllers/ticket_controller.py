from app.repositories.ticket_repository import TicketRepository
from fastapi import Depends, HTTPException
from fastapi.responses import JSONResponse


async def get_all_tickets(
    ticket_repository: TicketRepository,
    limit: int = 219,  # length of self.data["tickets"]
):
    try:
        tickets = ticket_repository.get_tickets(limit)
        return JSONResponse(tickets, status_code=200)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal Server Error")


async def get_ticket_by_id(
    ticket_repository: TicketRepository,
    ticket_id: str,
):
    try:
        ticket = ticket_repository.get_ticket_by_id(ticket_id)
        print(ticket)
        if ticket is None:
            return JSONResponse({"error": "Ticket not found"}, status_code=404)
        return JSONResponse(ticket, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")


async def delete_ticket_by_id(
    ticket_repository: TicketRepository,
    ticket_id: str,
):
    try:
        ticket = ticket_repository.get_ticket_by_id(ticket_id)
        if ticket:
            ticket_repository.delete_ticket_by_id(ticket_id)
            return JSONResponse(
                {"message": "Ticket deleted successfully"}, status_code=200
            )
        return JSONResponse({"error": "Ticket not found"}, status_code=404)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")

from app.controllers.ticket_controller import (
    delete_ticket_by_id,
    get_all_tickets,
    get_ticket_by_id,
)
from app.repositories.ticket_repository import TicketRepository
from fastapi import APIRouter, Depends, Path

router = APIRouter()

TICKET_FILEPATH = "../data/awesome_tickets.json"
ticket_repository = TicketRepository(filepath=TICKET_FILEPATH)


@router.get("/tickets")
async def get_tickets(
    limit: int = 219,
    ticket_repository: TicketRepository = Depends(lambda: ticket_repository),
):
    return await get_all_tickets(ticket_repository, limit)


@router.get("/tickets/{ticket_id}")
async def get_ticket(
    ticket_id: str = Path(..., title="The ID of the ticket to retrieve"),
    ticket_repository=Depends(lambda: ticket_repository),
):
    return await get_ticket_by_id(ticket_repository, ticket_id)


@router.delete("/tickets/{ticket_id}")
async def delete_ticket(
    ticket_id: str = Path(..., title="The ID of the ticket to delete"),
    ticket_repository=Depends(lambda: ticket_repository),
):
    return await delete_ticket_by_id(ticket_repository, ticket_id)

from app.controllers.message_controller import get_message_by_id
from app.repositories.message_repository import MessageRepository
from fastapi import APIRouter, Depends, Path

router = APIRouter()

TICKET_FILEPATH = "../data/awesome_tickets.json"
message_repository = MessageRepository(filepath=TICKET_FILEPATH)


@router.get("/messages/{message_id}")
async def get_message(
    message_id: str = Path(..., title="The ID of the message to retrieve"),
    message_repository=Depends(lambda: message_repository),
):
    return await get_message_by_id(message_repository, message_id)

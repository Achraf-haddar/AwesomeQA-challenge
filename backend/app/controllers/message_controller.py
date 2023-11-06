from app.repositories.message_repository import MessageRepository
from fastapi import Depends, HTTPException
from fastapi.responses import JSONResponse

TICKET_FILEPATH = "../data/awesome_tickets.json"
message_repository = MessageRepository(filepath=TICKET_FILEPATH)


async def get_message_by_id(
    message_repository: MessageRepository,
    message_id: str,
):
    try:
        message = message_repository.get_message_by_id(message_id)
        if message is None:
            return JSONResponse({"error": "Message not found"}, status_code=404)
        return JSONResponse(message, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")

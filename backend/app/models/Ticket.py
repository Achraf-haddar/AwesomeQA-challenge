from typing import List

from pydantic import BaseModel


class Ticket(BaseModel):
    id: int
    msg_id: int
    status: str
    resolved_by: str
    ts_last_status_change: int
    timestamp: int
    context_messages: List[str]

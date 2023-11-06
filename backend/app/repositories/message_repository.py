import json
from typing import List, Optional

from app.models.Message import Message


class MessageRepository:
    def __init__(self, filepath: str):
        with open(filepath) as json_file:
            self.data = json.load(json_file)

    def get_messages(self, limit: Optional[int] = None) -> List[Message]:
        return self.data["messages"][:limit]

    def get_message_by_id(self, message_id: str) -> Optional[Message]:
        messages = self.get_messages()
        for message in messages:
            if message["id"] == message_id:
                return message
        return None

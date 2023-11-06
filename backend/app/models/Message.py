from pydantic import BaseModel


class Author(BaseModel):
    id: str
    name: str
    nickname: str
    color: str
    discriminator: str
    avatar_url: str
    is_bot: bool
    timestamp_insert: int


class Message(BaseModel):
    id: str
    channel_id: int
    parent_channel_id: int
    community_server_id: int
    timestamp: int
    has_attachment: bool
    reference_msg_id: str
    timestamp_insert: str
    discussion_id: str
    author_id: str
    content: str
    msg_url: str
    author: Author

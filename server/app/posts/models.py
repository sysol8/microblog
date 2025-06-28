from datetime import datetime
from pydantic import BaseModel

class User(BaseModel):
    username: str
    password: str
    createdAt: datetime

class Post(BaseModel):
    content: str
    createdBy: User
    createdAt: datetime
    editedAt: datetime | None
    deletedAt: datetime | None
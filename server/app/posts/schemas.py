from datetime import datetime
from pydantic import BaseModel

# входящие данные для создания
class PostCreate(BaseModel):
    content: str

# для частичного обновления
class PostUpdate(BaseModel):
    content: str

# то, что вернём клиенту
class PostRead(BaseModel):
    id: int
    content: str
    created_at: datetime

    class Config:
        orm_mode = True

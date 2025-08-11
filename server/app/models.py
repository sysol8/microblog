from datetime import datetime
from typing import List
from sqlmodel import SQLModel, Field, Column, JSON

class Post(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    text_content: str
    image_urls: List[str] = Field(default_factory=list, sa_column=Column(JSON, nullable=False))
    created_at: datetime = Field(default_factory=datetime.utcnow)


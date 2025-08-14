from datetime import datetime
from typing import List
from pydantic import BaseModel, Field, ConfigDict

class PostAuthor(BaseModel):
    id: str
    username: str
    avatar_url: str | None = Field(default=None, alias="avatarUrl")

class PostCreate(BaseModel):
    text_content: str

class PostUpdate(BaseModel):
    text_content: str | None = None

class PostRead(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: str
    text_content: str = Field(alias="textContent")
    image_urls: List[str] = Field(alias="imageUrls")
    created_at: datetime = Field(alias="createdAt")
    author: PostAuthor
    likes: List[str] = []

from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field, model_validator
from typing import List
from ..posts.schemas import PostRead

class UserCreate(BaseModel):
    name: str | None = None
    username: str
    password: str

    @model_validator(mode="after")
    def set_default_name(self):
        if not self.name:
            self.name = self.username
        return self

class UserRead(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: str
    name: str
    username: str
    avatar_url: str | None = Field(default=None, alias="avatarUrl")
    posts: List[PostRead] = []
    liked: List[PostRead] = []
    likes: int
    created_at: datetime = Field(alias="createdAt")

class LoginRequest(BaseModel):
    username: str
    password: str
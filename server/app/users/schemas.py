from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field, model_validator
from typing import List

class UserCreate(BaseModel):
    name: str | None = None
    username: str
    password: str

    @model_validator(mode="after")
    def set_default_name(cls, values):
        if not values.name:
            values.name = values.username
        return values

class UserRead(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: str
    name: str
    username: str
    avatar_url: str | None = Field(default=None, alias="avatarUrl")
    posts: List[str] = []
    liked: List[str] = []
    likes: int
    created_at: datetime = Field(alias="createdAt")

class LoginRequest(BaseModel):
    username: str
    password: str
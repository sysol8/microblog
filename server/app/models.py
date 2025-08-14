# server/app/models.py
from datetime import datetime
from typing import List, Optional
from sqlmodel import SQLModel, Field, Column, JSON, Relationship
from uuid import uuid4

def get_id() -> str:
    return uuid4().hex

class User(SQLModel, table=True):
    __tablename__ = "user"

    id: str | None = Field(default=None, primary_key=True, index=True)
    name: str
    username: str = Field(index=True, unique=True)
    password_hash: str
    avatar_url: str | None = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    posts: list["Post"] = Relationship(
        back_populates="author",
        sa_relationship_kwargs={"cascade": "all, delete-orphan"},
    )

    liked: List[str] = Field(default_factory=list, sa_column=Column(JSON, nullable=False))
    likes: int = Field(default=0, ge=0)

class Post(SQLModel, table=True):
    __tablename__ = "post"

    id: str | None = Field(default_factory=get_id, primary_key=True)
    text_content: str
    image_urls: List[str] = Field(default_factory=list, sa_column=Column(JSON, nullable=False))
    created_at: datetime = Field(default_factory=datetime.utcnow)

    created_by: str | None = Field(default=None, foreign_key="user.id", index=True)

    author: Optional["User"] = Relationship(back_populates="posts")

    likes: List[str] = Field(default_factory=list, sa_column=Column(JSON, nullable=False))


from __future__ import annotations
from datetime import datetime
from typing import List
from sqlmodel import SQLModel, Field, Column, JSON, Relationship

class Post(SQLModel, table=True):
    __tablename__ = "post"

    id: str | None = Field(default=None, primary_key=True)
    text_content: str
    image_urls: List[str] = Field(default_factory=list, sa_column=Column(JSON, nullable=False))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    created_by: str = Field(foreign_key="user.id", index=True)
    author: User | None = Relationship(back_populates="posts")
    likes: List[str] = Field(default_factory=list, sa_column=Column(JSON, nullable=False))

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
        sa_relationship_kwargs={"cascade": "all, delete-orphan"}
    )

    liked: List[str] = Field(default_factory=list, sa_column=Column(JSON, nullable=False))
    likes: int = Field(default=0, ge=0)

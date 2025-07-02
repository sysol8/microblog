from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict

class PostCreate(BaseModel):
    content: str

class PostUpdate(BaseModel):
    content: str

class PostRead(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
    )

    id: int
    content: str
    created_at: datetime = Field(alias='createdAt')

pr = PostRead.model_validate({ 'id': 1, 'content': '123', 'createdAt': '2025-07-02T14:19:13.200266'})
print(pr.model_dump(by_alias=True))
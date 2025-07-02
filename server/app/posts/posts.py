from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import select, Session
from sqlmodel.ext.asyncio.session import AsyncSession
from ..db.database import get_session
from ..models import Post
from .schemas import PostCreate, PostRead, PostUpdate

router = APIRouter(prefix="/api/posts", tags=["posts"])

@router.get("/", response_model=list[PostRead], response_model_by_alias=True)
def read_posts(
        session: Session = Depends(get_session)
):
    posts = session.exec(select(Post).order_by(Post.created_at.desc())).all()
    return posts

@router.post("/", response_model=PostRead, status_code=status.HTTP_201_CREATED, response_model_by_alias=True)
def create_post(
        data: PostCreate,
        session: Session = Depends(get_session)
):
    post = Post(content=data.content)
    session.add(post)
    session.commit()
    session.refresh(post)
    return post

@router.patch("/{post_id}", response_model=PostRead, response_model_by_alias=True)
def edit_post(
        post_id: int,
        data: PostUpdate,
        session: Session = Depends(get_session)
):
    post = session.get(Post, post_id)
    if not post:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Post not found")
    post.content = data.content
    session.add(post)
    session.commit()
    session.refresh(post)
    return post

@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT, response_model_by_alias=True)
def delete_post(
        post_id: int,
        session: Session = Depends(get_session)
):
    post = session.get(Post, post_id)
    if not post:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Post not found")
    session.delete(post)
    session.commit()

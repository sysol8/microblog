import asyncio
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlmodel import select, Session
from ..db.database import get_session
from ..models import Post, User
from .schemas import PostRead
from ..aws import upload_to_s3
from ..users.users import get_current_user

posts_router = APIRouter(prefix="/api/posts", tags=["posts"])

@posts_router.get("/", response_model=list[PostRead], response_model_by_alias=True)
def read_posts(session: Session = Depends(get_session)):
    return session.exec(select(Post).order_by(Post.created_at.desc())).all()

@posts_router.post("/", response_model=PostRead, status_code=status.HTTP_201_CREATED, response_model_by_alias=True)
async def create_post(
        text_content: str = Form(""),
        attachments: list[UploadFile] | None = File(None),
        session: Session = Depends(get_session),
        current_user: User = Depends(get_current_user),
):
    if not text_content.strip() and not attachments:
        raise HTTPException(status_code=422, detail="Post must contain text or files.")

    image_urls: list[str] = []
    if attachments:
        tasks = [
            asyncio.to_thread(upload_to_s3, f.file, f.filename or "file")
            for f in attachments if f and (f.filename or "").strip()
        ]
        try:
            image_urls = await asyncio.gather(*tasks)
        except Exception as e:
            raise HTTPException(status_code=502, detail=f"S3 upload failed: {e!s}")

    post = Post(text_content=text_content, image_urls=image_urls, created_by=current_user.id, author=current_user)
    session.add(post)
    session.commit()
    session.refresh(post)
    return post

@posts_router.patch("/{post_id}", response_model=PostRead, response_model_by_alias=True)
async def update_post(
        post_id: str,
        text_content: str | None = Form(None),
        attachments: list[UploadFile] | None = File(None),
        session: Session = Depends(get_session),
        current_user: User = Depends(get_current_user)
):
    post = session.get(Post, post_id)
    if not post:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Post not found")

    nothing_to_update = text_content is None and not attachments
    if nothing_to_update:
        raise HTTPException(status_code=400, detail="Nothing to update.")

    if text_content is not None:
        post.text_content = text_content

    if attachments:
        tasks = [
            asyncio.to_thread(upload_to_s3, f.file, f.filename or "file")
            for f in attachments if f and (f.filename or "").strip()
        ]
        try:
            new_urls = await asyncio.gather(*tasks)
        except Exception as e:
            raise HTTPException(status_code=502, detail=f"S3 upload failed: {e!s}")
        post.image_urls.extend(new_urls)

    session.add(post)
    session.commit()
    session.refresh(post)
    return post

@posts_router.patch("/{post_id}/like", status_code=status.HTTP_200_OK, response_model_by_alias=True)
def toggle_like(
        post_id: str,
        session: Session = Depends(get_session),
        current_user: User = Depends(get_current_user),
):
    post = session.get(Post, post_id)
    if not post:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Post not found")

    post_likes: list[str] = list(post.likes or [])
    user_liked: list[str] = list(current_user.liked or [])
    uid = current_user.id

    if uid in post_likes:
        post_likes = [x for x in post_likes if x != uid]
        user_liked = [pid for pid in user_liked if pid != post_id]
    else:
        post_likes.append(uid)
        if post_id not in user_liked:
            user_liked.append(post_id)

    post.likes = post_likes
    current_user.liked = user_liked
    session.add(post)
    session.commit()
    session.refresh(post)
    return post

@posts_router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT, response_model_by_alias=True)
def delete_post(post_id: str, session: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    post = session.get(Post, post_id)
    if not post:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Post not found")
    if post.author.id != current_user.id:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "You are not allowed to perform this action")
    session.delete(post)
    session.commit()


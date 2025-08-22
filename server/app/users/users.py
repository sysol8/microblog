from __future__ import annotations

from uuid import uuid4
from datetime import datetime, timedelta, timezone
import asyncio

from fastapi import APIRouter, Depends, HTTPException, Response, Request, status, File, UploadFile
from jose import jwt, JWTError
from sqlalchemy import func
from sqlmodel import Session, select

from ..aws import upload_to_s3
from ..db.database import get_session
from ..models import User, Post
from ..posts.schemas import PostRead
from .schemas import UserCreate, UserRead, LoginRequest, UserUpdate
from ..security import hash_password, verify_password, needs_rehash
from server.config import (
    JWT_SECRET, JWT_ALG, JWT_EXPIRE_MIN,
    AUTH_COOKIE_NAME, CSRF_COOKIE_NAME,
    SECURE_COOKIES, AUTH_SAMESITE, AUTH_COOKIE_DOMAIN
)

users_router = APIRouter(prefix="/api", tags=["users"])

def gen_id() -> str:
    return uuid4().hex


def _normalize_username(u: str) -> str:
    return (u or "").strip().lower()


def _issue_tokens(user_id: str, username: str) -> tuple[str, str, datetime]:
    now = datetime.now(timezone.utc)
    exp = now + timedelta(minutes=JWT_EXPIRE_MIN)
    csrf = uuid4().hex
    claims = {
        "sub": user_id,
        "uname": username,
        "iat": int(now.timestamp()),
        "exp": int(exp.timestamp()),
        "csrf": csrf,
    }
    token = jwt.encode(claims, JWT_SECRET, algorithm=JWT_ALG)
    return token, csrf, exp


def _set_auth_cookies(resp: Response, token: str, csrf: str, exp: datetime) -> None:
    cookie_kwargs = {
        "httponly": True,
        "secure": SECURE_COOKIES,
        "samesite": AUTH_SAMESITE,
        "expires": exp,
        "path": "/",
    }
    if AUTH_COOKIE_DOMAIN:
        cookie_kwargs["domain"] = AUTH_COOKIE_DOMAIN

    resp.set_cookie(
        key=AUTH_COOKIE_NAME,
        value=token,
        httponly=True,
        secure=False,
        samesite="lax",
        expires=exp,
        path="/",
    )
    resp.set_cookie(
        key=CSRF_COOKIE_NAME,
        value=csrf,
        httponly=False,
        secure=False,
        samesite="lax",
        expires=exp,
        path="/",
    )



def _clear_auth_cookies(resp: Response) -> None:
    SECURE = False
    SAMESITE = "lax"
    PATH = "/"

    dom = AUTH_COOKIE_DOMAIN if (AUTH_COOKIE_DOMAIN and AUTH_COOKIE_DOMAIN.strip()) else None

    domains = [None]
    if dom:
        domains.append(dom)

    for d in domains:
        for key, http_only in (
                (AUTH_COOKIE_NAME, True),
                (CSRF_COOKIE_NAME, False),
        ):
            resp.delete_cookie(
                key=key,
                path=PATH,
                domain=d,
            )
            resp.set_cookie(
                key=key,
                value="",
                path=PATH,
                domain=d,
                httponly=http_only,
                secure=SECURE,
                samesite=SAMESITE,
                max_age=0,
                expires=0,
            )

def _map_posts(posts_db: list[Post]) -> list[PostRead]:
    return [PostRead.model_validate(p, from_attributes=True) for p in posts_db]

def _likes_received(session: Session, user_id: str) -> int:
    rows = session.exec(select(Post.likes).where(Post.created_by == user_id)).all()
    return sum(len(l or []) for l in rows)

def get_current_user(
        request: Request,
        session: Session = Depends(get_session),
) -> User:
    token = request.cookies.get(AUTH_COOKIE_NAME)
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")

    try:
        claims = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
        user_id: str = claims["sub"]
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return user

def _likes_received(session: Session, user_id: str) -> int:
    rows = session.exec(select(Post.likes).where(Post.created_by == user_id)).all()
    return sum(len(l or []) for l in rows)

@users_router.get("/users/me", response_model=UserRead, response_model_by_alias=True)
def get_me(current: User = Depends(get_current_user), session: Session = Depends(get_session)) -> UserRead:
    own_posts_db = session.exec(
        select(Post)
        .where(Post.created_by == current.id)
        .order_by(Post.created_at.desc())
        .limit(5)
    ).all()

    liked_ids = list(current.liked or [])
    liked_posts_db: list[Post] = []
    if liked_ids:
        liked_posts_db = session.exec(
            select(Post)
            .where(Post.id.in_(liked_ids))
            .order_by(Post.created_at.desc())
            .limit(5)
        ).all()

    return UserRead(
        id=current.id,
        name=current.name,
        username=current.username,
        avatar_url=current.avatar_url,
        posts=_map_posts(own_posts_db),
        liked_posts=_map_posts(liked_posts_db),
        likes=_likes_received(session, current.id),
        created_at=current.created_at,
    )
@users_router.post("/register", status_code=status.HTTP_201_CREATED)
def register(payload: UserCreate, session: Session = Depends(get_session)) -> Response:
    uname = _normalize_username(payload.username)
    if not uname or not payload.password:
        raise HTTPException(status_code=400, detail="Username and password are required")

    existing = session.exec(select(User).where(func.lower(User.username) == uname)).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Username already taken")

    user = User(
        id=gen_id(),
        name=payload.name or uname,
        username=uname,
        password_hash=hash_password(payload.password),
    )
    session.add(user)
    session.commit()
    return Response(status_code=status.HTTP_201_CREATED)


@users_router.post("/login", status_code=status.HTTP_200_OK)
def login(payload: LoginRequest, response: Response, session: Session = Depends(get_session)) -> Response:
    uname = _normalize_username(payload.username)

    user = session.exec(select(User).where(func.lower(User.username) == uname)).first()
    unauthorized = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    if not user or not verify_password(payload.password, user.password_hash):
        raise unauthorized

    if needs_rehash(user.password_hash):
        user.password_hash = hash_password(payload.password)
        session.add(user)
        session.commit()

    _clear_auth_cookies(response)

    token, csrf, exp = _issue_tokens(user.id, user.username)
    _set_auth_cookies(response, token, csrf, exp)

    response.status_code = status.HTTP_200_OK

    return response


@users_router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(response: Response, current: User = Depends(get_current_user)) -> Response:
    if not current:
        raise HTTPException(status_code=403, detail="Forbidden")

    _clear_auth_cookies(response)
    response.status_code=status.HTTP_200_OK
    return response


@users_router.get("/users/{username}", response_model=UserRead, response_model_by_alias=True)
def get_user(username: str, session: Session = Depends(get_session)) -> UserRead:
    uname = (username or "").strip().lower()

    user = session.exec(
        select(User).where(func.lower(User.username) == uname)
    ).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    own_posts_db = session.exec(
        select(Post)
        .where(Post.created_by == user.id)
        .order_by(Post.created_at.desc())
        .limit(5)
    ).all()

    liked_ids = list(user.liked or [])
    liked_posts_db: list[Post] = []
    if liked_ids:
        liked_posts_db = session.exec(
            select(Post)
            .where(Post.id.in_(liked_ids))
            .order_by(Post.created_at.desc())
            .limit(5)
        ).all()

    return UserRead(
        id=user.id,
        name=user.name,
        username=user.username,
        avatar_url=user.avatar_url,
        posts=_map_posts(own_posts_db),
        liked_posts=_map_posts(liked_posts_db),
        likes=_likes_received(session, user.id),
        created_at=user.created_at,
    )

@users_router.patch("/users/me/edit", response_model=UserUpdate, response_model_by_alias=True)
async def change_profile(current_user: User = Depends(get_current_user), session: Session = Depends(get_session), avatar: UploadFile = File(...)):
    cont_type = (avatar.content_type or "").lower()
    if not cont_type.startswith("image/"):
        raise HTTPException(status_code=415, detail="Only image files are allowed")

    try:
        url = await asyncio.to_thread(
            upload_to_s3,
            avatar.file,
            avatar.filename or "avatar",
        )
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"S3 upload failed: {e!s}")

    current_user.avatar_url = url
    session.add(current_user)
    session.commit()
    session.refresh(current_user)

    return UserUpdate(
        id=current_user.id,
        avatar_url=current_user.avatar_url
    )

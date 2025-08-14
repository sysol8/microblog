from __future__ import annotations

from uuid import uuid4
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, Response, Request, status
from jose import jwt, JWTError
from sqlalchemy import func
from sqlmodel import Session, select

from ..db.database import get_session
from ..models import User
from .schemas import UserCreate, UserRead, LoginRequest
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
    resp.delete_cookie(AUTH_COOKIE_NAME, path="/", domain=AUTH_COOKIE_DOMAIN if AUTH_COOKIE_DOMAIN else None)
    resp.delete_cookie(CSRF_COOKIE_NAME, path="/", domain=AUTH_COOKIE_DOMAIN if AUTH_COOKIE_DOMAIN else None)

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

@users_router.get("/users/me", response_model=UserRead, response_model_by_alias=True)
def get_me(current: User = Depends(get_current_user)) -> UserRead:
    return UserRead(
        id=current.id,
        name=current.name,
        username=current.username,
        avatar_url=current.avatar_url,
        posts=[p.id for p in (current.posts or []) if p and p.id],
        liked=current.liked,
        likes=current.likes,
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

    token, csrf, exp = _issue_tokens(user.id, user.username)
    _set_auth_cookies(response, token, csrf, exp)

    response.status_code = status.HTTP_200_OK

    return response


@users_router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(response: Response) -> Response:
    _clear_auth_cookies(response)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@users_router.get("/users/{user_id}", response_model=UserRead, response_model_by_alias=True)
def get_user(user_id: str, session: Session = Depends(get_session)) -> UserRead:
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    post_ids = [p.id for p in (user.posts or []) if p and p.id]

    return UserRead(
        id=user.id,
        name=user.name,
        username=user.username,
        avatar_url=user.avatar_url,
        posts=post_ids,
        liked=user.liked,
        likes=user.likes,
        created_at=user.created_at,
    )

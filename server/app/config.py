import os
from typing import Optional
from dotenv import load_dotenv

load_dotenv(override=False)

def _req(name: str) -> str:
    val = os.getenv(name)
    if val is None or val == "":
        raise RuntimeError(f"Missing required environment variable: {name}")
    return val

def _opt(name: str, default: Optional[str] = None) -> Optional[str]:
    return os.getenv(name, default)

def _as_bool(name: str, default: bool = False) -> bool:
    val = os.getenv(name)
    if val is None:
        return default
    return val.strip().lower() in {"1", "true", "yes", "y", "on"}

def _as_int(name: str, default: int) -> int:
    val = os.getenv(name)
    if val is None:
        return default
    try:
        return int(val)
    except ValueError as e:
        raise RuntimeError(f"Environment variable {name} must be an integer") from e

def _one_of(name: str, allowed: set[str], default: str) -> str:
    val = os.getenv(name, default).lower()
    if val not in allowed:
        raise RuntimeError(f"{name} must be one of {sorted(allowed)}, got: {val!r}")
    return val

DATABASE_URL: str = _opt("DATABASE_URL", "sqlite:///./db.sqlite3")
SQL_ECHO: bool = _as_bool("SQL_ECHO", True)
SQLITE_CHECK_SAME_THREAD: bool = _as_bool("SQLITE_CHECK_SAME_THREAD", True)

S3_ENDPOINT_URL: str = _req("AWS_ENDPOINT_URL")
S3_ACCESS_KEY_ID: str = _req("AWS_ACCESS_KEY_ID")
S3_SECRET_ACCESS_KEY: str = _req("AWS_SECRET_ACCESS_KEY")
S3_DEFAULT_REGION: str = _opt("AWS_DEFAULT_REGION", "us-east-1")
S3_BUCKET_NAME: str = _req("AWS_BUCKET_NAME")

JWT_SECRET: str = _req("JWT_SECRET")
JWT_ALG: str = _opt("JWT_ALG", "HS256")
JWT_EXPIRE_MIN: int = _as_int("JWT_EXPIRE_MIN", 60)
AUTH_COOKIE_NAME: str = _opt("AUTH_COOKIE_NAME", "auth")
CSRF_COOKIE_NAME: str = _opt("CSRF_COOKIE_NAME", "csrf_token")
SECURE_COOKIES: bool = _as_bool("SECURE_COOKIES", False)
AUTH_SAMESITE: str = _one_of("AUTH_SAMESITE", {"lax", "strict", "none"}, "lax")
AUTH_COOKIE_DOMAIN: Optional[str] = _opt("AUTH_COOKIE_DOMAIN", None)

__all__ = [
    # DB
    "DATABASE_URL", "SQL_ECHO", "SQLITE_CHECK_SAME_THREAD",
    # S3
    "S3_ENDPOINT_URL", "S3_ACCESS_KEY_ID", "S3_SECRET_ACCESS_KEY",
    "S3_DEFAULT_REGION", "S3_BUCKET_NAME",
    # Auth
    "JWT_SECRET", "JWT_ALG", "JWT_EXPIRE_MIN",
    "AUTH_COOKIE_NAME", "CSRF_COOKIE_NAME", "SECURE_COOKIES",
    "AUTH_SAMESITE", "AUTH_COOKIE_DOMAIN",
]

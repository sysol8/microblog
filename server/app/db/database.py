from sqlmodel import SQLModel, create_engine, Session
from app.config import SQL_ECHO, SQLITE_CHECK_SAME_THREAD, DATABASE_URL

engine = create_engine(
    DATABASE_URL,
    echo=SQL_ECHO,
    connect_args={"check_same_thread": SQLITE_CHECK_SAME_THREAD} if DATABASE_URL.startswith("sqlite") else {}
)

def get_session():
    with Session(engine) as session:
        yield session

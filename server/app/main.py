from fastapi import FastAPI
from sqlmodel import SQLModel
from .db.database import engine
from .middleware import setup_cors
from .posts.posts import router as posts_router

app = FastAPI(title="Microblog API", version="0.1.0")

setup_cors(app)

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

app.include_router(posts_router)
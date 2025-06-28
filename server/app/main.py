from fastapi import FastAPI
from posts.posts import router as posts_router
from middleware import setup_cors

app = FastAPI(
    title="Microblog API",
    version="0.1.0"
)

setup_cors(app)
app.include_router(posts_router)


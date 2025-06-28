from fastapi import APIRouter
from models import User, Post

router = APIRouter(prefix="/api/posts", tags=["posts"])

async def get_posts():
    pass

async def create_post():
    pass

async def edit_post(id):
    pass

async def delete_post(id):
    pass
from fastapi import APIRouter
from models.user import User
from controller.user import index, add, get, update, delete

router = APIRouter()

@router.get("/users", response_model=list[User])
async def read_users():
    return await index()

@router.post("/users", response_model=User)
async def create_user(user: User):
    return await add(user)

@router.get("/users/{uid}", response_model=User)
async def read_user(uid: str):
    return await get(uid)

@router.put("/users/{uid}", response_model=User)
async def update_user(uid: str, user: User):
    return await update(uid, user)

@router.delete("/users/{uid}")
async def remove_user(uid: str):
    return await delete(uid)
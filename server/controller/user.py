from fastapi import HTTPException
from models.user import User
from utils.db import db

async def index():
    try:
        users = []
        async for user in db.users.find():
            users.append(User(**user))
        return users
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

async def add(user: User):
    try:
        await db.users.insert_one(user.model_dump())
        return user
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
async def get(uid: str):
    try:
        user = await db.users.find_one({"uid": uid})
        if user:
            return User(**user)
        raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
async def update(uid: str, user: User):
    try:
        await db.users.update_one({"uid": uid}, {"$set": user.model_dump()})
        return user
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
async def delete(uid: str):
    try:
        await db.users.delete_one({"uid": uid})
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

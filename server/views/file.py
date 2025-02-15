from fastapi import APIRouter, UploadFile, File as FastAPIFile, Form
from models.file import File
from controller.file import upload_single_python_file
from typing import List
import json

router = APIRouter()

@router.post("/users/{uid}/files", response_model=dict)
async def upload_python_file(uid: str, file: UploadFile = FastAPIFile(...), skip_list: str = Form(...)):
    skip_list = json.loads(skip_list)
    return upload_single_python_file(uid, file, skip_list)

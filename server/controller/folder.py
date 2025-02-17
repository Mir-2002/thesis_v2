# from fastapi import HTTPException, UploadFile, File, APIRouter
# from fastapi.responses import JSONResponse
# from utils.db import db
# from utils.parser import parse_folder
# from models.folder import Folder as FolderModel
# from typing import List
# import os
# import shutil
# import tempfile

# async def upload_folder(uid: str, folder: List[UploadFile] = File(...), skip_list: List[str] = []):
#     user = db.users.find_one({"uid": uid})
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     with tempfile.TemporaryDirectory() as temp_dir:
#         for file in folder:
#             file_path = os.path.join(temp_dir, file.filename)
#             with open(file_path, "wb") as f:
#                 shutil.copyfileobj(file.file, f)

#         folder_model = parse_folder(temp_dir, skip_list)
#         db.users.update_one({"uid": uid}, {"$push": {"folders": folder_model.model_dump()}})

#     return JSONResponse(content={"message": "Folder uploaded successfully"})

from fastapi import HTTPException, UploadFile, File, APIRouter, Form
from fastapi.responses import JSONResponse
from utils.db import db
from utils.parser import parse_folder
from models.folder import Folder as FolderModel
from typing import List
import os
import shutil
import tempfile
import json
import logging

router = APIRouter()

# @router.post("/users/{uid}/folders")
# async def upload_folder(
#     uid: str,
#     folder: List[UploadFile] = File(...),
#     relativePaths: List[str] = Form(...),
#     function_skip_list: str = Form(...),
#     file_skip_list: str = Form(...),
#     folder_skip_list: str = Form(...)
# ):
#     user = db.users.find_one({"uid": uid})
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     function_skip_list = json.loads(function_skip_list)
#     file_skip_list = json.loads(file_skip_list)
#     folder_skip_list = json.loads(folder_skip_list)

#     with tempfile.TemporaryDirectory() as temp_dir:
#         for file, relative_path in zip(folder, relativePaths):
#             file_path = os.path.join(temp_dir, relative_path)
#             os.makedirs(os.path.dirname(file_path), exist_ok=True)
#             with open(file_path, "wb") as f:
#                 shutil.copyfileobj(file.file, f)

#         folder_model = parse_folder(temp_dir, function_skip_list, file_skip_list, folder_skip_list)
#         db.users.update_one({"uid": uid}, {"$push": {"folders": folder_model.model_dump()}})

#     return JSONResponse(content={"message": "Folder uploaded successfully"})

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

@router.post("/users/{uid}/folders")
async def upload_folder(
    uid: str,
    folder: List[UploadFile] = File(...),
    relativePaths: str = Form(...),
    function_skip_list: str = Form(...),
    file_skip_list: str = Form(...),
    folder_skip_list: str = Form(...)
):
    try:
        # Parse JSON inputs
        relative_paths = json.loads(relativePaths)
        function_skip_list = json.loads(function_skip_list)
        file_skip_list = json.loads(file_skip_list)
        folder_skip_list = json.loads(folder_skip_list)

        # Check user exists - use await with motor if you have async MongoDB
        user = await db.users.find_one({"uid": uid})
        if not user:
            return JSONResponse(
                status_code=404,
                content={"detail": "User not found"}
            )

        with tempfile.TemporaryDirectory() as temp_dir:
            # Save files
            for file, relative_path in zip(folder, relative_paths):
                file_path = os.path.join(temp_dir, relative_path)
                os.makedirs(os.path.dirname(file_path), exist_ok=True)
                
                contents = await file.read()
                with open(file_path, "wb") as f:
                    f.write(contents)

            # Parse folder
            folder_model = parse_folder(
                temp_dir,
                function_skip_list,
                file_skip_list,
                folder_skip_list
            )

            # Update database - use await with motor if you have async MongoDB
            try:
                result = await db.users.update_one(
                    {"uid": uid},
                    {"$push": {"folders": folder_model.model_dump()}}
                )
                
                return JSONResponse(content={
                    "message": "Folder uploaded successfully",
                    "folder_name": folder_model.foldername,
                    "file_count": len(folder)
                })
                
            except Exception as e:
                return JSONResponse(
                    status_code=500,
                    content={"detail": f"Database error: {str(e)}"}
                )

    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"detail": f"Server error: {str(e)}"}
        )
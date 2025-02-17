from fastapi import APIRouter, UploadFile, File as FastAPIFile, Form
from controller.folder import upload_folder
from typing import List
import json

router = APIRouter()

# @router.post("/users/{uid}/folders", response_model=dict)
# async def upload_project_folder(uid: str, folder: List[UploadFile] = FastAPIFile(...), skip_list: str = Form(...)):
#     skip_list = json.loads(skip_list)
#     return await upload_folder(uid, folder, skip_list)

# @router.post("/users/{uid}/folders", response_model=dict)
# async def upload_project_folder(
#     uid: str,
#     folder: List[UploadFile] = FastAPIFile(...),
#     relativePaths: str = Form(...),
#     function_skip_list: str = Form(...),
#     file_skip_list: str = Form(...),
#     folder_skip_list: str = Form(...)
# ):
#     relativePaths = json.loads(relativePaths)
#     function_skip_list = json.loads(function_skip_list)
#     file_skip_list = json.loads(file_skip_list)
#     folder_skip_list = json.loads(folder_skip_list)
#     return await upload_folder(uid, folder, relativePaths, function_skip_list, file_skip_list, folder_skip_list)

@router.post("/users/{uid}/folders", response_model=dict)
async def upload_project_folder(
    uid: str,
    folder: List[UploadFile] = FastAPIFile(...),
    relativePaths: str = Form(...),  # Changed to str to match frontend
    function_skip_list: str = Form(...),
    file_skip_list: str = Form(...),
    folder_skip_list: str = Form(...)
):
    # No need to parse JSON here, let the controller handle it
    return await upload_folder(
        uid,
        folder,
        relativePaths,
        function_skip_list,
        file_skip_list,
        folder_skip_list
    )
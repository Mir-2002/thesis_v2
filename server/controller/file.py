from fastapi import HTTPException, UploadFile, File
from utils.db import db
from utils.parser import parse_python_file
from models.file import File as FileModel
from typing import List

def upload_single_python_file(uid: str, file: UploadFile = File(...), skip_list: List[str] =[]):
    user = db.users.find_one({"uid": uid})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    file_content = file.file.read().decode("utf-8")
    parsed_data = parse_python_file(file_content, skip_list)

    filtered_data = [item for item in parsed_data if item['name'] not in skip_list]

    file_model = FileModel(filename=file.filename, parsed_data=filtered_data, skip_list=skip_list)
    db.users.update_one({"uid": uid}, {"$push": {"files": file_model.model_dump()}})

    return {"message": "File uploaded successfully"}
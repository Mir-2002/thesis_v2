from fastapi import HTTPException, UploadFile
from utils.db import db
from utils.parser import parse_python_file

def upload_single_python_file(file: UploadFile):
    if not file:
        raise HTTPException(status_code=400, detail="No file uploaded")
    if file.filename == '':
        raise HTTPException(status_code=400, detail="No selected file")
    
    try:
        file_content = file.file.read().decode("utf-8")
        parsed_data = parse_python_file(file_content)
        db.files.insert_one({
            "filename": file.filename,
            "parsed_data": parsed_data
        })
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
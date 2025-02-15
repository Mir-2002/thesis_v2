from pydantic import BaseModel
from typing import List
from .file import File

class User(BaseModel):
    uid: str
    username: str
    email: str
    files : List[File] = []
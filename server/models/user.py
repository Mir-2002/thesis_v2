from pydantic import BaseModel
from typing import List
from .file import File
from .folder import Folder

class User(BaseModel):
    uid: str
    username: str
    email: str
    files : List[File] = []
    folders: List[Folder] = []
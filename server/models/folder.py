from pydantic import BaseModel, Field
from typing import List, Dict, Any
from .file import File

class Directory(BaseModel):
    dirname: str
    files: List[File] = Field(default_factory=list)

class Folder(BaseModel):
    foldername: str
    directories: List[Directory] = Field(default_factory=list)
    
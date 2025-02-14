from pydantic import BaseModel
from typing import List
from .user import User

class File(BaseModel):
    filename: str
    parsed_data: List[dict[str, any]]
    user: User
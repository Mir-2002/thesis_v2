from pydantic import BaseModel, Field
from typing import List, Dict, Any

class File(BaseModel):
    filename: str
    parsed_data: List[Dict[str, Any]]
    skip_list: List[str] = Field(default_factory=list)
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

class File(BaseModel):
    filename: str
    path: Optional[str] = None
    parsed_data: List[Dict[str, Any]] = Field(default_factory=list)
    skip_list: List[str] = Field(default_factory=list)